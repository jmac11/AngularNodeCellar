var express = require('express');

var  path = require('path');

var  wines = require('./server/routes/wines');

var app = express();

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(clientDir)) 
})


app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/wines/all', wines.findAll);
app.get('/wines/:id', wines.findById);
app.post('/wines/add', wines.addWine);
app.put('/wines/edit/:id', wines.updateWine);
app.post('/wines/uploadpic', wines.uploadpic);


app.listen(3000);
console.log('Listening on port 3000...');