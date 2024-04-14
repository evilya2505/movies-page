import mainApi from "../../utils/api";
import {
  getImagesRequest,
  getImagesSuccess,
  requestFailed,
} from "../reducers/images";
import { AppDispatch } from "../store";

export const getImages = (id: number, page: number, imagesPerPage: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(getImagesRequest());

    mainApi
      .getImagesByMovieId(id, page, imagesPerPage)
      .then((data) => {
        dispatch(getImagesSuccess({ images: data.docs, pages: data.pages }));
      })
      .catch(() => {
        dispatch(requestFailed());
      });
  };
};
