import React from "react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Navigation } from "./Navigation";
import { renderWithProviders } from "../testUtils";
import * as UseAuthModule from "../providers/auth/hooks/useAuth";
import { User, UserRole } from "../providers/auth/types";
import { ApiRoute } from "../enums/ApiRoute";
import { act, waitFor } from "@testing-library/react";

const server = setupServer(
  rest.get(ApiRoute.LOGOUT, (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

describe("Navigation", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });
  afterAll(() => server.close());

  it("should not render if user is not authenticated", () => {
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByRole } = renderWithProviders(<Navigation />);
    expect(queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("should render if user is authenticated", () => {
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: true,
      user: {} as User,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByRole } = renderWithProviders(<Navigation />);
    expect(queryByRole("navigation")).toBeInTheDocument();
  });

  it("should render system settings link if user is ROOT", () => {
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: true,
      user: { role: UserRole.ROOT } as User,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByRole } = renderWithProviders(<Navigation />);
    expect(
      queryByRole("link", { name: "System settings" })
    ).toBeInTheDocument();
  });

  it("should logout user when click", async () => {
    const logoutMock = jest.fn();
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: true,
      user: { role: UserRole.ROOT } as User,
      login: jest.fn(),
      logout: logoutMock,
    }));
    const { getByRole } = renderWithProviders(<Navigation />);
    act(() => {
      userEvent.click(getByRole("button", { name: "Logout" }));
    });

    await waitFor(() => {
      expect(logoutMock).toHaveBeenCalled();
    });
  });
});
