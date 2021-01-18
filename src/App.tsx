import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Lugares
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        Olá, mundo!
      </Container>
    </div>
  );
}

export default App;
