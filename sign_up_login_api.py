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


@app.route('/signup/influencer', methods=['POST'])
def signup_influencer():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    
    data = {'name': name, 'email': email, 'password': password}

    db.addUser(data, UserType.Influencer)

    #users_db['influencers'].append({'name': name, 'email': email, 'password': password})
    return redirect(url_for('home'))

#TODO there is a to do in this function
@app.route('/signup/company', methods=['POST'])
def signup_company():
    email = request.json[EntityName.CONST_EMAIL]
    company_name = request.json[EntityName.CONST_COMPANY_NAME]
    password = request.json[EntityName.CONST_PASSWORD]
    payment_method = request.json[EntityName.CONST_PAYMENT_METHOD]
    site_link = request.json[EntityName.CONST_COMPANY_SITE_LINK]
    about_us = request.json[EntityName.CONST_COMPANY_ABOUT_US]
    
    data = {
        EntityName.CONST_EMAIL: email,
        EntityName.CONST_COMPANY_NAME: company_name,
        EntityName.CONST_PASSWORD: password,
        EntityName.CONST_PAYMENT_METHOD: payment_method,
        EntityName.CONST_COMPANY_SITE_LINK: site_link,
        EntityName.CONST_COMPANY_ABOUT_US: about_us,
    }

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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Changed port to 5001
