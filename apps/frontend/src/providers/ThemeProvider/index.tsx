"use client";

import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";

type ProvidersPropsType = {
  children: ReactNode;
};

const MuiThemeProvider = ({ children }: ProvidersPropsType) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
