$(document).ready(function(){
  $.getJSON('./api/todos')
  .then(addTodos)
  .catch(function(err){
    console.log(err);
  })

  $('#todoInput').keypress(function(event){
    if(event.which === 13){
      createTodo();
    }
  });

  $('.list').on('click', 'span', function(e){
    e.stopPropagation();
    deleteTodo($(this).parent());
  })

  $('.list').on('click', 'li', function(){
    crossOutTodo($(this));
  })

});

function addTodos(todos){
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span>' + '</li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if(todo.completed){
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

function createTodo(){
  var userInput = $("#todoInput").val();
  $.post('/api/todos', {
    name: userInput
  })
  .then(function(newTodo){
    $("#todoInput").val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  })
  $("#todoInput").innerText = '';
}

function deleteTodo(todo){
  let id = todo.data('id');
  $.ajax({
    method: 'delete',
    url: '/api/todos/' + id
  })
  .then(function(){
    todo.remove();
  })
}

function crossOutTodo(todo){
  let id = todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: '/api/todos/' + id,
    data: updateData
  })
  .then(function(){
    todo.toggleClass('done');
    todo.data('completed', isDone);
  })
  .catch(function(err){
    console.log(err);
  })
}
