import React from "react";
import App from "./App";
import { renderWithProviders } from "./testUtils";

describe("App", () => {
  it("should render correctly", () => {
    const { getByRole } = renderWithProviders(<App />);
    expect(getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });
});
