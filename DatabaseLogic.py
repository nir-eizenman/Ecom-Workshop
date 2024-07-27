import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from UserTypeEnum import UserType
import EntityName
from bson import ObjectId

#uri = "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1"
# Create a new client and connect to the server
#client = MongoClient(uri, server_api=ServerApi('1'))

CONST_DATA_BASE = 'Database'

class DatabaseLogic:

    

    #TODO - add the collections and database names to EntityName and use it instead of plain text
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
        db = self.client[CONST_DATA_BASE]
        try:
            if not self.checkIfUnique(CONST_DATA_BASE, userType.name, EntityName.CONST_EMAIL, data[EntityName.CONST_EMAIL]):
                return False
            print("1")
            # if userType is UserType.Company:#TODO - make the createCollection receive a prameter of initilized data so it will insert that and will not hurt when we try to pull from the collection. Myabe there is a better way to save the campaigns??? Ask Maya how she handle that
            #     self.createCollection('Campaign', data[EntityName.CONST_COMPANY_NAME])
            collection = db[userType.name]
            collection.insert_one(data)
            print("3")
        except Exception as e:
            print(e)
            return False

        return True

    # def getUserByUserName(self, userName: str, userType: UserType) -> dict:
    #     db = self.client[CONST_DATA_BASE]
    #     try:
    #         collection = db[userType.name]
    #         result = collection.find_one({"name": userName})
    #         return result
    #     except Exception as e:
    #         print(e)
    #         return None
        
    
    def getUserByEmail(self, email: str, userType: UserType) -> dict:
        db = self.client[CONST_DATA_BASE]
        try:
            collection = db[userType.name]
            result = collection.find_one({EntityName.CONST_EMAIL: email})
            return result
        except Exception as e:
            print(e)
            return None


    def getDocumentById(self,  id: str, documentType: str) -> dict:
        db = self.client[CONST_DATA_BASE]
        try:
            collection = db[documentType]
            result = collection.find_one({EntityName.CONST_ID: ObjectId(id)})
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




    # def createCollection(self, databaseName: str, collectionName: str):
    #     # Ensure the company name is a valid collection name
    #     if not isinstance(collectionName, str) or not collectionName:
    #         raise ValueError("Invalid company name. It must be a non-empty string.")
        
    #     db = self.client[databaseName]
    #     # Create a new collection with the company name
    #     collection = db[collectionName]
    #     print("name: "+ collectionName)
        
    #     collection.insert_one({"initialized": True})
        
    #     print(f"Collection '{collectionName}' created successfully in the '{databaseName}' database.")
    #     #'Campaign'
    #     #https://www.w3schools.com/python/python_mongodb_create_collection.asp
    #     """
    #     Important: In MongoDB, a collection is not created until it gets content!
    #     MongoDB waits until you have inserted a document before it actually creates the collection.
    #     Remember: In MongoDB, a collection is not created until it gets content, so if this is your
    #     first time creating a collection, you should complete the next chapter
    #     (create document) before you check if the collection exists!
    #     """

    
    # def deleteSessionToken(self, sessionToken):
    #     db = self.client['Sessions']
    #     collection = db['SessionTokens']

    #     data_to_delete = {
    #         EntityName.CONST_RANDOM_SESSION_TOKEN: sessionToken,
    #     }

    #     try:
    #         collection.delete_one(data_to_delete)
    #     except Exception as e:
    #         print(e)
    #         return False

    #     return True

    # def addSessionToken(self, sessionToken, email: str):
    #     db = self.client['Sessions']
    #     collection = db['SessionTokens']

    #     data = {
    #         EntityName.CONST_RANDOM_SESSION_TOKEN: sessionToken,
    #         EntityName.CONST_EMAIL: email
    #     }

    #     try:
    #         collection.insert_one(data)
    #     except Exception as e:
    #         print(e)
    #         return False

    #     return True


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
