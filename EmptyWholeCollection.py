from DatabaseLogic import DatabaseLogic


db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")


# Example usage
if __name__ == "__main__":
    db.clear_collection("")
