from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Necessary for session management

# Simulating a database with a dictionary
users_db = {
    'influencers': [],
    'products': []
}

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
    
    users_db['influencers'].append({'name': name, 'email': email, 'password': password})
    return redirect(url_for('home'))

@app.route('/signup/product', methods=['POST'])
def signup_product():
    product_name = request.form['productName']
    company = request.form['company']
    email = request.form['email']
    password = request.form['password']
    
    users_db['products'].append({'product_name': product_name, 'company': company, 'email': email, 'password': password})
    return redirect(url_for('home'))

@app.route('/signin', methods=['POST'])
def signin():
    email = request.form['email']
    password = request.form['password']
    user_type = request.form['user_type']
    
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)  # Changed port to 5001
