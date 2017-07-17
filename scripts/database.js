const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://guest-pet-db-user:garrafadaguavazia@ds063899.mlab.com:63899/guest-pet-db', (err, database) => {
  if (err) {
    console.log("erro no db");
    return console.log(err);
  }
  db = database;
});

function DB_getUsers() {
  db.collection('users').find().toArray(function(err, results) {
    if (err) {
      return console.log(err);
    }
    return results;
  });
}

// POST methods

app.post('/user', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database');
    res.redirect('/');
  });
});

