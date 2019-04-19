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

app.use('/api', graphQlHTTP({
    schema: schema,
    rootValue: {
        todos: () => {
            const todo = new Todo();
            todo.find()

        },

        createTodo: (args) => {
            const todo = new Todo({
                title: args.TodoInput.title,
                description: args.TodoInput.description,
                date: new Date(args.TodoInput.date),
                status: args.TodoInput.status,
                todoType: args.TodoInput.todoType
            });
            return todo.save().then(response => {
                console.log(response);
                return {
                    ...response._doc
                };
            }).catch(err => {
                console.log(err);
                throw err;
            });
        }
    },
    graphiql: true
}));

mongoose
    .connect(
        `mongodb+srv://TestUser:Password@clustermumbai-w8lgo.mongodb.net/test?retryWrites=true`, {
            useNewUrlParser: true
        }).then(() => {
        console.log('Listening to port 8000....');
        app.listen('8000');
    }).catch(err => {
        console.log(' Error: ', err);
    });