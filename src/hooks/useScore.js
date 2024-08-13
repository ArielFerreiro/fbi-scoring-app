import { useDispatch, useSelector } from "react-redux"
import { addScore, reset } from "../store";

export const useScore = () => {

    const { impacts, points, efficiency, testImpacts, testPoints, scores } = useSelector( state => state.score)
    const dispatch = useDispatch();

    const onAddRound = ( score, retries = 0,  fail = false ) => {
        const action = {
            'scores': score,
            'retries': retries,
            'fail': fail
        }
        if (scores.length < 11) {
            dispatch(addScore( action ));
        }
    }

    const onReset = () => {
        dispatch(reset());
    }

    return {
        //Propiedades
        impacts,
        points,
        efficiency,
        testImpacts,
        testPoints,
        scores,

        //Metodos
        onAddRound,
        onReset
    }
}
