import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_TO_SHOP,
  GET_BRANDS,
  GET_WOODS,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };

    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };

    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      };

    case GET_BRANDS:
      return { ...state, brands: action.payload };

    case GET_WOODS:
      return { ...state, woods: action.payload };

    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };

    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };

    case ADD_BRAND: {
      const { success, brands } = action.payload;
      return { ...state, addBrand: success, brands };
    }

    case ADD_WOOD: {
      const { success, woods } = action.payload;
      return { ...state, addWood: success, woods };
    }

    case GET_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload };

    case CLEAR_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload };

    default:
      return state;
  }
}
