export type DrawerSize = { type: "increase" | "decrease"; value: number };

export type DrawerType = {
  size: DrawerSize;
  isOpen: boolean;
  isOpenDetail: boolean;
  width: number;
  isMobile: boolean;
  loading: boolean;
};
