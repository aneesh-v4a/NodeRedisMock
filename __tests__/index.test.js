const redis = require("async-redis");
const lambdaHandler = require("../index").handler;

jest.mock("async-redis", () => ({
  createClient: jest.fn().mockReturnValue({
    on: jest.fn((event, handler) => {
      if (event === "error") {
        handler("error");
      }
    }),
    quit: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
  }),
}));

describe("Trying to Mock async-redis", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });
  it("mocking error in on", async () => {
    redis.createClient().set.mockRejectedValue("example");
    const result = await lambdaHandler();
    expect(redis.createClient().on).toHaveBeenCalledWith(
      "error",
      expect.any(Function)
    );
    expect(console.log.mock.calls[0][0]).toBe("here");
    expect(console.log.mock.calls[1][0]).toBe("error");
  });
});
