# The APIS here: upload_campaign, apply_for_campaign, explore_campaigns
import json
from datetime import datetime
from typing import Dict

from bson import ObjectId
from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_session import Session
from flask_cors import CORS
# from flask_cors import CORS
from DatabaseLogic import DatabaseLogic
import EntityName

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app)
app.secret_key = 'your_secret_key'

db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")


@app.route('/api/company/home/create', methods=['POST'])
def upload_campaign():
    try:
        data = request.json

        # Extract required fields directly from data
        campaign_name = data['campaign_name']
        budget = data['budget']
        if int(budget) <= 0:
            raise Exception("Negative budget")
        is_active = data['is_active']
        about = data['about']

        target_audience = data['target_audience']
        # Extract nested dictionaries from target_audience
        location = target_audience['location']
        gender = target_audience['gender']
        age = target_audience['age']
        categories = data['categories']
        campaign_goal = data['campaign_goal']
        campaign_objective = data['campaign_objective']
        # Extract nested dictionaries from campaign_objective
        reels = campaign_objective['reels']
        if int(reels) < 0:
            raise Exception("Negative reels")
        posts = campaign_objective['posts']
        if int(posts) < 0:
            raise Exception("Negative posts")
        stories = campaign_objective['stories']
        if int(stories) < 0:
            raise Exception("Negative stories")

        create_time = datetime.now()
        influencers = []

        campaign_data = {
            "campaign_name": campaign_name,
            "budget": int(budget),
            "is_active": bool(is_active),
            "about": about,
            "target_audience": {
                "location": location,
                "gender": gender,
                "age": age
            },
            "categories": categories,
            'company_id': "6695650dd312588ddbf599fe",  # change to session.get
            "campaign_goal": campaign_goal,
            "campaign_objective": {
                "reels": reels,
                "stories": stories,
                "posts": posts
            },
            "create_time": create_time,
            "influencers": influencers
        }

        # Save campaign data to MongoDB
        campaigns_collection = db.client['Database']['Campaigns']
        campaigns_collection.insert_one(campaign_data)

        return jsonify("Campaign was successfully created"), 201

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400


@app.route('/api/influencer/home/explore/<campaign_id>/apply', methods=['POST'])
def apply_for_campaign(campaign_id):
    required_fields = [
        EntityName.CONST_ASKING_PRICE
    ]

    data = {field: request.json.get(field) for field in required_fields}

    # Check if mandatory fields are provided
    if not data[EntityName.CONST_ASKING_PRICE]:
        return jsonify({'error': 'Missing required application information'}), 400

    # Create application data
    application_data = {
        'campaignId': campaign_id,
        'influencerId': '668ae2ae09727d27521e2928',  # change to session.get
        EntityName.CONST_ASKING_PRICE: int(data[EntityName.CONST_ASKING_PRICE])
    }

    # Save application data to MongoDB
    applications_collection = db.client['Database']['Applications']
    result = applications_collection.insert_one(application_data)

    return jsonify("Application was submitted."), 201


# Influencer explore page for active campaigns
@app.route('/api/influencer/home/explore', methods=['GET'])
def explore_campaigns():
    influencer_id = '668ae2ae09727d27521e2928',  # change to session.get
    if not influencer_id:
        return jsonify({'error': 'Influencer not authenticated'}), 401

    active_campaigns = list(db.client['Database']['Campaigns'].find({EntityName.CONST_IS_ACTIVE: True}))
    applied_campaigns = list(db.client['Database']['Applications'].find({"influencer_id": influencer_id}))

    applied_campaign_ids = [app['campaign_id'] for app in applied_campaigns]
    available_campaigns = [campaign for campaign in active_campaigns if campaign['_id'] not in applied_campaign_ids]

    return jsonify({'available_campaigns': available_campaigns}), 200


if __name__ == '__main__':
    app.run(debug=True)
