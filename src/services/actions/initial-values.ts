import mainApi from "../../utils/api";
import { InitialVlue } from "../../utils/types";
import {
  getInitialValueRequest,
  getInitialValueSuccess,
  requestFailed,
} from "../reducers/initial-values";
import { AppDispatch } from "../store";

export const getInitialValues = (field: InitialVlue) => {
  return function (dispatch: AppDispatch) {
    dispatch(getInitialValueRequest());

    mainApi
      .getInitialValues(field)
      .then((data) => {
        data.unshift({ name: "Все", slug: "all" });
        data.unshift({ name: "None", slug: "none" });
        dispatch(getInitialValueSuccess({ result: data, field: field }));
      })
      .catch(() => {
        dispatch(requestFailed());
      });
  };
};
