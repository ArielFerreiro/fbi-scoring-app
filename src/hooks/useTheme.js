import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store";


export const useTheme = () => {

    const { isDarkTheme } = useSelector( state => state.theme)
    const dispatch = useDispatch();

    const onToggleTheme = () => {
        dispatch(toggleTheme());
    }

    return {

        //Properties
        isDarkTheme,
        //Methods
        onToggleTheme,

    }
}
