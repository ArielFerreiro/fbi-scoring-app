import { useDispatch, useSelector } from "react-redux"
import { addScore, reset } from "../store";

export const useScore = () => {

    const { impacts, points, testImpacts, testPoints, scores } = useSelector( state => state.score)
    const dispatch = useDispatch();

    const onAddRound = ( score ) => {
        if (scores.length < 11) {
            dispatch(addScore( score ));
        }
    }

    const onReset = () => {
        dispatch(reset());
    }

    return {
        //Propiedades
        impacts,
        points,
        testImpacts,
        testPoints,
        scores,

        //Metodos
        onAddRound,
        onReset
    }
}
