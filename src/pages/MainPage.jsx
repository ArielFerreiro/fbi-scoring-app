import { Box, Container, Grid } from '@mui/material';
import { AppMenu, Scorer, RoundCounter, Totals, ScoreGrid } from '../components';
import { useScore } from '../hooks';

export const MainPage = () => {

    const {impacts, points, testImpacts, testPoints, scores, onAddRound} = useScore();

    return (
        <>
            <AppMenu />

            <Container>
                <RoundCounter scores={ scores }/>
                <Scorer setRoundScores={ (round) => {onAddRound(round);} } />`


                <Box display="flex">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={6}>
                            <Totals impacts={ impacts } points={ points } />
                        </Grid>
                        <Grid item xs={6}>
                            <Totals impacts={ testImpacts } points={ testPoints }  isTrial={true} />
                        </Grid>
                    </Grid>
                </Box>

                <ScoreGrid />
            </Container>


        </>
    )
}