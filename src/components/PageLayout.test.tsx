import React from "react";
import { PageLayout } from "./PageLayout";
import * as UseAuthModule from "../providers/auth/hooks/useAuth";
import { renderWithProviders } from "../testUtils";
import { User } from "../providers/auth/types";

describe("PageLayout", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("must render correctly", async () => {
    jest.spyOn(UseAuthModule, "useAuth").mockImplementation(() => ({
      isAuthenticated: true,
      user: {} as User,
      login: jest.fn(),
      logout: jest.fn(),
    }));
    const { queryByText } = renderWithProviders(
      <PageLayout>
        <>dummy</>
      </PageLayout>
    );
    expect(queryByText("dummy")).toBeInTheDocument();
  });
});
