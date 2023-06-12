import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
    }
  }
}
`;

export const ADD_USER = gql`
mutation AddUser($name: String!, $password: String!, $email: String!) {
  addUser(name: $name, password: $password, email: $email) {
    token
    user {
      name
    }
  }
}
`;