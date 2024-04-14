import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";

import { useSelector, useDispatch } from "../../services/hooks";
import ReviewCard from "../review/review";
import { getReviews } from "../../services/actions/reviews";

import styles from "./reviews.module.css";

interface IReviewsProps {
  movieId: number;
}

export default function Reviews({ movieId }: IReviewsProps) {
  const dispatch = useDispatch();
  const reviews = useSelector((store) => store.reviews.reviews);
  const pages = useSelector((store) => store.reviews.pages);
  const [page, setPage] = useState(1);
  const isLoading = useSelector((store) => store.reviews.request);

  const handlePageChaning = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(getReviews(movieId, page));
  }, [dispatch, movieId, page]);

  return (
    <Box
      minHeight={"550px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDirection={"column"}
    >
      {reviews.length !== 0 ? (
        <>
          <ul className={styles.reviewsList}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>
          <Pagination
            disabled={isLoading}
            onChange={handlePageChaning}
            count={pages}
          />
        </>
      ) : (
        <Typography sx={{ color: "gray" }} variant="h5" textAlign="center">
          Нет информации об отзывах.
        </Typography>
      )}
    </Box>
  );
}
