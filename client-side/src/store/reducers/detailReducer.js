import { DETAIL_FETCH_SUCCESS } from "../actions/actionType";
const initialState = { productDetail: {} };

function detailReducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_FETCH_SUCCESS:
      return { ...state, productDetail: action.payload };
    default:
      return state;
  }
}

export default detailReducer;
