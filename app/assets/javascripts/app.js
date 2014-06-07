(function(){
  var app = angular.module('Todo', []);

  app.controller('TaskListCtrl', function(){
    this.taskLists = taskArr;
    this.newTaskList = {};
    this.addTaskList = function() {
      this.newTaskList.tasks = [];
      this.taskLists.push(this.newTaskList);
      this.newTaskList = {};
    };
    this.removeTaskList = function(list) {
       this.taskLists.splice(this.taskLists.indexOf(list), 1);
     };
    this.addTask - function(list) {
      this.newTaskList.status = false;
      this.taskLists[this.taskLists.indexOf[list]].tasks.push(this.newTaskList);
      this.newTaskList = {};
    };
    this.removeTask = function(task, list) {
      var listIndex = this.taskLists.indexOf(list);
      var taskIndex = this.taskLists[listIndex].tasks.indexOf(task);
      this.taskLists[listIndex].tasks.splice(taskIndex, 1);
    };
    this.check = function(task, list) {
      var listIndex = this.taskLists.indexOf(list);
      var taskIndex = this.taskLists[listIndex].tasks.indexOf(task);
      this.taskLists[listIndex].tasks[taskIndex].status = true;
      
    };
  });

var taskArr = [{
    name: "homeWork",
    tasks: [{
	    description: "Buy milk",
	    status: false
      }, {
	    description: "Create something greate!",
	    status: false
      }]
  }, {
    name: "workWork",
    tasks: [{
	    description: "Find a new job!",
	    status: true
    }, {
	    description: "Buy a new phone",
	    status: false
  }]
}];

}) ();