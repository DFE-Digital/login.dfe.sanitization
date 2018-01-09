const sanitization = require('./../lib');
const middleware = sanitization();

describe('When using default options', () => {
  const req = {
    query: {
      bad: '<script>alert(1);</script>',
      good: 'test',
      mixed: 'te<script>alert(1);</script>st'
    },
    body: {
      bad: '<script>alert(1);</script>',
      good: 'test',
      mixed: 'te<script>alert(1);</script>st'
    },
  };
  const res = {};
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
  });


  it('then it sanitize purely bad query params', () => {
    middleware(req, res, next);

    expect(req.query.bad).toBe('');
  });

  it('then it leave purely good query params untouched', () => {
    middleware(req, res, next);

    expect(req.query.good).toBe('test');
  });

  it('then it sanitize query params with bad mixed in good', () => {
    middleware(req, res, next);

    expect(req.query.mixed).toBe('test');
  });


  it('then it sanitize purely bad body params', () => {
    middleware(req, res, next);

    expect(req.body.bad).toBe('');
  });

  it('then it leave purely good body params untouched', () => {
    middleware(req, res, next);

    expect(req.body.good).toBe('test');
  });

  it('then it sanitize body params with bad mixed in good', () => {
    middleware(req, res, next);

    expect(req.body.mixed).toBe('test');
  });


  it('then it should call next', () => {
    middleware(req, res, next);

    expect(next.mock.calls).toHaveLength(1);
  })
});