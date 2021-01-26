import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../img/logo.png";

export default function Header() {
  return (
    <AppBar color="transparent" position="static">
      <Toolbar style={{ background: 'black' }}>
        <img src={logo} alt="Logotipo" height="75px" />
        <Typography sx={{ display: 'none' }} variant="h6">Lugares que quero conhecer</Typography>
      </Toolbar>
    </AppBar>
  );
}
