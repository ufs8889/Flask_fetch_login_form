import os 
import time
from db_py import *
from flask import *
from fileinput import filename
from distutils.log import debug
from blueprints.Api import Api

app = Flask(__name__,template_folder="temp",static_folder="static")
app.register_blueprint(Api)

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404

@app.route("/",methods =["POST","GET"])
def hello():
    return render_template('index.html')
     
@app.route("/forgotten_password", methods =["POST","GET"])
def password_recovery():
    return render_template('forgotten_password.html')


@app.route("/sign_up",methods =["POST","GET"])
def sign_up():
    return render_template('sign_up.html')
  
       

if __name__ == '__main__':
    app.run(port=45289,debug=True)

