build_router = function () {
	base_uri = 'http://localhost:3000/api'
	return {
		get_route: function (route) {
			switch (route.target) {
				case 'login':
					return base_uri + '/login'
					break;
				case 'users':
					return base_uri + '/users' + (route.id ? '/' + route.id : '')
					break;
				case 'procedures':
					return base_uri + '/procedures' + (route.id ? '/' + route.id : '')
					break;
				default:
					break;
			}
		},
		set_base_uri: function(new_base) {
			base_uri = new_base
		}
	}
};

build_channel = function(router) {
	return {
		ajax: function(command, type) {
		 	return $.ajax({
		 	 	url: command.route || router.get_route(command.target),
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
		},
		patch: function(command) {
			return this.ajax(command, 'PATCH')
		},
		delete: function(command) {
			return this.ajax(command, 'DELETE')
		}
	}
};

build_session_handler = function(communication) {
	session_token = null;
	build_login_command = function (user, password) {
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
		log_in: function (user, password, success_fn, failure_fn) {
			command = build_login_command(user, password)
			communication.post(command)
			.success(function(response) {
				session_token = response.auth_token
				if(success_fn) { success_fn(response)}
			}).error(function (response) {
				if(failure_fn) {failure_fn(response)}
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

communicator = function () {
	router = build_router()
	channel = build_channel(router)
	session = build_session_handler(channel)

	return {
		log_in: function(mail, password, success_fn, failure_fn) {
			session.log_in(mail, password, success_fn, failure_fn)
		},

		create: function (model, data) {
			command = {
				target: {target: model},
				data: data,
				auth_token: session.get_session_token(),
			}

			return channel.post(command)
		},

		index: function (model) {
			command = {
				target: {target: model},
				auth_token: session.get_session_token()
			}

			return channel.get(command)
		},

		get: function (model, id) {
			command = {
				target: {target: model, id: id},
				auth_token: session.get_session_token()
			}

			return channel.get(command)
		},

		update: function(model, id, data) {
			command = {
				target: {target: model, id: id},
				data: data,
				auth_token: session.get_session_token(),
			}

			return channel.patch(command)
		},
		delete: function (model, id) {
			command = {
				target: {target: model, id: id},
				auth_token: session.get_session_token()
			}

			return channel.delete(command)
		}
	}
}

garciac = communicator()
garciac.log_in('ukko', '1234')

log = function (response) {
	console.log(response)
}

