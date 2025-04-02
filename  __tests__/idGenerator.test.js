const { generateShortId } = require("../services/idGenerator");

describe("Short ID Generator", () => {
  test("generates a non-empty string", () => {
    const id = generateShortId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  test("generates strings of correct length", () => {
    const id = generateShortId(10);
    expect(id.length).toBe(10);
  });

  test("generates unique strings", () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i++) {
      ids.add(generateShortId());
    }
    expect(ids.size).toBe(1000); // No collisions in 1000 generations
  });
});
