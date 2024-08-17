import EntityName
import random
import string

#code for generate company fake data

def random_string(length: int) -> str:
    """Generate a random string of the given length."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def random_email() -> str:
    """Generate a random email address."""
    domains = ["example.com", "test.com", "demo.com"]
    return f"{random_string(8)}@{random.choice(domains)}"

def random_company_name() -> str:
    """Generate a random company name."""
    adjectives = ["Global", "Tech", "Advanced", "Dynamic", "Innovative"]
    nouns = ["Solutions", "Systems", "Technologies", "Services", "Enterprises"]
    return f"{random.choice(adjectives)} {random.choice(nouns)} {random_string(2)}"

def generate_companies_data(num_companies: int) -> list:
    """Generate a list of dictionaries containing company data."""
    companies_data = []
    for _ in range(num_companies):
        data = generate_company_data(random_email(), random_company_name(), random_string(6))

        # Optionally add company_site
        if random.choice([True, False]):
            data[EntityName.CONST_COMPANY_SITE_LINK] = f"http://{random_string(8)}.com"

        # Optionally add about_us
        if random.choice([True, False]):
            data[EntityName.CONST_COMPANY_ABOUT_US] = "We specialize in " + random_string(20)

        companies_data.append(data)
    
    return companies_data

def generate_company_data(email: str, company_name: str, password: str) -> dict:
    return {
        EntityName.CONST_EMAIL: email,
        EntityName.CONST_COMPANY_NAME: company_name,
        EntityName.CONST_PASSWORD: password,
    }

# Example usage
if __name__ == "__main__":
    companies = generate_companies_data(15)
    for company in companies:
        print(company)

