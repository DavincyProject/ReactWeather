import axios from "axios";
import { isAxiosError } from "axios";
import {
    setCurrentData,
    setForecastData,
    setLocationData,
} from "../reducers/forecastReducers";

export const getForecastData = (region) => async (dispatch) => {
    try {
        const key = import.meta.env.VITE_API_KEY;

        const response = await axios.get(
            `${
                import.meta.env.VITE_BASE_URL
            }/forecast.json?key=${key}&q=${region}&days=5&aqi=yes`
        );
        const { location, current, forecast } = response.data;
        dispatch(setLocationData(location));
        dispatch(setCurrentData(current));
        dispatch(setForecastData(forecast));
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error(error?.response?.data?.message);
            return;
        }
        console.error(error);
    }
};
