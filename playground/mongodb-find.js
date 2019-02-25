const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5c6f0f074c457a7360fb1272')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  // db.collection('Todos').countDocuments({}).then((numOfDocs) => {
  //   console.log(`Todos count: ${numOfDocs}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  db.collection('Users').countDocuments({name: 'Ryan'}).then((numOfUsers) => {
    console.log(`Users count: ${numOfUsers}`);
  }, (err) => {
    console.log('Unable to fetch todos', err)
  });

  client.close();
});
