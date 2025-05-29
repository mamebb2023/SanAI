import type { AgentState } from "@livekit/components-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface NoAgentNotificationProps extends React.PropsWithChildren<object> {
  state: AgentState;
}

/**
 * Renders some user info when no agent connects to the room after a certain time.
 */
export function NoAgentNotification(props: NoAgentNotificationProps) {
  const timeToWaitMs = 10_000;
  const timeoutRef = useRef<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const agentHasConnected = useRef(false);

  // If the agent has connected, we don't need to show the notification.
  if (
    ["listening", "thinking", "speaking"].includes(props.state) &&
    agentHasConnected.current == false
  ) {
    agentHasConnected.current = true;
  }

  useEffect(() => {
    if (props.state === "connecting") {
      timeoutRef.current = window.setTimeout(() => {
        if (
          props.state === "connecting" &&
          agentHasConnected.current === false
        ) {
          setShowNotification(true);
        }
      }, timeToWaitMs);
    } else {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      setShowNotification(false);
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [props.state]);

  useEffect(() => {
    if (showNotification) {
      toast.error(
        "It's quiet... too quiet. Is your agent lost? Ensure your agent is properly configured and running on your machine.",
        {
          duration: 10_000,
          position: "top-center",
          style: {
            maxWidth: "90vw",
            width: "fit-content",
          },
        }
      );
    }
  }, [showNotification]);

  return null;
}
