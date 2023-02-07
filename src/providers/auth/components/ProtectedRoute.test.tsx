import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import * as UseAuthModule from "../hooks/useAuth";
import { User } from "../types";
import { renderWithProviders } from "../../../testUtils";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("must redirect if user is not logged in", async () => {
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByText } = renderWithProviders(
      <ProtectedRoute>
        <>dummy</>
      </ProtectedRoute>
    );
    expect(queryByText("dummy")).not.toBeInTheDocument();
  });

  it("must render children if user is logged in", async () => {
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: true,
      user: {} as User,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByText } = renderWithProviders(
      <ProtectedRoute>
        <>dummy</>
      </ProtectedRoute>
    );
    expect(queryByText("dummy")).toBeInTheDocument();
  });
});
