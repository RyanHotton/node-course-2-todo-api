const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { pp } = require('./functions');

// Todo.remove({}).then((result) => {
//     console.log(pp(result));
// });

// Todo.findOneAndRemove({})

// Todo.findByIdAndDelete('5c770fb2f8ca3fa340eb0dc0').then((todo) => {
//     console.log(pp(todo));
// });