from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_session import Session
from UserTypeEnum import UserType
from flask_cors import CORS
from DatabaseLogic import DatabaseLogic
import string
import EntityName
import random

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app)
app.secret_key = 'your_secret_key'  # Necessary for session management

db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")
database = db.client['Database']


# Company home - GET - /api/company/home - return value: 5 last campaign (sorted by active first) (then by creation time)
@app.route("/api/company/home", methods=['GET'])
def company_home():
    # get the last 5 campaigns of the company
    collection = database["Campaigns"]
    # TODO: add session logic instead of const company id (session['company_id']) or (session['user_id'])
    campaigns = collection.find({"company_id": 123}).sort([("is_active", -1), ("create_time", -1)]).limit(5)
    # convert the object to list
    campaigns = list(campaigns)
    # remove the _id field
    for campaign in campaigns:
        campaign.pop('_id')
    # return the campaigns
    return jsonify(campaigns), 200


# Influencer home - GET - /api/influencer/home - return value: 5 last campaign that the influencer was chosen for (sorted by active first) (then by creation time)
@app.route("/api/influencer/home", methods=['GET'])
def influencer_home():
    # get the last 5 campaigns of the influencer
    collection = database["Campaigns"]
    # TODO: add session logic instead of const influencer id (session['influencer_id']) or (session['user_id'])
    # find the campaigns that the influencers array contains 1234
    campaigns = collection.find({"influencers": "12345"}).sort([("is_active", -1), ("create_time", -1)]).limit(5)
    # convert the object to list
    campaigns = list(campaigns)
    # remove the _id field and the influencers array field
    for campaign in campaigns:
        campaign.pop('_id')
        campaign.pop('influencers')
        # return the campaigns
    return jsonify(campaigns), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Changed port to 5001
