import openai
import json
from typing import Dict, Any
from app.services.ai.providers.base import LLMProvider, TranscriptionProvider
from app.core.config import settings


class OpenAIProvider(LLMProvider, TranscriptionProvider):
    def __init__(self, api_key: str = None, model: str = None):
        self.api_key = api_key or settings.OPENAI_API_KEY
        self.model = model or "gpt-4o"
        self.client = openai.OpenAI(api_key=self.api_key)

    async def transcribe(self, file_path: str) -> Dict[str, Any]:
        with open(file_path, "rb") as audio_file:
            response = self.client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="verbose_json"
            )
        return response.model_dump()

    async def _query_gpt(self, system_prompt: str, user_content: str) -> Dict[str, Any]:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)

    async def generate_summary(self, transcript: str, prompt: str) -> Dict[str, Any]:
        return await self._query_gpt(prompt, transcript)

    async def extract_action_items(self, transcript: str, prompt: str) -> Dict[str, Any]:
        return await self._query_gpt(prompt, transcript)
