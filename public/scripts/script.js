
$(document).ready(function(){
  $('#submit').on('click', postTask);
  getTasks();
  $(document).on('click', '.delete', deleteTask);
  $(document).on('click', '.completed', completeToggle);
});
//posts inputted task then clears input field and updates display
function postTask(){
  event.preventDefault();
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
  // empties both containers before re-displaying them
  $('#uncompletedContainer').empty();
  $('#completedContatiner').empty();
  // for loop to append all of the objects to the dom
  for (var i = 0; i < tasks.length; i++) {
    var id = tasks[i].id;
    // sends the object to two different doms depending if they have been completed( if the completed column is true or false)
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
  event.preventDefault();
  //this starts the confirm pop-up when delete button is clicked
  var askDelete = confirm('Are you sure you want to delete this?');
  //if the user confirms, this creates an object with the id of the row that needs to be deleted and sends in a POST call
  if(askDelete === true){
    var x = $(this).parent().attr('id');
    console.log(x);
    var inObject = {
      'id': x
    };
    console.log(inObject.id);
    // POST call to delete from database what was clicked on the dom
    $.ajax({
      type: 'POST',
      url: '/deletePost',
      data: inObject
    });
    //this removes the div that is the parent of the delete button clicked
    $(this).parent().remove();
  }
  else{return;}
}
//toggles between true and false for task being completed
//this is a little buggy and doesn't work consistently, not sure why
function completeToggle(){
  event.preventDefault();
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
