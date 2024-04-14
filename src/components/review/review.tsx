import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Review } from "../../utils/types";

import styles from "./review.module.css";

interface IReviewProps {
  review: Review;
}

export default function ReviewCard({ review }: IReviewProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title={review.author} subheader={review.createdAt} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {review.review.length > 300 &&
            (expanded ? review.review : `${review.review.slice(0, 300)} ...`)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={styles.actions}>
        {review.review.length > 300 && (
          <Button onClick={handleExpandClick} className={styles.expandButton}>
            <ExpandMoreIcon />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
