Split next.js handlers by http methods

## Installation

```
npm i next-methods --save
```
## Usage

Usage:

```javascript
import { withMethodHandler } from 'next-methods';

export default withMethodHandler({
  'PUT': handlePut,
  'GET': handleGet,
);
```

Example combining with other wrappers:

```javascript
export default withApiAuthRequired(
  withMethodHandler({
    'PUT': handlePut,
    'GET': handleGet,
  })
);
```

By default it will return 404 for unhandled methods but you can override the behavior as follows:

```javascript
export default withMethodHandler({
  'PUT': handlePut,
  'GET': handleGet,
  'other': (req, res) => res.status(400).end()
);
```

## License

MIT 2021 - José F. Romaniello
