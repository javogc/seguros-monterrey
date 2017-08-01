 $( "#login-button" ).click(function() {
 
 	garciac.log_in('ukko', '12345', function(){ 
 		garciac.post("users", {user: {name: $("#name").val(), mail:$("#mail").val() , password: $("#password").val() , password_confirmation: $("#password_confirmation").val() }})
 	})
 	
});