from app.services.ai.providers.openai_provider import OpenAIProvider
from app.services.ai.providers.gemini_provider import GeminiProvider
from app.services.ai.providers.openrouter_provider import OpenRouterProvider


class AIFactory:
    @staticmethod
    def get_llm_provider(provider_name: str, api_key: str = None, model: str = None):
        providers = {
            "openai": OpenAIProvider,
            "gemini": GeminiProvider,
            "openrouter": OpenRouterProvider,
        }
        provider_class = providers.get(provider_name.lower())
        if not provider_class:
            raise ValueError(f"Unsupported AI provider: {provider_name}")
        return provider_class(api_key=api_key, model=model)

    @staticmethod
    def get_transcription_provider(provider_name: str, api_key: str = None):
        if provider_name.lower() == "openai":
            return OpenAIProvider(api_key=api_key)
        raise ValueError(f"Unsupported transcription provider: {provider_name}")
