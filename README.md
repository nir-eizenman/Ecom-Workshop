# Ad-Venture:

## Names:
Nir Eizenman, Oren Idelson, Maya Marom, Natanel Tikotzki, Matan Shapira


## About the project: 
Our project is a website that is a platform to connect and match between companies and social media influencers. Our matching algorithm considers budget, statistics, followers information, exposure and more in order to provide the best matching services between them.

The website provides efficient matching and effective campaigns. The platform is easy to use and provides many additional services as detailed in the features part.


## Running instructions:
Frontend: cd ./frontend/ad-venture-front; npm install; npm start;
Backend: python Final_APIs.py

Note: the dependencies for the backend is located in requirements.txt


## Project structure:


## Our main algorithm:

An algorithm to match between companies and influencers based on a specific campaign’s needs (given target audience, budget, preferred way of advertising and so on).
The main goal of the algorithm is to maximize the outcome of a given goal for the company for the given budget.
We implemented a Knapsack Algorithm and paired it with a scoring algorithm to get a value (score) to each influencer (given the campaign’s target audience and the followers of the influencer), the Idea behind using Knapsack Algorithm is to maximize the goal given a budget, costs for each influencer to take part in the campaign and the value (score) of each influencer (similar to Knapsack with its sack size, weights and value accordingly).
Because we wanted to give the company several ways to choose their goal for the campaign (besides choosing the target audience and budget) we decided to create 3 different versions of our scoring algorithm, one to find the “best fit according to our vision”, one to give preference to the follower’s location in consideration to the campaign’s target audience’s location and one to give preference to the follower’s interests in consideration to the campaign’s target audience’s interests.


## Our special features:

### Performance tracking -
Each time an influencer complete one objective of his campaign (reel, story, post) he insert the objective he completed with the URL to our website, the website sent to the backend the URL, content type, influencer_id, campaign_id, then we query the database to recieve the data about the influencer, campaign, and company (that the campaign belong to it). then we send an email to the company mail that the influencer completed one objective, the mail contain the objective type and the URL.

### Notifying potentially relevant influencers -
This feature is responsible for identifying and notifying the top 5 most relevant influencers for a newly created campaign. When a company creates a campaign, the `upload_campaign` function is executed. After the campaign data is saved to the database, we find the top 5 influencers who are best suited for the campaign.

To begin, `notify_top_5` retrieves all influencers from the `Influencers` collection in the MongoDB database. For each influencer, it calculates a relevance score. This score measures how well the influencer’s profile matches the campaign’s requirements.

The function maintains a list of the top 5 influencers based on their relevance scores. If an influencer’s score is higher than one in the current top 5, the list is updated to include the new influencer, ensuring only the most relevant candidates are selected. Once the top 5 influencers are determined, the function sends an email notification to each, informing them of their potential match with the campaign.


-מבנה הפרויקט: פירוט על הקוד, חלקי הפרוייקט שבקבצים והתפקיד של כל חלק. 

