import { AccessToken, AccessTokenOptions, VideoGrant } from "livekit-server-sdk";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/user.model";

// Env vars
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export const revalidate = 0;

export type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
};

function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown_ip";
}

function createParticipantToken(userInfo: AccessTokenOptions, roomName: string) {
  const at = new AccessToken(API_KEY!, API_SECRET!, {
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
      throw new Error("LiveKit credentials are missing");
    }

    await dbConnect();

    const ip = getClientIP(request.headers);
    const now = Date.now();

    const existing = await User.findOne({ ip });

    if (existing) {
      const elapsed = now - existing.lastConnectedAt;
      const cooldown = 2 * 60_000 + 30 * 60_000; // 32 minutes

      if (elapsed < cooldown) {
  const remaining = cooldown - elapsed;

  return NextResponse.json(
    { message: "TimeOut: Please wait before reconnecting.", remaining },
    { status: 403, headers: { "Cache-Control": "no-store" } }
  );
}

      existing.lastConnectedAt = now;
      await existing.save();
    } else {
      await User.create({ ip, lastConnectedAt: now });
    }

    const participantIdentity = `patient_identity_${Math.floor(Math.random() * 10_000)}`;
    const roomName = `patient_room_${Math.floor(Math.random() * 10_000)}`;
    const participantToken = await createParticipantToken({ identity: participantIdentity }, roomName);

    const data: ConnectionDetails = {
      serverUrl: LIVEKIT_URL,
      roomName,
      participantToken,
      participantName: participantIdentity,
    };

    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
