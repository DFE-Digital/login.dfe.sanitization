const defaultSanitizer = require('./defaultSanitizer');
const defaultOpts = {
  sanitizer: defaultSanitizer,
  sanitizeQuery: true,
  sanitizeBody: true,
};

const patchOpts = (opts) => {
  let patchedOpts = Object.assign({}, defaultOpts);
  if (opts) {
    Object.assign(patchedOpts, opts);
  }
  return patchedOpts;
};
const sanatize = (source, sanatizer) => {
  const keys = Object.keys(source);
  keys.forEach((key) => {
    source[key] = sanatizer(key, source[key]);
  });
};

const middleware = (opts) => {
  const patchedOpts = patchOpts(opts);

  return (req, res, next) => {
    if(patchedOpts.sanitizeQuery && req.query) {
      sanatize(req.query, patchedOpts.sanitizer);
    }
    if(patchedOpts.sanitizeBody && req.body) {
      sanatize(req.body, patchedOpts.sanitizer);
    }
    return next();
  };
};
middleware.defaultSanitizer = defaultSanitizer;

module.exports = middleware;