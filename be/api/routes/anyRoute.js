'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/anyController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  // todoList Routes
  app.route('/routes')
    .get(todoList.routes)
    .post(todoList.routes_add);

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};
