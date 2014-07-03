//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require_self

var app = Ember.Application.create({
  LOG_TRANSITIONS: true
});



// Controller
app.TaskListsController = Ember.ObjectController.extend({
  siteName: "TODO:"
});

app.NewTaskController = Ember.ObjectController.extend({
  actions: {
    createTask: function() {
      var id = this.get('model').get('id');
      var taskName = this.get('taskName');
      var task = this.store.createRecord('task', {
        description: taskName,
        status: false,
        task_list_id: this.store.getById('task_list', id)
      });
      this.set('taskName', '');
      task.save().then(function() {
        controller.transitionToRoute('task_list')
      });
    }
  }
});

app.TaskListsNewController = Ember.Controller.extend({
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
  this.resource('task_lists', { path: '/'}, function() {
    this.route('new')
  }),
  this.resource('task_list', { path: 'task_list/:id'}),
  this.resource('task', { path: 'tasks/:task_id'})
});




// Routes

app.TaskListsNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('task_list');
  }
});

app.NewTaskRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('task');
  }
});

app.TaskListsRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      task_lists: this.store.findAll('task_list'),
      tasks: this.store.findAll('task')
    })
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
