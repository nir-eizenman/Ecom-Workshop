import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from UserTypeEnum import UserType
#uri = "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1"
# Create a new client and connect to the server
#client = MongoClient(uri, server_api=ServerApi('1'))


class DatabaseLogic:



    def __init__(self, uri: str) -> None:
        self.client = MongoClient(uri, server_api=ServerApi('1'))

    #check before that every data is legal and that this user doesn't exist
    def insertToUsersDB(self, data: dict, userType: UserType) -> bool:
        # Access a database
        db = self.client['Users']
        try:
            collection = db[userType.name]
            collection.insert_one(data)
        except Exception as e:
            print(e)
            return False

        return True







"""

# Access a collection
collection = db['Influencer']

# Send a ping to confirm a successful connection
try:
    document = {"name": "Alice", "age": 25}
    collection.insert_one(document)

    # Insert multiple documents
    documents = [
        {"name": "Bob", "age": 30},
        {"name": "Charlie", "age": 35}
    ]
    collection.insert_many(documents)
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    """
