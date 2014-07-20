//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require bootstrap-sprockets
//= require_self

var app = Ember.Application.create({
  LOG_TRANSITIONS: true
});


// Controller
app.TaskListsController = Ember.ArrayController.extend({
  siteName: "TODO:",
  actions: {
    openTaskForm: function(name) {
      $('p:contains("'+ name +'")').closest('.wrapper').find('form').toggle("slow");
    },
    deleteTaskList: function(task_list) {
      task_list.deleteRecord();
      task_list.save();
    },
    deleteTask: function(task) {
      var id = task.get('task_list_id').id,
          obj = this.store.find('task_list', id);
      task.deleteRecord();
      task.save().then(function(tk) {
        obj.get('task_ids').removeObject(tk);
      });
    },
    select: function(task) {
      task.get('status') == true ? task.set('status', false) : task.set('status', true);
      task.save();
    }
  }
});

app.ApplicationController = Ember.Controller.extend({
  actions: {
     openTaskListForm: function() {
      $('.taskListForm').toggle("slow")
    }
  }
});


app.TaskListController = Ember.Controller.extend({
});



app.NewTaskController = Ember.ObjectController.extend({
  actions: {
    createTask: function() {
      var id = this.get('model').get('id'),
          controller = this,
          task = this.store.createRecord('task', {
            description: this.get('taskName'),
            task_list_id: this.store.getById('task_list', id)
          });
      task.save().then(function(task) {
        controller.set('taskName', '');
        controller.get('model.task_ids').addObject(task);
      });
    }
  }
});


app.NewTaskListController = Ember.Controller.extend({
  actions: {
    createList: function() {
      var controller = this;
      var name = this.get('listName');
      var list = this.store.createRecord('task_list', {
        name: name
      });
      this.set('listName', '');
      list.save().then(function () {
        controller.transitionToRoute('task_lists');
      });
    }
  }
});


// Router
app.Router.map(function(){
  this.resource('task_lists', { path: '/'})
});




// Routes

app.TaskListsRoute = Ember.Route.extend({
  model: function() {
    return  this.store.find('task_list')
  }
});

app.TaskListRoute = Ember.Route.extend({
  model: function(params) {
    return  this.store.find('task_list', params.task_list_id)
  }
});


app.TaskRoute = Ember.Route.extend({
  afterModel: function() {
    this.set('task_list', this.modelFor('task_list'));
  }
});




// Model

app.TaskList = DS.Model.extend({
  name: DS.attr('string'),
  task_ids: DS.hasMany('task', {async: true})
});

app.Task = DS.Model.extend({
  description: DS.attr('string'),
  status: DS.attr('boolean'),
  task_list_id: DS.belongsTo('taskList')
});



// Adapter
DS.RESTAdapter.reopen({
  namespace: 'api'
});


// Verification token
$(function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    return $.ajaxPrefilter(function(options, originalOptions, xhr) {
        return xhr.setRequestHeader('X-CSRF-Token', token);
    });
});
