jest.mock('sanitizer');
jest.mock('htmlencode');

const { sanitize } = require('sanitizer');
const { htmlEncode } = require('htmlencode');
const sanatizeAndEncode = require('./../lib/defaultSanitizer');

describe('when sanatizing using the default sanatizer', () => {
  it('then it should sanatize and encode string values', () => {
    sanitize.mockReset().mockReturnValue('sanatized');
    htmlEncode.mockReset().mockReturnValue('encoded');

    const actual = sanatizeAndEncode('key', 'value');

    expect(actual).toBe('encoded');
    expect(sanitize.mock.calls).toHaveLength(1);
    expect(sanitize.mock.calls[0][0]).toBe('value');
    expect(htmlEncode.mock.calls).toHaveLength(1);
    expect(htmlEncode.mock.calls[0][0]).toBe('sanatized');
  });

  it('then it should sanatize and encode all properties of object values', () => {
    sanitize.mockReset().mockImplementation((value) => {
      return 'sanatized-' + value;
    });
    htmlEncode.mockReset().mockImplementation((value) => {
      return 'encoded-' + value;
    });

    const actual = sanatizeAndEncode('key', {
      one: 'value1',
      two: 'value2',
      three: {
        a: 'value3',
        b: 'value4',
      },
    });

    expect(actual).toEqual({
      one: 'encoded-sanatized-value1',
      two: 'encoded-sanatized-value2',
      three: {
        a: 'encoded-sanatized-value3',
        b: 'encoded-sanatized-value4',
      },
    });
    expect(sanitize.mock.calls).toHaveLength(4);
    expect(sanitize.mock.calls[0][0]).toBe('value1');
    expect(sanitize.mock.calls[1][0]).toBe('value2');
    expect(sanitize.mock.calls[2][0]).toBe('value3');
    expect(sanitize.mock.calls[3][0]).toBe('value4');
    expect(htmlEncode.mock.calls).toHaveLength(4);
    expect(htmlEncode.mock.calls[0][0]).toBe('sanatized-value1');
    expect(htmlEncode.mock.calls[1][0]).toBe('sanatized-value2');
    expect(htmlEncode.mock.calls[2][0]).toBe('sanatized-value3');
    expect(htmlEncode.mock.calls[3][0]).toBe('sanatized-value4');
  });

  it('then it should sanatize and encode all elements of array values', () => {
    sanitize.mockReset().mockImplementation((value) => {
      return 'sanatized-' + value;
    });
    htmlEncode.mockReset().mockImplementation((value) => {
      return 'encoded-' + value;
    });

    const actual = sanatizeAndEncode('key', ['value1', 'value2']);

    expect(actual[0]).toBe('encoded-sanatized-value1');
    expect(actual[1]).toBe('encoded-sanatized-value2');
    expect(sanitize.mock.calls).toHaveLength(2);
    expect(sanitize.mock.calls[0][0]).toBe('value1');
    expect(sanitize.mock.calls[1][0]).toBe('value2');
    expect(htmlEncode.mock.calls).toHaveLength(2);
    expect(htmlEncode.mock.calls[0][0]).toBe('sanatized-value1');
    expect(htmlEncode.mock.calls[1][0]).toBe('sanatized-value2');
  });
});