import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  open?: boolean;
}

function CardLoading(props: Props) {
  if (!props.open) return null;

  return (
    <Box
      sx={{
        bgcolor: "rgba(0, 0, 0, .4)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default CardLoading;