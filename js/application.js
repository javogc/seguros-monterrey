communication = function(route_directory) {
	this.ajax = function(command) {
		route = route_directory.get_route(command.model);
		 	$.ajax({
		 	 	url: route,
		 	 	type: 'GET',
		 	 	dataType: 'json',
		 	 	data: command.data,
		 	 }).done(command.done).success(command.success).fail(command.fail);
		}
	};
}

session_handler = new session_handler()
garciac_core = new communication(garciac_routes, session_handler)