from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from UserTypeEnum import UserType
from DatabaseLogic import DatabaseLogic

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Necessary for session management

# Simulating a database with a dictionary
users_db = {
    'influencers': [],
    'products': []
}

db = DatabaseLogic("mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup/influencer')
def signup_influencer_form():
    return render_template('signup_influencer.html')

@app.route('/signup/product')
def signup_product_form():
    return render_template('signup_product.html')

@app.route('/signin')
def signin_form():
    return render_template('signin.html')

@app.route('/signup/influencer', methods=['POST'])
def signup_influencer():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    
    data = {'name': name, 'email': email, 'password': password}

    db.addUser(data, UserType.Influencer)

    #users_db['influencers'].append({'name': name, 'email': email, 'password': password})
    return redirect(url_for('home'))

@app.route('/signup/product', methods=['POST'])
def signup_product():
    product_name = request.form['productName']
    company = request.form['company']
    email = request.form['email']
    password = request.form['password']
    
    data = {'product_name': product_name, 'company': company, 'email': email, 'password': password}
    if not db.addUser(data, UserType.Company):
        return jsonify({'error': 'Failed to create user'}), 500

    #users_db['products'].append({'product_name': product_name, 'company': company, 'email': email, 'password': password})
    #return jsonify({'message': 'User created successfully'}), 201
    return redirect(url_for('home'))

@app.route('/signin', methods=['POST'])
def signin():
    email = request.form['email']
    password = request.form['password']
    user_type_str = request.form['user_type'].capitalize()
    
    # Ensure the user_type is valid

    #need to fix here
    print(user_type_str)
    if user_type_str not in UserType.__members__:
        return 'Invalid user type', 400
    
    user_type = UserType[user_type_str]
    print(user_type)
    user_data = db.getUserByEmail(email, user_type)
    print(user_data)
    if user_data is None:
        return 'Invalid credentials', 401
    

    if user_data and user_data['password'] == password:
        session['user_name'] = user_data['name']
        session['user_email'] = user_data['email']
        session['user_type'] = user_type_str
        return redirect(url_for('user_home'))
    
    return 'Invalid credentials', 401

    for user in users_db[user_type + 's']:  # Check the correct list based on user_type
        if user['email'] == email and user['password'] == password:
            session['user'] = user
            session['user_type'] = user_type
            return redirect(url_for('user_home'))
    
    return 'Invalid credentials', 401

@app.route('/user_home')
def user_home():
    if 'user' in session:
        user = session['user']
        user_type = session['user_type']
        return render_template('user_home.html', user=user, user_type=user_type)
    return redirect(url_for('signin_form'))

@app.route('/home/company')
def homeCompany():
    name = session['companyName']
    companyCampaigns = db.getCompanyCampaigns(name)

    # Convert MongoDB documents to JSON serializable format if necessary
    campaigns = [{**doc, '_id': str(doc['_id'])} for doc in companyCampaigns]
    return jsonify(campaigns)

@app.route('/home/company/new_campaign', methods=['POST'])
def newCampaign():
    name = request.form['companyName']
    campaignTitle = request.form['campaignTitle']
    campaignDescription = request.form['campaignDescription']
    campaignCreationTime = request.form['campaignCreationTime']
    
    data = {'campaignTitle': campaignTitle, 'campaignDescription': campaignDescription, 'campaignCreationTime': campaignCreationTime}

    db.addCampaign(data, name)

    return redirect(url_for('homeCompany'))



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Changed port to 5001
