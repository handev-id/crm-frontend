import { Buffer } from "buffer";

export const delay = (ms: number, callback: () => void) => {
  return setTimeout(callback, ms);
};

export const convertFileToBuffer = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
};
