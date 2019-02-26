const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {pp} = require('./functions');

var id = '5c75866d57986506b005c987';

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', pp(todos));
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', pp(todo));
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', pp(todo));
// }).catch((e) => console.log(pp(e)));

var userId = '5c744c8997b6d29033ef2b52';

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log('User by Id', pp(user));
}).catch((e) => console.log(pp(e)));
