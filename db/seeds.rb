puts "Start seeding .... "
TaskList.create(name: "Home tasks")
TaskList.create(name: "Outdoor tasks")
TaskList.create(name: "Work tasks")
p = TaskList.find(1)
p.tasks.create(description: "To make a good coffee", status: false, position: 3)
p.tasks.create(description: "To cook some meat", status: false, position: 1)
p.tasks.create(description: "To wash whole floor", status: false, position: 2)
p = TaskList.find(2)
p.tasks.create(description: "To buy some food", status: false, position: 2)
p.tasks.create(description: "To make a house", status: false, position: 1)
p.tasks.create(description: "To grow a tree", status: false, position: 3)
p = TaskList.find(3)
p.tasks.create(description: "Create a good project", status: false, position: 1)
p.tasks.create(description: "Finish previous project", status: false, position: 3)
p.tasks.create(description: "To finish watch dogs on xbox", status: false, position: 2)
puts "I finish this shit ... "