import { combineReducers } from "redux";

import moviesSlice from "./movies";
import reviewsSlice from "./reviews";
import imagesSlice from "./images";
import initialValuesSlice from "./initial-values";
import seasonsSlice from "./seasons";

export const rootReducer = combineReducers({
  movies: moviesSlice,
  reviews: reviewsSlice,
  images: imagesSlice,
  initialValues: initialValuesSlice,
  seasons: seasonsSlice,
});
