//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require_self

var app = Ember.Application.create({
  LOG_TRANSITIONS: true
});



// Controller
app.TaskListsController = Ember.ArrayController.extend({
  siteName: "TODO:"
});

app.TasksController = Ember.ArrayController.extend({
  sortProperties: ['description']
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
      list.save();
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
app.TaskListsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('task_list');
  }
});


app.TasksRoute = Ember.Route.extend({
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
