"use client";

import { CloseIcon } from "@/components/CloseIcon";
import { NoAgentNotification } from "@/components/NoAgentNotification";
import { FiUser } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import TranscriptionView from "@/components/TranscriptionView";
import {
  BarVisualizer,
  DisconnectButton,
  RoomAudioRenderer,
  RoomContext,
  VideoTrack,
  VoiceAssistantControlBar,
  useVoiceAssistant,
} from "@livekit/components-react";
import { AnimatePresence, motion } from "framer-motion";
import { Room, RoomEvent } from "livekit-client";
import { useCallback, useEffect, useState } from "react";
import type { ConnectionDetails } from "@/app/api/connection-details/route";
import Image from "next/image";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { PiFlowerLotusDuotone, PiFlowerLotusFill } from "react-icons/pi";

export default function Page() {
  const [room] = useState(new Room());

  const onConnectButtonClicked = useCallback(async () => {
    // Generate room connection details, including:
    //   - A random Room name
    //   - A random Participant name
    //   - An Access Token to permit the participant to join the room
    //   - The URL of the LiveKit server to connect to
    //
    // In real-world application, you would likely allow the user to specify their
    // own participant name, and possibly to choose from existing rooms to join.

    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ??
        "/api/connection-details",
      window.location.origin
    );
    const response = await fetch(url.toString());
    const connectionDetailsData: ConnectionDetails = await response.json();

    await room.connect(
      connectionDetailsData.serverUrl,
      connectionDetailsData.participantToken
    );
    await room.localParticipant.setMicrophoneEnabled(true);
  }, [room]);

  useEffect(() => {
    room.on(RoomEvent.MediaDevicesError, onDeviceFailure);

    return () => {
      room.off(RoomEvent.MediaDevicesError, onDeviceFailure);
    };
  }, [room]);

  return (
    <RoomContext.Provider value={room}>
      <div className="relative h-screen flex">
        <div className="absolute bottom-10 left-10 size-20 bg-white rounded-full blur-xl" />
        <div className="absolute bottom-5 left-5 size-60 bg-cyan-700 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 size-20 bg-white rounded-full blur-xl" />
        <div className="absolute top-5 right-5 size-60 bg-blue-700 rounded-full blur-3xl" />
        {/* <div className="absolute inset-0 flex-center opacity-10 rotate-y-animation-1 ">
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
        </div>
        <div className="absolute inset-0 flex-center opacity-5 rotate-y-animation-2">
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
          <Image
            src="/waveline.png"
            alt="wave line"
            width={300}
            height={300}
            className="w-full h-auto invert"
          />
        </div> */}

        {/* main section */}
        <div className="flex-1 relative flex flex-col">
          {/* top icons */}
          <div className="h-[60px] bg-white/20 flex justify-between items-center px-4">
            <Logo />

            <p className="">Dashboard</p>

            <div className="flex-center p-2 border rounded-xl text-xl">
              <FiUser />
            </div>
          </div>

          <div className="flex-1 flex">
            {/* side icons */}
            <div className="bg-white/20 w-[60px] h-full flex flex-col justify-between items-center py-4">
              <div className=""></div>

              <div className="text-xl">
                <Link
                  href="/"
                  className="flex-center p-2 border border-transparent hover:border-white/30 rounded-xl text-xl transition-all"
                >
                  <GoHomeFill />
                </Link>
              </div>
            </div>

            {/* main 3 slides */}
            <div className="flex-1 flex flex-col lg:flex-row justfiy-between gap-4 p-2">
              <div className="w-full md:w-[27%] bg-white/10 rounded-xl p-4"></div>

              {/* main middle */}
              <MiddleSection onConnectButtonClicked={onConnectButtonClicked} />

              <div className="w-full md:w-[27%] bg-white/10 rounded-xl p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </RoomContext.Provider>
  );
}

function MiddleSection(props: { onConnectButtonClicked: () => void }) {
  const { state: agentState } = useVoiceAssistant();

  return (
    <div className="relative flex-1 flex-center">
      {/* decoreations */}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.7,
          type: "spring",
          delay: 0.4,
        }}
        className="absolute size-80 rounded-full border border-blue-500"
      />
      <div className="absolute size-80 rounded-full border-x-4 border-blue-500 blur-sm slow-spin" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.7,
          type: "spring",
          delay: 0.2,
        }}
        className="absolute size-60 rounded-full border border-cyan-500"
      />
      <div
        className="absolute size-60 rounded-full border-x-4 border-cyan-500 blur-sm slow-spin"
        style={{ animationDirection: "reverse" }}
      />

      {agentState === "connecting" && (
        <div className="absolute size-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 animate-ping"></div>
      )}

      {/* button */}
      <AnimatePresence mode="wait">
        <motion.div
          key="disconnected"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
          className=""
        >
          <button
            className={`relative flex-center size-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full transition-all ${
              agentState === "disconnected"
                ? "cursor-pointer hover:scale-105 active:scale-95"
                : "cursor-not-allowed"
            }`}
            style={{
              boxShadow: "rgba(255, 255, 255, 0.8) 0 -10px 30px inset",
            }}
          >
            <PiFlowerLotusDuotone className="text-white text-4xl" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AgentVisualizer() {
  const { state: agentState, videoTrack, audioTrack } = useVoiceAssistant();

  if (videoTrack) {
    return (
      <div className="h-[512px] w-[512px] rounded-lg overflow-hidden">
        <VideoTrack trackRef={videoTrack} />
      </div>
    );
  }
  return (
    <div className="h-[300px] w-full">
      <BarVisualizer
        state={agentState}
        barCount={5}
        trackRef={audioTrack}
        className="agent-visualizer"
        options={{ minHeight: 24 }}
      />
    </div>
  );
}

function ControlBar(props: { onConnectButtonClicked: () => void }) {
  const { state: agentState } = useVoiceAssistant();

  return (
    <div className="relative h-[60px]">
      <AnimatePresence>
        {agentState === "disconnected" && (
          <motion.button
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, top: "-10px" }}
            transition={{ duration: 1, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="uppercase absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black rounded-md"
            onClick={() => props.onConnectButtonClicked()}
          >
            Start a conversation
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {agentState !== "disconnected" && agentState !== "connecting" && (
          <motion.div
            initial={{ opacity: 0, top: "10px" }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: "-10px" }}
            transition={{ duration: 0.4, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="flex h-8 absolute left-1/2 -translate-x-1/2  justify-center"
          >
            <VoiceAssistantControlBar controls={{ leave: false }} />
            <DisconnectButton>
              <CloseIcon />
            </DisconnectButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function onDeviceFailure(error: Error) {
  console.error(error);
  alert(
    "Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab"
  );
}
