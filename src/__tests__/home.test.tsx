import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../pages/index";

test("Pages Router", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));

  const welcomeMessage = within(main.getByRole("p", { name: /Welxome/i }));
  expect(welcomeMessage).toBeDefined();
});
