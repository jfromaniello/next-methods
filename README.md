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

## License
