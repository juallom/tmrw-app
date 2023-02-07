import React from "react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Login } from "./Login";
import { renderWithProviders } from "../../testUtils";
import { ApiRoute } from "../../enums/ApiRoute";
import { act, waitFor } from "@testing-library/react";

const server = setupServer(
  rest.post(ApiRoute.LOGIN, (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});

describe("Login", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { queryByRole } = renderWithProviders(<Login />);
    expect(queryByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("should show required errors", () => {
    const { getByRole, getByText } = renderWithProviders(<Login />);
    act(() => {
      userEvent.click(getByRole("button", { name: "Login" }));
    });
    waitFor(() => {
      expect(getByText("Email is required")).toBeInTheDocument();
      expect(getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should show incorrect email error", () => {
    const { getByRole, getByTestId, getByText } = renderWithProviders(
      <Login />
    );
    act(() => {
      userEvent.type(getByTestId("email"), "foo");
      userEvent.click(getByRole("button", { name: "Login" }));
    });
    waitFor(() => {
      expect(getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("should navigate on successful login", () => {
    const { getByRole, getByTestId, queryByText, queryByRole } =
      renderWithProviders(<Login />);
    act(() => {
      userEvent.type(getByTestId("email"), "foo@bar.com");
      userEvent.type(getByTestId("password"), "fooB4rPassW0rd");
      userEvent.click(getByRole("button", { name: "Login" }));
    });
    waitFor(() => {
      expect(queryByText("Email is required")).not.toBeInTheDocument();
      expect(queryByText("Password is required")).not.toBeInTheDocument();
      expect(queryByRole("heading", { name: "Login" })).not.toBeInTheDocument();
    });
  });

  it("should show alert on error", () => {
    server.use(
      rest.post(ApiRoute.LOGIN, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { getByRole, getByTestId, getByText } = renderWithProviders(
      <Login />
    );
    act(() => {
      userEvent.type(getByTestId("email"), "foo@bar.com");
      userEvent.type(getByTestId("password"), "fooB4rPassW0rd");
      userEvent.click(getByRole("button", { name: "Login" }));
    });
    waitFor(() => {
      expect(getByText("Server error")).toBeInTheDocument();
      expect(
        getByText("Login failed, please try again later.")
      ).toBeInTheDocument();
    });
  });
});
