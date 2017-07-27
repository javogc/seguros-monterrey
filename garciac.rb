require 'rubygems'
require 'sinatra'
require 'slim'
require 'sinatra/asset_pipeline'


class Garciac < Sinatra::Base
	register Sinatra::AssetPipeline
	get '/' do
    File.read(File.join('public', 'js', 'index.js'))
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
end