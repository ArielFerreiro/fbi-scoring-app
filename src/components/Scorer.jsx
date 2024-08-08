import { useState } from 'react';

import { Box, Button, Grid, Tooltip } from '@mui/material';
import AllOutIcon from '@mui/icons-material/AllOut';

import { ScoreButton } from './';


export const Scorer = ({ setRoundScores = () => {} }) => {

    const [annotations, setAnnotations] = useState([]);

    const addScore = (score) => {
        if (annotations.length === 4) {
            const final = [...annotations, score];
            setRoundScores(final);
            setAnnotations( (a) => [] );
        } else {
            setAnnotations( (a) => [...a, score] );
        }
    }

    const addNoScores = () => {
        setRoundScores([0,0,0,0,0]);
    }

    return (

            <Box  gap={4} p={2} display="flex"  
                sx={{  bgcolor: '#cfe8fc', 
                        height: '100', 
                        width:'90%', 
                        border: '2px solid primary',       
                        borderRadius: 1, 
                        mt: 2}}>

                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <ScoreButton value={5} onClick={addScore}/>
                    </Grid>
                    <Grid item xs={2}>
                        <ScoreButton value={4} onClick={addScore}/>
                    </Grid>
                    <Grid item xs={2}>
                        <ScoreButton value={3} onClick={addScore}/>
                    </Grid>
                    <Grid item xs={2}>
                        <ScoreButton value={2} onClick={addScore}/>
                    </Grid>
                    <Grid item xs={2}>
                        <ScoreButton value={0} onClick={addScore}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Tooltip title="Sin impactos presentes">
                            <Button aria-label="no-impact" variant="outlined" onClick={ addNoScores } disabled={ annotations.length === 0 ? false : true }>
                                <AllOutIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        
    )
}
