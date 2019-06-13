import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_PROFILE,
  CLEAR_UPDATE_PROFILE,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_FROM_CART,
  CLEAR_CART_DETAIL,
  ON_SUCCESS_BUY,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    case LOGOUT_USER:
      return { ...state };

    case UPDATE_PROFILE:
      return { ...state, updateProfile: action.payload };

    case CLEAR_UPDATE_PROFILE:
      return { ...state, updateProfile: action.payload };

    case ADD_TO_CART:
      return {
        ...state, userData: {
          ...state.userData,
          cart: action.payload,
        }
      };

    case GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };

    case CLEAR_CART_DETAIL:
      return { ...state, cartDetail: action.payload };

    case ON_SUCCESS_BUY: {
      const { success, cart, cartDetail } = action.payload;
      return {
        ...state,
        successBuy: success,
        userData: {
          ...state.userData,
          cart: cart,
        },
        cartDetail
      };
    }

    default:
      return state;
  }
}
