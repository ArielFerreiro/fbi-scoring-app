import { doc, collection, setDoc, getDocs, query, where, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { creatingTournament,  addTournament, setTournaments, deleteTournamentById } from "./tournamentSlice";

export const startCreatingTournament = ({name, numShooters, date, categories}) => {

    return async (dispatch, getState) => {
        
        dispatch(creatingTournament());

        //current user id
        const { uid } = getState().auth;

        const newTournament = {
            uid: uid,
            name: name,
            numShooters: numShooters,
            date: date.$y + '-' + date.$m + '-' + date.$d,
            categories: categories,
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

export const startDeletingTournament = () => {

    return async (dispatch, getState ) => {

        const { active: tournament } = getState().tournament;

        const docRef = doc( FirebaseDB, `tournaments/${tournament.id}`);
        await deleteDoc(docRef);

        dispatch( deleteTournamentById(tournament.id));

    }
}