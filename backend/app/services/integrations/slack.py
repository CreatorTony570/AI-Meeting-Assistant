import httpx
from app.core.config import settings

class SlackService:
    @staticmethod
    async def send_meeting_summary(webhook_url: str, meeting_title: str, summary: str, action_items: list):
        """Send a formatted summary to a Slack channel."""
        blocks = [
            {
                "type": "header",
                "text": {"type": "plain_text", "text": f"🚀 Meeting Summary: {meeting_title}"}
            },
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": f"*Summary:*\n{summary}"}
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": "*Action Items:*"}
            }
        ]
        
        for item in action_items:
            blocks.append({
                "type": "section",
                "text": {"type": "mrkdwn", "text": f"• *{item['owner']}*: {item['task']}"}
            })

        async with httpx.AsyncClient() as client:
            await client.post(webhook_url, json={"blocks": blocks})

slack_service = SlackService()
