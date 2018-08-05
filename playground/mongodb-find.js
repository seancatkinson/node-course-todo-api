// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const dbPath = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbPath, (error, db) => {
    if (error != undefined) {
        return console.log('Unable to connect to mongodb server:', error);
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID("5b60c71c31ef2dc29b02ad8e")
    // }).toArray().then((documents) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(documents, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch todos', error)
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (error) => {
    //     console.log('Unable to fetch todos', error)
    // });

    db.collection('Users').find({
        name: 'Sean Atkinson'
    }).toArray().then((documents) => {
        console.log('Todos');
        console.log(JSON.stringify(documents, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch todos', error)
    });


    // db.close();
});
