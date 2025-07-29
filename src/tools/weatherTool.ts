import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as z from 'zod';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

/**
 * Zod schema for weather request parameters
 */
const WeatherRequestSchema = z.object({
  city: z.string().describe('City name'),
});

/**
 * Type definitions for external API responses
 */
type GeocodingResult = {
  latitude: number;
  longitude: number;
  name: string;
};

type GeocodingResponse = {
  results?: GeocodingResult[];
};

type WeatherResponse = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    uv_index?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

/**
 * Helper function to format UV index information
 * @param uv - UV index value
 * @returns Formatted UV information string
 */
function formatUVInfo(uv: number): string {
  let uvInfo = `UV Index: ${uv}\n`;
  
  if (uv < 3) {
    uvInfo += 'UV level is low (1-2). Sun protection is not required unless outdoors for extended periods.\n';
  } else if (uv < 6) {
    uvInfo += 'UV level is moderate (3-5). Sun protection is recommended: Slip on protective clothing, Slop on SPF 50+ sunscreen, Slap on a hat, Seek shade, Slide on sunglasses.\n';
  } else if (uv < 8) {
    uvInfo += 'UV level is high (6-7). Sun protection is essential: Follow all five SunSmart steps.\n';
  } else if (uv < 11) {
    uvInfo += 'UV level is very high (8-10). Minimize sun exposure and strictly follow all five SunSmart steps.\n';
  } else {
    uvInfo += 'UV level is extreme (11+). Avoid being outdoors during peak UV times. Sun protection is critical.\n';
  }
  
  return uvInfo;
}

/**
 * Helper function to format weather data into a readable string
 * @param name - City name
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @param weatherData - Weather data object
 * @returns Formatted weather information string
 */
function formatWeatherData(name: string, latitude: number, longitude: number, weatherData: WeatherResponse): string {
  const temp = weatherData.current?.temperature_2m;
  const humidity = weatherData.current?.relative_humidity_2m;
  const uv = weatherData.current?.uv_index;
  
  let summary = `Weather for ${name} (lat: ${latitude}, lon: ${longitude}):\n`;
  
  if (typeof temp === 'number') {
    const tempF = (temp * 9/5) + 32;
    summary += `Temperature: ${temp}°C (${tempF.toFixed(1)}°F)\n`;
  }
  
  if (typeof humidity === 'number') {
    summary += `Relative Humidity: ${humidity}%\n`;
  }
  
  if (typeof uv === 'number') {
    summary += formatUVInfo(uv);
  }
  
  if (typeof temp !== 'number' && typeof humidity !== 'number' && typeof uv !== 'number') {
    summary += 'No current weather data available.';
  }
  
  return summary;
}

/**
 * Registers the weather tool with the MCP server.
 */
export function registerWeatherTool(server: McpServer) {
  server.tool(
    'get-weather',
    'Tool to get weather information for a city',
    WeatherRequestSchema.shape,
    async (params) => {
      try {
        const { city } = params;
        
        // Fetch geocoding data
        const geoUrl = `${GEOCODING_API}?name=${encodeURIComponent(city)}`;
        const geoResponse = await fetch(geoUrl);
        const geoData: GeocodingResponse = await geoResponse.json();

        if (!geoData || !Array.isArray(geoData.results) || geoData.results.length === 0) {
          return {
            content: [
              { type: 'text', text: `Could not find weather information for ${city}.` },
            ],
          };
        }

        const { latitude, longitude, name } = geoData.results[0];
        
        // Fetch weather data
        const weatherUrl = `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,uv_index&current=temperature_2m,relative_humidity_2m,uv_index`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData: WeatherResponse = await weatherResponse.json();

        const formattedWeather = formatWeatherData(name, latitude, longitude, weatherData);

        return {
          content: [
            {
              type: 'text',
              text: formattedWeather,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('[Weather Tool Error]', error);
        
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching weather data: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
