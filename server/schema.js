const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type Post {
        id: ID,
        title: String,
        content: String
    }

    type User {
        id: ID,
        username: String,
        age: Int,
        posts: [Post]
    }

    input PostInput {
        id: ID,
        title: String!,
        content: String!,
    }

    input UserInput {
        id: ID,
        username: String!,
        age: Int!,
        posts: [PostInput]
    }


    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        createUser(input: UserInput): User
    }

`);

module.exports = schema;
