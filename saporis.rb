require 'rubygems'
require 'sinatra'
require 'slim'
require 'pony'
require 'haml'

class Saporis < Sinatra::Base
	set :static, true
  	set :root, File.dirname(__FILE__)
  	
	get '/' do
	  slim :index
	end

	get '/nosotros' do
	  slim :nosotros
	end

	get '/historia' do
		slim :historia
	end

	get'/productos' do
		slim :productos
	end


	get'/vida' do
		slim :vida
	end

	get'/contacto' do
		slim :contacto
	end

	get '/contact' do
		  return haml :contact 
	end

	get'/aviso_de_privacidad'do
		slim :privacidad
	end
	post '/' do
	  @task =  params[:task]
	  slim :task
	end	
end
