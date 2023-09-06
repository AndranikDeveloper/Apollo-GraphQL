import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      username
      id
      age
    }
  }
`;

export const GET_ONE_USER = gql`
  query ($id: ID) {
    getUser(id: $id) {
      username
      id
    }
  }
`;
