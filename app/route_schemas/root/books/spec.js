const GET = {
  type: 'object',
  required: ['headers', 'query'],
  properties: {
    headers: {
      type: 'object',
      required: ['authorization'],
      properties: {
        authorization: { type: 'string' }
      }
    },
    query: {
      type: 'object',
      required: ['foo'],
      properties: {
        foo: { type: 'number' },
        bar: { type: 'number', maximum: 3 }
      }
    }
  }
};

const POST = {
  type: 'object',
  required: ['headers', 'query'],
  properties: {
    headers: {
      type: 'object',
      required: ['authorization'],
      properties: {
        authorization: { type: 'string' }
      }
    },
    body: {
      type: 'object',
      required: ['foo'],
      properties: {
        foo: { type: 'string', length: 3 },
        bar: { type: 'number', maximum: 3 }
      }
    }
  }
};

module.exports = {
  GET,
  POST
};
