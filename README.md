# DfE Login Express sanitization middleware
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)


# Usage

## Basic
The following example will sanitize both req.query and req.body values
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const sanitization = require('login.dfe.sanitization');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// This line must come AFTER using body-parser
app.use(sanitization());
```

## Customise what is sanitized
You can also specify if you want to not sanitise either query or body values

```javascript
app.use(sanitization({
  sanitizeQuery: false,
}));
```

```javascript
app.use(sanitization({
  sanitizeBody: false,
}));
```

## Customise sanitization
You can also customise the sanitization routine. The following example shows applying a custom rule to enforce a specific regex for a uid parameter.

```javascript
app.use(sanitization({
  sanitizer: (key, value) => {
    if(key.toLowerCase() === 'uid') {
      return !/^[A-Za-z0-9]+$/.test(value) ? '' : value;
    } else {
      // You can still call the default sanitizer too
      return sanitization.defaultSanitizer(key, value);
    }
  },
}));
```
