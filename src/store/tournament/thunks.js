import { doc, collection, setDoc, getDocs, query, where, deleteDoc, updateDoc, writeBatch } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { creatingTournament,  addTournament, addAppointment, setTournaments, setSaving, deleteTournamentById, inactivateTournament, refreshAppointments } from "./tournamentSlice";

export const startCreatingTournament = ({name, club, numShooters, date, shift, discipline, categories}) => {

    return async (dispatch, getState) => {
        
        dispatch(creatingTournament());

        //current user id
        const { uid } = getState().auth;

        const newTournament = {
            uid: uid,
            name: name,
            club: club,
            lines: numShooters,
            date: date.format("YYYY-MM-DD"),
            shift: shift,
            categories: categories,
            discipline: discipline,
            active: true
        };

        const newDoc = doc( collection(FirebaseDB, 'tournaments' ) )
        await setDoc( newDoc, newTournament );
        newTournament.id = newDoc.id;
        newTournament.appointments = [];
        newTournament.assignedlines = [];

        //dispatch
        dispatch ( addTournament( newTournament ) );

    }
}


export const startNewTournamentAppointment = ( tournament, values ) => {

    return async (dispatch, getState ) => {

        dispatch(creatingTournament());

        const { uid, email, displayName } = getState().auth;

        const newAppointment = {
            uid: uid,
            email: email,
            name: displayName,
            tournament: tournament.id,
            shift: values.shift,
            category: values.category,
            discipline: values.discipline, 
            line: 0
        };

        const newDoc = doc( collection(FirebaseDB, 'appointments' ) )
        await setDoc( newDoc, newAppointment );
        newAppointment.id = newDoc.id;

        //dispatch
        dispatch ( addAppointment( newAppointment ) );

    }
}

export const startLinesAssignment = ( tournament, lines  ) => {

    return async (dispatch) => {

        dispatch(creatingTournament());

        let newAppointments = [];

        //First deletes all lines assigments done previously
        const batch = writeBatch(FirebaseDB);
        const q = query(collection(FirebaseDB, "lines"), where("tournament", "==", tournament.id));
        const lineDocs = await getDocs(q);
        lineDocs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        //Then adds new assignments
        for (let i=0; i < tournament.shift.length; i++) {
            //Check appointments per shift
            const shift = tournament.shift[i];
            let line = 0;

            for (let j=0; j < tournament.appointments.length; j++) {

                const appointment = tournament.appointments[j];

                if (appointment.shift === shift) {
                    const newAppointment = {...appointment, line: (lines[line]+1)};

                    const newDoc = doc( collection(FirebaseDB, 'lines' ) )
                    //await setDoc( newDoc, appointment );
                    batch.set(newDoc, newAppointment);
                    
                    newAppointments.push(newAppointment);
                    line++;
                }
            }
        }

        await batch.commit();

        //dispatch
        dispatch ( refreshAppointments( newAppointments ) );

    }

}


export const startLoadingTournaments = () => {

    return async (dispatch ) => {

        dispatch(setSaving());

        //current user id
        //const { uid } = getState().auth;

        const q = query(collection(FirebaseDB, "tournaments"), where("active", "==", true));
        
        const docs = await getDocs(q);

        let tournaments = [];
        docs.forEach( (doc) => {
            tournaments.push({
                id: doc.id,
                ...doc.data()
            });
        });

        tournaments = await Promise.all(tournaments.map( async (tournament) => {

            const appQuery = query(collection(FirebaseDB, "appointments"), where("tournament", "==", tournament.id));
            const appsDocs = await getDocs(appQuery);
            const appointments = [];
            appsDocs.forEach( (appDoc) => {
                appointments.push(appDoc.data());
            });

            const linesQuery = query(collection(FirebaseDB, "lines"), where("tournament", "==", tournament.id));
            const linesDocs = await getDocs(linesQuery);
            const assignedlines = [];
            linesDocs.forEach( (lineDoc) => {
                assignedlines.push(lineDoc.data());
            });
            
            return {
                appointments: appointments,
                assignedlines: assignedlines,
                ...tournament
            }

        }));
        
        dispatch(setTournaments( tournaments ));

    }
}

export const startInactivatingTournament = (tournament) => {

    return async (dispatch ) => {

        //const { active: tournament } = getState().tournament;

        const docRef = doc( FirebaseDB, `tournaments/${tournament.id}`);
        await updateDoc(docRef, {
            active: false
        });

        dispatch( inactivateTournament(tournament.id));

    }
}

export const startDeletingTournament = (tournament) => {

    return async (dispatch ) => {

        //const { active: tournament } = getState().tournament;

        const docRef = doc( FirebaseDB, `tournaments/${tournament.id}`);
        await deleteDoc(docRef);
        
        const batch = writeBatch(FirebaseDB);

        const appQuery = query(collection(FirebaseDB, "appointments"), where("tournament", "==", tournament.id));
        const appsDocs = await getDocs(appQuery);
        appsDocs.forEach((doc) => {
           batch.delete(doc.ref);
        });

        const linesQuery = query(collection(FirebaseDB, "lines"), where("tournament", "==", tournament.id));
        const linesDocs = await getDocs(linesQuery);
        linesDocs.forEach((doc) => {
           batch.delete(doc.ref);
        });

        await batch.commit();

        dispatch( deleteTournamentById(tournament.id));

    }
}
