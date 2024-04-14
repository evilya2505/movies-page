import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ImageItem } from "../../utils/types";

export interface TImagesListState {
  images: ImageItem[];
  request: boolean;
  requestFailed: boolean;
  pages: number;
}

export const initialState: TImagesListState = {
  pages: 1,
  images: [],
  request: false,
  requestFailed: false,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    getImagesRequest(state: TImagesListState) {
      state.request = true;
      state.requestFailed = false;
    },
    getImagesSuccess(
      state: TImagesListState,
      action: PayloadAction<{ images: ImageItem[]; pages: number }>
    ) {
      state.images = action.payload.images;
      state.pages = action.payload.pages;
      state.request = false;
      state.requestFailed = false;
    },
    requestFailed(state: TImagesListState) {
      state.request = false;
      state.requestFailed = true;
    },
  },
});
export const { getImagesRequest, getImagesSuccess, requestFailed } =
  imagesSlice.actions;

export default imagesSlice.reducer;
