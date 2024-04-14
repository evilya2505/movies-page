import * as yup from "yup";

export const searchFormSchema = yup.object({
  keyword: yup.string().required("Поле обязательное."),
  searchType: yup.string().required("Поле обязательное."),
});
