#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import * as path from 'node:path';

const execAsync = promisify(exec);

// Available sound files
const SOUND_FILES = {
  cosmic: 'cosmic_chime.mp3',
  fairy: 'fairy_chime.mp3',
  gentle: 'gentle_chime.mp3',
  pleasant: 'pleasant_chime.mp3',
  retro: 'retro_chime.mp3'
};

// Get configured sound from environment variables
const DEFAULT_SOUND_NAME = process.env.MCP_NOTIFICATION_SOUND || 'gentle';
const DEFAULT_SOUND_FILE = SOUND_FILES[DEFAULT_SOUND_NAME as keyof typeof SOUND_FILES] || SOUND_FILES.gentle;
const USER_CONFIGURED_SOUND_PATH = process.env.MCP_NOTIFICATION_SOUND_PATH;

const SOUND_FILE_TO_PLAY = USER_CONFIGURED_SOUND_PATH || path.join(process.cwd(), DEFAULT_SOUND_FILE);

/**
 * Create an MCP server with tool capability for playing notifications
 */
const server = new Server(
  {
    name: "notification-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Handler that lists available tools.
 * Exposes a "play_notification" tool that plays a sound when tasks complete.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "play_notification",
        description: "Play a notification sound to indicate task completion",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Optional message to display with notification"
            }
          }
        }
      }
    ]
  };
});

/**
 * Handler for the play_notification tool.
 * Plays the configured sound file and returns success message.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "play_notification") {
    throw new Error("Unknown tool");
  }

  try {
    // Play sound using platform-specific command
    const command = process.platform === 'win32'
      ? `start "" "${SOUND_FILE_TO_PLAY}"`
      : `afplay "${SOUND_FILE_TO_PLAY}"`;

    await execAsync(command);

    return {
      content: [{
        type: "text",
        text: request.params.arguments?.message
          ? `Notification played: ${request.params.arguments.message}`
          : "Notification played successfully"
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Failed to play notification: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

/**
 * Start the server using stdio transport
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Notification MCP server running with sound: ${SOUND_FILE_TO_PLAY} from directory: ${process.cwd()}`);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
