import React from "react";
import {
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import { renderComponentWithQueryClient } from "./setupTests";
import usersJson from "./users.json";
import axios from "axios";

describe("App", () => {
  const createView = (): RenderResult =>
    renderComponentWithQueryClient(<App />);

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: usersJson,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { asFragment } = createView();

    await waitForElementToBeRemoved(screen.queryByText("Loading users..."));

    expect(asFragment()).toMatchSnapshot();
  });
});
