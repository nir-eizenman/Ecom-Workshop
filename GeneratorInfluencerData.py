import EntityName
import random
import string

import random
import string

def random_string(length: int) -> str:
    """Generate a random string of the given length."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def random_email() -> str:
    """Generate a random email address."""
    domains = ["example.com", "test.com", "demo.com"]
    return f"{random_string(8)}@{random.choice(domains)}"

def random_full_name() -> str:
    """Generate a random full name."""
    first_names = ["John", "Jane", "Alex", "Chris", "Taylor", "Sam", "Casey"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"]
    return f"{random.choice(first_names)} {random.choice(last_names)} {random_string(2)}"

def random_gender() -> str:
    """Randomly select a gender."""
    return random.choice(["female", "male"])

def random_age() -> int:
    """Generate a random age between 18 and 65."""
    return random.randint(18, 65)

def random_followers_interests() -> list:
    """Generate a random list of followers' interests."""
    interests = ["fashion", "fitness", "food", "travel", "technology", "music", "sports"]
    num_interests = random.randint(1, 5)
    return random.sample(interests, num_interests)

def random_followers_location() -> dict:
    """Generate random follower locations with counts that sum to 100."""
    locations = ["Israel", "Italy", "France", "USA", "UK", "Canada", "Australia", "Germany"]
    remaining_percentage = 100
    stats = {}

    for location in locations[:-1]:
        percentage = random.randint(0, remaining_percentage)
        stats[location] = percentage
        remaining_percentage -= percentage

    # Assign the remaining percentage to the last location
    stats[locations[-1]] = remaining_percentage

    return stats


def random_gender_stats() -> dict:
    """Generate random gender stats that sum to 100."""
    male = random.randint(0, 100)
    female = random.randint(0, 100 - male)
    other = 100 - male - female
    return {"male": male, "female": female, "other": other}

def random_age_stats() -> dict:
    """Generate random age stats that sum to 100."""
    age_ranges = ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
    remaining_percentage = 100
    stats = {}
    for age_range in age_ranges[:-1]:
        percentage = random.randint(0, remaining_percentage)
        stats[age_range] = percentage
        remaining_percentage -= percentage
    stats[age_ranges[-1]] = remaining_percentage
    return stats

def random_instagram_data() -> dict:
    """Generate random Instagram data."""
    return {
        EntityName.CONST_URL: f"http://instagram.com/{random_string(10)}",
        "username": random_string(8),
        "followers_interests": random_followers_interests(),
        "followers_location": random_followers_location(),
        "gender_stats": random_gender_stats(),
        "age_stats": random_age_stats(),
        "accounts_reached_30": random.randint(1000, 100000),
        "followers_count": random.randint(1000, 100000)
    }

def generate_influencers_data(num_companies: int) -> list:
    """Generate a list of dictionaries containing company data."""
    companies_data = []
    for _ in range(num_companies):
        data = {
            EntityName.CONST_EMAIL: random_email(),
            EntityName.CONST_INFLUENCER_FULL_NAME: random_full_name(),
            EntityName.CONST_PASSWORD: random_string(12),
            EntityName.CONST_INFLUENCER_GENDER: random_gender(),
            EntityName.CONST_INFLUENCER_AGE: random_age(),
            EntityName.CONST_INSTAGRAM: random_instagram_data()
        }
        companies_data.append(data)
    
    return companies_data

# Example usage
if __name__ == "__main__":
    companies = generate_influencers_data(1)
    for company in companies:
        print(company)


