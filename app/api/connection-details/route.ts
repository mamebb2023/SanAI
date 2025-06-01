import { AccessToken, AccessTokenOptions, VideoGrant } from "livekit-server-sdk";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/user.model";

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export const revalidate = 0;

function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown_ip";
}

function createParticipantToken(userInfo: AccessTokenOptions, roomName: string) {
  if (!API_KEY || !API_SECRET) throw new Error("LiveKit credentials not set");

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
    if (!LIVEKIT_URL || !API_KEY || !API_SECRET) {
      throw new Error("Missing environment variables");
    }

    await dbConnect();

    const ip = getClientIP(request.headers);
    const now = Date.now();

    const user = await User.findOne({ ip });

    if (user) {
      const elapsed = now - user.lastConnectedAt;
      const blockPeriod = 2 * 60_000 + 30 * 60_000; // 32 minutes

      if (elapsed < blockPeriod) {
        return new NextResponse("Blocked: Please wait before reconnecting.", {
          status: 403,
          headers: { "Cache-Control": "no-store" },
        });
      }

      // Update existing user
      user.lastConnectedAt = now;
      await user.save();
    } else {
      // Create new user record
      await User.create({ ip, lastConnectedAt: now });
    }

    const participantIdentity = `patient_${Math.floor(Math.random() * 10_000)}`;
    const roomName = `room_${Math.floor(Math.random() * 10_000)}`;
    const participantToken = createParticipantToken({ identity: participantIdentity }, roomName);

    return NextResponse.json(
      {
        serverUrl: LIVEKIT_URL,
        roomName,
        participantToken,
        participantName: participantIdentity,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
