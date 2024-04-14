import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";

import { MovieDetail } from "../../utils/types";

import styles from "./movie-info.module.css";

interface IMovieInfoProps {
  movie: MovieDetail | null;
}

const MovieInfo: React.FC<IMovieInfoProps> = ({ movie }: IMovieInfoProps) => {
  return (
    <Box className={styles.info}>
      <img
        src={movie?.poster?.previewUrl || ""}
        alt="постер"
        className={styles.image}
      />
      <Box className={styles.movieInfo} maxWidth={600}>
        <Typography variant="h5" marginBottom={"10px"}>
          {movie?.name}
          {movie?.alternativeName && `(${movie?.alternativeName})`}
        </Typography>
        <Typography variant="body1" color="gray" marginBottom={"10px"}>
          Возрастной рейтинг: {movie?.ageRating}+
        </Typography>
        <Typography variant="body1" color="gray" marginBottom={"10px"}>
          imbd {movie?.rating.imdb}
        </Typography>
        <Typography variant="body1" color="gray" marginBottom={"10px"}>
          {movie?.countries.map((country) => country.name).join(", ")}
        </Typography>
        <Stack className={styles.stack} direction="row" spacing={1}>
          {movie?.genres.map((genre, index) => {
            return <Chip key={index} label={genre.name} variant="outlined" />;
          })}
        </Stack>
        <Typography variant="h6">Описание</Typography>
        <Typography variant="body1" paragraph={true}>
          {movie?.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieInfo;
