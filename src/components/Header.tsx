import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Header() {
  return (
    <AppBar color="secondary" position="static">
      <Toolbar>
        <Typography variant="h6">Lugares que quero conhecer</Typography>
      </Toolbar>
    </AppBar>
  );
}
