import { BREAKPOINTS_FOR_RATING } from "./constants";

export function ratingColor(
  rating: number
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | undefined {
  if (rating >= BREAKPOINTS_FOR_RATING.success) {
    return "success";
  } else if (
    rating >= BREAKPOINTS_FOR_RATING.warning &&
    rating < BREAKPOINTS_FOR_RATING.success
  ) {
    return "warning";
  } else {
    return "error";
  }
}

export function formateDate(dateToFormate: string) {
  const date = new Date(dateToFormate);
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}
