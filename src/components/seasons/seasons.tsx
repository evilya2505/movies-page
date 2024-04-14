import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { useDispatch, useSelector } from "../../services/hooks";
import { getSeason } from "../../services/actions/seasons";
import SeasonEpisodes from "../season-episodes/season-episodes";

import styles from "./seasons.module.css";

interface ISerialSeasonsProps {
  movieId: number;
}

const SerialSeasons: React.FC<ISerialSeasonsProps> = ({
  movieId,
}: ISerialSeasonsProps) => {
  const dispatch = useDispatch();
  const episodes = useSelector((store) => store.seasons.episodes);
  const seasonsArr = Array.from(
    Array(useSelector((store) => store.seasons.pages)),
    (_, i) => i + 1
  );

  const [currentSeason, setCurrentSeason] = useState(0);
  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setCurrentSeason(newValue);
  }

  useEffect(() => {
    dispatch(getSeason(currentSeason + 1, movieId));
  }, [currentSeason, dispatch, movieId]);

  return (
    <Box className={styles.seasons}>
      <Box className={styles.tabs}>
        <Typography textAlign="center" color="primary" variant="h5">
          Сезоны
        </Typography>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={currentSeason}
          onChange={handleChange}
          aria-label="seasons"
        >
          {seasonsArr.map((season) => {
            return <Tab key={season} label={season} />;
          })}
        </Tabs>
      </Box>
      <SeasonEpisodes episodes={episodes} />
    </Box>
  );
};

export default SerialSeasons;
