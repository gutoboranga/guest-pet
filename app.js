var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// app.set('templates', __dirname + '/templates');
// app.set('templates', __dirname + '/scripts');
// app.set('templates', __dirname + '/style');
app.use(express.static(__dirname + '/templates'));

app.get('/', function(request, response) {
  response.render('templates/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});