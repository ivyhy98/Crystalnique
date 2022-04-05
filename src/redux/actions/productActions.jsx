import { commerce } from "../../lib/commerce";
import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL
    } from "../constants/productConstants";


export const listProducts = (limit) => async(dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
        
    });
    try {
        const { data: products } = await commerce.products.list({limit: limit});
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: products});
    }catch(error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message });
    }
}

export const listCategory = (categorySlug, sortBy, sortDirection) => async(dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORY_REQUEST,
        payload: categorySlug
    });
    try {
        const {data: productCategory} = await commerce.products.list({category_slug: [categorySlug], sortBy: sortBy, sortDirection: sortDirection, limit: 100});
        dispatch({type: PRODUCT_CATEGORY_SUCCESS, payload: productCategory});
    } catch(error) {
        dispatch({type: PRODUCT_CATEGORY_FAIL, payload: error.message})
    }
}

export const detailsProduct = (productPerm) => async(dispatch) => {
    dispatch({
        type: PRODUCT_DETAIL_REQUEST,
        payload: productPerm
    });
    
    try {
        const response = await commerce.products.retrieve(productPerm, { type: 'permalink' });
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: response});
    } catch(error) {
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.message})
    }
}

