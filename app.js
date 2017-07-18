var express = require('express');
var ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var app = express();
var db;

MongoClient.connect('mongodb://guest-pet-db-user:garrafadaguavazia@ds063899.mlab.com:63899/guest-pet-db', (err, database) => {
  if (err) {
    console.log("erro no db");
    return console.log(err);
  }
  db = database;
  
  app.set('port', (process.env.PORT || 5000));
  
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
})

app.use(express.static(__dirname + '/templates'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}))

// GET methods

app.get('/', (req, res) => {
  res.sendFile('/templates/index.html');
});

app.get('/users', (req, res) => {
  db.collection('users').find().toArray(function(err, results) {
    if (err) { return console.log(err) }
    res.send(results);
  });
});

app.get('/pets', (req, res) => {
  db.collection('pets').find().toArray(function(err, results) {
    if (err) { return console.log(err) }
    res.send(results);
  });
});

app.get('/homes', (req, res) => {
  db.collection('homes').find().toArray(function(err, results) {
    if (err) { return console.log(err) }
    res.send(results);
  });
});

app.get('/transactions', (req, res) => {
  db.collection('transactions').find().toArray(function(err, results) {
    if (err) { return console.log(err) }
    res.send(results);
  });
});

// app.get('/petForUserId', (req, res) => {
//   db.collection('pets').find(
//     {
//       userId: ObjectId(req.body)
//     }).toArray(function(err, results) {
//     if (err) { return console.log(err) }
//     res.send(results);
//   });
// });

// POST methods

app.post('/user', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send(result);
  });
});

app.post('/pet', (req, res) => {
  db.collection('pets').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send(result);
  });
});

app.post('/home', (req, res) => {
  console.log(req.body);
  db.collection('homes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send(result);
  });
});

app.post('/transaction', (req, res) => {
  console.log(req.body);
  db.collection('transactions').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send(result);
  });
});

// PUT methods

app.put('/transactionNewStatus', (req, res) => {
  db.collection('transactions').update(
    { _id: ObjectId(req.body.transactionId) },
    {
     $set: {
       status: req.body.newStatus
     }
   });
   res.send(undefined);
});

app.put('/userChangeMode', (req, res) => {
  db.collection('users').update(
    { _id: ObjectId(req.body.userId) },
    {
     $set: {
       isOwnerUser: req.body.owner,
       isHostUser: req.body.host,
     }
   });
   res.send(undefined);
});

// DELETE methods

app.delete('/pet', (req, res) => {
  db.collection('pets').remove({_id: ObjectId(req.body._id)});
  res.send('DELETE pet request');
});

app.delete('/home', (req, res) => {
  db.collection('homes').remove({_id: ObjectId(req.body._id)});
  res.send('DELETE home request');
});

//
//
// app.put('/user', (req, res) => {
//   db.collection('users').update(req.body, (err, result) => {
//     if (err) return console.log(err)
//     console.log("dentro do put");
//     res.redirect('/');
//   });
// });

