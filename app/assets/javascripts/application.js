#= require jquery
#= require handlebars
#= require ember
#= require ember-data
#= require_self

var app = Ember.Application.create({
	LOG_TRANSITIONS: true
});


app.TaskListsController = Ember.ArrayController.extend({
	siteName: "HGel"
});

app.Router.map(function(){
	this.resource('task_lists', {path:'/'});
});

app.TaskListsRoute = Ember.Route.extend({
	module: function(params) {
		return this.store.find('task_lists', params.task_list_id);
	}
});

DS.RESTAdapter.reopen({
	namespace: "api"
});

app.TaskLists = DS.Model.extend({
	name: DS.attr('string'),
	id: DS.attr('integer'),
	created_at: DS.attr('string'),
	updated_at: DS.attr('string')
});

EmberTester.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter.create()
});

EmberTester.PostsRoute = Ember.Route.extend({
  model: function() {
    EmberTester.Post.find();
  }
});