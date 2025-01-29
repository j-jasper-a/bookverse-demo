import LanguageProvider from "./LanguageProvider";
import TanStackQueryClientProvider from "./TanStackQueryClientProvider";
import MuiThemeProvider from "./ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ReactNode } from "react";

type ProvidersPropsType = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersPropsType) => {
  return (
    <LanguageProvider>
      <AppRouterCacheProvider>
        <MuiThemeProvider>
          <TanStackQueryClientProvider>{children}</TanStackQueryClientProvider>
        </MuiThemeProvider>
      </AppRouterCacheProvider>
    </LanguageProvider>
  );
};

export default Providers;
