require 'rubygems'
require 'sinatra'
require 'slim'

class Garciac < Sinatra::Base
	get '/' do
    File.read(File.join('public', 'js', 'index.js'))
	  slim :index
	end

	get '/procedure' do
	  slim :procedures
	end

	get '/new_user' do
		slim :users
	end

	get'/user_created' do
		slim :user_created
	end

	get'/new_requirement'do
		slim :requirement
	end

	get'/user_index'do
		slim :user_index
	end

	get'/procedures_index'do
		slim :procedures_index
	end

	get'/login' do
		slim :login
	end

	post '/' do
	  @task =  params[:task]
	  slim :task
	end	
end