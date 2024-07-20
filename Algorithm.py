def knapsack(influencers, budget):
    n = len(influencers)

    # Create a 2D DP array
    dp = [[0 for _ in range(budget + 1)] for _ in range(n + 1)]

    # Populate the DP array
    for i in range(1, n + 1):
        for w in range(budget + 1):
            if influencers[i-1]['cost'] <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-influencers[i-1]['cost']] + influencers[i-1]['score'])
            else:
                dp[i][w] = dp[i-1][w]

    # Backtrack to find the selected influencers
    w = budget
    selected_influencers = []
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected_influencers.append(influencers[i-1]['id'])
            w -= influencers[i-1]['cost']

    return selected_influencers, dp[n][budget]

# Sample Data (replace with actual data)
influencers = [
    {'id': 1, 'score': 8, 'cost': 1000},
    {'id': 2, 'score': 7, 'cost': 800},
    {'id': 3, 'score': 6, 'cost': 600},
    # Add more influencers...
]

budget = 5000

selected_influencers, max_score = knapsack(influencers, budget)
print(f"Selected Influencers: {selected_influencers}")
print(f"Maximum Score: {max_score}")
