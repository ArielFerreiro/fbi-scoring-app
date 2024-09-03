import { doc, collection, setDoc, getDocs, query, where, deleteDoc, updateDoc, writeBatch } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { creatingTournament,  addTournament, setTournaments, setSaving, deleteTournamentById, inactivateTournament, addAppointment } from "./tournamentSlice";

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

        //dispatch
        dispatch ( addTournament( newTournament ) );

    }
}

export const startLoadingTournaments = () => {

    return async (dispatch, getState ) => {

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
                appointments.push(appDoc.data);
            });
            
            return {
                appointments: appointments,
                ...tournament
            }

        }));
        //TODO: VER SI ESTO FUNCIONO!

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

        //TODO CHEQUEAR QUE ESTO FUNCIONE
        const snapshot = collection(FirebaseDB, "appointments").where("tournament", "==", tournament.id).get();
        snapshot.forEach((doc) => {
           batch.delete(doc.docRef);
        });
        await batch.commit();

        dispatch( deleteTournamentById(tournament.id));

    }
}

export const startNewTournamentAppointment = ({tournamentId, shift, discipline, category}) => {

    return async (dispatch, getState ) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        //const { active: tournament } = getState().tournament;

        const newAppointment = {
            uid: uid,
            tournament: tournamentId,
            shift: shift,
            categort: category,
            discipline: discipline, 
            line: 0
        };

        const newDoc = doc( collection(FirebaseDB, 'appointments' ) )
        await setDoc( newDoc, newAppointment );
        newAppointment.id = newDoc.id;

        //dispatch
        dispatch ( addAppointment( newAppointment ) );
    }
}