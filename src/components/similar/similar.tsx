import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import Carousel from "../carousel/carousel";
import {
  BREAKPOINTS,
  IMAGES_PER_PAGE,
  TWO_ELEMENTS_PER_PAGE,
  ONE_ELEMENTS_PER_PAGE,
} from "../../utils/constants";
import { MovieList } from "../../utils/types";

import styles from "./similar.module.css";

interface ISimilarMoviesProps {
  similarMovies: MovieList[];
}

const SimilarMovies: React.FC<ISimilarMoviesProps> = ({
  similarMovies,
}: ISimilarMoviesProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const isTabletScreen = useMediaQuery(BREAKPOINTS.twoElements);
  const isPhoneScreen = useMediaQuery(BREAKPOINTS.oneElement);

  const [elementsPerPage, setElementsPerPage] = useState(IMAGES_PER_PAGE);

  const [startIndex, setStartIndex] = useState(
    (currentPage - 1) * elementsPerPage
  );

  useEffect(() => {
    setStartIndex((currentPage - 1) * elementsPerPage);
  }, [currentPage, elementsPerPage]);

  useEffect(() => {
    if (isTabletScreen) setElementsPerPage(TWO_ELEMENTS_PER_PAGE);
    if (isPhoneScreen) setElementsPerPage(ONE_ELEMENTS_PER_PAGE);
  }, [isTabletScreen, isPhoneScreen]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      {similarMovies.length !== 0 ? (
        <Carousel
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          isDisabledNextButton={
            currentPage ===
            Math.ceil((similarMovies.length || 2) / elementsPerPage)
          }
          isDisabledPrevButton={currentPage === 1}
        >
          {similarMovies
            .slice(startIndex, startIndex + elementsPerPage)
            .map((similarMovie: MovieList) => (
              <Link
                className={styles.link}
                to={`/movies/${similarMovie.id}`}
                key={similarMovie.id}
              >
                <Box className={styles.listItem}>
                  <img
                    className={styles.similarImage}
                    src={similarMovie.poster.previewUrl || ""}
                  />
                  <Typography className={styles.movieTitle}>
                    {similarMovie.name}
                  </Typography>
                </Box>
              </Link>
            ))}
        </Carousel>
      ) : (
        <Typography sx={{ color: "gray" }} variant="h5" textAlign="center">
          Нет информации о похожих фильмах.
        </Typography>
      )}
    </>
  );
};

export default SimilarMovies;
