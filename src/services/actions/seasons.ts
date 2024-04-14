import mainApi from "../../utils/api";

import {
  getSeasonRequest,
  getSeasonSuccess,
  requestFailed,
} from "../reducers/seasons";
import { AppDispatch } from "../store";

export const getSeason = (season: number, movieId: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(getSeasonRequest());

    mainApi
      .getSeasonsByMovieId(season, movieId)
      .then((data) => {
        console.log(data);
        dispatch(
          getSeasonSuccess({
            pages: data.pages,
            name: data.docs[0].name,
            episodes: data.docs[0].episodes,
            number: data.docs[0].number,
          })
        );
      })
      .catch(() => {
        dispatch(requestFailed());
      });
  };
};
