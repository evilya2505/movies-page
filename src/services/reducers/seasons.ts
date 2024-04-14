import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Episode } from "../../utils/types";

export interface TSeasonsListState {
  season: { number: number; name: string };
  request: boolean;
  requestFailed: boolean;
  pages: number;
  test: number;
  episodes: Episode[];
}

export const initialState: TSeasonsListState = {
  pages: 1,
  season: { number: 1, name: "" },
  episodes: [],
  request: false,
  requestFailed: false,
  test: 1,
};

const seasonsSlice = createSlice({
  name: "seasons",
  initialState,
  reducers: {
    getSeasonRequest(state: TSeasonsListState) {
      state.request = true;
      state.requestFailed = false;
    },
    getSeasonSuccess(
      state: TSeasonsListState,
      action: PayloadAction<{
        number: number;
        name: string;
        episodes: Episode[];
        pages: number;
      }>
    ) {
      state.episodes = action.payload.episodes;
      state.pages = action.payload.pages;
      state.season = {
        number: action.payload.number,
        name: action.payload.name,
      };
      state.request = false;
      state.requestFailed = false;
    },
    requestFailed(state: TSeasonsListState) {
      state.request = false;
      state.requestFailed = true;
    },
  },
});
export const { getSeasonRequest, getSeasonSuccess, requestFailed } =
  seasonsSlice.actions;

export default seasonsSlice.reducer;
