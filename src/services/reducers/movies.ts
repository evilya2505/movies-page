import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Doc, MovieDetail } from "../../utils/types";
import { INITIAL_MOVIES_PER_PAGE } from "../../utils/constants";

export interface TMoviesListState {
  movies: Doc[];
  currentMovie: MovieDetail | null;
  request: boolean;
  requestFailed: boolean;
  pages: number;
  moviesPerPage: number;
  filters: { ageRating: string[]; genres: string[]; countries: string[] };
}

export const initialState: TMoviesListState = {
  pages: 1,
  currentMovie: null,
  movies: [],
  request: false,
  requestFailed: false,
  moviesPerPage: INITIAL_MOVIES_PER_PAGE,
  filters: { ageRating: [], genres: [], countries: [] },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesRequest(state: TMoviesListState) {
      state.request = true;
      state.requestFailed = false;
    },
    getMoviesSuccess(
      state: TMoviesListState,
      action: PayloadAction<{ movies: Doc[]; pages: number }>
    ) {
      state.movies = action.payload.movies;
      state.pages = action.payload.pages;
      state.request = false;
      state.requestFailed = false;
    },
    getMovieByIdRequest(state: TMoviesListState) {
      state.request = true;
      state.requestFailed = false;
    },
    getMovieByIdSuccess(
      state: TMoviesListState,
      action: PayloadAction<MovieDetail>
    ) {
      state.currentMovie = action.payload;
      state.request = false;
      state.requestFailed = false;
    },
    setAgeRating(state: TMoviesListState, action: PayloadAction<string>) {
      state.filters.ageRating.push(action.payload);
    },
    removeAgeRating(state: TMoviesListState, action: PayloadAction<string>) {
      const index = state.filters.ageRating.indexOf(action.payload);
      if (index !== -1) {
        state.filters.ageRating.splice(index, 1);
      }
    },
    setGenre(state: TMoviesListState, action: PayloadAction<string>) {
      state.filters.genres.push(action.payload);
    },
    removeGenre(state: TMoviesListState, action: PayloadAction<string>) {
      const index = state.filters.genres.indexOf(action.payload);
      if (index !== -1) {
        state.filters.genres.splice(index, 1);
      }
    },
    setCountry(state: TMoviesListState, action: PayloadAction<string>) {
      state.filters.countries.push(action.payload);
    },
    removeCountry(state: TMoviesListState, action: PayloadAction<string>) {
      const index = state.filters.countries.indexOf(action.payload);
      if (index !== -1) {
        state.filters.countries.splice(index, 1);
      }
    },
    removeAllCountries(state: TMoviesListState) {
      state.filters.countries = [];
    },
    removeAllGenres(state: TMoviesListState) {
      state.filters.genres = [];
    },
    removeAllAgeRating(state: TMoviesListState) {
      state.filters.ageRating = [];
    },
    setMoviesPerPage(state: TMoviesListState, action: PayloadAction<number>) {
      state.moviesPerPage = action.payload;
    },
    requestFailed(state: TMoviesListState) {
      state.request = false;
      state.requestFailed = true;
    },
  },
});
export const {
  getMoviesRequest,
  getMoviesSuccess,
  requestFailed,
  getMovieByIdRequest,
  getMovieByIdSuccess,
  setAgeRating,
  removeAgeRating,
  setGenre,
  removeGenre,
  setCountry,
  removeCountry,
  removeAllCountries,
  removeAllGenres,
  removeAllAgeRating,
  setMoviesPerPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;
