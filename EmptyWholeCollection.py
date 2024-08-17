from DatabaseLogic import DatabaseLogic


db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")


# Delete all data in collection
if __name__ == "__main__":
    db.clear_collection("")
