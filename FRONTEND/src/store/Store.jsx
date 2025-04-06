import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./reducers/CarSlice"

export const store = configureStore({
    reducer : {
        car : carReducer
    }

})