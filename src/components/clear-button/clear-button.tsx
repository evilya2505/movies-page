import React from "react";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { useSelector } from "../../services/hooks";

const ClearButton: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading = useSelector((store) => store.movies.request);

  const onClick = () => {
    const newParams = new URLSearchParams();

    const page = searchParams.get("page");
    if (page) {
      newParams.set("page", page);
    }

    setSearchParams(newParams);
  };

  return (
    <Button disabled={isLoading} variant="outlined" onClick={onClick}>
      Очистить
    </Button>
  );
};

export default ClearButton;
