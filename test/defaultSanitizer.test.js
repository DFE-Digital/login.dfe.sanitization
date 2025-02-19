jest.mock("sanitizer");

const { sanitize } = require("sanitizer");

const sanatizeAndEncode = require("./../lib/defaultSanitizer");

describe("when sanatizing using the default sanatizer", () => {
  it("then it should sanatize and encode string values", () => {
    sanitize.mockReset().mockReturnValue("sanatized");
    const actual = sanatizeAndEncode("key", "value");

    expect(actual).toBe("sanatized");
    expect(sanitize.mock.calls).toHaveLength(1);
    expect(sanitize.mock.calls[0][0]).toBe("value");
  });

  it("then it should sanatize and encode all properties of object values", () => {
    sanitize.mockReset().mockImplementation((value) => {
      return "sanatized-" + value;
    });
    const actual = sanatizeAndEncode("key", {
      one: "value1",
      two: "value2",
      three: {
        a: "value3",
        b: "value4",
      },
    });

    expect(actual).toEqual({
      one: "sanatized-value1",
      two: "sanatized-value2",
      three: {
        a: "sanatized-value3",
        b: "sanatized-value4",
      },
    });
    expect(sanitize.mock.calls).toHaveLength(4);
    expect(sanitize.mock.calls[0][0]).toBe("value1");
    expect(sanitize.mock.calls[1][0]).toBe("value2");
    expect(sanitize.mock.calls[2][0]).toBe("value3");
    expect(sanitize.mock.calls[3][0]).toBe("value4");
  });

  it("then it should sanatize and encode all elements of array values", () => {
    sanitize.mockReset().mockImplementation((value) => {
      return "sanatized-" + value;
    });

    const actual = sanatizeAndEncode("key", ["value1", "value2"]);

    expect(actual[0]).toBe("sanatized-value1");
    expect(actual[1]).toBe("sanatized-value2");
    expect(sanitize.mock.calls).toHaveLength(2);
    expect(sanitize.mock.calls[0][0]).toBe("value1");
    expect(sanitize.mock.calls[1][0]).toBe("value2");
  });
});
