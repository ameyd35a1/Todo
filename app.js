const express = require('express');
const bodyParser = require('body-parser');
const graphQlHTTP = require('express-graphql');
const {
  buildSchema
} = require('graphql');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

var schema = buildSchema(`

    type Todo {
        _id: ID!
        title: String!
        description: String
        date: String
        status: Boolean!
        todoType: String!
    }

    input TodoInput {
        title: String!
        description: String
        date: String
        status: Boolean!
        todoType: String!
    }

    type RootQuery {
        todos: [Todo!]!
    }

    type RootMutation {
        createTodo(todoInput: TodoInput): Todo!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  '/api',
  graphQlHTTP({
    schema: schema,
    rootValue: {
      todos: async () => {
        const todos = await Todo.find().sort({
          date: 1
        });
        return todos.map(todo => {
          return {
            ...todo._doc,
            date: new Date(todo._doc.date).toISOString()
          };
        });
      },

      createTodo: args => {
        const todo = new Todo({
          title: args.todoInput.title,
          description: args.todoInput.description,
          date: new Date(args.todoInput.date),
          status: args.todoInput.status,
          todoType: args.todoInput.todoType
        });

        return todo
          .save()
          .then(response => {
            console.log(response);
            return {
              ...response._doc
            };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://TestUser:Password@clustermumbai-w8lgo.mongodb.net/todo?retryWrites=true`, {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('Listening to port 8000....');
    app.listen('8000');
  })
  .catch(err => {
    console.log(' Error: ', err);
  });