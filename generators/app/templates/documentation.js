const config = require('./config');

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
          }
        }
      }
    }
  },
  components: {
    schemas: {
      userId: {
        type: 'integer',
        example: 7
      },
      username: {
        type: 'string',
        example: 'tom99'
      },
      userEmail: {
        type: 'string',
        example: 'tom.engels@wolox.com.ar'
      },
      User: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/userId'
          },
          username: {
            $ref: '#/components/schemas/username'
          },
          email: {
            $ref: '#/components/schemas/userEmail'
          },
        }
      },
      Users: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/User'
            }
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          internal_code: {
            type: 'string'
          }
        }
      }
    },
    securitySchemes: {}
  }
};
  