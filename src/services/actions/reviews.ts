import mainApi from "../../utils/api";
import {
  getReviewsRequest,
  getReviewsSuccess,
  requestFailed,
} from "../reducers/reviews";
import { AppDispatch } from "../store";

export const getReviews = (id: number, page: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(getReviewsRequest());

    mainApi
      .getReviewsByMovieId(id, page)
      .then((data) => {
        dispatch(getReviewsSuccess({ reviews: data.docs, pages: data.pages }));
      })
      .catch(() => {
        dispatch(requestFailed());
      });
  };
};
