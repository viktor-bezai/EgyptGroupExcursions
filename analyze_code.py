from openai import OpenAI

# Load your OpenAI API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def review_code_changes(diff):
    # Prompt for the AI
    prompt = f"""You are a code reviewer for a Django project. Analyze the following code changes 
    and describe what was modified in this pull request:
    ```
    {diff}
    ```
    Provide detailed feedback for clarity, correctness, and best practices."""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a highly skilled Django code reviewer."},
            {"role": "user", "content": prompt}
        ],
    )
    return response['choices'][0]['message']['content']


# Read the diff file
with open('changes.diff', 'r') as f:
    diff_content = f.read()

# Generate the review
review_feedback = review_code_changes(diff_content)
print("Review Feedback:\n", review_feedback)
