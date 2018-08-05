// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const dbPath = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbPath, (error, db) => {
    if (error != undefined) {
        return console.log('Unable to connect to mongodb server:', error);
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // challenge
    // db.collection('Users').deleteMany({name: 'Sean Atkinson'}).then((result) => {
    //     console.log(result);
    // });
    //
    // db.collection('Users').findOneAndDelete({_id: new ObjectID('5b60c7dfccea69c2b18d9875')}).then((result) => {
    //     console.log(result);
    // });

    // db.close();
});
