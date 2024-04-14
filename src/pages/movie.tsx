import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Tab, Tabs } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { useSelector, useDispatch } from "../services/hooks";
import { getMovieById } from "../services/actions/movies";
import Reviews from "../components/reviews/reviews";
import SimilarMovies from "../components/similar/similar";
import SerialSeasons from "../components/seasons/seasons";
import MovieImages from "../components/movie-images/movie-images";
import MovieActors from "../components/movie-actors/movie-actors";
import MovieInfo from "../components/movie-info/movie-info";

import styles from "./page.module.css";

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const movieId = parseInt(id || "");
  const movie = useSelector((store) => store.movies.currentMovie);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getMovieById(movieId));
  }, [id, dispatch, movieId]);

  return (
    <>
      <section className={styles.moviesPage}>
        <Button onClick={() => navigate(-1)} startIcon={<NavigateBeforeIcon />}>
          Назад
        </Button>
        <Box className={styles.movieInfo}>
          <MovieInfo movie={movie} />
          {movie?.seasonsInfo && movie?.seasonsInfo.length > 0 && (
            <SerialSeasons movieId={movieId} />
          )}
          <Box
            className={styles.tabsContainer}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs value={value} onChange={handleChange} aria-label="информация">
              <Tab label="Актеры" value={0} />
              <Tab label="Отзывы" value={1} />
              <Tab label="Постеры" value={2} />
              <Tab label="Похожие" value={3} />
            </Tabs>

            {value === 0 && <MovieActors persons={movie?.persons || []} />}
            {value === 1 && <Reviews movieId={movieId} />}
            {value === 2 && <MovieImages movieId={movieId} />}
            {value === 3 && (
              <SimilarMovies similarMovies={movie?.similarMovies || []} />
            )}
          </Box>
        </Box>
      </section>
    </>
  );
};

export default MoviePage;
