import { doc, collection, setDoc, getDocs, query, where, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { creatingTournament,  addTournament, setTournaments, setSaving, deleteTournamentById } from "./tournamentSlice";

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

    return async (dispatch ) => {

        dispatch(setSaving());

        const q = query(collection(FirebaseDB, "tournaments"), where("active", "==", true));
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

export const startDeletingTournament = (tournament) => {

    return async (dispatch, getState ) => {

        //const { active: tournament } = getState().tournament;

        const docRef = doc( FirebaseDB, `tournaments/${tournament.id}`);
        await deleteDoc(docRef);

        dispatch( deleteTournamentById(tournament.id));

    }
}