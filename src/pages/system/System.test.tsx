import React from "react";
import { System } from "./System";
import { renderWithProviders } from "../../testUtils";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { ApiRoute } from "../../enums/ApiRoute";
import {fireEvent, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get(ApiRoute.USERS, (req, res, ctx) => {
    return res(
      ctx.body(
        JSON.stringify([
          {
            id: "1",
            firstName: "Foo",
            lastName: "",
            email: "foo@bar.com",
            role: "ROOT",
            priority: 50,
          },
          {
            id: "2",
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            role: "DEFAULT",
            priority: 1,
          },
        ])
      )
    );
  }),
  rest.post(`${ApiRoute.USERS}/*`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

describe("System", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });
  afterAll(() => server.close());

  it("must render correctly", async () => {
    const { getByRole, getByText } = renderWithProviders(<System />);
    expect(
      getByRole("heading", { name: "System settings" })
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(getByRole("table")).toBeInTheDocument();
      expect(getByText("foo@bar.com")).toBeInTheDocument();
      expect(getByText("john@doe.com")).toBeInTheDocument();
    });
  });

  it("must change priority", () => {
    const { getAllByTestId } = renderWithProviders(<System />);
    waitFor(() => {
      const input = getAllByTestId("priority")[0];
      userEvent.type(input, "3");
      fireEvent.focusOut(input);
      expect(input).toHaveValue("3");
    });
  });

  it("must show error if request fails", () => {
    server.use(
      rest.get(ApiRoute.USERS, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { getByRole } = renderWithProviders(<System />);
    waitFor(() => {
      expect(
        getByRole("alert", {
          name: "There was an error retrieving users list.",
        })
      ).toBeInTheDocument();
    });
  });
});
