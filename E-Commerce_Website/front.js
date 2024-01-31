const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

MongoClient.connect(url, function(err, client) {
  if (err) throw err;

  const db = client.db(dbName);

  const collection = db.collection('users');

  const user = {
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password
  };

  collection.insertOne(user, function(err, result) {
    if (err) throw err;
    console.log('User inserted');
    res.redirect('/success');
  });

  client.close();
});

