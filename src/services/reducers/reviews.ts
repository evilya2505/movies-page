import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Review } from "../../utils/types";

export interface TReviewsListState {
  reviews: Review[];
  request: boolean;
  requestFailed: boolean;
  pages: number;
}

export const initialState: TReviewsListState = {
  pages: 1,
  reviews: [],
  request: false,
  requestFailed: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getReviewsRequest(state: TReviewsListState) {
      state.request = true;
      state.requestFailed = false;
    },
    getReviewsSuccess(
      state: TReviewsListState,
      action: PayloadAction<{ reviews: Review[]; pages: number }>
    ) {
      state.reviews = action.payload.reviews;
      state.pages = action.payload.pages;
      state.request = false;
      state.requestFailed = false;
    },
    requestFailed(state: TReviewsListState) {
      state.request = false;
      state.requestFailed = true;
    },
  },
});
export const { getReviewsRequest, getReviewsSuccess, requestFailed } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
