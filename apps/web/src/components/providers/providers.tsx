import { MuiThemeProvider } from "@/components/providers/mui-theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ReactNode } from "react";

type ProvidersProps = {
  children?: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <MuiThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
