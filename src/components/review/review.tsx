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
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

import { Review } from "../../utils/types";
import { formateDate } from "../../utils/utils";

import styles from "./review.module.css";

interface IReviewProps {
  review: Review;
}

export default function ReviewCard({ review }: IReviewProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const returnTypeElement = () => {
    console.log(review.type);
    switch (review.type) {
      case "Позитивный":
        return <ThumbUpAltIcon color="success" />;
      case "Негативный":
        return <ThumbDownAltIcon color="error" />;
      case "Нейтральный":
        return <SentimentNeutralIcon color="warning" />;
      default:
        break;
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={returnTypeElement()}
        title={review.author}
        subheader={formateDate(review.createdAt)}
      />
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
