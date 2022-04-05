import { commerce } from '../../lib/commerce';

import {
    GENERATE_CHECKOUT_TOKEN,
    GENERATE_CHECKOUT_TOKEN_FAIL}
    from '../constants/checkoutConstants';


  export const getCheckoutToken = (cart) => async(dispatch) => {
    dispatch({
      type: GENERATE_CHECKOUT_TOKEN,
    });
    try {
      const response = await commerce.checkout.generateTokenFrom('cart', cart.id);
      dispatch({type: GENERATE_CHECKOUT_TOKEN, payload: response})
    }catch(error) {
      dispatch({type: GENERATE_CHECKOUT_TOKEN_FAIL, payload: error})
    }
    
  }