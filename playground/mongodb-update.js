// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const dbPath = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbPath, (error, db) => {
    if (error != undefined) {
        return console.log('Unable to connect to mongodb server:', error);
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b66dd4cc0cbac7a92254fa8')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // challenge
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b66e69dc0cbac7a92255258')
    }, {
        $set: {
            name: 'Jessica'
        },
        $inc: {
            age: 1
        }
    })

    // db.close();
});
