from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from UserTypeEnum import UserType
from flask_cors import CORS
from DatabaseLogic import DatabaseLogic
import datetime
import EntityName

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'  # Necessary for session management


db = DatabaseLogic("mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")

#TODO there is a to do in this function
@app.route('/signup/influencer', methods=['POST'])
def signup_influencer():
    required_fields = [
        EntityName.CONST_EMAIL,
        EntityName.CONST_INFLUENCER_FULL_NAME,
        EntityName.CONST_PASSWORD,
        EntityName.CONST_PAYMENT_METHOD,
        EntityName.CONST_INFLUENCER_SOCIAL_NETWORK_LINKS,
        EntityName.CONST_INFLUENCER_FOLLOWER_INTEREST_TYPES,
        EntityName.CONST_INFLUENCER_FOLLOWERS_LOCATION,
        EntityName.CONST_INFLUENCER_FOLLOWER_AGE,
        EntityName.CONST_INFLUENCER_FOLLOWER_GENDER,
        EntityName.CONST_INFLUENCER_EXPOSURE_CONTENT,
        EntityName.CONST_INFLUENCER_AGE,
        EntityName.CONST_INFLUENCER_GENDER
    ]
    
    data = {field: request.json[field] for field in required_fields}

    #TODO - maybe use exceptions so I will know what was the problem and describe it in the message
    #if adding user failed 
    if not db.addUser(data, UserType.Influencer):
        return jsonify(
            {
            "result": False,
            "message": "User influencer failed to create"
            }), 500

    #addign user succeded
    return jsonify(
            {
            "result": True,
            "message": ""
            }), 200

#TODO there is a to do in this function
@app.route('/signup/company', methods=['POST'])
def signup_company():
    required_fields = [
        EntityName.CONST_EMAIL,
        EntityName.CONST_COMPANY_NAME,
        EntityName.CONST_PASSWORD,
        EntityName.CONST_PAYMENT_METHOD,
        EntityName.CONST_COMPANY_SITE_LINK,
        EntityName.CONST_COMPANY_ABOUT_US
    ]
    
    data = {field: request.json[field] for field in required_fields}

    #TODO - maybe use exceptions so I will know what was the problem and describe it in the message
    #if adding user failed 
    if not db.addUser(data, UserType.Company):
        return jsonify(
            {
            "result": False,
            "message": "User company failed to create"
            }), 500

    #addign user succeded
    return jsonify(
            {
            "result": True,
            "message": ""
            }), 200


#TODO? add logout?
@app.route('/login', methods=['POST'])
def login():
    email = request.json[EntityName.CONST_EMAIL]
    password = request.json[EntityName.CONST_PASSWORD]
    user_type_num = request.json[EntityName.CONST_USER_TYPE]
    
    # Ensure the user_type is valid

    #need to fix here?
    print("user type number is:", user_type_num)

    #Test it
    if user_type_num == 1:
        user_type = UserType[1]
        print("I am influencer hereeeee")
    elif user_type_num == 2:
        user_type = UserType[2]
        print("I am company here")
    else:
        return jsonify(
            {
            "result": False,
            "message": "Invalid user type"
            }), 400

    
    user_type = UserType[user_type_str]
    print(user_type)
    user_data = db.getUserByEmail(email, user_type)
    print(user_data)
    #if user_data is None:
     #   return 'Invalid credentials', 401
    

    if user_data and user_data['password'] == password:
        session['user_name'] = user_data['name']
        session['user_email'] = user_data['email']
        session['user_type'] = user_type_str
        return redirect(url_for('user_home'))
    
    return 'Invalid credentials', 401


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Changed port to 5001
