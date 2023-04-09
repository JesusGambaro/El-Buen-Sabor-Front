import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
//appy redux thunk
import authMiddleware from './middlewares/authMiddleware'
import { authReducer, landingPageReducer, cartReducer } from './reducers/mainReducer';


export default configureStore({
    reducer: {
        auth: authReducer,
        landing: landingPageReducer,
        cart: cartReducer
        //admin: rootReducer,
    },
    middleware: (defMiddleware) => defMiddleware().concat(authMiddleware)
});

