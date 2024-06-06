import json
from faker import Faker

"""




"""

fake = Faker()

# Function to generate fake user data
def generate_fake_user(user_id):
    return {
        "id": user_id,
        "name": fake.name(),
        "email": fake.email(),
        "address": fake.address(),
        "phone_number": fake.phone_number()
    }

# Generate a list of fake users
num_users = 10  # Number of users to generate
data = {
    "users": [generate_fake_user(i+1) for i in range(num_users)]
}

# Write data to JSON file
with open('fake_database.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Fake data generated and written to fake_database.json")

# Read data from JSON file
with open('fake_database.json', 'r') as json_file:
    data = json.load(json_file)
print("Generated data:", data)
