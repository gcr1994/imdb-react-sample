import ButtonBar from "@/components/ButtonBar";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ButtonBar />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
