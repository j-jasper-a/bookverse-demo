import { ReviewStats } from "@bookverse-demo/schemas";
import { Box, Typography } from "@mui/material";

type RatingBarProps = {
  reviewCount: ReviewStats["reviewCount"];
  starName: keyof ReviewStats["starDistribution"];
  starValue: ReviewStats["starDistribution"][keyof ReviewStats["starDistribution"]];
};

function RatingBar({ reviewCount, starName, starValue }: RatingBarProps) {
  enum Star {
    one = "1",
    two = "2",
    three = "3",
    four = "4",
    five = "5",
  }

  const percentage =
    reviewCount > 0 ? ((starValue / reviewCount) * 100).toFixed(2) : 0;

  return (
    <Box className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-4 font-semibold">
      <Typography>{`${Star[starName]} star`}</Typography>
      <Box className="relative h-full w-full overflow-hidden rounded-md border border-gray-300">
        <Box
          className="bg-primary absolute left-0 top-0 h-full"
          sx={{ width: `${percentage}%` }}
        />
      </Box>
      <Typography>{`${percentage}%`}</Typography>
    </Box>
  );
}

export function RatingStack({ stats }: { stats: ReviewStats }) {
  const starDistribution: [keyof ReviewStats["starDistribution"], number][] =
    Object.entries(stats?.starDistribution || {}) as [
      keyof ReviewStats["starDistribution"],
      number,
    ][];

  return (
    <Box className="flex flex-col gap-2">
      {starDistribution.reverse().map(([star, count], index) => {
        return (
          <RatingBar
            key={index}
            reviewCount={stats.reviewCount}
            starName={star}
            starValue={count}
          />
        );
      })}
    </Box>
  );
}
