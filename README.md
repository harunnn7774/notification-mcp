# ✨ Notifications MCP Server ✨

Dream it, Pixel it. Made with ❤️ by Pink Pixel.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Model Context Protocol](https://img.shields.io/badge/Model%20Context%20Protocol-Server-green)](https://github.com/model-context-protocol/model-context-protocol)

## Overview

A Model Context Protocol server that allows AI agents to play a notification sound via a tool when a task is completed.

This is a TypeScript-based MCP server that provides a simple, configurable notification system. It demonstrates core MCP concepts by exposing a tool to play various sound alerts.

## Features

### Tools
- `play_notification` - Play a notification sound to indicate task completion.
  - Takes an optional `message` parameter to display with the notification.
  - Supports cross-platform sound playback (Windows and macOS).

## Configuration

The notification sound can be configured using environment variables in your MCP client's configuration (e.g., `MCP_config.json`).

You can choose from a set of downloadable sound files, or use your own MP3 file. You must configure the "MCP_NOTIFICATION_SOUND_PATH" environment variable to point to your desired sound file.

**Available Sounds:**
- cosmic_chime.mp3
- fairy_chime.mp3
- gentle_chime.mp3
- pleasant_chime.mp3
- retro_chime.mp3

You can download these sounds from the github repository - [notification-mcp](https://github.com/pinkpixel-dev/notification-mcp)
Or alteratively, you can use your own MP3 file.
Whichever sound you choose, you must set the `MCP_NOTIFICATION_SOUND_PATH` environment variable to the full path of the sound MP3 file, like so:

**Example `config.json` entry:**
```json
{
  "mcpServers": {
    "notifications": {
      "command": "npx",
      "args": ["-y", "@pinkpixel/notification-mcp"],
      "env": {
        "MCP_NOTIFICATION_SOUND_PATH": "C:\\Users\\YOUR_USERNAME\\path\\to\\your\\sound.mp3"
      }
    }
  }
}
```
**Important Note:** Replace `C:\\Users\\YOUR_USERNAME\\path\\to\\your\\sound.mp3` with the actual absolute path to your MP3 file. Ensure the path uses double backslashes `\\` for Windows paths in JSON.

## Usage

Once the server is configured and running, your MCP client can call the `play_notification` tool.

**Example Tool Call (from an AI agent or client SDK):**
```typescript
await client.request({
  method: "tools/call",
  params: {
    name: "play_notification",
    arguments: {
      message: "Task completed successfully! 🎉"
    }
  }
});
```

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

### Run with npx:

```json
{
  "mcpServers": {
    "notifications": {
      "command": "npx",
      "args": ["-y", "@pinkpixel/notification-mcp"]
      "env": {
        "MCP_NOTIFICATION_SOUND_PATH": "C:\\Users\\YOUR_USERNAME\\path\\to\\your\\sound.mp3"
        }
      }
   }
}
```

### Clone the Repository

```json
{
  "mcpServers": {
    "notifications": {
      "command": "node",
      "args": ["\\path\\to\\notification-mcp\\build\\index.js"],
      "env": {
        "MCP_NOTIFICATION_SOUND_PATH": "C:\\Users\\YOUR_USERNAME\\path\\to\\your\\sound.mp3"
      }
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
