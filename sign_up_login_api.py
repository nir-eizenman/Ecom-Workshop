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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Changed port to 5001
