# Weather MCP Server

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-blue?style=for-the-badge)](https://modelcontextprotocol.io/)
[![Open-Meteo API](https://img.shields.io/badge/Open--Meteo-Weather%20API-orange?style=for-the-badge)](https://open-meteo.com/)
[![Zod](https://img.shields.io/badge/Zod-Schema%20Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

A Model Context Protocol (MCP) server that provides real-time weather information for any city worldwide. Built with TypeScript and powered by the Open-Meteo API.

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **Dual Temperature Units**: Temperature displayed in both Celsius and Fahrenheit
- **Comprehensive Weather Info**: Includes temperature, humidity, and UV index
- **UV Safety Recommendations**: Provides sun protection advice based on UV levels
- **Geocoding Support**: Automatically resolves city names to coordinates
- **Error Handling**: Robust error handling with meaningful error messages
- **Type Safety**: Built with TypeScript for enhanced reliability

## 🛠️ Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Model Context Protocol SDK
- **Schema Validation**: Zod
- **Weather API**: Open-Meteo API
- **Geocoding**: Open-Meteo Geocoding API

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mcp-weather-server-main
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

## 🚀 Usage

### Development Mode
```bash
# Watch mode with auto-rebuild
npm run watch

# Development with inspector
npm run dev

# Debug mode
npm run debug
```

### Production Mode
```bash
# Start the server
npm start
```

### MCP Inspector
```bash
# Launch the MCP inspector for testing
npm run inspector
```

## 🔧 Available Tools

### `get-weather`

Retrieves comprehensive weather information for a specified city.

**Parameters:**
- `city` (string): Name of the city to get weather information for

**Example Usage:**
```json
{
  "city": "London"
}
```

**Example Response:**
```
Weather for London (lat: 51.5074, lon: -0.1278):
Temperature: 22°C (71.6°F)
Relative Humidity: 65%
UV Index: 4
UV level is moderate (3-5). Sun protection is recommended: Slip on protective clothing, Slop on SPF 50+ sunscreen, Slap on a hat, Seek shade, Slide on sunglasses.
```

## 📊 Weather Data Provided

- **Temperature**: Current temperature in both Celsius and Fahrenheit
- **Humidity**: Relative humidity percentage
- **UV Index**: Current UV index with safety recommendations
- **Location**: Precise coordinates and city name

## 🌞 UV Index Safety Levels

The server provides detailed UV safety recommendations:

- **Low (1-2)**: Sun protection not required for extended outdoor periods
- **Moderate (3-5)**: Sun protection recommended with the five SunSmart steps
- **High (6-7)**: Sun protection essential - follow all SunSmart steps
- **Very High (8-10)**: Minimize sun exposure and strictly follow protection measures
- **Extreme (11+)**: Avoid outdoor activities during peak UV times

## 🏗️ Project Structure

```
src/
├── index.ts              # Main server entry point
├── tools/
│   ├── index.ts          # Tools export barrel
│   ├── weatherTool.ts    # Weather tool implementation
│   └── tmsAuthTool.ts    # TMS authentication tool
└── utils/                # Utility functions (if any)
```

## 🔍 API Dependencies

This server relies on the following external APIs:

- **Open-Meteo Weather API**: `https://api.open-meteo.com/v1/forecast`
- **Open-Meteo Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`

Both APIs are free and don't require authentication keys.

## 🧪 Testing

The server can be tested using the MCP inspector:

```bash
npm run inspector
```

This will launch a web interface where you can test the weather tool with different city names.

## 🛡️ Error Handling

The server includes comprehensive error handling for:

- Invalid city names
- Network connectivity issues
- API rate limiting
- Malformed responses
- Server timeouts

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `build` | Compile TypeScript and set executable permissions |
| `watch` | Watch mode for development |
| `inspector` | Launch MCP inspector for testing |
| `dev` | Development mode with watch and inspector |
| `debug` | Start with Node.js debugger |
| `debug:watch` | Debug mode with watch |
| `logs` | View MCP logs (macOS/Linux) |
| `clean` | Remove build directory |
| `start` | Start the production server |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather data
- [Model Context Protocol](https://modelcontextprotocol.io/) for the MCP framework
- [Zod](https://zod.dev/) for runtime type validation

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Note**: This server provides weather data for informational purposes only. For critical weather-dependent decisions, please consult official meteorological services.
