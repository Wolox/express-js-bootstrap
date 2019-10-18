module.exports = {
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
  }
};
