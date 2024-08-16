from bson import ObjectId
from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_session import Session
from UserTypeEnum import UserType
from flask_cors import CORS
from DatabaseLogic import DatabaseLogic


db = DatabaseLogic(
    "mongodb+srv://ProjectMainAdmin:SzReRV0ZxjeWm7vN@datastorage1.dlfth1l.mongodb.net/?retryWrites=true&w=majority&appName=DataStorage1")
database = db.client['Database']


def normalize_influencers(influencers):
    # Step 1: Extract Maximum Values
    max_followers_count = max(influencer['instagram']['followers_count'] for influencer in influencers)
    max_accounts_reached_30 = max(influencer['instagram']['accounts_reached_30'] for influencer in influencers)

    # Step 2: Normalize Values
    for influencer in influencers:
        influencer['instagram']['followers_count'] /= max_followers_count
        influencer['instagram']['accounts_reached_30'] /= max_accounts_reached_30

    return influencers


def algorithm_prep(campaign_id1):
    '''
    Get the data from the db (can reuse the relevant code from APIs)
    Reorder the information in the correct structure to fit the calculation stage
    calculate cost and score for each influencer
    '''
    # get the data from the db (we need:
    # 1. Campaign data
    # 2. Influencers applied data (array of influencers data)
    # 3. Influencers applications data
    # (should be in the same data structure as the influencer applied data - per application)
    campaigns_collection = database["Campaigns"]
    influencers_collection = database["Influencers"]
    applications_collection = database["Applications"]
    campaign = campaigns_collection.find_one({"_id": ObjectId(campaign_id1)})
    applications = applications_collection.find({"campaign_id": ObjectId(campaign_id1)})
    influencers = []
    for application in applications:
        influencer = influencers_collection.find_one({"_id": application["influencer_id"]})
        # add cost field to the influencer data
        influencer['cost'] = application['asking_price']
        influencers.append(influencer)

    influencers = normalize_influencers(influencers)

    # reorder the information in the correct structure to fit the calculation stage
    influencers_data = []
    for influencer in influencers:
        influencer_data = {
            'id': influencer['_id'],
            'full_name': influencer['full_name'],
            'cost': influencer['cost'],
            'score': [calculate_score_best_fit(influencer, campaign), calculate_score_location_fit(influencer, campaign),
                      calculate_score_categories_fit(influencer, campaign)]

        }
        influencers_data.append(influencer_data)

    return influencers_data, campaign['budget']


def calculate_score_base(influencer, campaign):
    '''
        Calculate the score ("value of the influencer") based on the campaign data and the influencer data
        '''
    # the values to consider in the calculation are:
    # 1. Influencer's followers count and exposure to content
    # 2. Influencer's followers location (vs the campaign target location)
    # 3. Influencer's followers age (vs the campaign target age)
    # 4. Influencer's followers categories of interest (vs the campaign categories)
    # 5. Influencer's followers gender (vs the campaign gender)

    # we'll calculate the score for each of the values and give it a weight and then calculate the total score
    # we'll set the score for each of: location age and gender to be the intersection percentage of the influencer's followers
    # and the campaign target audience
    gender_score = 0
    for gender, percentage in influencer['instagram']['gender_stats'].items():
        gender_score += min(percentage, int(campaign['target_audience']['gender'].get(gender, 0)))
    age_score = 0
    for age, percentage in influencer['instagram']['age_stats'].items():
        age_score += min(percentage, int(campaign['target_audience']['age'].get(age, 0)))
    location_score = 0
    for location, percentage in influencer['instagram']['followers_location'].items():
        location_score += min(percentage, int(campaign['target_audience']['location'].get(location, 0)))

    # we'll set the score for the followers categories of interest to be:
    # check how many of the influencer's followers categories of interest are in the campaign categories
    categories_score = 0
    for category in campaign['categories']:
        if category in influencer['instagram']['followers_interests']:
            categories_score += 1

    # divide by the number of categories to get a percentage
    categories_score /= len(campaign['categories'])
    categories_score *= 100

    # we'll set the score for the followers count and exposure to content to be:
    accounts_reached_30 = influencer['instagram']['accounts_reached_30']
    followers_count = influencer['instagram']['followers_count']
    return followers_count, accounts_reached_30, gender_score, age_score, location_score, categories_score


def calculate_score_best_fit(influencer, campaign):
    followers_count, accounts_reached_30, gender_score, age_score, location_score, categories_score = calculate_score_base(
        influencer, campaign)

    return (0.5 * followers_count + 0.5 * accounts_reached_30) * (
            0.15 * gender_score + 0.20 * age_score + 0.35 * location_score + 0.30 * categories_score)


def calculate_score_location_fit(influencer, campaign):
    followers_count, accounts_reached_30, gender_score, age_score, location_score, categories_score = calculate_score_base(
        influencer, campaign)

    return (0.5 * followers_count + 0.5 * accounts_reached_30) * (
            0.07 * gender_score + 0.08 * age_score + 0.70 * location_score + 0.15 * categories_score)


def calculate_score_categories_fit(influencer, campaign):
    followers_count, accounts_reached_30, gender_score, age_score, location_score, categories_score = calculate_score_base(
        influencer, campaign)

    return (0.5 * followers_count + 0.5 * accounts_reached_30) * (
            0.07 * gender_score + 0.08 * age_score + 0.15 * location_score + 0.70 * categories_score)


def knapsack(influencers, budget):
    def knapsack_for_score(score_index):
        n = len(influencers)

        # Create a 2D DP array
        dp = [[0 for _ in range(budget + 1)] for _ in range(n + 1)]

        # Populate the DP array
        for i in range(1, n + 1):
            for w in range(budget + 1):
                if influencers[i - 1]['cost'] <= w:
                    dp[i][w] = max(dp[i - 1][w],
                                   dp[i - 1][w - influencers[i - 1]['cost']] + influencers[i - 1]['score'][score_index])
                else:
                    dp[i][w] = dp[i - 1][w]

        # Backtrack to find the selected influencers
        w = budget
        selected_influencers = []
        selected_influencers_names = []
        selected_influencers_salaries = []
        for i in range(n, 0, -1):
            if dp[i][w] != dp[i - 1][w]:
                selected_influencers.append(influencers[i - 1]['id'])
                selected_influencers_names.append(influencers[i - 1]['full_name'])
                selected_influencers_salaries.append(influencers[i - 1]['cost'])
                w -= influencers[i - 1]['cost']

        return selected_influencers_names, selected_influencers_salaries, selected_influencers, round(dp[n][budget], 1)

    # Get results for each of the three scores
    results = []
    for i in range(3):
        results.append(knapsack_for_score(i))

    return results

