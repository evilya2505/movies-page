import React from "react";
import { Chip, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "../../services/hooks";
import {
  removeAgeRating,
  removeCountry,
  removeGenre,
} from "../../services/reducers/movies";

import styles from "./current-filters-chips.module.css";

const CurrentFiltersChips: React.FC = () => {
  const filters = useSelector((store) => store.movies.filters);
  const dispatch = useDispatch();

  const handleFilter = (type: string, filter: string) => {
    switch (type) {
      case "country":
        dispatch(removeCountry(filter));
        break;
      case "genre":
        dispatch(removeGenre(filter));
        break;
      case "ageRating":
        dispatch(removeAgeRating(filter));
        break;
    }
  };

  return (
    <Box className={styles.section}>
      <ul className={styles.filters}>
        {filters.countries.length > 0 &&
          filters.countries.map((filter) => {
            return (
              <li key={uuidv4()} className={styles.filter}>
                <Chip
                  label={filter}
                  variant="outlined"
                  color="success"
                  onDelete={() => handleFilter("country", filter)}
                />
              </li>
            );
          })}

        {filters.genres.length > 0 &&
          filters.genres.map((filter) => {
            return (
              <li key={uuidv4()} className={styles.filter}>
                <Chip
                  variant="outlined"
                  color="success"
                  label={filter}
                  onDelete={() => handleFilter("genre", filter)}
                />
              </li>
            );
          })}

        {filters.ageRating.length > 0 &&
          filters.ageRating.map((filter) => {
            return (
              <li key={uuidv4()} className={styles.filter}>
                <Chip
                  variant="outlined"
                  color="success"
                  label={filter}
                  onDelete={() => handleFilter("ageRating", filter)}
                />
              </li>
            );
          })}
      </ul>
    </Box>
  );
};

export default CurrentFiltersChips;
