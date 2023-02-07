import React from "react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { SignUp } from "./SignUp";
import { renderWithProviders } from "../../testUtils";
import { ApiRoute } from "../../enums/ApiRoute";
import { act, waitFor } from "@testing-library/react";

const server = setupServer(
  rest.post(ApiRoute.SIGNUP, (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

describe("SignUp", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { queryByRole } = renderWithProviders(<SignUp />);
    expect(queryByRole("heading", { name: "Sign up" })).toBeInTheDocument();
  });

  it("should show required errors", () => {
    const { getByRole, getByText } = renderWithProviders(<SignUp />);
    act(() => {
      userEvent.click(getByRole("button", { name: "Sign up" }));
    });
    waitFor(() => {
      expect(getByText("Email is required")).toBeInTheDocument();
      expect(getByText("First name is required")).toBeInTheDocument();
      expect(getByText("Password is required")).toBeInTheDocument();
      expect(getByText("Confirm password is required")).toBeInTheDocument();
    });
  });

  it("should show password don't match error", () => {
    const { getByRole, getByText, getByTestId } = renderWithProviders(
      <SignUp />
    );
    act(() => {
      userEvent.type(getByTestId("password"), "fooB4rPassW0rd");
      userEvent.type(getByTestId("confirmPassword"), "does not match");
      userEvent.click(getByRole("button", { name: "Sign up" }));
    });
    waitFor(() => {
      expect(getByText("Your passwords do no match")).toBeInTheDocument();
    });
  });

  it("should show alert on successfull login", () => {
    const { getByRole, getByTestId, getByText, queryByRole } =
      renderWithProviders(<SignUp />);
    act(() => {
      userEvent.type(getByTestId("email"), "foo@bar.com");
      userEvent.type(getByTestId("firstName"), "John");
      userEvent.type(getByTestId("password"), "fooB4rPassW0rd");
      userEvent.type(getByTestId("confirmPassword"), "fooB4rPassW0rd");
      userEvent.click(getByRole("button", { name: "Sign up" }));
    });
    waitFor(() => {
      expect(getByText("Account created.")).toBeInTheDocument();
      expect(
        getByText("We've created your account, proceed to login.")
      ).toBeInTheDocument();
      expect(
        queryByRole("heading", { name: "Sign up" })
      ).not.toBeInTheDocument();
    });
  });

  it("should show alert on error", () => {
    server.use(
      rest.post(ApiRoute.SIGNUP, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { getByRole, getByTestId, getByText } = renderWithProviders(
      <SignUp />
    );
    act(() => {
      userEvent.type(getByTestId("email"), "foo@bar.com");
      userEvent.type(getByTestId("firstName"), "John");
      userEvent.type(getByTestId("password"), "fooB4rPassW0rd");
      userEvent.type(getByTestId("confirmPassword"), "fooB4rPassW0rd");
      userEvent.click(getByRole("button", { name: "Sign up" }));
    });
    waitFor(() => {
      expect(getByText("Server error.")).toBeInTheDocument();
      expect(getByText("Account failed to be created.")).toBeInTheDocument();
    });
  });
});
