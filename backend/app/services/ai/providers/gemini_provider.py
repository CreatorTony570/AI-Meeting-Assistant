import httpx
import json
from typing import Dict, Any
from app.services.ai.providers.base import LLMProvider
from app.core.config import settings


class GeminiProvider(LLMProvider):
    def __init__(self, api_key: str = None, model: str = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model = model or "gemini-1.5-flash"
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models"

    async def generate_summary(self, transcript: str, prompt: str) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url}/{self.model}:generateContent?key={self.api_key}"
            payload = {
                "contents": [{
                    "parts": [{"text": f"{prompt}\n\nTranscript: {transcript}"}]
                }],
                "generationConfig": {
                    "response_mime_type": "application/json",
                }
            }
            response = await client.post(url, json=payload, timeout=60.0)
            data = response.json()
            content = data['candidates'][0]['content']['parts'][0]['text']
            return json.loads(content)

    async def extract_action_items(self, transcript: str, prompt: str) -> Dict[str, Any]:
        return await self.generate_summary(transcript, prompt)
