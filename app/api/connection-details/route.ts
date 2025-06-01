import { AccessToken, AccessTokenOptions, VideoGrant } from "livekit-server-sdk";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Environment variables
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

// File paths
const USERS_FILE_PATH = path.resolve("users.json");

// Don't cache the results
export const revalidate = 0;

export type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
};

// Utility functions
function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown_ip";
}

async function readUsers(): Promise<Record<string, number>> {
  try {
    const data = await fs.readFile(USERS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeUsers(users: Record<string, number>): Promise<void> {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
}

function createParticipantToken(userInfo: AccessTokenOptions, roomName: string) {
  if (!API_KEY || !API_SECRET) {
    throw new Error("LiveKit API credentials not configured");
  }

  const at = new AccessToken(API_KEY, API_SECRET, {
    ...userInfo,
    ttl: "15m",
  });
  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  at.addGrant(grant);
  return at.toJwt();
}

export async function GET(request: Request) {
  try {
    // Validate environment variables
    if (!LIVEKIT_URL) throw new Error("LIVEKIT_URL is not defined");
    if (!API_KEY) throw new Error("LIVEKIT_API_KEY is not defined");
    if (!API_SECRET) throw new Error("LIVEKIT_API_SECRET is not defined");

    // IP-based rate limiting
    const ip = getClientIP(request.headers);
    const users = await readUsers();
    const now = Date.now();

    const previous = users[ip];
    if (previous) {
      const elapsed = now - previous;
      const blockPeriod = 2 * 60_000 + 30 * 60_000; // 2 minutes + 30 minutes
      if (elapsed < blockPeriod) {
        return new NextResponse("Blocked: Please wait before reconnecting.", { 
          status: 403,
          headers: { "Cache-Control": "no-store" }
        });
      }
    }

    // Generate participant token
    const participantIdentity = `patient_${Math.floor(Math.random() * 10_000)}`;
    const roomName = `room_${Math.floor(Math.random() * 10_000)}`;
    const participantToken = await createParticipantToken(
      { identity: participantIdentity },
      roomName
    );

    // Update user access time
    users[ip] = now;
    await writeUsers(users);

    // Return connection details
    const data: ConnectionDetails = {
      serverUrl: LIVEKIT_URL,
      roomName,
      participantToken,
      participantName: participantIdentity,
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new NextResponse(error.message, { 
        status: 500,
        headers: { "Cache-Control": "no-store" }
      });
    }
    return new NextResponse("Internal server error", { 
      status: 500,
      headers: { "Cache-Control": "no-store" }
    });
  }
}