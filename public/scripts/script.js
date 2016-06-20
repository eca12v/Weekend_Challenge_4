
$(document).ready(function(){
  $('#submit').on('click', postTask);
  getTasks();
  $(document).on('click', '.delete', deleteTask);
  $(document).on('click', '.completed', completeToggle);
});
//posts inputted task then clears input field and updates display
function postTask(){
  var task = $('#taskIn').val();
  var taskObject = {
    'task': task,
    'complete': false
  };
  $.ajax({
    type: 'POST',
    url: '/postTask',
    data: taskObject
  });
  $('#taskIn').val('');
  getTasks();
}
//function for displaying tasks on the DOM
function displayTasks(tasks){
  $('#uncompletedContainer').empty();
  $('#completedContatiner').empty();
  for (var i = 0; i < tasks.length; i++) {
    var id = tasks[i].id;
    if(tasks[i].completed === false){
      $('#uncompletedContainer').append('<div class="taskdiv" id=' + id + '>Task: ' + tasks[i].task + '<br>Date started: ' + tasks[i].date + '<br><button class="delete">delete</button><button class="completed">completed</button></div>');
    }
    else if (tasks[i].completed === true) {
      $('#completedContatiner').append('<div class="taskdiv" id=' + id + '>Task: ' + tasks[i].task + '<br>Date started: ' + tasks[i].date + '<br><button class="delete">delete</button><button class="completed">reinstate</button></div>');
    }
    else{
      console.log('didnt work');
    }
  }
}
//gets the tasks from the database then sends them to the display function
function getTasks(){
  $.ajax({
    type: 'GET',
    url: '/displayTasks',
    success: function(data){
      displayTasks(data);
    }
  });
}
//starts a confirm message when delete button is clicked and deletes task from dom and database on confirm
function deleteTask(){
  var askDelete = confirm('Are you sure you want to delete this?');
  if(askDelete === true){
    var x = $(this).parent().attr('id');
    console.log(x);
    var inObject = {
      'id': x
    };
    console.log(inObject.id);
    $.ajax({
      type: 'POST',
      url: '/deletePost',
      data: inObject
    });
    $(this).parent().remove();
  }
  else{return;}
}
//toggles between true and false for task being completed
//this is a little buggy and doesn't work consistently, not sure why
function completeToggle(){
  var x = $(this).parent().attr('id');
  var toggleObject = {
    'completeID': x
  };
  $.ajax({
    type: 'POST',
    url: '/togglePost',
    data: toggleObject
  });
  getTasks();
}
