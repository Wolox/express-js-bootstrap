const userFactory = require('../factories/user'),
  { Mutation: mutations } = require('../../app/graphql/users/resolvers');

describe('users', () => {
  describe('resolvers', () => {
    describe('createUser', () => {
      it('should create an user successfuly', async () => {
        const user = await userFactory.build();
        mutations.createUser({}, { user: user.dataValues }).then(res => {
          expect(res.dataValues).toHaveProperty('id');
          expect(res.dataValues).toHaveProperty('firstName');
          expect(res.dataValues).toHaveProperty('lastName');
          expect(res.dataValues).toHaveProperty('email');
          expect(res.dataValues).toHaveProperty('username');
          expect(res.dataValues).toHaveProperty('password');
          expect(res.dataValues).toHaveProperty('updatedAt');
          expect(res.dataValues).toHaveProperty('createdAt');
        });
      });

      it('should fail to create an user with malformed parameters', () => {
        mutations.createUser({}, { user: { a: 'b' } }).catch(err => {
          expect(typeof err.errors).toBe('object');
          expect(err.errors).toHaveLength();
        });
      });
    });
  });
});
