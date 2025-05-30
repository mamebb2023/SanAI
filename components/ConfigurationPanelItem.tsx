import { ReactNode } from "react";
import { PlaygroundDeviceSelector } from "@/components/playground/PlaygroundDeviceSelector";
import { TrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";

type ConfigurationPanelItemProps = {
  title: string;
  children?: ReactNode;
  source?: Track.Source;
};

export const ConfigurationPanelItem: React.FC<ConfigurationPanelItemProps> = ({
  children,
  title,
  source,
}) => {
  return (
    <div className="size-full text-gray-300 relative">
      <div className="absolute top-0 left-0 text-xs text-gray-500 leading-normal size-full">
        {children}
      </div>
      <div className="absolute p-1 w-full flex flex-row justify-between items-center text-xs uppercase tracking-wider">
        {source && (
          <span className="flex w-full flex-row gap-2 justify-between items-center p-1 bg-gray-900/50 rounded-md">
            <h3>{title}</h3>
            <TrackToggle
              className="border border-white/30 rounded-sm hover:bg-white/20 p-1 transition-all"
              source={source as any}
            />
            {source === Track.Source.Camera && (
              <PlaygroundDeviceSelector kind="videoinput" />
            )}
            {source === Track.Source.Microphone && (
              <PlaygroundDeviceSelector kind="audioinput" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};
