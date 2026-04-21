/// <reference types="jest" />
import MockAdapter from "axios-mock-adapter";
import client from "../client";
import type { ApiError } from "../types";
import { API_BASE_URL, API_TIMEOUT_MS } from "../../config";

const mock = new MockAdapter(client);

afterEach(() => {
  mock.reset();
});

describe("API client configuration", () => {
  it("has the correct baseURL", () => {
    expect(client.defaults.baseURL).toBe(API_BASE_URL);
  });

  it("has a 10 000 ms timeout", () => {
    expect(client.defaults.timeout).toBe(API_TIMEOUT_MS);
  });
});

describe("API client error interceptor", () => {
  it("normalizes a 4xx response to ApiError with the correct status and message", async () => {
    mock.onGet("/pokemon/unknown").reply(404, { message: "Not Found" });

    await expect(client.get("/pokemon/unknown")).rejects.toMatchObject<
      Partial<ApiError>
    >({
      status: 404,
      message: "Not Found",
    });
  });

  it("normalizes a 5xx response to ApiError with the correct status and message", async () => {
    mock.onGet("/pokemon").reply(500, { message: "Internal Server Error" });

    await expect(client.get("/pokemon")).rejects.toMatchObject<
      Partial<ApiError>
    >({
      status: 500,
      message: "Internal Server Error",
    });
  });

  it("normalizes a network error (no response) to ApiError with status 0 and message", async () => {
    mock.onGet("/pokemon/1").networkError();

    const error = await client.get("/pokemon/1").catch((e) => e);

    expect(error).toMatchObject<Partial<ApiError>>({
      status: 0,
      message: "Network Error",
    });
  });
});
