const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let result01 = isRealString(123);
    expect(result01).toBeFalsy;
  });

  it('should reject string with only spaces', () => {
    let result02 =isRealString('     ');
    expect(result02).toBeFalsy;
  });

  it('should allow string with non-space characters', () => {
    let result03 = isRealString('   Larry   ');
    expect(result03).toBeTruthy;
  });
});
