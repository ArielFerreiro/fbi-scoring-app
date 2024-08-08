import {AppBar, Avatar, Box, Button, Toolbar, Tooltip, Typography} from '@mui/material';
import { useScore } from '../hooks';

export const AppMenu = () => {

  const { onReset } = useScore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Tooltip title="Tiro Federal La Plata - FBI">
                <Avatar alt="Logo TFLP" src='./public/img/logo.png' />
            </Tooltip>
          <Typography variant="h6" component="div" sx={{ ml: 2, flexGrow: 1 }}>
            Puntuador FBI
          </Typography>
          <Button color="inherit" onClick={onReset}>Reiniciar</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
