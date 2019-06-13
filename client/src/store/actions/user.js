import axios from 'axios';

import { USER_SERVER, PRODUCT_SERVER } from '../../components/utils/misc';
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
} from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(res => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(res => res.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function updateProfile(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/updateProfile`, dataToSubmit)
    .then(res => res.data);

  return {
    type: UPDATE_PROFILE,
    payload: request,
  };
}

export function clearUpdateProfile() {
  return {
    type: CLEAR_UPDATE_PROFILE,
    payload: [],
  };
}

export function addToCart(_id) {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then(res => res.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(res => {
      userCart.forEach(item => {
        res.data.forEach(itemInfo => {
          if (item.id === itemInfo._id) {
            itemInfo.quantity = item.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeFromCart(id) {
  const request = axios
    .get(`${USER_SERVER}/removeFromCart?productId=${id}`)
    .then(res => {
      const { cart, cartDetail } = res.data;
      cart.forEach(item => {
        cartDetail.forEach(itemInfo => {
          if (item.id === itemInfo._id) {
            itemInfo.quantity = item.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: REMOVE_FROM_CART,
    payload: request,
  };
}

export function clearCartDetail() {
  return {
    type: CLEAR_CART_DETAIL,
    payload: [],
  };
}

export function onSuccessBuy(data) {
  const request = axios
    .post(`${USER_SERVER}/successBuy`, data)
    .then(res => res.data);

  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
}
