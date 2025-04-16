import { useEffect, useRef } from "react";

export const useAudio = (src: string) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const init = async () => {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      const res = await fetch(src);
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      bufferRef.current = audioBuffer;
    };

    init();
  }, [src]);

  const play = () => {
    if (!audioCtxRef.current || !bufferRef.current) return;

    const source = audioCtxRef.current.createBufferSource();
    source.buffer = bufferRef.current;
    source.connect(audioCtxRef.current.destination);
    source.start();
  };

  return { play };
};
