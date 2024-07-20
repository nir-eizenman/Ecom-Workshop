# The APIS here: upload_campaign, apply_for_campaign, explore_campaigns
from datetime import datetime

from bson import ObjectId
from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_session import Session
from flask_cors import CORS
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
    required_fields = [
        EntityName.CONST_CAMPAIGN_NAME, EntityName.CONST_BUDGET, EntityName.CONST_IS_ACTIVE, EntityName.CONST_ABOUT,
        EntityName.CONST_TARGET_LOCATION, EntityName.CONST_TARGET_GENDER_MALE, EntityName.CONST_TARGET_GENDER_FEMALE,
        EntityName.CONST_TARGET_GENDER_OTHER, EntityName.CONST_TARGET_AGE_13_17, EntityName.CONST_TARGET_AGE_18_24,
        EntityName.CONST_TARGET_AGE_25_34, EntityName.CONST_TARGET_AGE_35_44, EntityName.CONST_TARGET_AGE_45_54,
        EntityName.CONST_TARGET_AGE_55_64, EntityName.CONST_TARGET_AGE_65_PLUS, EntityName.CONST_CAMPAIGN_GOAL,
        EntityName.CONST_CAMPAIGN_REELS, EntityName.CONST_CAMPAIGN_POSTS, EntityName.CONST_CAMPAIGN_STORIES
    ]

    data = {field: request.json.get(field) for field in required_fields}

    # Check if mandatory fields are provided
    if not data[EntityName.CONST_CAMPAIGN_NAME] or not data[EntityName.CONST_BUDGET] or not data[
        EntityName.CONST_CAMPAIGN_GOAL]:
        return jsonify({'error': 'Missing required campaign information'}), 400

    # Create campaign data
    campaign_data = {
        EntityName.CONST_CAMPAIGN_NAME: data[EntityName.CONST_CAMPAIGN_NAME],
        EntityName.CONST_BUDGET: int(data[EntityName.CONST_BUDGET]),
        EntityName.CONST_IS_ACTIVE: data[EntityName.CONST_IS_ACTIVE] == 'true',
        EntityName.CONST_ABOUT: data[EntityName.CONST_ABOUT],
        'target_audience': {
            'location': {
                'country': int(data[EntityName.CONST_TARGET_LOCATION]) if data[
                    EntityName.CONST_TARGET_LOCATION] else None
            },
            'gender': {
                'male': int(data[EntityName.CONST_TARGET_GENDER_MALE]) if data[
                    EntityName.CONST_TARGET_GENDER_MALE] else 0,
                'female': int(data[EntityName.CONST_TARGET_GENDER_FEMALE]) if data[
                    EntityName.CONST_TARGET_GENDER_FEMALE] else 0,
                'other': int(data[EntityName.CONST_TARGET_GENDER_OTHER]) if data[
                    EntityName.CONST_TARGET_GENDER_OTHER] else 0
            },
            'age': {
                '13-17': int(data[EntityName.CONST_TARGET_AGE_13_17]) if data[EntityName.CONST_TARGET_AGE_13_17] else 0,
                '18-24': int(data[EntityName.CONST_TARGET_AGE_18_24]) if data[EntityName.CONST_TARGET_AGE_18_24] else 0,
                '25-34': int(data[EntityName.CONST_TARGET_AGE_25_34]) if data[EntityName.CONST_TARGET_AGE_25_34] else 0,
                '35-44': int(data[EntityName.CONST_TARGET_AGE_35_44]) if data[EntityName.CONST_TARGET_AGE_35_44] else 0,
                '45-54': int(data[EntityName.CONST_TARGET_AGE_45_54]) if data[EntityName.CONST_TARGET_AGE_45_54] else 0,
                '55-64': int(data[EntityName.CONST_TARGET_AGE_55_64]) if data[EntityName.CONST_TARGET_AGE_55_64] else 0,
                '65+': int(data[EntityName.CONST_TARGET_AGE_65_PLUS]) if data[
                    EntityName.CONST_TARGET_AGE_65_PLUS] else 0
            }
        },
        'categories': request.json.get('categories', []),
        'company_id': "6695650dd312588ddbf599fe", #change to session.get
        EntityName.CONST_CAMPAIGN_GOAL: data[EntityName.CONST_CAMPAIGN_GOAL],
        'campaign_objective': {
            'reels': int(data[EntityName.CONST_CAMPAIGN_REELS]) if data[EntityName.CONST_CAMPAIGN_REELS] else 0,
            'posts': int(data[EntityName.CONST_CAMPAIGN_POSTS]) if data[EntityName.CONST_CAMPAIGN_POSTS] else 0,
            'stories': int(data[EntityName.CONST_CAMPAIGN_STORIES]) if data[EntityName.CONST_CAMPAIGN_STORIES] else 0
        },
        'create_time': datetime.now(),
        'influencers': []
    }

    # Save campaign data to MongoDB
    campaigns_collection = db.client['Database']['Campaigns']
    result = campaigns_collection.insert_one(campaign_data)

    return jsonify(""), 201


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
        'influencerId': '668ae2ae09727d27521e2928', #change to session.get
        EntityName.CONST_ASKING_PRICE: int(data[EntityName.CONST_ASKING_PRICE])
    }

    # Save application data to MongoDB
    applications_collection = db.client['Database']['Applications']
    result = applications_collection.insert_one(application_data)

    return jsonify(""), 201


# Influencer explore page for active campaigns
@app.route('/api/influencer/home/explore', methods=['GET'])
def explore_campaigns():
    influencer_id = '668ae2ae09727d27521e2928', #change to session.get
    if not influencer_id:
        return jsonify({'error': 'Influencer not authenticated'}), 401

    active_campaigns = list(db.client['Database']['Campaigns'].find({EntityName.CONST_IS_ACTIVE: True}))
    applied_campaigns = list(db.client['Database']['Applications'].find({"influencer_id": influencer_id}))

    applied_campaign_ids = [app['campaign_id'] for app in applied_campaigns]
    available_campaigns = [campaign for campaign in active_campaigns if campaign['_id'] not in applied_campaign_ids]

    return jsonify({'available_campaigns': available_campaigns}), 200


if __name__ == '__main__':
    app.run(debug=True)
