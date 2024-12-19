import openai

# Load your OpenAI API key
openai.api_key = "your-api-key"

def review_code_changes(diff):
    # Prompt for the AI
    prompt = f"""You are a code reviewer for a Django project. Analyze the following code changes 
    and describe what was modified in this pull request:
    ```
    {diff}
    ```
    Provide detailed feedback for clarity, correctness, and best practices."""

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a highly skilled Django code reviewer."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    return response['choices'][0]['message']['content']

# Read the diff file
with open('changes.diff', 'r') as f:
    diff_content = f.read()

# Generate the review
review_feedback = review_code_changes(diff_content)
print("Review Feedback:\n", review_feedback)
