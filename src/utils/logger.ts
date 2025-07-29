import fs from 'node:fs';
import path from 'node:path';

const logFilePath = path.resolve(process.cwd(), 'server.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

export function logMessage(level: 'info' | 'warn' | 'error', message: string) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  console.error(logEntry);
  logStream.write(`${logEntry}\n`);
}

process.on('exit', () => {
  logStream.end();
});
