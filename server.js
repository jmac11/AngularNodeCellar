var express = require('express');

var  path = require('path');
 
var app = express();

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.use(express.static(clientDir)) 
})


app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})


app.listen(3000);
console.log('Listening on port 3000...');