import { QueryClientProvider, useQueryClient } from "react-query";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const client = useQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
