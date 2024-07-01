
# MongoDB connection
db = get_db()
campaigns_collection = db['campaigns']
applications_collection = db['applications']

@app.route('/upload_campaign', methods=['POST'])
def upload_campaign():
    # Get form data
    campaign_name = request.form.get('campaign_name')
    max_payment = request.form.get('max_payment')
    campaign_category = request.form.get('campaign_category')
    product_image = request.files.get('product_image')
    
    # Check if mandatory fields are provided
    if not campaign_name or not max_payment or not campaign_category:
        return jsonify({'error': 'Missing required campaign information'}), 400
    
    # Save the image if it exists
    if product_image:
        filename = secure_filename(product_image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        product_image.save(image_path)
    else:
        image_path = None
    
    # Create campaign data
    campaign_data = {
        'campaign_name': campaign_name,
        'max_payment': max_payment,
        'campaign_category': campaign_category,
        'product_image_path': image_path
    }
    
    # Save campaign data to MongoDB
    result = campaigns_collection.insert_one(campaign_data)
    
    # Return the inserted document ID
    return jsonify({'id': str(result.inserted_id), 'campaign_data': campaign_data}), 201


@app.route('/apply_for_product', methods=['POST'])
def apply_for_product():
    # Get form data
    number_of_stories = request.form.get('number_of_stories')
    number_of_posts = request.form.get('number_of_posts')
    number_of_reels = request.form.get('number_of_reels')
    minimum_asking_price = request.form.get('minimum_asking_price')

    # Check if mandatory fields are provided
    if not number_of_stories or not number_of_posts or not number_of_reels or not minimum_asking_price:
        return jsonify({'error': 'Missing required application information'}), 400
    
    # Create application data
    application_data = {
        'number_of_stories': number_of_stories,
        'number_of_posts': number_of_posts,
        'number_of_reels': number_of_reels,
        'minimum_asking_price': minimum_asking_price
    }
    
    # Save application data to MongoDB
    result = applications_collection.insert_one(application_data)
    
    # Return the inserted document ID
    return jsonify({'id': str(result.inserted_id), 'application_data': application_data}), 201

if __name__ == '__main__':
    app.run(debug=True)

