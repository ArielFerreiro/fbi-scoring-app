import { createSlice } from '@reduxjs/toolkit';
import { calculatePoints } from '../../helpers';


export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        testImpacts: localStorage.getItem('testImpacts') || 0,
        testPoints: localStorage.getItem('testPoints') || 0,
        impacts: localStorage.getItem('impacts') || 0,
        points: localStorage.getItem('points') || 0,
        efficiency: localStorage.getItem('efficiency') || 0,
        scores: JSON.parse(localStorage.getItem('scores')) || []
    },
    reducers: {

        addScore: (state, { payload }) => {
            state.scores.push(payload);
            const impactos = payload.filter( (e) => e > 0).length;
            const points = payload.reduce(calculatePoints);

            if (state.scores.length === 1) {
                state.testImpacts = impactos;
                state.testPoints = points;
                localStorage.setItem('testImpacts', impactos);
                localStorage.setItem('testPoints', points);
            } else {
                state.points += points;
                state.impacts += impactos;   
                //Efficiency
                const total = (state.scores.length - 1) * 25;
                state.efficiency = Math.round(state.points * 100 / total);
                localStorage.setItem('impacts', state.impacts);
                localStorage.setItem('points', state.points);
                localStorage.setItem('efficiency', state.efficiency) ;
            }
            console.log('pushing', state.scores);
            localStorage.setItem('scores', JSON.stringify(state.scores));

        },
        reset: (state, /* action */ ) => {
            state.scores = [];
            localStorage.setItem('scores', JSON.stringify([]));
            state.points = 0;
            state.impacts = 0;
            state.efficiency = 0;
            state.testImpacts = 0;
            state.testPoints = 0;
            localStorage.setItem('impacts', 0);
            localStorage.setItem('points', 0);
            localStorage.setItem('efficiency', 0) ;
            localStorage.setItem('testImpacts', 0);
            localStorage.setItem('testPoints', 0);
        },
    }
});

export const { addScore, reset } = scoreSlice.actions;