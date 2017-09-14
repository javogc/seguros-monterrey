require 'rubygems'
require 'sinatra'
require 'slim'


configure :production do
  # Configure stuff here you'll want to
  # only be run at Heroku at boot

  # TIP:  You can get you database information
  #       from ENV['DATABASE_URI'] (see /env route below)
end
class Saporis < Sinatra::Base

	get '/' do
	  slim :index
	end

	get '/mision' do
	  slim :mision
	end

	get '/historia' do
		slim :historia
	end

	get'/catsup' do
		slim :productos_catsup
	end

	get'/aderezos' do
		slim :productos_aderezos
	end

	get'/mostaza' do
		slim :productos_mostaza
	end

	get'/quesos' do
		slim :productos_quesos
	end

	get'/salsas' do
		slim :productos_salsas
	end

	get'/vinagres' do
		slim :productos_vinagres
	end

	get'/marcas'do
		slim :marcas
	end

	get'/contacto'do
		slim :contacto
	end

	get'/aviso_de_privacidad'do
		slim :privacidad
	end
	post '/' do
	  @task =  params[:task]
	  slim :task
	end	
end
