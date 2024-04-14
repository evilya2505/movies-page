import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

import {
  BREAKPOINTS,
  IMAGES_PER_PAGE,
  TWO_ELEMENTS_PER_PAGE,
  ONE_ELEMENTS_PER_PAGE,
} from "../../utils/constants";
import { Episode } from "../../utils/types";
import Carousel from "../carousel/carousel";

import styles from "./season-episodes.module.css";
import { useSelector } from "../../services/hooks";

interface ISeasonEpisodesProps {
  episodes: Episode[];
}

const SeasonEpisodes: React.FC<ISeasonEpisodesProps> = ({
  episodes,
}: ISeasonEpisodesProps) => {
  const season = useSelector((store) => store.seasons.season);
  const [currentPage, setCurrentPage] = useState(1);

  const isTabletScreen = useMediaQuery(BREAKPOINTS.twoElements);
  const isPhoneScreen = useMediaQuery(BREAKPOINTS.oneElement);

  const [elementsPerPage, setElementsPerPage] = useState(IMAGES_PER_PAGE);
  const [startIndex, setStartIndex] = useState(
    (currentPage - 1) * elementsPerPage
  );

  useEffect(() => {
    setStartIndex((currentPage - 1) * elementsPerPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    if (isTabletScreen) setElementsPerPage(TWO_ELEMENTS_PER_PAGE);
    if (isPhoneScreen) setElementsPerPage(ONE_ELEMENTS_PER_PAGE);
  }, [isTabletScreen, isPhoneScreen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [season]);

  return (
    <Carousel
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      isDisabledNextButton={
        currentPage === Math.ceil((episodes.length || 2) / elementsPerPage)
      }
      isDisabledPrevButton={currentPage === 1}
    >
      {episodes !== null &&
        episodes
          .slice(startIndex, startIndex + elementsPerPage)
          .map((episode: Episode) => (
            <Box key={episode.number} className={styles.episode}>
              {!episode.still || episode.still.previewUrl === null ? (
                <div className={styles.noImage}></div>
              ) : (
                <img
                  className={styles.image}
                  src={episode?.still?.previewUrl}
                ></img>
              )}
              <Typography>
                {episode.number}. {episode.name}
              </Typography>
              <Typography>
                {episode?.description?.length > 100
                  ? `${episode.description.slice(0, 100)} ...`
                  : episode.description}
              </Typography>
            </Box>
          ))}
    </Carousel>
  );
};

export default SeasonEpisodes;
