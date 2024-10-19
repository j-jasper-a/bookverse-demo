import { ReviewDto } from "@bookverse-demo/schemas";
import { Avatar, Box, Button, Rating, Typography } from "@mui/material";
import dayjs from "dayjs";

type ReviewProps = {
  review: ReviewDto;
};

export function Review({ review }: ReviewProps) {
  return (
    <Box className="flex flex-col gap-2">
      <Box className="flex items-center gap-2">
        <Avatar
          alt={`${review.user.firstName} ${review.user.lastName}`}
          src={review.user.avatarUrl}
        >
          {`${review.user.firstName.charAt(0).toUpperCase()}${review.user.lastName.charAt(0).toUpperCase()}`}
        </Avatar>
        <Box className="flex flex-col">
          <Typography variant="subtitle2">{`${review.user.firstName} ${review.user.lastName}`}</Typography>
          {review.isVerifiedPurchase && (
            <Typography variant="body2" color="primary">
              Verified Purchase
            </Typography>
          )}
        </Box>
      </Box>
      <Box className="flex items-center gap-2">
        <Rating
          name="review-rating"
          value={review.rating}
          readOnly
          precision={0.1}
          className="text-primary text-base"
        />
        <Typography variant="subtitle2">{review.title}</Typography>
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
      >{`Reviewed on ${review.updatedAt ? dayjs(review.updatedAt).format("MMM D, YYYY") : dayjs(review.createdAt).format("MMM D, YYYY")}`}</Typography>
      <Typography>{review.body}</Typography>
      <Typography
        variant="body2"
        color="textSecondary"
      >{`${review.helpfulCount} people found this helpful`}</Typography>
      <Button variant="outlined" size="small" className="w-fit">
        Mark as helpful
      </Button>
    </Box>
  );
}
