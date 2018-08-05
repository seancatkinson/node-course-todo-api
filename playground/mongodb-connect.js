// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// create new object IDs manually
// var obj = new ObjectID();
// console.log(obj);

const dbPath = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbPath, (error, db) => {
    if (error != undefined) {
        return console.log('Unable to connect to mongodb server:', error);
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (error, result) => {
    //     if (error != undefined) {
    //         return console.log('Unable to insert Todo:', error);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Sean Atkinson',
    //     age: 29,
    //     location: 'Glasgow'
    // }, (error, result) => {
    //     if (error != undefined) {
    //         return console.log('Unable to insert User:', error);
    //     }
    //
    //     // console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // })

    db.close();
});
