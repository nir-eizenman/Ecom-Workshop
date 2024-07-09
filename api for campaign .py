# imports will be the same for everyone so i didnt write them 

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database']
campaigns_collection = db['campaigns']
applications_collection = db['applications']

@app.route('/upload_campaign/<company_id>', methods=['POST'])
def upload_campaign(company_id):
    # Get form data
    campaign_name = request.form.get('campaign_name')
    budget = request.form.get('budget')
    campaign_category = request.form.get('campaign_category')
    is_active = request.form.get('is_active')
    about = request.form.get('about')
    target_location = request.form.get('target_location')
    target_gender_male = request.form.get('target_gender_male')
    target_gender_female = request.form.get('target_gender_female')
    target_gender_other = request.form.get('target_gender_other')
    target_age_13_17 = request.form.get('target_age_13_17')
    target_age_18_24 = request.form.get('target_age_18_24')
    target_age_25_34 = request.form.get('target_age_25_34')
    target_age_35_44 = request.form.get('target_age_35_44')
    target_age_45_54 = request.form.get('target_age_45_54')
    target_age_55_64 = request.form.get('target_age_55_64')
    target_age_65_plus = request.form.get('target_age_65_plus')
    
    # Check if mandatory fields are provided
    if not campaign_name or not budget or not campaign_category:
        return jsonify({'error': 'Missing required campaign information'}), 400
    
    # Create campaign data
    campaign_data = {
        'campaign_name': campaign_name,
        'budget': int(budget),
        'campaign_category': {
            'category': campaign_category == 'true'
        },
        'is_active': is_active == 'true',
        'about': about,
        'target_audience': {
            'location': {
                'country': int(target_location) if target_location else None
            },
            'gender': {
                'male': int(target_gender_male) if target_gender_male else 0,
                'female': int(target_gender_female) if target_gender_female else 0,
                'other': int(target_gender_other) if target_gender_other else 0
            },
            'age': {
                '13-17': int(target_age_13_17) if target_age_13_17 else 0,
                '18-24': int(target_age_18_24) if target_age_18_24 else 0,
                '25-34': int(target_age_25_34) if target_age_25_34 else 0,
                '35-44': int(target_age_35_44) if target_age_35_44 else 0,
                '45-54': int(target_age_45_54) if target_age_45_54 else 0,
                '55-64': int(target_age_55_64) if target_age_55_64 else 0,
                '65+': int(target_age_65_plus) if target_age_65_plus else 0
            }
        },
        'companyId': ObjectId(company_id)
    }
    
    # Save campaign data to MongoDB
    result = campaigns_collection.insert_one(campaign_data)
    
    # Return the inserted document ID
    return jsonify({'id': str(result.inserted_id), 'campaign_data': campaign_data}), 201


@app.route('/apply_for_campaign/<campaign_id>/<influencer_id>', methods=['POST'])
def apply_for_campaign(campaign_id, influencer_id):
    # Get form data
    number_of_stories = request.form.get('number_of_stories')
    number_of_reels = request.form.get('number_of_reels')
    number_of_posts = request.form.get('number_of_posts')
    asking_price = request.form.get('asking_price')

    # Check if mandatory fields are provided
    if not number_of_stories or not number_of_reels or not number_of_posts or not asking_price:
        return jsonify({'error': 'Missing required application information'}), 400
    
    # Create application data
    application_data = {
        'campaignId': ObjectId(campaign_id),
        'influencerId': ObjectId(influencer_id),
        'offer': {
            'stories': int(number_of_stories),
            'reels': int(number_of_reels),
            'posts': int(number_of_posts)
        },
        'asking_price': int(asking_price)
    }
    
    # Save application data to MongoDB
    result = applications_collection.insert_one(application_data)
    
    # Return the inserted document ID
    return jsonify({'id': str(result.inserted_id), 'application_data': application_data}), 201

if __name__ == '__main__':
    app.run(debug=True)
