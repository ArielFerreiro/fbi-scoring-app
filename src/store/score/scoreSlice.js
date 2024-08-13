import { createSlice } from '@reduxjs/toolkit';
import { calculatePoints, compareNumbers } from '../../helpers';

//const scoreModel = {
//    'scores': [0,0,0,0,0],
//    'fail': false,
//    'retries': 1
//}

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        testImpacts: parseInt(localStorage.getItem('testImpacts')) || 0,
        testPoints: parseInt(localStorage.getItem('testPoints')) || 0,
        impacts: parseInt(localStorage.getItem('impacts')) || 0,
        points: parseInt(localStorage.getItem('points')) || 0,
        efficiency: parseInt(localStorage.getItem('efficiency')) || 0,
        scores: JSON.parse(localStorage.getItem('scores')) || []
    },
    reducers: {

        addScore: (state, { payload }) => {
            //console.log('PAYLOAD::', payload);
            state.scores.push(payload);
            localStorage.setItem('scores', JSON.stringify(state.scores));

            const payloadScores = payload.scores;
            const payLoadRetries = payload.retries;

            if (payLoadRetries !== 0) {
                const retryingScore = state.scores[payLoadRetries].scores;
                const oldImpacts = retryingScore.filter( (e) => e > 0).length * -1;
                const oldPoints = retryingScore.reduce(calculatePoints) * -1;
                //console.log('OLD IMPACTS::', oldImpacts);
                //console.log('OLD POINTs::', oldPoints);

                let newScore = [...retryingScore, ...payloadScores];
                newScore.sort(compareNumbers);
                newScore = newScore.slice(0, 5);
                console.log('NEW SCORE::', newScore);
                const newPoints = newScore.reduce(calculatePoints);
                const newImpacts = newScore.filter( (e) => e > 0).length;
                //console.log('NEW IMPACTS::', newImpacts);
                //console.log('NEW POINTs::', newPoints);
                //console.log('PRE', state);

                state.points += newPoints + oldPoints;
                state.impacts += newImpacts + oldImpacts;
                localStorage.setItem('impacts', state.impacts);
                localStorage.setItem('points', state.points);
                //console.log('POST', state);

                //Efficiency
                const total = (state.scores.length - 1) * 25;
                state.efficiency = Math.round(state.points * 100 / total);
                localStorage.setItem('efficiency', state.efficiency) ;
            } else {
                const impactos = parseInt(payloadScores.filter( (e) => e > 0).length);
                const points = parseInt(payloadScores.reduce(calculatePoints));

                if (state.scores.length === 1) {
                    state.testImpacts = parseInt(impactos);
                    state.testPoints = parseInt(points);
                    localStorage.setItem('testImpacts', state.testImpacts);
                    localStorage.setItem('testPoints', state.testPoints);
                } else {
                    state.points += points;
                    state.impacts += impactos;   
                    localStorage.setItem('impacts', state.impacts);
                    localStorage.setItem('points', state.points);
                    //Efficiency
                    const total = (state.scores.length - 1) * 25;
                    state.efficiency = Math.round(state.points * 100 / total);
                    localStorage.setItem('efficiency', state.efficiency) ;
                }
            }
            
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