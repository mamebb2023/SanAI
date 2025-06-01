"use client";

import { GoHomeFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { RiVoiceprintLine } from "react-icons/ri";
import TranscriptionView from "@/components/TranscriptionView";
import {
  BarVisualizer,
  DisconnectButton,
  RoomAudioRenderer,
  RoomContext,
  VideoTrack,
  useConnectionState,
  useLocalParticipant,
  useRoomInfo,
  useTracks,
  useVoiceAssistant,
} from "@livekit/components-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LocalParticipant,
  Track,
  Room,
  RoomEvent,
  ConnectionState,
} from "livekit-client";
import { useCallback, useEffect, useState } from "react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { PiFlowerLotus, PiFlowerLotusDuotone } from "react-icons/pi";
import ConnectButtonDecore from "@/components/decorations/ConnectButtonDecore";
import toast from "react-hot-toast";
import { FaInfoCircle, FaVideo } from "react-icons/fa";
import DashboardDecore from "@/components/decorations/DashboardDecore";
import { ConfigurationPanelItem } from "@/components/ConfigurationPanelItem";
import { LoadingSVG } from "@/components/shared/LoadingSVG";
import { ConnectionDetails } from "@/app/api/connection-details/route";

export default function Page() {
  const [room] = useState(new Room());
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(
    null
  );
  const [sessionRemaining, setSessionRemaining] = useState<number | null>(null);

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

    if (response.status === 403) {
      if ((connectionDetailsData as any)?.remaining) {
        setCooldownRemaining(
          Math.floor((connectionDetailsData as any).remaining / 1000)
        );
      }
      toast.error("You're have used your session. Please wait.");
      return;
    }

    toast.promise(
      () =>
        room.connect(
          connectionDetailsData.serverUrl,
          connectionDetailsData.participantToken
        ),
      {
        loading: "Connecting...",
        success: () => {
          setSessionRemaining(120); // 2 minutes = 120 seconds
          return "Connected!";
        },
        error: "Error Connecting To AI.",
      }
    );

    toast.promise(() => room.localParticipant.setMicrophoneEnabled(true), {
      loading: "Enabling microphone...",
      success: "Microphone enabled!",
      error: "Error enabling microphone.",
    });

    toast.promise(() => room.localParticipant.setCameraEnabled(true), {
      loading: "Enabling camera...",
      success: "Camera enabled!",
      error: "Error enabling camera.",
    });
  }, [room]);

  useEffect(() => {
    if (sessionRemaining === null) return;

    const interval = setInterval(() => {
      setSessionRemaining((prev) => {
        if (!prev || prev <= 1) {
          clearInterval(interval);
          // Optional: handle session end (auto disconnect, UI update, etc.)
          if (prev === 0) {
            toast.error("Session has ended. Disconnecting...");
            room.disconnect();
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionRemaining]);

  useEffect(() => {
    room.on(RoomEvent.MediaDevicesError, onDeviceFailure);

    return () => {
      room.off(RoomEvent.MediaDevicesError, onDeviceFailure);
    };
  }, [room]);

  useEffect(() => {
    if (cooldownRemaining === null) return;

    const interval = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          // Optional: handle cooldown end (UI update, etc.)
          if (prev === 0) {
            toast.success("You can now reconnect.");
            setCooldownRemaining(null); // Reset cooldown
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  useEffect(() => {}, [sessionRemaining]);

  return (
    <RoomContext.Provider value={room}>
      <div className="relative h-screen flex">
        <DashboardDecore />

        <div className="bg-white/20 backdrop-blur-sm w-[60px] h-full flex flex-col justify-between items-center py-4">
          <Logo />
          <div className="text-xl">
            <Link
              href="/"
              className="flex-center p-2 border border-transparent hover:border-white/30 rounded-xl text-xl transition-all"
            >
              <GoHomeFill />
            </Link>
          </div>
        </div>

        <div className="flex-1 flex gap-2 p-2 relative">
          <LeftSection />
          <MiddleSection
            onConnectButtonClicked={onConnectButtonClicked}
            cooldownRemaining={cooldownRemaining}
            sessionRemaining={sessionRemaining}
            setSessionRemaining={setSessionRemaining}
          />
          <RightSection />
        </div>
      </div>
    </RoomContext.Provider>
  );
}

function MiddleSection(props: {
  onConnectButtonClicked: () => void;
  cooldownRemaining: number | null;
  sessionRemaining: number | null;
  setSessionRemaining: (value: number | null) => void;
}) {
  const { state: agentState } = useVoiceAssistant();
  const voiceAssistant = useVoiceAssistant();

  return (
    <div className="relative flex-1 flex-center">
      <ConnectButtonDecore />

      <AnimatePresence>
        {agentState !== "disconnected" ? (
          <motion.div
            key="connected"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className={`absolute size-28 rounded-full bg-white blur-2xl ${
              agentState === "connecting" ? "animate-pulse" : ""
            }`}
          >
            <RoomAudioRenderer />
          </motion.div>
        ) : (
          <div className="absolute top-2">
            {props.cooldownRemaining !== null ? (
              <div className="text-center text-red-100 font-semibold mb-2">
                Please wait {Math.floor(props.cooldownRemaining / 60)}:
                {String(props.cooldownRemaining % 60).padStart(2, "0")} minutes
                before reconnecting.
              </div>
            ) : props.sessionRemaining !== null ? (
              <div className="text-center text-green-100 font-semibold mb-2">
                Session ends in {Math.floor(props.sessionRemaining / 60)}:
                {String(props.sessionRemaining % 60).padStart(2, "0")} minutes
              </div>
            ) : (
              <Tip />
            )}
          </div>
        )}
      </AnimatePresence>

      {agentState !== "disconnected" && (
        <div className="absolute h-48 w-full">
          <BarVisualizer
            state={voiceAssistant.state}
            barCount={7}
            trackRef={voiceAssistant.audioTrack}
            options={{ minHeight: 0 }}
          >
            <div className="size-20 rounded-full bg-white/50" />
          </BarVisualizer>
        </div>
      )}

      {/* connect button */}
      <motion.div
        key="disconnected"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <button
          className={`relative flex-center size-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full transition-all ${
            agentState === "disconnected"
              ? "cursor-pointer hover:scale-105 active:scale-95"
              : "cursor-not-allowed"
          }`}
          style={{
            boxShadow: "rgba(255, 255, 255, 0.8) 0 -10px 15px inset",
          }}
          disabled={agentState !== "disconnected"}
          aria-label="Connect to voice assistant"
          onClick={() => {
            if (agentState === "disconnected") {
              props.onConnectButtonClicked();
            }
          }}
        >
          <PiFlowerLotusDuotone className="text-white text-4xl" />
        </button>
      </motion.div>

      {/* disconnect button */}
      <AnimatePresence>
        {agentState !== "disconnected" && (
          <DisconnectButton>
            <div onClick={() => props.setSessionRemaining(null)}>
              <motion.div
                key="disconnected"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 size-14 rounded-full shadow  border border-red-400 flex-center text-3xl text-red-400 hover:text-white font-bold hover:bg-red-500 transition-all cursor-pointer"
              >
                <IoClose />
              </motion.div>
            </div>
          </DisconnectButton>
        )}
      </AnimatePresence>
    </div>
  );
}

function LeftSection() {
  return (
    <div className="hidden relative w-[90%] md:w-[27%] bg-white/10 backdrop-blur-sm rounded-xl p-4 md:flex flex-wrap gap-2 flex-col">
      <p>Text Visualization</p>
      <div className="flex-1 bg-white/5 rounded-md p-2 overflow-y-auto items-end">
        <TranscriptionView />
      </div>
    </div>
  );
}

function RightSection() {
  const tracks = useTracks();
  const { name } = useRoomInfo();
  const { localParticipant } = useLocalParticipant();
  const roomState = useConnectionState();
  const voiceAssistant = useVoiceAssistant();

  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  );
  const localCameraTrack = localTracks.find(
    ({ source }) => source === Track.Source.Camera
  );
  // const localScreenTrack = localTracks.find(
  //   ({ source }) => source === Track.Source.ScreenShare
  // );
  const localMicTrack = localTracks.find(
    ({ source }) => source === Track.Source.Microphone
  );

  return (
    <div className="hidden relative w-[90%] md:w-[27%] bg-white/10 backdrop-blur-sm rounded-xl p-4 md:flex flex-col gap-2">
      {/* video track */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative h-[200px] rounded-lg border border-white/50 overflow-hidden"
      >
        {localCameraTrack ? (
          <ConfigurationPanelItem title="Camera" source={Track.Source.Camera}>
            <div className="relative w-full">
              <VideoTrack
                className="rounded-sm w-full"
                trackRef={localCameraTrack}
              />
            </div>
          </ConfigurationPanelItem>
        ) : (
          <div className="size-full bg-white/10 flex-center flex-col text-white/50">
            <FaVideo className="text-4xl" />
          </div>
        )}
      </motion.div>

      {/* sound track */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative h-[200px] rounded-lg border border-white/50 overflow-hidden"
      >
        {localMicTrack ? (
          <ConfigurationPanelItem
            title="Microphone"
            source={Track.Source.Microphone}
          >
            <div
              className={`flex size-full flex-row gap-2 items-center justify-center border rounded-sm`}
            >
              <BarVisualizer
                trackRef={localMicTrack}
                className="size-full flex-center gap-1"
                barCount={20}
                options={{ minHeight: 0 }}
              >
                <div className="size-1 rounded-full bg-white/50" />
              </BarVisualizer>
            </div>
          </ConfigurationPanelItem>
        ) : (
          <div className="size-full bg-white/10 flex-center flex-col text-white/50">
            <RiVoiceprintLine className="text-4xl" />
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative flex-1 rounded-lg border border-white/50 overflow-hidden"
      >
        <p className="text-sm p-2">
          <span className="text-gray-500">Room State: </span>
          {roomState === ConnectionState.Connecting ? (
            <LoadingSVG diameter={16} strokeWidth={2} />
          ) : (
            roomState.toUpperCase()
          )}
        </p>
        <p className="text-sm p-2">
          <span className="text-gray-500">Agent connected: </span>
          {voiceAssistant.agent ? (
            "TRUE"
          ) : roomState === ConnectionState.Connected ? (
            <LoadingSVG diameter={12} strokeWidth={2} />
          ) : (
            "FALSE"
          )}
        </p>
        <p className="text-sm p-2">
          <span className="text-gray-500">Room Name:</span> {name}
        </p>
        <p className="text-sm p-2">
          <span className="text-gray-500">Participant Name: </span>
          {localParticipant.name}
        </p>
        <p className="text-sm p-2">
          <span className="text-gray-500">Participant ID: </span>
          {localParticipant?.identity}
        </p>

        <p className="text-sm p-2">
          <span className="text-gray-500">Connected At: </span>
          {roomState === ConnectionState.Connected &&
            new Date().toLocaleTimeString()}
        </p>
      </motion.div>
    </div>
  );
}

function Tip() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 100 }}
        className="flex items-center gap-1 text-sm text-white/50"
      >
        <span>
          <FaInfoCircle />
        </span>
        <p>Click the</p>
        <span>
          <PiFlowerLotus className="text-lg" />
        </span>
        <p>icon to connect to Dr. San</p>
      </motion.div>
    </AnimatePresence>
  );
}

function onDeviceFailure(error: Error) {
  console.error(error);
  toast.error("Error acquiring camera or microphone permissions.");
}
