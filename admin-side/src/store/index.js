import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "./middlewares/logger";
import rootReducer from "./reducers/rootReducer";

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
