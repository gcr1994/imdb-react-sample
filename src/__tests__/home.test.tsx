import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../app/page";

test("Pages Router", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));

  const link = within(main.getByRole("link", { name: /Vercel logo/i }));
  expect(link.getByRole("img", { name: /Vercel logo/i })).toBeDefined();
});
