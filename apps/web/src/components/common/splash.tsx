import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { LockKeyIcon as SignInIcon } from "@phosphor-icons/react";

export function Splash() {
  return (
    <Box className="flex h-screen w-full items-center justify-center">
      <Paper className="border-divider flex flex-col items-center justify-center gap-8 p-16 shadow-none">
        <Box className="relative h-[96px] w-[96px]">
          <CircularProgress
            size={96}
            thickness={4}
            className="absolute left-0 top-0"
          />
          <Box className="absolute inset-0 flex items-center justify-center">
            <SignInIcon size={"4rem"} className="text-primary" />
          </Box>
        </Box>
        <Typography variant="body1">
          Signing in as <span className="font-bold">Demo User</span> ...
        </Typography>
      </Paper>
    </Box>
  );
}
