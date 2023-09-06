const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const users = [{ id: 1, username: 'Ando', age: 18 }];

const app = express();
app.use(cors());

const createUserFunc = (data) => {
  const id = Date.now();
  return {
    id,
    ...data,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },

  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },

  createUser: ({ input }) => {
    const user = createUserFunc(input);
    users.push(user);

    return user;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(600, () => console.log('Started on 5000 port'));
