from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_session import Session
from UserTypeEnum import UserType
from ContentTypeEnum import ContentType
from flask_cors import CORS
from DatabaseLogic import DatabaseLogic
import EntityName
from Algorithm import algorithm_prep, knapsack, calculate_score_best_fit
from datetime import datetime
from bson import ObjectId
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from json import JSONEncoder
from bson import json_util
from mongoengine.base import BaseDocument
from mongoengine.queryset.base import BaseQuerySet

class MongoEngineJSONEncoder(JSONEncoder):
    def default(self,obj):
        if isinstance(obj, BaseDocument):
            return json_util._json_convert(obj.to_mongo())
        elif isinstance(obj, BaseQuerySet):
            return json_util._json_convert(obj.as_pymongo())
        return JSONEncoder.default(self, obj)


app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.config['SECRET_KEY'] = 'NIR IS ANGRY'
app.config.from_object(__name__)
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
app.json_encoder = MongoEngineJSONEncoder

Session(app)
CORS(app, supports_credentials=True)
app.secret_key = 'your_secret_key'  # Necessary for session management

db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")

database = db.client['Database']


# NATANELS APIs
@app.route('/api/signup/influencer', methods=['POST'])
def signup_influencer():
    required_fields = [
        EntityName.CONST_EMAIL,
        EntityName.CONST_INFLUENCER_FULL_NAME,
        EntityName.CONST_PASSWORD,
        EntityName.CONST_INFLUENCER_AGE,
        EntityName.CONST_INFLUENCER_GENDER,
        EntityName.CONST_INSTAGRAM
    ]

    data = {field: request.json[field] for field in required_fields}

    data[EntityName.CONST_INFLUENCER_AGE] = int(data[EntityName.CONST_INFLUENCER_AGE])

    data[EntityName.CONST_INSTAGRAM]['followers_count'] = int(data[EntityName.CONST_INSTAGRAM]['followers_count'])
    data[EntityName.CONST_INSTAGRAM]['accounts_reached_30'] = int(data[EntityName.CONST_INSTAGRAM]['accounts_reached_30'])

    #insert as int and not string
    for key in data[EntityName.CONST_INSTAGRAM]['followers_location']:
        data[EntityName.CONST_INSTAGRAM]['followers_location'][key] = int(data[EntityName.CONST_INSTAGRAM]['followers_location'][key])

    for key in data[EntityName.CONST_INSTAGRAM]['gender_stats']:
        data[EntityName.CONST_INSTAGRAM]['gender_stats'][key] = int(data[EntityName.CONST_INSTAGRAM]['gender_stats'][key])

    for key in data[EntityName.CONST_INSTAGRAM]['age_stats']:
            data[EntityName.CONST_INSTAGRAM]['age_stats'][key] = int(data[EntityName.CONST_INSTAGRAM]['age_stats'][key])

    # if adding user failed
    if not db.addUser(data, UserType.Influencers):
        return jsonify(
            {
                EntityName.CONST_RESULT: False,
                EntityName.CONST_MESSAGE: "User influencer failed to create"
            }), 406

    # addign user succeded
    return jsonify(
        {
            EntityName.CONST_RESULT: True,
            EntityName.CONST_MESSAGE: ""
        }), 201


@app.route('/api/signup/company', methods=['POST'])
def signup_company():
    required_fields = [
        EntityName.CONST_EMAIL,
        EntityName.CONST_COMPANY_NAME,
        EntityName.CONST_PASSWORD,
        EntityName.CONST_COMPANY_SITE_LINK,
        EntityName.CONST_COMPANY_ABOUT_US
    ]

    data = {field: request.json[field] for field in required_fields}

    # if adding user failed
    if not db.addUser(data, UserType.Companies):
        return jsonify(
            {
                EntityName.CONST_RESULT: False,
                EntityName.CONST_MESSAGE: "User company failed to create"
            }), 406

    # addign user succeded
    return jsonify(
        {
            EntityName.CONST_RESULT: True,
            EntityName.CONST_MESSAGE: ""
        }), 201


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json[EntityName.CONST_EMAIL]
    password = request.json[EntityName.CONST_PASSWORD]
    user_type_str = request.json[EntityName.CONST_USER_TYPE]
    

    if user_type_str == 'influencer':
        user_type = UserType(1)
    elif user_type_str == 'company':
        user_type = UserType(2)
    else:
        return jsonify(
            {
            EntityName.CONST_RESULT: False,
            EntityName.CONST_MESSAGE: "Invalid user type"
            }), 400

    user_data = db.getUserByEmail(email, user_type)

    #if login succeded
    if user_data and user_data[EntityName.CONST_PASSWORD] == password:
        user_id_str = str(user_data['_id'])
        return jsonify(
            {
            EntityName.CONST_RESULT: True,
            EntityName.CONST_MESSAGE: "",
            EntityName.CONST_USER_ID: user_id_str
            }), 200
    
    return jsonify(
            {
            EntityName.CONST_RESULT: False,
            EntityName.CONST_MESSAGE: "Invalid credentials"
            }), 401


@app.route("/api/logout")
def logout():
    return jsonify(
        {
            EntityName.CONST_RESULT: True,
            EntityName.CONST_MESSAGE: ""
        }), 200


@app.route('/api/influencer/<influencerId>/home/completion', methods=['POST'])
def influencer_one_objective_completion(influencerId):
    influencer_id = influencerId
    content_type_str = request.json[EntityName.CONST_CONTENT_TYPE] # should be string
    content_url = request.json[EntityName.CONST_URL]
    campaign_id = request.json[EntityName.CONST_CAMPAIGN_ID]


    influencer_document = db.getDocumentById(influencer_id, UserType.Influencers.name)
    campaign_document = db.getDocumentById(campaign_id, 'Campaigns')
    company_document = db.getDocumentById(str(campaign_document[EntityName.CONST_COMPANY_ID]), UserType.Companies.name)

    if influencer_document is None or campaign_document is None or company_document is None:
        return jsonify(
        {
            EntityName.CONST_MESSAGE: "Either influencer, campaign or company is invalid"
        }), 400


    sender_email = "team.ad.venture.company@gmail.com"
    receiver_email = company_document[EntityName.CONST_EMAIL]
    password = "qpic idhh vlbs xwip"

    influencer_full_name = influencer_document[EntityName.CONST_INFLUENCER_FULL_NAME]
    campaign_name = campaign_document[EntityName.CONST_CAMPAIGN_NAME]

    subject = f"{influencer_full_name} Has Uploaded New Content for Your Campaign: \"{campaign_name}\"!"
    body = f"""
        Dear {company_document[EntityName.CONST_COMPANY_NAME]} Team,

        We hope this message finds you well.

        We are excited to inform you that {influencer_full_name} has just uploaded new content for your campaign: \"{campaign_name}\". Below are the details:

        Campaign Name: {campaign_name}
        Content Type: {content_type_str}
        Content URL: {content_url}
        We encourage you to check out the new content and share your feedback. If you have any questions or require further assistance, please do not hesitate to reach out.

        Thank you for choosing our services to connect you with top influencers.

        Best regards,

        Ad-Venture
        """

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the Gmail SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
            server.login(sender_email, password)  # Log in to the email account
            server.send_message(msg)  # Send the email
        print(f"Email sent to {receiver_email}")
        return jsonify(
        {
            EntityName.CONST_MESSAGE: f"Email sent to {receiver_email} successfully"
        }), 200

    except Exception as e:
        print(f"Failed to send email to {receiver_email}: {e}")
        return jsonify(
        {
            EntityName.CONST_MESSAGE: f"Failed to send email to {receiver_email}"
        }), 401



# MAYAS APIs

def notify_influencer(influencer, campaign):
    sender_email = "team.ad.venture.company@gmail.com"
    receiver_email = influencer['email']
    password = "qpic idhh vlbs xwip"

    subject = "Congratulations! Looks like you might be a match."
    body = f"""
        Hello {influencer['full_name']},

        Congratulations! Based on your stats, you might be a possible match for a new campaign: "{campaign[EntityName.CONST_CAMPAIGN_NAME]}".
        Go fill out your application!

        Best regards,
        Ad-Venture
        """

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the Gmail SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
            server.login(sender_email, password)  # Log in to the email account
            server.send_message(msg)  # Send the email
        print(f"Email sent to {receiver_email}")
    except Exception as e:
        print(f"Failed to send email to {receiver_email}: {e}")


def notify_top_5(campaign):
    influencers_collection = database['Influencers']
    # get all documents from the collection
    influencers = influencers_collection.find()
    top_5_scores = []
    for influencer in influencers:
        current_score = calculate_score_best_fit(influencer, campaign)
        top_5_scores = sorted(top_5_scores, key=lambda x: int(x[0]))
        if len(top_5_scores) == 5:
            for i in range(len(top_5_scores)):
                # go over the top 5 scores and check if the current score is bigger than one of them
                if int(current_score) > int(top_5_scores[i][0]):
                    top_5_scores[i] = (current_score, influencer)
                    break
        else:
            top_5_scores.append((current_score, influencer))
    # notify the top 5 influencers
    for score, influencer in top_5_scores:
        notify_influencer(influencer, campaign)


@app.route('/api/company/<companyId>/home/create', methods=['POST'])
def upload_campaign(companyId):
    # try:
        data = request.json

        # Extract required fields directly from data
        campaign_name = data[EntityName.CONST_CAMPAIGN_NAME]
        budget = data[EntityName.CONST_BUDGET]
        if int(budget) <= 0:
            raise Exception("Negative budget")
        is_active = data['is_active']
        about = data['about']

        company_id = companyId
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
            EntityName.CONST_CAMPAIGN_NAME: campaign_name,
            EntityName.CONST_BUDGET: int(budget),
            "is_active": bool(is_active),
            "about": about,
            "target_audience": {
                "location": location,
                "gender": gender,
                "age": age
            },
            "categories": categories,
            'company_id': company_id,  # change to session.get
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
        campaigns_collection = database['Campaigns']
        try:
            campaigns_collection.insert_one(campaign_data)

            notify_top_5(campaign_data)
        except Exception as e:
            campaigns_collection.delete_one(campaign_data)
            raise Exception

        return jsonify("Campaign was successfully created"), 201


@app.route('/api/influencer/<influencerId>/home/explore/<campaign_id>/apply', methods=['POST'])
def apply_for_campaign(influencerId, campaign_id):
    required_fields = [
        EntityName.CONST_ASKING_PRICE,
        EntityName.CONST_INFLUENCER_ID
    ]

    data = {field: request.json.get(field) for field in required_fields}

    # Check if mandatory fields are provided
    if not data[EntityName.CONST_ASKING_PRICE]:
        return jsonify({'error': 'Missing required application information'}), 400

    # Create application data
    application_data = {
        EntityName.CONST_CAMPAIGN_ID: ObjectId(campaign_id),
        EntityName.CONST_INFLUENCER_ID: ObjectId(influencerId),  # change to session.get
        EntityName.CONST_ASKING_PRICE: int(data[EntityName.CONST_ASKING_PRICE])
    }

    # Save application data to MongoDB
    applications_collection = db.client['Database']['Applications']
    result = applications_collection.insert_one(application_data)

    return jsonify("Application was submitted."), 201


# Influencer explore page for active campaigns
@app.route('/api/influencer/<influencerid>/home/explore', methods=['GET'])
def explore_campaigns(influencerid):
    influencer_id = influencerid,  # change to session.get
    if not influencer_id:
        return jsonify({'error': 'Influencer not authenticated'}), 401

    active_campaigns = list(db.client['Database']['Campaigns'].find({EntityName.CONST_IS_ACTIVE: True}))
    applied_campaigns = list(db.client['Database']['Applications'].find({"influencer_id": ObjectId(influencer_id[0])}))

    applied_campaign_ids = [app[EntityName.CONST_CAMPAIGN_ID] for app in applied_campaigns]
    available_campaigns = [campaign for campaign in active_campaigns if campaign['_id'] not in applied_campaign_ids]
    for campaign in available_campaigns:
        campaign[EntityName.CONST_CAMPAIGN_ID] = str(campaign.pop('_id', None))

    return jsonify({'available_campaigns': available_campaigns}), 200


# ORENS APISs
# End campaign - POST - /api/company/home/<campaignId>/end
@app.route("/api/company/home/<campaignId>/end", methods=['POST'])
def end_campaign(campaignId):
    # get the campaign by id
    campaigns_collection = database["Campaigns"]
    results_collection = database["Results"]
    campaign = campaigns_collection.find_one({"_id": ObjectId(campaignId)})

    data = database["Applications"]
    check_application_not_empty = data.find({"campaign_id": ObjectId(campaignId)})

    if not list(check_application_not_empty):
        return jsonify({'error': 'there aren\'t applications for this campaign'}), 404


    # check if the campaign exists
    if not campaign:
        return jsonify({'error': 'Campaign not found'}), 404
    # update the campaign to be inactive
    if(not campaign['is_active']):
        return jsonify("Successfully ended campaign, don't have result yet"), 204
            
    campaigns_collection.update_one({"_id": ObjectId(campaignId)}, {"$set": {"is_active": False}})
    # calculate the results of the campaign
    influencers_data, budget = algorithm_prep(campaignId)

    # calculate the knapsack for each score
    knapsack_results = knapsack(influencers_data, budget)
    objectives = ["AD-Venture's Recommendation", "Best Fit By Location", "Best Fit By Category"]

    results = []
    for score_index, (
            selected_influencers_names, selected_influencers_salaries, selected_influencers, score) in enumerate(
        knapsack_results):
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
            "chosen": False,
            "campaign_objective": f"{objectives[score_index]}"
        }
        results.append(result)

    # add the results to the db
    results_collection.insert_one({EntityName.CONST_CAMPAIGN_ID: ObjectId(campaignId), "results": results})

    # return the campaign no content
    return jsonify("Successfully ended campaign"), 204


# Campaign results - GET - /api/company/home/<campaignId>/results
@app.route("/api/company/home/<campaignId>/results", methods=['GET'])
def company_home_results(campaignId):
    # get the campaign by id
    collection = database["Results"]
    campaign = collection.find_one({EntityName.CONST_CAMPAIGN_ID: ObjectId(campaignId)})
    # check if the campaign exists
    if not campaign:
        return jsonify({'error': 'Campaign not found'}), 404
    # remove the _id field
    campaign.pop('_id')
    campaign.pop(EntityName.CONST_CAMPAIGN_ID)

    campaign['results']

    for array_cell in campaign['results']:
        for influencer in array_cell['influencers']:
            influencer.pop('influencer_id')

    # return the results
    return jsonify(campaign), 200


# Campaign choose from results - POST - /api/company/home/<campaignId>/results/choose (body will contain the result number chosen)
@app.route("/api/company/home/<campaignId>/results/choose", methods=['POST'])
def company_home_results_choose(campaignId):
    # get the campaign by id
    collection = database["Results"]
    campaign = collection.find_one({EntityName.CONST_CAMPAIGN_ID: ObjectId(campaignId)})
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

    collection.update_one({EntityName.CONST_CAMPAIGN_ID: ObjectId(campaignId)},
                          {"$set": {"results." + str(result_number) + ".chosen": True}})
    # get the influencer id
    influencers = result['influencers']
    # get the influencer id for each influencer
    influencers_id = [influencer[EntityName.CONST_INFLUENCER_ID] for influencer in influencers]
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


# NIRS APIs

# Company home - GET - /api/company/home - return value: 5 last campaign (sorted by active first) (then by creation time)
@app.route("/api/company/<companyId>/home", methods=['GET'])
def company_home(companyId):
    # get the last 5 campaigns of the company
    collection = database["Campaigns"]
    # TODO: add session logic instead of const company id (session['company_id']) or (session['user_id'])
    campaigns = collection.find({"company_id": companyId}).sort([("is_active", -1), ("create_time", -1)]).limit(5)
    # convert the object to list
    campaigns = list(campaigns)
    # remove the _id field
    for campaign in campaigns:
        campaign[EntityName.CONST_CAMPAIGN_ID] = str(campaign.pop('_id'))
        campaign.pop('influencers')
        # return the campaigns

    return jsonify(campaigns), 200


# Influencer home - GET - /api/influencer/home - return value: 5 last campaign that the influencer was chosen for (sorted by active first) (then by creation time)
@app.route("/api/influencer/<influencerId>/home", methods=['GET'])
def influencer_home(influencerId):
    # get the last 5 campaigns of the influencer
    collection = database["Campaigns"]
    # TODO: add session logic instead of const influencer id (session[EntityName.CONST_INFLUENCER_ID]) or (session['user_id'])
    # find the campaigns that the influencers array contains 1234
    campaigns = collection.find({"influencers": ObjectId(influencerId)}).sort([("is_active", -1), ("create_time", -1)]).limit(5)
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
