from abc import ABC, abstractmethod
from typing import Dict, Any

class LLMProvider(ABC):
    @abstractmethod
    async def generate_summary(self, transcript: str, prompt: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def extract_action_items(self, transcript: str, prompt: str) -> Dict[str, Any]:
        pass

class TranscriptionProvider(ABC):
    @abstractmethod
    async def transcribe(self, file_path: str) -> Dict[str, Any]:
        pass
