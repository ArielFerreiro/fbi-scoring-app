import { createSlice } from '@reduxjs/toolkit';
import { calculateImpacts, calculatePoints } from '../../helpers';


export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        testImpacts: 0,
        testPoints: 0,
        impacts: 0,
        points: 0,
        efficiency: 0,
        scores: []
    },
    reducers: {

        addScore: (state, { payload }) => {
            state.scores.push(payload);
            const impactos = payload.filter( (e) => e > 0);

            if (state.scores.length === 1) {
                state.testImpacts = impactos.length;
                state.testPoints = payload.reduce(calculatePoints);
            } else {
                state.points += payload.reduce(calculatePoints);
                state.impacts += impactos.length;   
                //Efficiency
                const total = (state.scores.length - 1) * 25;
                state.efficiency = Math.round(state.points * 100 / total);
            }

        },
        reset: (state, /* action */ ) => {
            state.scores = [];
            state.points = 0;
            state.impacts = 0;
            state.testImpacts = 0;
            state.testPoints = 0;
        },
    }
});

export const { addScore, reset } = scoreSlice.actions;