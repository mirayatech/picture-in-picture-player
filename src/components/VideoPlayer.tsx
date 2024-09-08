import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaFullscreenButton,
} from "media-chrome/dist/react";
import { useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

export function VideoPlayer() {
  const [pipIsForceClosed, setPipIsForceClosed] = useState(false);
  const mediaControllerRef = useRef<HTMLElement>(null);
  const { ref, inView, entry } = useInView({
    threshold: [0, 0.9, 1],
  });

  const isFloating = useMemo(() => {
    const isIntersecting = entry?.isIntersecting;
    const intersectionRatio = entry?.intersectionRatio || 0;

    if (isIntersecting && intersectionRatio >= 0.9) {
      setPipIsForceClosed(false);
      return false;
    }

    if (pipIsForceClosed) {
      return false;
    }

    if (mediaControllerRef.current?.hasAttribute("mediapaused")) {
      return false;
    }

    return true;
  }, [inView, entry, pipIsForceClosed]);

  const closePip = () => {
    setPipIsForceClosed(true);
    mediaControllerRef.current?.querySelector("video")?.pause();
  };

  return (
    <div
      ref={ref}
      className="relative flex aspect-video rounded-xl bg-slate-200"
    >
      <MediaController
        ref={mediaControllerRef}
        className={twMerge(
          "z-10 aspect-video w-full overflow-clip rounded-xl",
          isFloating
            ? "animate-videoSticky is-floating fixed bottom-6 right-6 w-[300px]"
            : "animate-videoInline relative"
        )}
      >
        <button
          onClick={closePip}
          className="absolute right-2 top-2 hidden h-8 w-8 rounded-md bg-black bg-opacity-50 hover:bg-opacity-90 transition-all px-2 [.is-floating_&]:flex [.is-floating_&]:items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close picture in picture</span>
        </button>
        <video slot="media" src="/video.webm" />
        <MediaControlBar>
          <MediaPlayButton />
          <MediaTimeRange />
          <MediaTimeDisplay />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
}
