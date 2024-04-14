import React, { ChangeEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Pagination, CircularProgress, Typography } from "@mui/material";

import { useSelector, useDispatch } from "../services/hooks";
import { getMovies, searchMovie } from "../services/actions/movies";
import { getInitialValues } from "../services/actions/initial-values";
import {
  removeAllAgeRating,
  removeAllCountries,
  removeAllGenres,
} from "../services/reducers/movies";
import { Filters } from "../utils/types";
import SearchForm from "../components/search-form/search-form";
import MovieCard from "../components/movie-card/movie-card";
import FiltersChips from "../components/filters-chips/filters-chips";
import FiltersForm from "../components/filters-form/filters-form";

import CurrentFiltersChips from "../components/current-filters-chips/current-filters-chips";
import styles from "./page.module.css";
import MoviesAmountForm from "../components/movies-amount-form/movies-amount-form";

const MoviesPage: React.FC = () => {
  const dispatch = useDispatch();
  const countries = useSelector((store) => store.initialValues.countries);
  const genres = useSelector((store) => store.initialValues.genres);
  const movies = useSelector((store) => store.movies.movies);
  const pages = useSelector((store) => store.movies.pages);
  const isLoading = useSelector((store) => store.movies.request);
  const filtersToSearch = useSelector((store) => store.movies.filters);
  const moviesPerPage = useSelector((store) => store.movies.moviesPerPage);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || "1";
  const years = searchParams.getAll("year") || null;
  const countriesFromParams = searchParams.getAll("country") || null;
  const genresFromParams = searchParams.getAll("genre") || null;
  const ageRatingFromParams = searchParams.getAll("ageRating") || null;

  useEffect(() => {
    const searchWord = searchParams.get("search");
    const filters: Filters = {
      year: years,
      country: countriesFromParams || filtersToSearch.countries,
      genre: genresFromParams || filtersToSearch.genres,
      ageRating: ageRatingFromParams || filtersToSearch.ageRating,
    };
    if (searchWord !== null) {
      dispatch(searchMovie(searchWord, parseInt(currentPage), moviesPerPage));
    } else {
      dispatch(getMovies(parseInt(currentPage), filters, moviesPerPage));
    }

    dispatch(removeAllCountries());
    dispatch(removeAllGenres());
    dispatch(removeAllAgeRating());
  }, [searchParams, moviesPerPage]);

  const handlePageChaning = (event: ChangeEvent<unknown>, page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set("page", page.toString());

    setSearchParams(newSearchParams);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getInitialValues("countries.name"));
    dispatch(getInitialValues("genres.name"));
  }, []);

  return (
    <>
      <section className={styles.moviesPage}>
        <Box>
          <SearchForm />
          <MoviesAmountForm />
          {countries.length > 0 && genres.length > 0 ? (
            <Box className={styles.filters}>
              <FiltersForm />
              <CurrentFiltersChips />
              <FiltersChips />
            </Box>
          ) : (
            <Box textAlign={"center"}>
              <CircularProgress />
            </Box>
          )}
        </Box>

        <ul className={styles.moviesList}>
          {movies && movies.length > 0 ? (
            movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })
          ) : (
            <Typography className={styles.text} variant="h5">
              Ничего не найдено.
            </Typography>
          )}
        </ul>

        <Pagination
          onChange={handlePageChaning}
          disabled={isLoading}
          count={Math.ceil(pages / moviesPerPage)}
        />
      </section>
    </>
  );
};

export default MoviesPage;
