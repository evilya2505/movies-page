import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

import { Person } from "../../utils/types";

interface IActorProps {
  actor: Person;
}

export default function Actor({ actor }: IActorProps) {
  return (
    <Box
      width={"160px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      alignSelf={"flex-start"}
    >
      <Typography variant={"body1"} color={"gray"}>
        {actor.profession}
      </Typography>
      <Avatar
        alt={actor.name}
        src={actor.photo}
        sx={{ width: 120, height: 120 }}
      />
      <Typography variant="body1" textAlign={"center"}>
        {actor.name}
      </Typography>
      <Typography variant={"body1"} color={"gray"} textAlign={"center"}>
        {actor.description}
      </Typography>
    </Box>
  );
}
