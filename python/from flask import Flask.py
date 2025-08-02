from textblob import TextBlob

blob = TextBlob("Python is an amazing language.")

# Sentiment analysis
print(blob.sentiment)  # Sentiment(polarity=0.6, subjectivity=0.85)

# Noun phrases
print(blob.noun_phrases)  # ['python', 'amazing language']

# Translation
print(blob.translate(to='ta'))  # Output in Tamil

