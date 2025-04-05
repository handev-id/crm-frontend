import store from './store'
import { ConfirmState, openConfirm } from './store/slices/confirm';

export function confirmAlert(options: ConfirmState) {
    store.dispatch(openConfirm({ ...options }));
  }