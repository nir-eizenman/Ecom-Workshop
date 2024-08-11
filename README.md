Ad-Venture:

#Names:
Nir Eizenman, Oren Idelson, Maya Marom, Natanel Tikotzki, Matan Shapira

#About the project: 
Our project is a website that is a platform to connect and match between companies and social media influencers. Our matching algorithm considers budget, statistics, followers information, exposure and more in order to provide the best matching services between them.

The website provides efficient matching and effective campaigns. The platform is easy to use and provides many additional services as detailed in the features part.


Running instructions:
Frontend: cd ./frontend/ad-venture-front; npm install; npm start;
Backend: python Final_APIs.py

Note: the dependencies for the backend is located in requirements.txt

Project structure:


Our main algorithm:
An algorithm to match between companies and influencers based on a specific campaign’s needs (given target audience, budget, preferred way of advertising and so on).
The main goal of the algorithm is to maximize the outcome of a given goal for the company for the given budget.
We implemented a Knapsack Algorithm and paired it with a scoring algorithm to get a value (score) to each influencer (given the campaign’s target audience and the followers of the influencer), the Idea behind using Knapsack Algorithm is to maximize the goal given a budget, costs for each influencer to take part in the campaign and the value (score) of each influencer (similar to Knapsack with its sack size, weights and value accordingly).
Because we wanted to give the company several ways to choose their goal for the campaign (besides choosing the target audience and budget) we decided to create 3 different versions of our scoring algorithm, one to find the “best fit according to our vision”, one to give preference to the follower’s location in consideration to the campaign’s target audience’s location and one to give preference to the follower’s interests in consideration to the campaign’s target audience’s interests.



Our special features:


-מבנה הפרויקט: פירוט על הקוד, חלקי הפרוייקט שבקבצים והתפקיד של כל חלק. 

-אלגוריתמים ופיצ'רים: פירוט על איך עובד החלק/חלקים המרכזי/מרכזיים באתר/אפליקציה. לדוגמא: כאשר מתבצע חיפוש, תוכן החיפוש נשלח כקלט לפונקציה X שנמצאת בקובץ Y, הפונקציה שולפת נתונים מהדטה-בייס וממיינת אותם על פי...
