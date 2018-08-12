const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

var app = express();

// Use bodyParser to parse our request body as json
app.use(bodyParser.json());

//create new todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(201);
        res.send(doc);
    }, (e) => {
        res.status(400);
        res.send(e);
    });
});

// get all todos
app.get('/todos', (req, res) => {
    console.log('Getting all todos')
})

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = {app};
