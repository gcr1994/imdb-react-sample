import axios from "axios";

import { expect, test, vi, it } from "vitest";

const MOCK_GET_DATA = { data: { token: "token123", user: { _id: "12345" } } };

const MOCK_POST_DATA = { data: { message: "User Created" } };

const mocks = vi.hoisted(() => ({
  get: vi.fn((url) => {
    return { ...MOCK_GET_DATA, url };
  }),
  post: vi.fn((url) => {
    return { ...MOCK_POST_DATA, url };
  }),
}));

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

test("login", () => {
  const res = { ...MOCK_GET_DATA, url: "url" };

  it("returns mocked value", () => {
    const result = mocks.get("url");
    expect(result).toEqual(res);
  });
});
