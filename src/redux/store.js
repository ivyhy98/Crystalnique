import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { categoryListReducer, productListReducer, productDetailsReducer } from "./reducers/productReducer";
import {getCartReducer} from './reducers/cartReducers'
import { checkoutTokenReducer } from "./reducers/checkoutReducers";

const reducer = combineReducers({
    productList: productListReducer,
    categoryList: categoryListReducer,
    productDetails: productDetailsReducer,
    getCart: getCartReducer,
    checkoutToken: checkoutTokenReducer,
})



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    {},
    composeEnhancer(applyMiddleware(thunk))
);

export default store;