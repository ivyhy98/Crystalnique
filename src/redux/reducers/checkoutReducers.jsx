import { GENERATE_CHECKOUT_TOKEN, GENERATE_CHECKOUT_TOKEN_FAIL } from "../constants/checkoutConstants";



    export const checkoutTokenReducer = (
        state={checkout: [],}, action) => {
            switch(action.type) {
                case GENERATE_CHECKOUT_TOKEN:
                    return{ checkout: action.payload };
                case GENERATE_CHECKOUT_TOKEN_FAIL:
                    return { error: action.payload };
                default:
                    return state;
            }
        }