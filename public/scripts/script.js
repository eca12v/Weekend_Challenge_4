
$(document).ready(function(){
  $('#submit').on('click', postTask);
  getTasks();
  $(document).on('click', '.delete', deleteTask);
  $(document).on('click', '.completed', completeToggle);
});

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

function getTasks(){
  $.ajax({
    type: 'GET',
    url: '/displayTasks',
    success: function(data){
      displayTasks(data);
    }
  });
}

function deleteTask(){
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
