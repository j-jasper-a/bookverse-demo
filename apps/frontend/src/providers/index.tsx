import { ReactNode } from "react";
import LanguageProvider from "./LanguageProvider";
import MuiThemeProvider from "./ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

type ProvidersPropsType = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersPropsType) => {
  return (
    <LanguageProvider>
      <AppRouterCacheProvider>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </AppRouterCacheProvider>
    </LanguageProvider>
  );
};

export default Providers;
