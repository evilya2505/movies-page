import React, { ChangeEvent, useState } from "react";
import styles from "./movie-actors.module.css";
import { Person } from "../../utils/types";
import { Box, Pagination, Typography } from "@mui/material";
import { ACTORS_PER_PAGE } from "../../utils/constants";
import Actor from "../actor/actor";

interface IMovieActorsProps {
  persons: Person[];
}

const MovieActors: React.FC<IMovieActorsProps> = ({
  persons,
}: IMovieActorsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(
    (currentPage - 1) * ACTORS_PER_PAGE
  );
  const handlePageChaning = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setStartIndex((page - 1) * ACTORS_PER_PAGE);
  };
  return (
    <Box className={styles.actors}>
      {persons.length !== 0 ? (
        <>
          {" "}
          <ul className={styles.actorsList}>
            {persons
              .slice(startIndex, startIndex + ACTORS_PER_PAGE)
              .map((person) => (
                <Actor key={person.id} actor={person} />
              ))}
          </ul>
          <Pagination
            onChange={handlePageChaning}
            count={Math.ceil((persons.length || 2) / ACTORS_PER_PAGE)}
          />
        </>
      ) : (
        <Typography sx={{ color: "gray" }} variant="h5" textAlign="center">
          Нет информации об актерах.
        </Typography>
      )}
    </Box>
  );
};

export default MovieActors;
