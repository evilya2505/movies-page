import React from "react";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "../../services/hooks";
import { MoviesAmountValues } from "../../utils/types";
import { moviesAmountFormSchema } from "../../validations/movies-amount-validations";
import { setMoviesPerPage } from "../../services/reducers/movies";

import styles from "./movies-amount-form.module.css";

const MoviesAmountForm: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.movies.request);
  const amountPerPage = useSelector((store) => store.movies.moviesPerPage);
  const { register, handleSubmit } = useForm<MoviesAmountValues>({
    defaultValues: {
      amount: amountPerPage,
    },
    resolver: yupResolver(moviesAmountFormSchema),
  });

  function onSubmit(data: MoviesAmountValues) {
    dispatch(setMoviesPerPage(data.amount));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className={styles.fieldset}>
        <TextField
          {...register("amount")}
          label="Количество"
          variant="standard"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} variant="outlined">
          Изменить
        </Button>
      </fieldset>
    </form>
  );
};

export default MoviesAmountForm;
