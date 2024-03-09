# Api/admin/Api.py
from flask import *
from db_py import *

Api = Blueprint('admin', __name__)

@Api.route("/process_data", methods=["POST"])
def process_data():
    data = request.get_json()
    print(remembered_login(username=data))
    return jsonify(remembered_login(username=data))


@Api.route("/new_password", methods=["POST"])
def change_password():
    # Receive the data sent from the frontend
    data = request.get_json()
    return jsonify(update_user(user_ID=data[0], new_password=data[1]))

@Api.route('/user_data', methods=['POST'])
def user_register():
    data = request.json['user_credentials']
    username,password = data[0],data[1]
    user_login = User(username, "", "", password)
    #user_login.login()
    return jsonify(user_login.login())  
    
  
@Api.route("/exist_number",methods =["POST"])
def exist_number():
    data = request.get_json()
    print(data)
    return jsonify(check_Phone_number_exists(data))

@Api.route("/exist_username",methods =["POST"])
def exist_username():
    data = request.get_json()
    print(data)
    return jsonify(check_username_exists(data))         