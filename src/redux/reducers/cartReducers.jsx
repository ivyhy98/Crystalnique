import { ADD_TO_CART, EMPTY_CART, GET_CART, UPDATE_CART,REMOVE_FROM_CART, REFRESH_CART } from "../constants/cartConstants";

const initialState = {
    cart: {
        total_items: 0,
        total_unique_items: 0,
        line_items: [],
    },
  };
export const getCartReducer = (
    state = initialState, action) => {
        switch(action.type) {
            case GET_CART:
                return {...state, cart: action.payload} ;
                  // Dispatch in ProductDetail client-side
                  // Check if action dispatched is ADD_TO_CART and act on that
            case ADD_TO_CART:
                return { ...state, cart: action.payload.cart };
                  // Dispatch in Cart client-side
                  // Check if action dispatched is UPDATE_CART_ITEM and act on that
            case UPDATE_CART:
                return { ...state, cart: action.payload.cart };
                  // Dispatch in Cart client-side
                  // Check if action dispatched is REMOVE_FROM_CART and act on that
            case REMOVE_FROM_CART:
                return { ...state, cart: action.payload.cart };
            case EMPTY_CART:
                return { ...state, cart: action.payload.cart };
            case REFRESH_CART:
                return {...state, cart: action.payload.cart};
            default:
                return state;
        }
    };
