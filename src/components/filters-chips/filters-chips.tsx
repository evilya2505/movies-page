import React from "react";
import { Chip, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ClearButton from "../clear-button/clear-button";
import { AGE_RATINGS } from "../../utils/constants";

import styles from "./filters-chips.module.css";

const FiltersChips: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("search") || null;
  const years = searchParams.getAll("year") || null;
  const countries = searchParams.getAll("country") || null;
  const genres = searchParams.getAll("genre") || null;
  const ageRating = searchParams.getAll("ageRating") || null;

  const handleDeleteSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleFilter = (type: string, filter: string) => {
    const newParams = new URLSearchParams(searchParams);
    const values = newParams.getAll(type).filter((value) => value !== filter);
    newParams.delete(type);
    values.forEach((value) => newParams.append(type, value));
    setSearchParams(newParams);
  };

  return (
    <Box className={styles.section}>
      <ul className={styles.filters}>
        {keyword && (
          <li className={styles.filter}>
            <Chip
              label={keyword}
              onDelete={handleDeleteSearch}
              className={styles.keywordChip}
            />
          </li>
        )}
        {years.map((year) => {
          return (
            <li key={uuidv4()} className={styles.filter}>
              <Chip label={year} onDelete={() => handleFilter("year", year)} />
            </li>
          );
        })}

        {countries.map((filter) => {
          return (
            <li key={uuidv4()} className={styles.filter}>
              <Chip
                label={filter}
                onDelete={() => handleFilter("country", filter)}
              />
            </li>
          );
        })}

        {genres.map((filter) => {
          return (
            <li key={uuidv4()} className={styles.filter}>
              <Chip
                label={filter}
                onDelete={() => handleFilter("genre", filter)}
              />
            </li>
          );
        })}

        {ageRating.map((filter) => {
          return (
            <li key={uuidv4()} className={styles.filter}>
              <Chip
                label={
                  AGE_RATINGS.find((item) => item.slug === filter)?.name || ""
                }
                onDelete={() => handleFilter("ageRating", filter)}
              />
            </li>
          );
        })}
      </ul>
      {(ageRating.length > 0 ||
        years.length > 0 ||
        genres.length > 0 ||
        countries.length > 0 ||
        keyword) && <ClearButton />}
    </Box>
  );
};

export default FiltersChips;
