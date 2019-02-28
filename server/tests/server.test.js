const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const randomstring = require("randomstring");


const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {pp} = require('./../../playground/functions');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

// POST /todos
describe('POST /todos', () => {
  
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});

// GET /todos
describe('GET /todos', () => {
  
  it(`should get all todos`, (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  });

});

describe('GET /todos/:id', () => {
  
  it(`should return todo doc with id ${todos[0]._id.toHexString()}`, (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if for non-object ids', (done) => {
    //todos/123
    var newId = randomstring.generate({length: 10, charset: '123abc'});
    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  
  var hexId = todos[1]._id.toHexString();

  it('should remove a todo', (done) => {
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return a 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    //todos/123
    var newId = randomstring.generate({ length: 10, charset: '123abc' });
    request(app)
      .delete(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {
  
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'PATCH /todos/:id - should update the todo';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);

  });

  it('should clear completedAt when todo is not completed', (done) => {
    
    var hexId = todos[1]._id.toHexString();
    var text = 'PATCH /todos/:id - should clear completedAt when todo is not completed';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);

  });

});