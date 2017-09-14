require File.expand_path('saporis', File.dirname(__FILE__))
use Rack::Static, :urls => ['/stylesheets', '/javascripts'], :root => 'public'
run Saporis

