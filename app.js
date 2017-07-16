var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('templates'));
app.use(express.static('style'));
app.use(express.static('scripts'));
app.use(express.static('images'));
app.use(express.static('model'));

app.get('/', function(request, response) {
  response.render('templates/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});