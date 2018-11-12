const sanitizer = require('sanitizer');
const htmlencode = require('htmlencode');

const sanatizeAndEncode = (key, value) => {
  let sanatised = value;
  if (typeof sanatised === 'string') {
    sanatised = sanitizer.sanitize(sanatised);
    sanatised = htmlencode.htmlEncode(sanatised);
  } else if (sanatised instanceof Array) {
    Object.keys(sanatised).forEach((prop) => {
      sanatised[prop] = sanitizer.sanitize(sanatised[prop]);
    });
  } else if (sanatised instanceof Object) {
    Object.keys(sanatised).forEach((prop) => {
      sanatised[prop] = sanatiseAndEncode(sanatised[prop]);
    });
  }
  return sanatised;
};

module.exports = sanatizeAndEncode;
