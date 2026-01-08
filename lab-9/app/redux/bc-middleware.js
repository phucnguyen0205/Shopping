import { applyThemeFromBroadcast } from "./theme-slice";
import { applyUserFromBroadcast } from "./user-slice";

const channel = new BroadcastChannel("global-sync");

export const bcMiddleware = (store) => {
  channel.onmessage = (event) => {
    const { theme, user } = event.data;

    if (theme) {
      const current = store.getState().theme.theme;
      if (theme !== current) {
        store.dispatch(applyThemeFromBroadcast(theme));
      }
    }
    if (user) {
      const currentToken = store.getState().user.token;
      if (user.token !== currentToken) {
        store.dispatch(applyUserFromBroadcast(user));
      }
    }
  };

  return (next) => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    if (
      prevState.theme.theme !== nextState.theme.theme &&
      !nextState.theme.isFromBroadcast
    ) {
      channel.postMessage({ theme: nextState.theme.theme });
    }
    if (
      prevState.user.token !== nextState.user.token &&
      !nextState.user.isFromBroadcast
    ) {
      channel.postMessage({
        user: {
          token: nextState.user.token,
          refreshToken: nextState.user.refreshToken,
          user: nextState.user.user,
        },
      });
    }

    return result;
  };
};
