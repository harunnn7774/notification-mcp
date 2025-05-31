# ✨ Notifications MCP Server ✨

Dream it, Pixel it. Made with ❤️ by Pink Pixel.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Model Context Protocol](https://img.shields.io/badge/Model%20Context%20Protocol-Server-green)](https://github.com/model-context-protocol/model-context-protocol)
[![npm version](https://badge.fury.io/js/@pinkpixel%2Fnotification-mcp.svg)](https://www.npmjs.com/package/@pinkpixel/notification-mcp)

## Overview

A Model Context Protocol server that allows AI agents to play notification sounds when tasks are completed. This TypeScript-based MCP server provides a simple, configurable notification system with **bundled sounds that work out of the box** with npx!

## ✨ Features

### 🔧 Tools
- `play_notification` - Play a notification sound to indicate task completion
  - Takes an optional `message` parameter to display with the notification
  - Supports cross-platform sound playback (Windows and macOS)
  - **Works with bundled sounds** - no manual downloads required!

### 🎵 Built-in Sound Library
**5 high-quality notification sounds bundled with the package:**
- `cosmic` - Space-themed notification 🌌
- `fairy` - Magical, whimsical tone 🧚‍♀️  
- `gentle` - Soft, pleasant default sound (default) 🔔
- `pleasant` - Balanced, professional tone 📞
- `retro` - Nostalgic, vintage-style notification 🕹️

## 🚀 Quick Start

### Option 1: Use Bundled Sounds (Recommended) ⭐
Just run it with npx - sounds included!

```json
{
  "mcpServers": {
    "notifications": {
      "command": "npx",
      "args": ["-y", "@pinkpixel/notification-mcp"]
    }
  }
}
```

### Option 2: Choose a Different Bundled Sound
```json
{
  "mcpServers": {
    "notifications": {
      "command": "npx",
      "args": ["-y", "@pinkpixel/notification-mcp"],
      "env": {
        "MCP_NOTIFICATION_SOUND": "cosmic"
      }
    }
  }
}
```

### Option 3: Use Your Own Custom Sound
```json
{
  "mcpServers": {
    "notifications": {
      "command": "npx",
      "args": ["-y", "@pinkpixel/notification-mcp"],
      "env": {
        "MCP_NOTIFICATION_SOUND_PATH": "C:\\path\\to\\your\\sound.mp3"
      }
    }
  }
}
```

## ⚙️ Configuration

The notification sound can be configured using environment variables:

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MCP_NOTIFICATION_SOUND` | Choose from bundled sounds: `cosmic`, `fairy`, `gentle`, `pleasant`, `retro` | `gentle` |
| `MCP_NOTIFICATION_SOUND_PATH` | Absolute path to your own MP3 file (overrides bundled sounds) | `null` |

### Priority Order
1. **Custom Path** (`MCP_NOTIFICATION_SOUND_PATH`) - highest priority
2. **Bundled Sound** (`MCP_NOTIFICATION_SOUND`) - choose from 5 included sounds  
3. **Default** - gentle chime if nothing is specified

## 💻 Usage

Once configured, your MCP client can call the `play_notification` tool:

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

## 🛠️ Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/pinkpixel-dev/notification-mcp.git
cd notification-mcp

# Install dependencies
npm install

# Build the server
npm run build

# For development with auto-rebuild
npm run watch
```

### Local Development Configuration
```json
{
  "mcpServers": {
    "notifications": {
      "command": "node",
      "args": ["./build/index.js"],
      "env": {
        "MCP_NOTIFICATION_SOUND": "retro"
      }
    }
  }
}
```

### Debugging

Use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) for interactive debugging:

```bash
npm run inspector
```

The Inspector provides a web interface to test your MCP server in your browser.

## 📦 Installation Methods

### NPX (Recommended)
No installation required - sounds are bundled automatically:
```bash
npx @pinkpixel/notification-mcp
```

### Global Install
```bash
npm install -g @pinkpixel/notification-mcp
notification-mcp
```

### Local Install
```bash
npm install @pinkpixel/notification-mcp
npx notification-mcp
```

## 🎵 Sound Files

All sound files are located in the `sounds/` directory and are automatically included when you install the package:

- Cosmic: `sounds/cosmic_chime.mp3` - 🌌 Space-themed
- Fairy: `sounds/fairy_chime.mp3` - 🧚‍♀️ Magical
- Gentle: `sounds/gentle_chime.mp3` - 🔔 Default (soft)
- Pleasant:`sounds/pleasant_chime.mp3` - 📞 Professional  
- Retro: `sounds/retro_chime.mp3` - 🕹️ Vintage

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 About Pink Pixel

- **Website:** [pinkpixel.dev](https://pinkpixel.dev)
- **GitHub:** [github.com/pinkpixel-dev](https://github.com/pinkpixel-dev)  
- **Discord:** @sizzlebop

---

*Made with ❤️ by Pink Pixel* ✨
