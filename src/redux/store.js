import shoppingReducer from "./shoppingReducer";
import thunk from "redux-thunk";
import {createStore, compose, applyMiddleware, combineReducers} from "redux";


const rootReducers = combineReducers({
    shop: shoppingReducer
})

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, persistedState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store