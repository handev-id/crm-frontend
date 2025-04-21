import { useEffect, useRef, useState } from "react";

const useAudio = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "auto";

    const handleCanPlay = () => {
      setIsReady(true);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, [src]);

  const play = () => {
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Playback failed:", err);
        });
      }
    };

    if (isReady) {
      tryPlay();
    } else {
      // Optional: auto-play when ready
      const interval = setInterval(() => {
        if (isReady) {
          tryPlay();
          clearInterval(interval);
        }
      }, 100); // check setiap 100ms
    }
  };

  return { play, isReady };
};

export default useAudio;
