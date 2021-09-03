Split next.js handlers by http methods

## Installation


## Usage

Usage:

```javascript
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
