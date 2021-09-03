import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withMethodHandler } from '../src';

describe('withMethodHandler', () => {
  let handler: NextApiHandler<unknown>;

  beforeAll(function() {
    handler = withMethodHandler({
      'POST': (req, res) => res.json({ is: req.method }),
      'GET': (req, res) => res.json({ is: req.method }),
    });
  })

  it('should work for mapped method', async () => {
    const req = { method: 'POST'} as NextApiRequest;
    let body: { is?: string } = {};
    const res = { json(b) { body = b; } } as NextApiResponse;
    await handler(req, res);
    expect(body.is).toStrictEqual('POST');
  });

  it('should return 404 for unmapped methods', async() => {
    const req = { method: 'PATCH'} as NextApiRequest;
    let statusCode = 0;
    const res = {
      status(s) {
        statusCode = s;
        return { end(){} }
      }
    } as NextApiResponse;
    await handler(req, res);
    expect(statusCode).toStrictEqual(404);
  });

  describe('with custom default handler', () => {
    let handlerWithCustomDefaultFunc: NextApiHandler<unknown>;
    let called = false;

    beforeAll(function() {
      handlerWithCustomDefaultFunc = withMethodHandler({
        'POST': (req, res) => res.json({ is: req.method }),
        'other': (req, res) => {
          called = true;
          res.status(400).end()
        }
      });
    });

    it('should use the custom handler', async() => {
      const req = { method: 'PATCH'} as NextApiRequest;
      let statusCode = 0;
      const res = {
        status(s) {
          statusCode = s;
          return { end(){} }
        }
      } as NextApiResponse;
      await handlerWithCustomDefaultFunc(req, res);
      expect(statusCode).toStrictEqual(400);
      expect(called).toBeTruthy();
    });
  });
});
