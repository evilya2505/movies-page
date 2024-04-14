import mainApi from "../../utils/api";
import { Filters } from "../../utils/types";
import {
  getMoviesRequest,
  getMoviesSuccess,
  requestFailed,
  getMovieByIdRequest,
  getMovieByIdSuccess,
} from "../reducers/movies";
import { AppDispatch } from "../store";

export const getMovies = (
  page: number,
  filters: Filters,
  moviesPerPage: number
) => {
  return function (dispatch: AppDispatch) {
    dispatch(getMoviesRequest());

    mainApi
      .getMovies(page, filters, moviesPerPage)
      .then((data) => {
        dispatch(getMoviesSuccess({ movies: data.docs, pages: data.pages }));
      })
      .catch(() => {
        dispatch(requestFailed());
      });
  };
};

export const searchMovie = (
  keyword: string,
  page: number,
  moviesPerPage: number
) => {
  return function (dispatch: AppDispatch) {
    dispatch(getMoviesRequest());

    mainApi
      .searchMovie(keyword, page, moviesPerPage)
      .then((data) => {
        dispatch(getMoviesSuccess({ movies: data.docs, pages: data.pages }));
      })
      .catch(() => {
        dispatch(requestFailed());
      });
  };
};

export const getMovieById = (id: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(getMovieByIdRequest());

    mainApi
      .getMovieById(id)
      .then((data) => {
        dispatch(getMovieByIdSuccess(data));
      })
      .catch(() => {
        dispatch(requestFailed());
      });
  };
};
