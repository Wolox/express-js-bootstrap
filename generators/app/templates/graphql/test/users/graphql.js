const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          firstName,
          lastName,
          email
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      firstName
      lastName
      email
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation createUser($userInput: UserInput!) {
      createUser(user: $userInput) {
        firstName
        lastName
        id
        username
        password
        email
      }
    }
  `,
  variables: { userInput }
});

module.exports = { getUser, getUsers, createUser };
