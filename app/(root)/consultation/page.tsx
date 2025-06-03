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
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { PiFlowerLotus, PiFlowerLotusDuotone } from "react-icons/pi";
import ConnectButtonDecore from "@/components/decorations/ConnectButtonDecore";
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

import { BsExclamationCircleFill } from "react-icons/bs";
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
      return;
    }

    toast.promise(
      () =>
        room.connect(
          connectionDetailsData.serverUrl,
          connectionDetailsData.participantToken
        ),
      {
        loading: <p className="text-xs">Connecting...</p>,
        success: () => {
          setSessionRemaining(60);
          return <p className="text-xs">Connected!</p>;
        },
        error: <p className="text-xs">Error Connecting To AI.</p>,
      }
    );

    toast.promise(() => room.localParticipant.setMicrophoneEnabled(true), {
      loading: <p className="text-xs">Enabling microphone...</p>,
      success: <p className="text-xs">Microphone enabled!</p>,
      error: <p className="text-xs">Error enabling microphone.</p>,
    });
  }, [room]);

  useEffect(() => {
    if (sessionRemaining === null) return;

    const interval = setInterval(() => {
      setSessionRemaining((prev) => {
        if (prev === null) return null;

        const next = prev - 1;

        if (next <= 0) {
          toast.error("Session has ended. Disconnecting...");
          room.disconnect();
          clearInterval(interval);
          return null;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionRemaining, room]);

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
        if (prev === null) return null;

        const next = prev - 1;

        if (next <= 0) {
          toast.success("You can now reconnect.");
          clearInterval(interval);
          return null;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  return (
    <RoomContext.Provider value={room}>
      <div className="relative h-screen flex">
        <DashboardDecore />

        <div className="bg-white/20 backdrop-blur-sm w-[60px] h-full flex flex-col gap-2 items-center py-4">
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

        <div className="flex-1 flex flex-col md:flex-row gap-2 p-2 relative">
          <LeftSection />
          <MiddleSection
            onConnectButtonClicked={onConnectButtonClicked}
            cooldownRemaining={cooldownRemaining}
            sessionRemaining={sessionRemaining}
            setSessionRemaining={setSessionRemaining}
          />
          <RightSection room={room} />
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
  const [mainBtnLoading, setMainBtnLoading] = useState(false);

  return (
    <div className="relative flex-1 flex-center">
      <ConnectButtonDecore />

      {agentState !== "disconnected" && (
        <motion.div
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className={`absolute size-28 rounded-full bg-white blur-2xl  ${
            agentState === "connecting" ? "animate-pulse" : ""
          }`}
        >
          <RoomAudioRenderer />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="absolute top-2 text-sm"
      >
        {props.cooldownRemaining !== null ? (
          <div className="text-center p-2 rounded-xl bg-red-100 text-red-900 font-semibold mb-2 flex items-center gap-2">
            <BsExclamationCircleFill />
            <p>
              Please wait {Math.floor(props.cooldownRemaining / 60)}:
              {String(props.cooldownRemaining % 60).padStart(2, "0")} minutes
              before another session...
            </p>
          </div>
        ) : props.sessionRemaining !== null ? (
          <div className="text-center p-2 rounded-xl bg-green-100 text-green-900 font-semibold mb-2 flex items-center gap-2">
            <FaInfoCircle />
            <p>
              Session ends in {Math.floor(props.sessionRemaining / 60)}:
              {String(props.sessionRemaining % 60).padStart(2, "0")} minutes
            </p>
          </div>
        ) : (
          <Tip />
        )}
      </motion.div>

      <div className="absolute h-48 w-full flex-center">
        <BarVisualizer
          state={voiceAssistant.state}
          barCount={10}
          trackRef={voiceAssistant.audioTrack}
          options={{ minHeight: 30, maxHeight: 80 }}
          className="size-full flex-center flex-wrap gap-1"
        >
          <div className="size-10 rounded-full bg-white/10" />
        </BarVisualizer>
      </div>

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
            setMainBtnLoading(true);
          }}
        >
          <PiFlowerLotusDuotone className="text-white text-4xl" />
          <div className="absolute opacity-50">
            {agentState === "connecting" && mainBtnLoading && (
              <LoadingSVG diameter={32} strokeWidth={1} />
            )}
          </div>
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
    <div className="hidden relative w-[90%] md:w-[27%] bg-white/10 rounded-xl p-4 md:flex flex-wrap gap-2 flex-col">
      <p>Live Chat Visualization</p>
      <div className="flex-1 bg-white/5 rounded-md p-2 overflow-y-auto items-end backdrop-blur-sm">
        <TranscriptionView />
      </div>
    </div>
  );
}

function RightSection(props: { room: Room }) {
  const tracks = useTracks();
  const { name } = useRoomInfo();
  const { localParticipant } = useLocalParticipant();
  const roomState = useConnectionState();
  const voiceAssistant = useVoiceAssistant();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  );
  const localMicTrack = localTracks.find(
    ({ source }) => source === Track.Source.Microphone
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !props.room?.localParticipant || imageUploaded) return;

    try {
      const info = await props.room.localParticipant.sendFile(file, {
        mimeType: file.type,
        topic: "images",
      });
      console.log(`Sent file with stream ID: ${info.id}`);
      setImageUploaded(true);
    } catch (err) {
      console.error("Error sending file:", err);
    } finally {
      toast.success("Image uploaded successfully!");
    }
  };

  return (
    <div className="relative w-[90%] md:w-[27%] bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col gap-2">
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
        className={`relative h-[150px] rounded-lg border-2 border-dashed border-white/50 transition-colors duration-200 overflow-hidden flex flex-col items-center justify-center bg-white/10 text-white p-4 ${
          imageUploaded ||
          props.room.state === "disconnected" ||
          props.room.state === "connecting"
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-gray-500"
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <label
            htmlFor="file-upload"
            className={`${
              imageUploaded ||
              props.room.state === "disconnected" ||
              props.room.state === "connecting"
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-white/20 hover:text-white"
            }  flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 group`}
          >
            <FiUploadCloud className="text-3xl text-gray-400 group-hover:text-white transition-colors duration-200 mb-2" />
            <span className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-200">
              Upload an Image for The AI to Analyze
            </span>
            <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-200 mt-1">
              (PNG, JPG up to 2MB)
            </span>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/jpg,image/png"
              className="hidden"
              disabled={
                imageUploaded ||
                props.room.state === "disconnected" ||
                props.room.state === "connecting"
              }
              onChange={handleFileChange}
            />
          </label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative flex-1 rounded-lg p-2 border border-blue-900 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 overflow-hidden"
      >
        Details:
        {roomState === ConnectionState.Connected ? (
          <>
            <p className="text-sm p-2 flex gap-2 items-center">
              <span className="text-gray-500">Room State: </span>
              {roomState.toUpperCase()}
            </p>
            <p className="text-sm p-2 flex gap-2 items-center">
              <span className="text-gray-500">Doctor AI connected: </span>
              {voiceAssistant.agent ? (
                "TRUE"
              ) : roomState === ConnectionState.Connected ? (
                <LoadingSVG diameter={12} strokeWidth={2} />
              ) : (
                "FALSE"
              )}
            </p>
            <p className="text-sm p-2 flex gap-2 items-center">
              <span className="text-gray-500">Room Name:</span>{" "}
              {roomState === ConnectionState.Connected ? (
                <LoadingSVG diameter={12} strokeWidth={2} />
              ) : (
                name
              )}
            </p>
            <p className="text-sm p-2 flex gap-2 items-center">
              <span className="text-gray-500">Participant Name: </span>
              {localParticipant.name}
            </p>
            <p className="text-sm p-2 flex gap-2 items-center">
              <span className="text-gray-500">Connected At: </span>
              {roomState === ConnectionState.Connected &&
                new Date().toLocaleTimeString()}
            </p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-center flex-col gap-2 h-full text-gray-500"
          >
            <FaInfoCircle />
            <p className="max-w-[150px] text-center">
              Talk to Dr. San to connect to a room.
            </p>
          </motion.div>
        )}
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
