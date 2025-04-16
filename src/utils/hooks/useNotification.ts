import { useEffect, useRef } from "react";
import audioNotif from "../../assets/audio/notification.wav";
import logo from "../../assets/images/logo.png";

export const useNotification = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const init = async () => {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      const res = await fetch(audioNotif);
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      bufferRef.current = audioBuffer;
    };

    init();
  }, []);

  const notify = (title: string, options: NotificationOptions) => {
    if (Notification.permission === "granted") {
      new Notification(title, { ...options, icon: logo });

      if (audioCtxRef.current && bufferRef.current) {
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = bufferRef.current;
        source.connect(audioCtxRef.current.destination);
        source.start();
      }
    }
  };

  return { notify };
};
