var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));


var todoRoutes = require('./routes/todo');
app.use('/api/todos', todoRoutes);

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(port, function(){
  console.log('App is running on port 3000');
});