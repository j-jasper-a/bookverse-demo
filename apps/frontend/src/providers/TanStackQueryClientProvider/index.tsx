"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersPropsType = {
  children: React.ReactNode;
};

const TanStackQueryClientProvider = ({ children }: ProvidersPropsType) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanStackQueryClientProvider;
