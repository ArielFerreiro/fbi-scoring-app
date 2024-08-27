import { doc, collection, setDoc, getDocs, query, where, deleteDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { creatingTournament,  addTournament, setTournaments, setSaving, deleteTournamentById, inactivateTournament } from "./tournamentSlice";

export const startCreatingTournament = ({name, numShooters, date, shift, discipline, categories}) => {

    return async (dispatch, getState) => {
        
        dispatch(creatingTournament());

        //current user id
        const { uid } = getState().auth;

        const newTournament = {
            uid: uid,
            name: name,
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

        //dispatch
        dispatch ( addTournament( newTournament ) );

    }
}

export const startLoadingTournaments = () => {

    return async (dispatch, getState ) => {

        dispatch(setSaving());

        //current user id
        const { uid } = getState().auth;

        const q = query(collection(FirebaseDB, "tournaments"), where("active", "==", true), where("uid", "==", uid));
        const docs = await getDocs(q);

        const tournaments = [];
        docs.forEach( doc => {
            tournaments.push({
                id: doc.id,
                ...doc.data()
            });
        });

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

        dispatch( deleteTournamentById(tournament.id));

    }
}