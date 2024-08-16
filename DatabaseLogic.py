from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from UserTypeEnum import UserType
import EntityName
from bson import ObjectId


CONST_DATA_BASE = 'Database'

class DatabaseLogic:

    def __init__(self, uri: str) -> None:
        self.client = MongoClient(uri, server_api=ServerApi('1'))


    def addCampaign(self, data: dict, companyName: str):
        # Access the 'Campaign' database and the specified company collection
        db = self.client['Campaign']
        collection = db[companyName]

        try:
            # Insert the campaign data into the collection
            collection.insert_one(data)
        except Exception as e:
            print(e)
            return False

        return True


    def addUser(self, data: dict, userType: UserType) -> bool:
        # Access a database
        db = self.client[CONST_DATA_BASE]
        try:
            # Check if the email is unique in the specified userType collection
            if not self.checkIfUnique(CONST_DATA_BASE, userType.name, EntityName.CONST_EMAIL, data[EntityName.CONST_EMAIL]):
                return False

            # Insert the user data into the appropriate collection based on userType
            collection = db[userType.name]
            collection.insert_one(data)
        except Exception as e:
            print(e)
            return False

        return True
    
    def getUserByEmail(self, email: str, userType: UserType) -> dict:
        db = self.client[CONST_DATA_BASE]

        try:
            # Access the appropriate collection based on userType
            collection = db[userType.name]
            # Find a user document by email
            result = collection.find_one({EntityName.CONST_EMAIL: email})
            return result
        except Exception as e:
            print(e)
            return None


    def getDocumentById(self,  id: str, documentType: str) -> dict:
        db = self.client[CONST_DATA_BASE]

        try:
            # Access the specified document type collection
            collection = db[documentType]
            # Find a document by its ObjectId
            result = collection.find_one({EntityName.CONST_ID: ObjectId(id)})
            return result
        except Exception as e:
            print(e)
            return None


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



    def clear_collection(self, collection_name: str):
        """
        Delete all documents in a MongoDB collection without deleting the collection itself.
        Requires a confirmation text for verification.

        :param collection_name: Name of the collection.
        """
        confirmation_text = "You shall not pass, well pass but it's at your own risk"
        user_input = input(f"To confirm the deletion of all documents in the collection '{collection_name}', "
                       f"type the following text: '{confirmation_text}':\n")
        
        if user_input == confirmation_text:
            try:
                db = self.client[CONST_DATA_BASE]
                collection = db[collection_name]
                result = collection.delete_many({})  # Delete all documents
                print(f"Deleted {result.deleted_count} documents from the collection '{collection_name}'.")
            except Exception as e:
                print(f"An error occurred: {e}")
        else:
            print("Confirmation text does not match. Operation aborted.")
