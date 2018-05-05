let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe ('generateMessage', () => {
  let from = "Anybody";
  let text = "Just checking";
  let message = generateMessage(from, text);

  it('should generate correct message object', () => {
    expect(message).toMatchObject({
      from: from,
      text: text,
      //createdAt: createTime,
    });
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
      let from = 'Admin';
      let latitude = 13;
      let longitude = 15;
      let url = 'https://www.google.com/maps?q=13,15';
      let message = generateLocationMessage(from, latitude, longitude);

      expect(message).toMatchObject({
        from: from,
        url: url
      })
      expect(typeof message.createdAt).toBe('number');
  });
});
