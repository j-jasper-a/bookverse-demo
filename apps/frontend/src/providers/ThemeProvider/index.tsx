"use client";

import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import theme from "./theme";
import { CssBaseline } from "@mui/material";

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
