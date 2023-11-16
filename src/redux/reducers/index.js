import { combineReducers } from "redux";
import forecastReducers from "./forecastReducers";

export default combineReducers({
    forecast: forecastReducers,
});
