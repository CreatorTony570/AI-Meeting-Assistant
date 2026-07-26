# AI Prompts Strategy

## 1. Transcription (Whisper)
**Context:** We use the Whisper model to convert audio to text.
**Prompt Hint:** "The following is a business meeting recording. Please ensure professional terminology is correctly transcribed."

## 2. Meeting Summary Prompt
**System Prompt:**
> You are a highly efficient Executive Assistant. Your task is to analyze the following meeting transcript and provide a structured summary.

**User Prompt:**
> Analyze this transcript: [TRANSCRIPT]
> Generate:
> 1. Executive Summary (2-3 sentences)
> 2. Key Discussion Points (Bulleted)
> 3. Decisions Made
> 4. Overall Sentiment of the meeting.
> Output Format: JSON

## 3. Action Item Extraction Prompt
**System Prompt:**
> You are a Project Manager. Extract all actionable tasks from the transcript.

**User Prompt:**
> Transcript: [TRANSCRIPT]
> Extract tasks in the following format:
> - Task: Description
> - Owner: Name (if mentioned, else 'Unassigned')
> - Deadline: Date (if mentioned)
> - Priority: (High/Medium/Low based on context)

## 4. Email Draft Prompt
**System Prompt:**
> You are a professional communicator. Create a follow-up email based on the meeting summary.

**User Prompt:**
> Summary: [SUMMARY]
> Tone: [Professional/Casual]
> Audience: [Client/Internal]
> Compose a clear, concise follow-up email.

## 5. Prompt Versioning
- All prompts are stored in `backend/app/services/ai/prompts/` and versioned in Git.
- We use Jinja2 templates for dynamic prompt generation.
