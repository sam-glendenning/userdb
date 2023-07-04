// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, type RenderOptions } from "@testing-library/react";
import React from "react";

const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: { log: console.log, warn: console.warn, error: jest.fn() },
  });

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  queryClient: QueryClient;
}

export const renderComponentWithQueryClient = (
  ui: React.ReactElement,
  { queryClient, ...renderOptions }: ExtendedRenderOptions = {
    queryClient: createTestQueryClient(),
  }
) => {
  const Wrapper = ({
    children,
  }: React.PropsWithChildren<unknown>): JSX.Element => (
    <QueryClientProvider client={queryClient ?? createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );

  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
