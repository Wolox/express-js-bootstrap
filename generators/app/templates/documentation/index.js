const config = require('../config');
const schemas = require('./schemas');

const port = config.common.api.port || 8080;

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '0.1.0',
    title: '<%= projectName %>',
    description: '<%= projectDescription %>',
    termsOfService: '',
    contact: {
      name: 'Wolox',
      email: 'tls@wolox.com.ar',
      url: 'https://www.wolox.com.ar/'
    },
    license: {
      name: 'MIT'
    }
  },
  servers: [
    {
      url: `http://localhost:${port}/`,
      description: 'Local server'
    },
    {
      url: 'https://api_url_testing',
      description: 'Testing server'
    }
  ],
  security: [],
  tags: [
    {
      name: 'CRUD operations'
    }
  ],
  paths: {
    '/users': {
      get: {
        tags: ['CRUD operations'],
        description: 'Get users',
        operationId: 'getUsers',
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              default: 1
            },
            required: false
          }
        ],
        responses: {
          200: {
            description: 'Users were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Users'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['CRUD operations'],
        description: 'Create user',
        operationId: 'createUser',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'New user was created'
          },
          400: {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'User´s email already exists',
                  internal_code: 'invalid_parameters'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: schemas,
    securitySchemes: {}
  }
};
  