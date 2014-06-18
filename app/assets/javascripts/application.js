#= require jquery
#= require handlebars
#= require ember
#= require ember-data
#= require_self

var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});


app.TaskListsController = Ember.ArrayController.extend({
	siteName: "TODO:"
});


app.Router.map(function(){
	this.resource('task_lists', {path: '/'});
	this.resource('task_list', { path: '/task_list/:task_list_id' });
});


app.TaskListsRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('task_list');
	}
});

DS.RESTAdapter.reopen({
	namespace: 'api'
});

app.TaskList = DS.Model.extend({
	name: DS.attr('string')
});


