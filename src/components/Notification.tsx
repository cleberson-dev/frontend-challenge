import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/core/Alert";
import { AppState } from "../store";
import {
  NotificationState,
  closeNotification,
} from "../slices/notificationSlice";

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector<AppState, NotificationState>(
    (state) => state.notification
  );

  return (
    <Snackbar
      open={notification.open}
      onClose={() => dispatch(closeNotification())}
      autoHideDuration={6000}
    >
      <Alert
        severity={notification.type}
        elevation={6}
        onClose={() => dispatch(closeNotification())}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
