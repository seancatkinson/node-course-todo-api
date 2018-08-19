const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

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
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400);
        res.send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (ObjectID.isValid(id) == false) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (todo == null) {
            return res.status(404).send();
        }

        res.status(200).send({todo});
    }, (e) => {
        res.status(400).send();
    });
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
