import httpx
import json
from typing import Dict, Any
from app.services.ai.providers.base import LLMProvider
from app.core.config import settings


class OpenRouterProvider(LLMProvider):
    def __init__(self, api_key: str = None, model: str = None):
        self.api_key = api_key or settings.OPENROUTER_API_KEY
        self.model = model or "meta-llama/llama-3-70b-instruct"
        self.base_url = "https://openrouter.ai/api/v1"

    async def generate_summary(self, transcript: str, prompt: str) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": self.model,
                    "messages": [
                        {"role": "system", "content": prompt},
                        {"role": "user", "content": transcript}
                    ],
                    "response_format": {"type": "json_object"}
                },
                timeout=60.0
            )
            data = response.json()
            content = data['choices'][0]['message']['content']
            return json.loads(content)

    async def extract_action_items(self, transcript: str, prompt: str) -> Dict[str, Any]:
        return await self.generate_summary(transcript, prompt)
