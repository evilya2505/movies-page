import React from "react";
import { Link } from "react-router-dom";
import { Badge, Typography } from "@mui/material";

import { Doc } from "../../utils/types";
import { ratingColor } from "../../utils/utils";
import { TYPES } from "../../utils/constants";

import styles from "./movie-card.module.css";

interface IMovieProps {
  movie: Doc;
}

const MovieCard: React.FC<IMovieProps> = ({ movie }: IMovieProps) => {
  return (
    <li className={styles.movie}>
      <Link className={styles.link} to={`/movies/${movie.id}`}>
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          color={ratingColor(movie.rating.imdb)}
          badgeContent={movie.rating.imdb}
        >
          <img src={movie.poster.previewUrl} className={styles.image}></img>
        </Badge>
        <Typography className={styles.title} variant="h5">
          {movie.name}
        </Typography>
        <Typography variant="body1">
          {movie.year}, {TYPES[movie.type]}
        </Typography>
      </Link>
    </li>
  );
};

export default MovieCard;
