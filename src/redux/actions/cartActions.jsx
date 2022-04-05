import { ADD_TO_CART,
         ADD_TO_CART_FAIL, 
         GET_CART, GET_CART_FAIL, 
         UPDATE_CART, UPDATE_CART_FAIL, 
         REMOVE_FROM_CART, 
         REMOVE_FROM_CART_FAIL, 
         REFRESH_CART, 
         REFRESH_CART_FAIL 
        } from "../constants/cartConstants";
        
import { commerce } from "../../lib/commerce";

export const getCartSuccess = (cart) => {
    return {
      type: GET_CART,
      payload: cart
    }
  }
  
  /**
   * Handle error on retrieve cart fail
   */
  export const getCartError = (error) => {
    console.log('Error retrieving cart', error)
    return {
      type: GET_CART_FAIL,
    }
  }
  
  /**
   * Async retrieve cart from API
   */
  export const getCart = () => dispatch => commerce.cart.retrieve()
    .then(cart => {
      dispatch(getCartSuccess(cart))
    })
    .catch(error => {
      dispatch(getCartError(error))
    });
  
  /**
   * Handle add to cart success and update store
   */
  export const addToCartSuccess = (product) => {
    return {
      type: ADD_TO_CART,
      payload: product
    }
  }
  
  /**
   * Handle error on adding product to cart
   */
  export const addToCartError = (error) => {
    console.log('Error adding product to cart', error);
    return {
      type: ADD_TO_CART_FAIL,
    }
  }
  
  /**
   * Async add product to cart
   */
  export const addToCart = (productId, quantity) => (dispatch) => commerce.cart.add(productId, quantity)
    .then(product => {
      dispatch(addToCartSuccess(product))
    })
    .catch(error => {
      dispatch(addToCartError(error))
    });
  
  /**
   * Handle update cart item success and update store
   */
  export const updateCartSuccess = (item) => {
    return {
      type: UPDATE_CART,
      payload: item
    }
  }
  
  /**
   * Handle error on updating cart item
   */
  export const updateCartError = (error) => {
    console.log('Error updating cart item', error);
    return {
      type: UPDATE_CART_FAIL
    }
  }
  
  /**
   * Async update cart item
   */
  export const updateCart = (lineItemId, quantity) => (dispatch) => commerce.cart.update(lineItemId, { quantity })
    .then(item => {
      dispatch(updateCartSuccess(item))
    })
    
    .catch(error => {
      dispatch(updateCartError(error))
    });
  
  /**
   * Handle remove cart item success and update store
   */
  export const removeFromCartSuccess = (item) => {
    return {
      type: REMOVE_FROM_CART,
      payload: item
    }
  }
  
  /**
   * Handle remove cart item error
   */
  export const removeFromCartError = (error) => {
    console.log('Error removing cart item', error)
    return {
      type: REMOVE_FROM_CART_FAIL
    }
  }
  
  /**
   * Async remove cart item
   */
  export const removeFromCart = (lineItemId) => (dispatch) => commerce.cart.remove(lineItemId)
    .then(resp => {
      dispatch(removeFromCartSuccess(resp))
    })
    .catch(error => {
      dispatch(removeFromCartError(error))
    });

      
      /**
       * Async empty cart 
       */
      /**
   * Handle remove cart item success and update store
   */
  export const emptyCartSuccess = (item) => {
    return {
      type: REMOVE_FROM_CART,
      payload: item
    }
  }
  
  /**
   * Handle remove cart item error
   */
  export const emptyCartError = (error) => {
    console.log('Error removing cart item', error)
    return {
      type: REMOVE_FROM_CART_FAIL
    }
  }
  
  /**
   * Async remove cart item
   */
  export const emptyCart = () => (dispatch) => commerce.cart.empty()
    .then(resp => {
      dispatch(emptyCartSuccess(resp))
    })
    .catch(error => {
      dispatch(emptyCartError(error))
    });

export const refreshCart = () => async(dispatch) => {
  dispatch({
  type: REFRESH_CART,
   });
try {
  const response = await commerce.cart.empty();
  dispatch({type: REFRESH_CART, payload: response});
}catch(error) {
  dispatch({type: REFRESH_CART_FAIL, payload: error.message });
}
}
        