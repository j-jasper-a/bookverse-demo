"use client";

import { createTheme, ThemeOptions } from "@mui/material";

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "var(--font-main)",
  },
});

export default theme;
