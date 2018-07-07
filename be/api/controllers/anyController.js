'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {

    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.routes = function(req, res) {
  let origin = 'cos'
  let destination = 'cos2'
  let departureTime = new Date()

  let test_response =
  {
       "grzesiu": {
           time: "53778",
           changesNo: 3,
           "route":[
               {"lat" : 40.7631296, "lng" : -74.00948579999999},
               {"lat" : 42.7631296, "lng" : -76.00948579999999},
               {"lat" : 44.7631296, "lng" : -78.00948579999999}
           ]
       },
       "mariusz":{
           time: "53778",
           changesNo: 3,
           "route":[
               {"lat" : 40.7631296, "lng" : -74.00948579999999},
               {"lat" : 42.7631296, "lng" : -76.00948579999999},
               {"lat" : 44.7631296, "lng" : -78.00948579999999}
           ]
       }
  }  ;
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(test_response);
  });
};

exports.routes_add = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
}



exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
