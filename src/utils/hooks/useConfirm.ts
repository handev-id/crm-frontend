import { useDispatch } from "react-redux";
import { ConfirmState, openConfirm } from "../store/slices/confirm";

export function useConfirm() {
  const dispatch = useDispatch();

  return (options: ConfirmState) => dispatch(openConfirm({ ...options }));
}