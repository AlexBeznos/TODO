(function(){
  var app = angular.module('Todo', []);
  app.controller('TasksCtrl', function(){
     this.tasks = taskArr;
     this.myTask = {};
     this.addTask = function(){
       this.myTask.status = false;
       this.tasks.push(this.myTask);
       this.myTask = {};
     };
     this.removeTask = function(task) {
       this.tasks.splice(this.tasks.indexOf(task), 1);
     };
  }); 

var taskArr = [{
	task: "Buy milk",
	status: false
},
{
	task: "Create something greate!",
	status: false
},
{
	task: "Find a new job!",
	status: true
},
{
	task: "Buy a new phone",
	status: false
}];

}) ();