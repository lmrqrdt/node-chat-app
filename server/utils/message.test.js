let expect = require('expect');

let {generateMessage} = require('./message');

describe ('generateMessage', () => {
  let from = "Anybody";
  let text = "Just checking";
  let message = generateMessage(from, text);

  it('should generate correct message object', () => {
    expect(message).toMatchObject({
      from: from,
      text: text,
    })
    //.expect(typeof message.createdAt).toBe('number')
  });
});
