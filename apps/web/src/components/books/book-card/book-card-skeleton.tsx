import { Box, Paper, Skeleton } from "@mui/material";

export function BookCardSkeleton() {
  return (
    <Box component={"article"} className="group flex flex-col gap-2">
      <Paper className="bg-background border-divider relative aspect-[2/3] overflow-hidden shadow-none">
        <Skeleton className="size-full object-cover" />
      </Paper>
      <Box className="flex flex-col">
        <Skeleton variant="text" className="font-heading max-w-4/5 text-xl" />
        <Skeleton variant="text" className="max-w-3/5" />
      </Box>
    </Box>
  );
}
