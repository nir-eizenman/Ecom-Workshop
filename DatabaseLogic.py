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



    def addCampaign(self, data: dict, companyName: str):
        db = self.client['Campaign']
        collection = db[companyName]

        try:
            collection.insert_one(data)
        except Exception as e:
            print(e)
            return False

        return True


    #check before that every data is legal and that this user doesn't exist
    def addUser(self, data: dict, userType: UserType) -> bool:
        # Access a database
        db = self.client['Users']
        try:
            if not self.checkIfUnique('Users', userType.name, 'email', data['email']):
                return False

            if userType is UserType.Company:
                self.createCollection('Campaign', data['name'])

            collection = db[userType.name]
            collection.insert_one(data)
        except Exception as e:
            print(e)
            return False

        return True

    def getUserByUserName(self, userName: str, userType: UserType) -> dict:
        db = self.client['Users']
        try:
            collection = db[userType.name]
            result = collection.find_one({"name": userName})
            return result
        except Exception as e:
            print(e)
            return None
        
    
    def getUserByEmail(self, email: str, userType: UserType) -> dict:
        db = self.client['Users']
        try:
            collection = db[userType.name]
            result = collection.find_one({"email": email})
            return result
        except Exception as e:
            print(e)
            return None


    def getCompanyCampaigns(self, companyName: str):
        
        db = self.client['Campaign']
        collection = db[companyName]

        recent_documents = collection.find().sort('campaignCreationTime', -1).limit(10)
    
        # Convert the result to a list
        recent_documents_list = list(recent_documents)
        
        return recent_documents_list


    def createCollection(self, databaseName: str, collectionName: str):
        # Ensure the company name is a valid collection name
        if not isinstance(collectionName, str) or not collectionName:
            raise ValueError("Invalid company name. It must be a non-empty string.")
        
        db = self.client[databaseName]
        # Create a new collection with the company name
        db[collectionName]
        
        # Optionally, you can insert an initial document to ensure the collection is created
        #collection.insert_one({"initialized": True})
        
        #print(f"Collection '{companyName}' created successfully in the 'Campaign' database.")
        #'Campaign'

    def checkIfUnique(self, databaseName: str, collectionName: str, entityName: str, entityValue):
        # Ensure the collection name is valid
        if not isinstance(collectionName, str) or not collectionName:
            raise ValueError("Invalid collection name. It must be a non-empty string.")
        
        # Ensure x is a valid parameter
        if not entityValue:
            raise ValueError("Invalid parameter. It must be a non-empty value.")
        
        db = self.client[databaseName]
        # Access the specified collection
        collection = db[collectionName]
        
        # Check if the parameter x exists in the collection
        exists = collection.find_one({entityName: entityValue})
        
        if exists:
            print(f"The parameter '{entityValue}' already exists in the '{collectionName}' collection.")
            return False
        else:
            print(f"The parameter '{entityValue}' does not exist in the '{collectionName}' collection.")
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
