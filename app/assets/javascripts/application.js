//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require bootstrap-sprockets
//= require_self

var app = Ember.Application.create({
  LOG_TRANSITIONS: true
});

// View
app.EditTaskView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-task', app.EditTaskView);


// Controller
app.ApplicationController = Ember.Controller.extend({
  actions: {
     openTaskListForm: function() {
      if(this.get('currentPath') == 'task_lists') {
        this.get('isFormOpened') ? this.set('isFormOpened', false) : this.set('isFormOpened', true)
      };
    },
    signOut: function() {
      Ember.$.ajax({
        url: '/users/sign_out',
        type: 'DELETE',
        success: function(result) {
          location.reload();
        }
      });
    }
  },
  isFormOpened: false
});


app.TaskListsController = Ember.ArrayController.extend({
  actions: {
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
    },
    createTaskList: function() {
      this.controllerFor('application').send('openTaskListForm');
   }
  }
});

app.TaskListController = Ember.ObjectController.extend({
  isListEditing: false,
  actions: {
  //copy-past from task
    editTask: function() {
      this.set('isListEditing', true);
    },
    acceptChanges: function () {
      this.set('isListEditing', false);

      if (Ember.isEmpty(this.get('model.name'))) {
        this.send('removeTask');
      } else {
        this.get('model').save();
      }
    },
    removeTaskList: function () {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }    
  }
});


app.TasksController = Ember.ArrayController.extend({  
  sortProperties: ['position'],
  sortAscending: true
});

app.TaskController = Ember.ObjectController.extend({
  actions: {
    editTask: function() {
      this.set('isEdit', true);
    },
    editPosition: function() {
      this.set('isPositionEdit', true);
    },
    acceptPosChanges: function () {
      this.set('isPositionEdit', false);

      if (Ember.isEmpty(this.get('model.position'))) {
        
      } else {
        this.get('model').save();
      }
    },
    acceptChanges: function () {
      this.set('isEdit', false);

      if (Ember.isEmpty(this.get('model.description'))) {
        this.send('removeTask');
      } else {
        this.get('model').save();
      }
    },
    removeTask: function () {
      this.removeTask();
    }
  },
  isEdit: false,
  isPositionEdit: false,
  removeTask: function() {
    var todo = this.get('model');
    todo.deleteRecord();
    todo.save();
  }
});



app.NewTaskController = Ember.ObjectController.extend({
  actions: {
    openTaskForm: function() {
      this.get('isFormOpened') ? this.set('isFormOpened', false) : this.set('isFormOpened', true);
    },
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
        controller.set('isFormOpened', false);
      });
    }
  },
  isFormOpened: false
});


app.NewTaskListController = Ember.Controller.extend({
  needs: 'application',
  appAlias: Ember.computed.alias("controllers.application"),
  actions: {
    createList: function() {
      var controller = this,
          name = this.get('listName');
      if (!Ember.isEmpty(name)){
        var list = this.store.createRecord('task_list', {
          name: name
        });
        this.set('listName', '');
        list.save().then(function () {
          controller.transitionToRoute('task_lists');
          controller.get('appAlias').set('isFormOpened', false);
        });
      }
    }
  }
});


app.SignInController = Ember.Controller.extend({
  alertMSG: false,
  rememberMe: false,
  actions : {
    signIn: function() {
      var controller = this;
      return Ember.$.post('/users/sign_in.json',
        {
          user:
          {
            email: this.get('email'),
            password: this.get('password'),
            remember_me: this.get('rememberMe') ? 1 : 0
          }
        },
        function(data) {
          location.reload();
          controller.set('alertMSG', false);
        },
        'json'
      ).fail(function(data) {
        controller.set('alertMSG', data.responseJSON.error);
      });
    }
  }
});

app.SignUpController = Ember.Controller.extend({
  alertMSG: false,
  actions : {
    signUp: function() {
      var controller = this;
      return Ember.$.post('/users.json',
        {
          user:
          {
            email: this.get('email'),
            password: this.get('password'),
            password_confirmation: this.get('passwordConf')
          }
        },
        function(data) {
          location.reload();
          controller.set('alertMSG', false);
        },
        'json'
      ).fail(function(data) {
        controller.set('alertMSG', data.responseJSON.error);
      });
    }
  }
});


// Model

app.TaskList = DS.Model.extend({
  name: DS.attr(),
  task_ids: DS.hasMany('task', {async: true})
});

app.Task = DS.Model.extend({
  description: DS.attr(),
  status: DS.attr('boolean'),
  position: DS.attr('number'),
  task_list_id: DS.belongsTo('taskList')
});


// Router
app.Router.map(function(){
  this.resource('task_lists', { path: '/'});
  this.route('sign_in');
  this.route('sign_up');
});




// Routes

app.TaskListsRoute = Ember.Route.extend({
  beforeModel: function() {
    var route = this;
    $.get( "isUser.json", function( data ) {
      if(!data){
        route.transitionTo('sign_in')
      };
    });
  },
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


app.SignInRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var route = this;
    $.get( "isUser.json", function( data ) {
      if(data){
        route.transitionTo('task_lists')
      };
    });
  }
});

app.SignUpRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var route = this;
    $.get( "isUser.json", function( data ) {
      if(data){
        route.transitionTo('task_lists')
      };
    });
  }
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
