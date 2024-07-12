from DatabaseLogic import DatabaseLogic
from UserTypeEnum import UserType
import EntityName


db = DatabaseLogic("mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")

def scoreFunction(email: str) -> float:
    user_data = db.getUserByEmail(email, UserType.Influencers)
    return 100.0


