const expect = require("expect");
const { generateMessage } = require("./message");

describe("generate message", () => {
  it("should generate correct message object", () => {
    let from = "Selçuk";
    let text = "Some text";
    const message = generateMessage(from, text);
    expect(message.createdAt).toBeAn('number');
    expect(message).toInclude({ from, text });
  });
});
