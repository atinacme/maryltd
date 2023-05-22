import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducers from "./Reducers";

const store = createStore(
    Reducers,
    composeWithDevTools(applyMiddleware(logger))
);

export default store;