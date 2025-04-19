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
    if (audioRef.current && isReady) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn("Playback failed:", err);
      });
    }
  };

  return { play, isReady };
};

export default useAudio;
