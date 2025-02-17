const { sanitize } = require("sanitizer");
const { htmlEncode } = require("htmlencode");

const sanatizeAndEncode = (key, value) => {
  let sanatised = value;
  if (typeof sanatised === "string") {
    sanatised = sanitize(sanatised);
    sanatised = htmlEncode(sanatised);
  } else if (sanatised instanceof Object) {
    Object.keys(sanatised).forEach((prop) => {
      sanatised[prop] = sanatizeAndEncode(prop, sanatised[prop]);
    });
  }
  return sanatised;
};

module.exports = sanatizeAndEncode;
