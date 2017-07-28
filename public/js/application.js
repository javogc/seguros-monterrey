communication = function(route_directory) {
	this.ajax = function(command, type) {
		route = route_directory.get_route(command.target);
		 	$.ajax({
		 	 	url: route,
		 	 	type: type,
		 	 	dataType: 'json',
		 	 	data: command.data,
		 	 }).done(command.done || null)
		 		 .success(command.success || null)
		 		 .fail(command.fail || null);
		}
	this.get = function (command) {
		this.ajax(command, 'GET')
	};

	this.post = function (command) {
		this.ajax(command, 'POST')
	};
};

session_handler = function(communication) {
	this.session_token = null;
	this.log_in = function (user, password) {
		command = this.build_login_command(user, password)
		communication.post(command)
	};
	this.log_out = function (argument) {};

	this.build_login_command = function (user, password) {
		success_fn = function(response) { this.session_token = response.auth_token }.bind(this)
		return {
			data: { 
				mail: user,
				password: password
		 	},
		 	success: success_fn,
		 	target: 'login'
		}
	}
}

routes = function () {
	this.base_uri = 'http://api.garciac.dev/api/v1'
	this.get_route = function (target) {
		switch (target) {
			case 'login':
				return this.base_uri + '/login'
				break;
			default:
				break;
		}
	}
}

core = function(link, session) {
	
}

garciac_routes = new routes()
garciac_link = new communication(garciac_routes)
session_handler = new session_handler(garciac_link)
garciac_core = new garciac_core(garciac_link, session_handler)
