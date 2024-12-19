import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

# Define the PR diff or files to analyze
pr_diff = "Example code changes to analyze..."  # Replace with logic to get PR diff

# Send the diff to OpenAI for analysis
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a code reviewer."},
        {"role": "user", "content": f"Please review the following PR diff:\n{pr_diff}"}
    ]
)

# Print the response
print(response["choices"][0]["message"]["content"])
