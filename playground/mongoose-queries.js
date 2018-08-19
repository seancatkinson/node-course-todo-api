const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5b7065b9161e7dd535fc1246';
// const id = '6b7065b9161e7dd535fc1246'; // unused ID
const id = '5b7065b9161e7dd535fc124611'; // invalid id

// if (ObjectID.isValid(id) == false) {
//     console.log('ID not valid');
//     return
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// });

// Todo.findById(id).then((todo) => {
//     console.log('TodoById:', todo);
// }).catch((e) => {
//     console.log(e);
// });




const userID = '5b675613f710b6e73dc2a2c9';
if (ObjectID.isValid(userID) == false) {
    console.log('User ID is not valid');
    return;
}
User.findById(userID).then((user) => {
    if (!user) {
        return console.log('Unable to find user for ID: ', userID);
    }
    console.log(user);
}).catch((e) => console.log(e));
