/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "../../services/hooks";
import Filter from "../filter/filter";
import {
  removeAllAgeRating,
  removeAllCountries,
  removeAllGenres,
  setAgeRating,
  setCountry,
  setGenre,
} from "../../services/reducers/movies";
import { FiltersFormValues, InitialValues } from "../../utils/types";
import { filtersFormSchema } from "../../validations/filters-validation";
import { AGE_RATINGS } from "../../utils/constants";

import styles from "./filters-form.module.css";

const FiltersForm: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, watch, handleSubmit } = useForm<FiltersFormValues>({
    resolver: yupResolver(filtersFormSchema),
  });

  const isLoading = useSelector((store) => store.movies.request);
  const countries = useSelector((store) => store.initialValues.countries);
  const genres = useSelector((store) => store.initialValues.genres);
  const filters = useSelector((store) => store.movies.filters);
  const countriesParams = searchParams.getAll("country") || null;
  const genresParams = searchParams.getAll("genre") || null;
  const ageRatingParams = searchParams.getAll("ageRating") || null;

  function onSubmit() {
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    const appendFilters = (filterType: string, filters: string[]) => {
      if (filters.includes("Все")) {
        currentSearchParams.delete(filterType);
      } else {
        filters.forEach((filter) => {
          currentSearchParams.append(filterType, filter);
        });
      }
    };

    appendFilters("genre", filters.genres);
    appendFilters("country", filters.countries);
    appendFilters("ageRating", filters.ageRating);

    currentSearchParams.delete("search");

    setSearchParams(currentSearchParams);
  }

  const watchCountry = watch("country");
  const watchGenre = watch("genre");
  const watchAgeRating = watch("ageRating");

  function handleAddingFilter() {
    const addFilter = (
      filterType: "ageRating" | "genres" | "countries",
      watchValue: string,
      dispatchAction: any,
      removeAllAction: any,
      allValues: InitialValues[],
      paramsValue: string[],
      currentValues: string[]
    ) => {
      if (currentValues.includes("Все")) {
        return;
      }
      if (watchValue === "all") {
        dispatch(removeAllAction());
        dispatch(dispatchAction("Все"));
      } else {
        const filterName =
          filterType === "ageRating"
            ? watchValue
            : allValues.find((item) => item.slug === watchValue)?.name || "";
        if (
          !filters[filterType].includes(filterName) &&
          !paramsValue.includes(filterName)
        ) {
          dispatch(dispatchAction(filterName));
        }
      }
    };

    watchCountry !== "none" &&
      addFilter(
        "countries",
        watchCountry,
        setCountry,
        removeAllCountries,
        countries,
        countriesParams,
        filters.countries
      );
    watchGenre !== "none" &&
      addFilter(
        "genres",
        watchGenre,
        setGenre,
        removeAllGenres,
        genres,
        genresParams,
        filters.genres
      );
    watchAgeRating !== "none" &&
      addFilter(
        "ageRating",
        watchAgeRating,
        setAgeRating,
        removeAllAgeRating,
        AGE_RATINGS,
        ageRatingParams,
        filters.ageRating
      );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className={styles.fieldset}>
        {countries.length > 0 && (
          <Filter
            register={register}
            id="country"
            items={countries}
            label="Страны"
            disabled={isLoading}
          />
        )}
        {genres.length > 0 && (
          <Filter
            register={register}
            id="genre"
            items={genres}
            label="Жанры"
            disabled={isLoading}
          />
        )}
        {AGE_RATINGS.length > 0 && (
          <Filter
            register={register}
            id="ageRating"
            items={AGE_RATINGS}
            label="Возраст"
            disabled={isLoading}
          />
        )}
        {genres && countries && (
          <Box className={styles.buttons}>
            <Button
              type="button"
              disabled={isLoading}
              variant="outlined"
              onClick={handleAddingFilter}
            >
              Добавить
            </Button>
            <Button type="submit" disabled={isLoading} variant="outlined">
              Поиск
            </Button>
          </Box>
        )}
      </fieldset>
    </form>
  );
};

export default FiltersForm;
