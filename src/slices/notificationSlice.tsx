import { createSlice } from "@reduxjs/toolkit";

export type NotificationState = {
  open: boolean;
  type?: "success" | "info" | "warning" | "error";
  message: string;
};

const initialState: NotificationState = {
  open: false,
  type: "info",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notify: (_, { payload }) => ({
      open: true,
      type: payload.type,
      message: payload.message,
    }),
    closeNotification: (state) => ({ ...state, open: false }),
    changeType: (state, { payload: newType }) => ({ ...state, type: newType }),
    changeMessage: (state, { payload: newMessage }) => ({
      ...state,
      message: newMessage,
    }),
  },
});

export const {
  notify, closeNotification,
  changeType, changeMessage
} = notificationSlice.actions;
export default notificationSlice.reducer;
