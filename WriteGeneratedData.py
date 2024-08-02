import GeneratorCompanyData
import GeneratorInfluencerData
import EntityName
from DatabaseLogic import DatabaseLogic
from UserTypeEnum import UserType


db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")


if __name__ == "__main__":
    companies_data_list = GeneratorCompanyData.generate_companies_data(1)
    influencers_data_list = GeneratorInfluencerData.generate_influencers_data(1)

    for company in companies_data_list:
        print(company)
        db.addUser(company, UserType.Companies)

    for influencer in influencers_data_list:
        print(influencer)
        db.addUser(influencer, UserType.Influencers)



