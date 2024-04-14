import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { InitialValues, InitialVlue } from "../../utils/types";

export interface TInitialValuesState {
  countries: InitialValues[];
  genres: InitialValues[];
  types: InitialValues[];
  request: boolean;
  requestFailed: boolean;
}

export const initialState: TInitialValuesState = {
  countries: [],
  genres: [],
  types: [],
  request: false,
  requestFailed: false,
};

const initialValuesSlice = createSlice({
  name: "initialValues",
  initialState,
  reducers: {
    getInitialValueRequest(state: TInitialValuesState) {
      state.request = true;
      state.requestFailed = false;
    },
    getInitialValueSuccess(
      state: TInitialValuesState,
      action: PayloadAction<{ result: InitialValues[]; field: InitialVlue }>
    ) {
      switch (action.payload.field) {
        case "countries.name":
          state.countries = action.payload.result;
          break;
        case "genres.name":
          state.genres = action.payload.result;
          break;
      }
      state.request = true;
      state.requestFailed = false;
    },
    requestFailed(state: TInitialValuesState) {
      state.request = false;
      state.requestFailed = true;
    },
  },
});
export const {
  getInitialValueRequest,
  getInitialValueSuccess,

  requestFailed,
} = initialValuesSlice.actions;

export default initialValuesSlice.reducer;
