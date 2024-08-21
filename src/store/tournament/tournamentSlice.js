import { createSlice } from '@reduxjs/toolkit';

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: {
        isSaving: false,
        messageSaved: '',
        active: null,     //selected one
        tournaments: [], //only active ones

    },
    reducers: {
        creatingTournament: (state) => {
            state.isSaving = true;
        },
        addTournament: (state, action ) => {
            state.tournaments.push( action.payload );
            state.messageSaved = `${action.payload.name}, creado correctamente`;
            state.isSaving = false;
        },
        clearMessage: (state) => {
            state.messageSaved = '';
        },
        setActive: (state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setTournaments: (state, action ) => {
            state.isSaving = false;
            state.tournaments = action.payload;
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateTournament: (state, action ) => {
            state.isSaving = false;
            state.tournaments = state.tournaments.map( tournament => {
                if (action.payload.id === tournament.id ) {
                    return action.payload;                
                }
                return tournament;
            });
            state.messageSaved = `${action.payload.name}, actualizado correctamente`;
        },
        clearTournamentsAtLogout: (state, action) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.tournaments = [];
            state.active = null;
        },
        deleteTournamentById: (state, action ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.tournaments = state.tournaments.filter( tournament => tournament.id !== action.payload );            
            state.active = null;        
        },
    }
});

export const { 
    creatingTournament, 
    addTournament, 
    setActive, 
    setTournaments, 
    setSaving, 
    updateTournament, 
    clearTournamentsAtLogout, 
    clearMessage,
    deleteTournamentById } = tournamentSlice.actions;