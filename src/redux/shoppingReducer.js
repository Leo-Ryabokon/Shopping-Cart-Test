import axios from "axios";

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const ADJUST_QTY = 'ADJUST_QTY'
const FETCH_DATA_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_DATA_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_DATA_FAILURE = 'FETCH_USERS_FAILURE'


const initialState = {
    loading: false,
    products: [],
    cart: [],
    error: ''

}

const shoppingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                cart: [...state.cart],
                error: ''
            }
        case FETCH_DATA_FAILURE:
            return {
                loading: false,
                products: [],
                cart: [],
                error: action.payload
            }
        case ADD_TO_CART:
            // Get the items data from the products array
            const item = state.products.find(prod => prod.id === action.payload.id)
            //Check if the item already in the cart
            const inCart = state.cart.find((item => item.id === action.payload.id))
            return {
                ...state,
                cart: inCart ? state.cart.map(item => item.id === action.payload.id ? {
                    ...item,
                    qty: item.qty + 1
                } : item) : [...state.cart, {...item, qty: 1}]
            }
        case REMOVE_FROM_CART:
            return {
                ...state, cart: state.cart.filter(item => item.id !== action.payload.id)
            }
        case ADJUST_QTY:
            return {
                ...state, cart: state.cart.map(item => item.id === action.payload.id ? {...item, qty: +action.payload.qty} : item)
            }
        default:
            return state
    }
}
export const addToCart = (itemId) => {
    return {
        type: ADD_TO_CART,
        payload: {
            id: itemId,
        }
    }
}
export const removeFromCart = (itemId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            id: itemId,
        }
    }
}
export const adjustQty = (itemID, value) => {
    return {
        type: ADJUST_QTY,
        payload: {
            id: itemID,
            qty: value
        },
    }
}
const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

const fetchDataSuccess = (products) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: products
    }
}

const fetchDataFailure = error => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}
export const fetchData =  () => {
    return (dispatch) => {
        dispatch(fetchDataRequest())
        axios.get('https://appevent.ru/dev/task1/catalog')
            .then(response => {
                const data = response.data.items
                dispatch(fetchDataSuccess(data))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchDataFailure(errorMsg))
            })

    }
}

export default shoppingReducer