import { setAttempt } from "@redux/reducers/mainReducer";
import axios from "axios";
const authMiddleware = storeAPI => next => action => {
    /*
    console.log('authMiddleware: ', action.type);
     const { auth } = storeAPI.getState();
    console.log('authMiddleware: ', auth);
    if (auth.isAuth) {
        //set the token in the header
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    } else if (isAllowed(action.type)) {
        //remove the token from the header
        console.log('authMiddleware: ', action.type);
        console.log("No permitido, no estas logueado");
        //set attempt to true
        storeAPI.dispatch(setAttempt(true));
        return;
    } */
    return next(action);
};

const allowList = ['cart/', 'auth/register', 'auth/logout'];

const isAllowed = (type) => {
    return allowList.some((item) => type.includes(item));
}

export default authMiddleware;