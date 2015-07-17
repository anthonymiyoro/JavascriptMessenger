// YOUR CODE HERE:

// sends a message
function send(){
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
    // Shows type of function
  type: 'POST',
    // Changes the message to a string
  data: JSON.stringify(message.value),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
}

// retrieves content from server
// gets a message
function get(){
 $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: JSON.stringify(message.value),
  contentType: 'application/json',
  success: function (data) {
   $.each(data.results, function(i,message){
      
      $("#recieved").append("<li>" +message.username +"<br>"+ message.text + "</li>");
   });
  }
 });
}