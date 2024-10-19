"use client";

import { muiTheme } from "@/styles/mui-theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

type MuiThemeProviderProps = {
  children?: ReactNode;
};

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
