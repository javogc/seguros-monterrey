require 'rubygems'
require 'sinatra'
require 'slim'


get '/' do
  slim :index
end

get '/procedure' do
  slim :procedures
end

get '/new-user' do
	slim :users
end

get'/user-created' do
	slim :user_created
end

get'/new-requirement'do
	slim :requirement
end

post '/' do
  @task =  params[:task]
  slim :task
end