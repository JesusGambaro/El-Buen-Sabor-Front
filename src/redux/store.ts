import { configureStore } from '@reduxjs/toolkit'
//appy redux thunk
import authMiddleware from './middlewares/authMiddleware'
import { authReducer, landingPageReducer, cartReducer } from './reducers/mainReducer';
import { adminReducer } from './reducers/adminReducer';


export default configureStore({
    reducer: {
        auth: authReducer,
        landing: landingPageReducer,
        cart: cartReducer,
        admin: adminReducer
    },
    middleware: (defMiddleware) => defMiddleware().concat(authMiddleware)
});

