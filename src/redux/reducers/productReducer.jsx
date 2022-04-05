import {PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,} from '../constants/productConstants'
export const productListReducer = (
    state = { loading: true, products: []}, action) => {
        switch(action.type) {
            case PRODUCT_LIST_REQUEST:
                return {loading: true};
            case PRODUCT_LIST_SUCCESS:
                return { loading: false,
                         products: action.payload};
            case PRODUCT_LIST_FAIL:
                return { loading: false,
                         error: action.payload};
            default:
                return state;
        }
    };

export const categoryListReducer = (
    state={loading: true, list: []}, action) => {
        switch(action.type) {
            case PRODUCT_CATEGORY_REQUEST:
                return{loading: true};
            case PRODUCT_CATEGORY_SUCCESS:
                return{ loading: false,
                        list: action.payload};
            case PRODUCT_CATEGORY_FAIL:
                return { loading: false,
                         error: action.payload};
            default: 
                return state;
        }
    };

export const productDetailsReducer = (
    state={loading: true, product: []}, action) => {
        switch(action.type) {
            case PRODUCT_DETAIL_REQUEST:
                return{loading: true};
            case PRODUCT_DETAIL_SUCCESS:
                return { loading: false,
                         product: action.payload};
            case PRODUCT_DETAIL_FAIL:
                return { loading: false,
                         error: action.payload};
            default:
                return state;
        }
    }
