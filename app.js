var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/templates'));
app.use(express.static(__dirname + '/scripts'));

console.log('capivaras verdes');
console.log(__dirname + '/templates');
console.log(__dirname + '/scripts');

app.get('/', function(request, response) {
  response.render('templates/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});