import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import * as UseAuthModule from "../hooks/useAuth";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { User } from "../types";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("must redirect if user is not logged in", async () => {
    const history = createMemoryHistory();
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByText } = render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute>
          <>dummy</>
        </ProtectedRoute>
      </Router>
    );
    expect(queryByText("dummy")).not.toBeInTheDocument();
  });

  it("must render children if user is logged in", async () => {
    const history = createMemoryHistory();
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: true,
      user: {} as User,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByText } = render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute>
          <>dummy</>
        </ProtectedRoute>
      </Router>
    );
    expect(queryByText("dummy")).toBeInTheDocument();
  });
});
