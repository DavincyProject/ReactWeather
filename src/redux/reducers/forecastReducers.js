import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    forecastData: [],
    location: [],
    current: [],
};

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
        setForecastData: (state, action) => {
            state.forecastData = action.payload;
        },
        setLocationData: (state, action) => {
            state.location = action.payload;
        },
        setCurrentData: (state, action) => {
            state.current = action.payload;
        },
    },
});

export const { setForecastData, setLocationData, setCurrentData } =
    forecastSlice.actions;
export default forecastSlice.reducer;
