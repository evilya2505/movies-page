import React, { ReactNode } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import styles from "./carousel.module.css";

interface ICarouselProps {
  children: ReactNode;
  isDisabledPrevButton: boolean;
  isDisabledNextButton: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

function Carousel({
  children,
  handleNextPage,
  handlePrevPage,
  isDisabledPrevButton,
  isDisabledNextButton,
}: ICarouselProps) {
  return (
    <Box className={styles.carousel}>
      <IconButton
        onClick={handlePrevPage}
        className={styles.button}
        disabled={isDisabledPrevButton}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <Stack
        spacing={2}
        direction="row"
        alignContent="center"
        justifyContent="center"
        className={styles.list}
      >
        {children}
      </Stack>
      <IconButton
        className={styles.button}
        onClick={handleNextPage}
        disabled={isDisabledNextButton}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default Carousel;
