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


// Router
app.Router.map(function(){
	this.resource('task_lists', { path: '/'}),
	this.resource('task_list', { path: 'task_list/:id'}),
	this.resource('task', { path: 'tasks/:task_id'})
});




// Routes

app.TaskListsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('task_list');
	}
});

app.TaskListRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('task_list', params.id)
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

