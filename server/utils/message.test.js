const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generate message", () => {
  it("should generate correct message object", () => {
    let from = "Selçuk";
    let text = "Some text";
    const message = generateMessage(from, text);
    expect(message.createdAt).toBeAn("number");
    expect(message).toInclude({ from, text });
  });
});

describe("generate location message", () => {
  it("should generate correct location object", () => {
    let from = "asdas";
    let latitude = 12;
    let longitude = 23;
    let url = "https://www.google.com/maps?q=12,23";
    let message = generateLocationMessage(from, latitude, longitude);
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, url });
  });
});
