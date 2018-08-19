const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}, {
    _id: new ObjectID(),
    text: 'Third test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(201)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err != undefined) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a new todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err != undefined) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it ('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if sent an invalid Object ID', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });

    it ('should return a 404 if Todo not found for valid ObjectID', (done) => {
        const unusedObjectID = new ObjectID()
        request(app)
            .get(`/todos/${unusedObjectID.toHexString()}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it ('should delete todo doc', (done) => {
        const idUnderTest = todos[0]._id.toHexString();
        const todoText = todos[0].text;
        request(app)
            .delete(`/todos/${idUnderTest}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todoText);
            })
            .end((err, res) => {
                if (err != undefined) {
                    return done(err);
                }

                Todo.findById(idUnderTest).then((todo) => {
                    expect(todo).toBe(null);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return a 404 if sent an invalid Object ID', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });

    it ('should return a 404 if Todo not found for valid ObjectID', (done) => {
        const unusedObjectID = new ObjectID()
        request(app)
            .delete(`/todos/${unusedObjectID.toHexString()}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update todo doc text', (done) => {
        const idUnderTest = todos[0]._id.toHexString();
        const todoText = todos[0].text;
        const text = 'The updated text from the test';

        request(app)
            .patch(`/todos/${idUnderTest}`)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
            })
            .end((err, res) => {
                if (err != undefined) {
                    return done(err);
                }

                Todo.findById(idUnderTest).then((todo) => {
                    expect(todo.text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should add a completedAt when todo completed set to true', (done) => {
        const idUnderTest = todos[0]._id.toHexString();

        request(app)
            .patch(`/todos/${idUnderTest}`)
            .send({completed:true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toNotBe(null);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end((err, res) => {
                if (err != undefined) {
                    return done(err);
                }

                Todo.findById(idUnderTest).then((todo) => {
                    expect(todo.completed).toBe(true);
                    expect(todo.completedAt).toNotBe(null);
                    expect(typeof todo.completedAt).toBe('number');
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should set completedAt to null when todo completed set to false', (done) => {
        const idUnderTest = todos[2]._id.toHexString();

        request(app)
            .patch(`/todos/${idUnderTest}`)
            .send({completed:false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end((err, res) => {
                if (err != undefined) {
                    return done(err);
                }

                Todo.findById(idUnderTest).then((todo) => {
                    expect(todo.completed).toBe(false);
                    expect(todo.completedAt).toBe(null);
                    done();
                }).catch((e) => done(e));
            });
    })

    it('should return a 404 if sent an invalid Object ID', (done) => {
        request(app)
            .patch('/todos/123')
            .expect(404)
            .end(done);
    });

    it ('should return a 404 if Todo not found for valid ObjectID', (done) => {
        const unusedObjectID = new ObjectID()
        request(app)
            .patch(`/todos/${unusedObjectID.toHexString()}`)
            .expect(404)
            .end(done);
    });
});
