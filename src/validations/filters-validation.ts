import * as yup from "yup";

export const filtersFormSchema = yup.object({
  country: yup.string().required("Поле обязательное."),
  genre: yup.string().required("Поле обязательное."),
  ageRating: yup.string().required("Поле обязательное."),
});
