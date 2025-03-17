export * from "./use-modal";
export * from "./ModalConfirm";

export { default as Modal } from "./ModalConfirm";

export type ModalType = {
  title: string;
  children: React.ReactNode;
};
