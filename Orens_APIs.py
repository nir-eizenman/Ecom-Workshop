from bson import ObjectId
from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_session import Session
from UserTypeEnum import UserType
from flask_cors import CORS
from DatabaseLogic import DatabaseLogic
import string
import EntityName
import random
from Algorithm import algorithm_prep, calculate_score, knapsack

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app)
app.secret_key = 'your_secret_key'  # Necessary for session management

db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")
database = db.client['Database']


# End campaign - POST - /api/company/home/<campaignId>/end
@app.route("/api/company/home/<campaignId>/end", methods=['POST'])
def company_home(campaignId):
    # get the campaign by id
    campaigns_collection = database["Campaigns"]
    results_collection = database["Results"]
    campaign = campaigns_collection.find_one({"_id": ObjectId(campaignId)})
    # check if the campaign exists
    if not campaign:
        return jsonify({'error': 'Campaign not found'}), 404
    # update the campaign to be inactive
    campaigns_collection.update_one({"_id": ObjectId(campaignId)}, {"$set": {"is_active": False}})
    # calculate the results of the campaign
    influencers_data, budget = algorithm_prep(campaignId)
    # calculate the knapsack
    selected_influencers_names, selected_influencers_salaries, selected_influencers, score = knapsack(influencers_data,
                                                                                                      budget)
    # create the results
    results = []
    result = {
        "score": score,
        "influencers": [
            {
                "full_name": selected_influencers_names[i],
                "influencer_id": selected_influencers[i],
                "salary": selected_influencers_salaries[i]
            }
            for i in range(len(selected_influencers_names))
        ],
        "cost": sum(selected_influencers_salaries),
        "chosen": False
    }
    results.append(result)
    # add the results to the db
    results_collection.insert_one({"campaign_id": ObjectId(campaignId), "results": results})
    # return the campaign no content
    return jsonify("Successfully ended campaign"), 204


# Campaign results - GET - /api/company/home/<campaignId>/results
@app.route("/api/company/home/<campaignId>/results", methods=['GET'])
def company_home_results(campaignId):
    # get the campaign by id
    collection = database["Results"]
    campaign = collection.find_one({"campaign_id": ObjectId(campaignId)})
    # check if the campaign exists
    if not campaign:
        return jsonify({'error': 'Campaign not found'}), 404
    # remove the _id field
    campaign.pop('_id')
    campaign.pop('campaign_id')

    # return the results
    return jsonify(campaign), 200


# Campaign choose from results - POST - /api/company/home/<campaignId>/results/choose (body will contain the result number chosen)
@app.route("/api/company/home/<campaignId>/results/choose", methods=['POST'])
def company_home_results_choose(campaignId):
    # get the campaign by id
    collection = database["Results"]
    campaign = collection.find_one({"campaign_id": ObjectId(campaignId)})
    # check if the campaign exists
    if not campaign:
        return jsonify({'error': 'Campaign not found'}), 404
    # get the result number chosen
    result_number = request.json.get('result_number')
    # check if the result number is valid
    if result_number is None or result_number < 0 or result_number >= len(campaign['results']):
        return jsonify({'error': 'Invalid result number'}), 400
    # get the result chosen
    result = campaign['results'][result_number]
    # set the result to be chosen (change boolean to true)
    collection.update_one({"campaign_id": ObjectId(campaignId)},
                          {"$set": {"results." + str(result_number) + ".chosen": True}})
    # get the influencer id
    influencers = result['influencers']
    # get the influencer id for each influencer
    influencers_id = [influencer['influencer_id'] for influencer in influencers]
    # get the campaign by id
    collection = database["Campaigns"]
    campaign = collection.find_one({"_id": ObjectId(campaignId)})
    # if not found return error
    if not campaign:
        return jsonify({'error': 'Influencer not found'}), 404
    # update the campaign to be inactive
    collection.update_one({"_id": ObjectId(campaignId)}, {"$set": {"is_active": False}})
    # update influencer in the campaign
    collection.update_one({"_id": ObjectId(campaignId)}, {"$set": {"influencers": influencers_id}})
    # return the campaign no content
    return jsonify("Successfully chosen plan"), 204


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Changed port to 5001
