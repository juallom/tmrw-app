import React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

export const renderWithProviders = (component: React.ReactElement) => {
  const history = createMemoryHistory();
  const queryClient = new QueryClient();
  return render(
    <ChakraProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router location={history.location} navigator={history}>
            {component}
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
