import { PRODUCTS_FETCH_SUCCESS } from "../actions/actionType";
const initialState = { products: [] };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_FETCH_SUCCESS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

export default productReducer;
