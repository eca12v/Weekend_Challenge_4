var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended: false});
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/TasksDB';

app.use(express.static('public'));

app.listen(8080, 'localhost', function(req, res){
  console.log('server listening on 8080');
});

app.get('/', function(req, res){
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/postTask', urlencodedParser, function(req, res){
  console.log('in /postTask, task is: ' + req.body.task);
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO task_table (task, completed, date) VALUES($1, $2, $3)', [ req.body.task, req.body.complete, 'NOW()' ]);
  });
});

app.get('/displayTasks', function(req, res){
  var tasks=[];
  pg.connect(connectionString, function(err, client, done){
    var tasksQuery = client.query('SELECT * FROM task_table;');
    tasksQuery.on('row', function(row){
      tasks.push(row);
    });
    tasksQuery.on('end', function(){
      done();
      return res.json(tasks);
    });
  });
});

app.post('/deletePost', urlencodedParser, function(req, res){
  console.log('in /deletePost ' + req.body.id);
  pg.connect(connectionString, function(err, client, done){
    client.query('DELETE FROM task_table WHERE id=' + req.body.id);
  });
});

app.post('/togglePost', urlencodedParser, function(req, res){
  console.log('in /togglePost' + req.body.completeID);
  pg.connect(connectionString, function(err, client, done){
    client.query('UPDATE task_table SET completed=NOT completed WHERE id=' + req.body.completeID);
  });
});
