import { Box, Paper, Stack } from "@mui/material"
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 60,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export const Totals = ({ impacts, points, isTrial = false }) => {
    
    return (

            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                <DemoPaper variant="elevation" sx={{ backgroundColor: isTrial ? "#F1F8E9" : "#fff" }}>Impactos: <b>{impacts}</b></DemoPaper>
                <DemoPaper variant="elevation" sx={{ backgroundColor: isTrial ? "#F1F8E9" : "#fff" }}> Puntos: <b>{points}</b></DemoPaper>
            </Stack>
    )
}

