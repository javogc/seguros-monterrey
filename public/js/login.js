$(function() {
  $("#login-button").click(function(e) {
    e.preventDefault();
    user = $('#user').val();
    password = $('#password').val();
    garciac.log_in(user, password, function(){
      window.location = '/';
    });
  });
});
