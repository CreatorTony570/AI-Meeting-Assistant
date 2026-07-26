import openai
import json
from app.core.config import settings
from app.services.ai.prompts import MEETING_SUMMARY_SYSTEM_PROMPT

class GPTService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

    async def analyze_transcript(self, transcript_text: str) -> dict:
        """
        Analyzes transcript to generate summary, action items, and sentiment.
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": MEETING_SUMMARY_SYSTEM_PROMPT},
                    {"role": "user", "content": f"Please analyze this meeting transcript: {transcript_text}"}
                ],
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"GPT analysis failed: {e}")
            raise e

gpt_service = GPTService()
