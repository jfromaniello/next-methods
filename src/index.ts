import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type HttpMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE' | 'other';

type ApiHandlerParams = {
  [method in HttpMethod]?: NextApiHandler<unknown>;
};

export function withMethodHandler(params: ApiHandlerParams) : NextApiHandler<unknown> {
  const onUnknownMethod: NextApiHandler<unknown> = typeof params.other !== 'undefined' ?
    params.other :
    (req, res) => res.status(404).end();

  return async function(
    req: NextApiRequest,
    res: NextApiResponse<unknown>
  ) : Promise<void> {
    const method = req.method as HttpMethod;
    const handler = params[method];
    if (typeof handler === 'undefined') {
      return onUnknownMethod(req, res);
    }
    return handler(req, res);
  };
}
