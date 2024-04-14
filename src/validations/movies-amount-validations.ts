import * as yup from "yup";

export const moviesAmountFormSchema = yup.object({
  amount: yup.number().required("Поле обязательное."),
});
