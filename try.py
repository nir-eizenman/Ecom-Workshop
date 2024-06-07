from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Access a database
db = client['Users']

# Access a collection
collection = db['Influencer']

# Send a ping to confirm a successful connection
try:
    

    # Insert multiple documents
    documents = [
        {"name": "Bob", "age": 30},
        {"name": "Charlie", "age": 35}
    ]
    collection.insert_many(documents)
    client.admin.command('ping')
    result = collection.find_one({"name": "Bob"})
    print(result)
    print(type(result))
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)