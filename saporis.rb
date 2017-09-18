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

	get'/marcas' do
		slim :marcas
	end

	get'/contacto' do
		slim :contacto
	end

	get '/contact' do
		  return haml :contact 
	end

	post '/contact' do

		Pony.mail :to => 'javiergc93@gmail.com',
              :from => params[:email],
              :subject =>  params[:subject],
              :body =>  params[:email] +" wrote:\n" + params[:message],
              :via => :smtp,
              :via_options => {
                  :address              => 'smtp.gmail.com',
                  :port                 => '587',
                  :user_name                 => 'javiergc93@gmail.com',
                  :password             => 'tpo3wsuf753159',
                  :authentication       => :plain, 
                  :domain               => "localhost.localdomain"
                } 
	end
	get'/aviso_de_privacidad'do
		slim :privacidad
	end
	post '/' do
	  @task =  params[:task]
	  slim :task
	end	
end
