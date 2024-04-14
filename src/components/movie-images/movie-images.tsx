import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

import Carousel from "../carousel/carousel";
import { useDispatch, useSelector } from "../../services/hooks";
import { getImages } from "../../services/actions/images";
import {
  BREAKPOINTS,
  IMAGES_PER_PAGE,
  ONE_ELEMENTS_PER_PAGE,
  TWO_ELEMENTS_PER_PAGE,
} from "../../utils/constants";

import styles from "./movie-images.module.css";

interface IMovieImagesProps {
  movieId: number;
}

const MovieImages: React.FC<IMovieImagesProps> = ({
  movieId,
}: IMovieImagesProps) => {
  const images = useSelector((store) => store.images.images);
  const pages = useSelector((store) => store.images.pages);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const isTabletScreen = useMediaQuery(BREAKPOINTS.twoElements);
  const isPhoneScreen = useMediaQuery(BREAKPOINTS.oneElement);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    let itemsPerPage = IMAGES_PER_PAGE;

    if (isTabletScreen) itemsPerPage = TWO_ELEMENTS_PER_PAGE;
    if (isPhoneScreen) itemsPerPage = ONE_ELEMENTS_PER_PAGE;

    dispatch(getImages(movieId, currentPage, itemsPerPage));
  }, [currentPage, dispatch, isPhoneScreen, isTabletScreen, movieId]);

  return (
    <Carousel
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      isDisabledNextButton={currentPage === pages}
      isDisabledPrevButton={currentPage === 1}
    >
      {images.map((image) => (
        <Box className={styles.listItem} key={image.id}>
          <img className={styles.similarImage} src={image.previewUrl} />
        </Box>
      ))}
    </Carousel>
  );
};

export default MovieImages;
