build_router = function (target) {
	base_uri = 'http://localhost:3000/api'
	return {
		get_route: function (target) {
			switch (target) {
				case 'login':
					return base_uri + '/login'
					break;
				case 'users':
					return base_uri + '/users'
					break;
				default:
					break;
			}
		},
		change_base_uri: function(new_base) {
			base_uri = new_base
		}
	}
};

build_interface = function(router) {
	return {
		ajax: function(command, type) {
		route = command.route || router.get_route(command.target);
		 	return $.ajax({
		 	 	url: route,
		 	 	type: type,
		 	 	dataType: 'json',
		 	 	data: command.data,
		 	 	headers: {'Authorization': command.auth_token}
		 	 })
		},
		get: function (command) {
			return this.ajax(command, 'GET')
		},
		post: function (command) {
			return this.ajax(command, 'POST')
		}
	}
};

build_session_handler = function(communication) {
	session_token = null;
	build_login_command = function (user, password) {
		// success_fn = function(response) { this.session_token = response.auth_token }.bind(this)
		return {
			data: { 
				mail: user,
				password: password
		 	},
		 	target: 'login',
		 	route: 'http://localhost:3000/api/v1/login'
		}
	}


	return {
		log_in: function (user, password) {
			command = build_login_command(user, password)
			communication.post(command)
			.success(function(response) {
				console.log('logged in!');
				session_token = response.auth_token
			})
		},
		get_session_token: function() {return session_token},
		log_out: function() {
			throw {
				name: 'NotImplemented',
				message: 'This function is not yet implemented'
			}
		}

	}
};

garciac_comms = build_garciac_comms = function (session, comms) {
	return {
		log_in: function(mail, password) {
			session.log_in(mail, password)
		},
		post: function (model, data) {
			command = {
				target: model,
				data: data,
				auth_token: session.get_session_token(),
			}

			return comms.post(command)
		}
	}
}

router = build_router()
adapter = build_interface(router)
sesh = build_session_handler(adapter)
garciac = build_garciac_comms(sesh, adapter)
