import instaloader


def get_influencer_data(username):
    loader = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(loader.context, username)

    data = {
        "username": username,
        "followers": profile.followers,
        "following": profile.followees,
        "posts": profile.mediacount,
        "engagement_rate": calculate_engagement_rate(profile),
        "recent_posts": [post for post in profile.get_posts()]
    }
    return data


def calculate_engagement_rate(profile):
    likes = 0
    comments = 0
    count = 0
    for post in profile.get_posts():
        likes += post.likes
        comments += post.comments
        count += 1
        if count == 10:  # Calculate engagement rate based on last 10 posts
            break
    return (likes + comments) / (profile.followers * count)


# Example usage
influencer_data = get_influencer_data('maya_marom')
print(influencer_data)