import {
  PRODUCTS_FETCH_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
} from "../actions/actionType";
const initialState = { products: [], product: {} };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_FETCH_SUCCESS:
      return { ...state, products: action.payload };
    case PRODUCT_FETCH_SUCCESS:
      return { ...state, product: action.payload };
    default:
      return state;
  }
}

export default productReducer;
