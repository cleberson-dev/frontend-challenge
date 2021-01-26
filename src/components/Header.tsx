import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../img/logo.png";
import styled from 'styled-components';

const Logo = styled.img`
  height: 75px;

  @media(max-width: 741px) {
    height: 60px;
  }
`;

export default function Header() {
  return (
    <AppBar color="transparent" position="static">
      <Toolbar style={{ background: 'black' }}>
        <Logo src={logo} alt="Logotipo" />
        <Typography sx={{ display: 'none' }} variant="h6">Lugares que quero conhecer</Typography>
      </Toolbar>
    </AppBar>
  );
}
