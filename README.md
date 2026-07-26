<div align="center">

# ⚡ MeetingAI
### *Turn your meeting recordings into Actionable Intelligence*

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

An enterprise-grade AI Meeting Assistant that transcribes recordings, generates summaries, extracts action items, and automates follow-ups — all in one place.

</div>

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- An API key from your preferred AI provider (OpenAI, Gemini, or OpenRouter)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/CreatorTony570/AI-Meeting-Assistant.git
   cd AI-Meeting-Assistant
   ```

2. Create `backend/.env` with your config
   ```env
   DATABASE_URL=your-neon-postgres-url
   REDIS_URL=your-upstash-redis-url
   SECRET_KEY=your-secret-key-here
   ```

3. Run with Docker
   ```bash
   docker-compose up --build
   ```

4. Open in browser
   - Frontend → http://localhost:3000
   - API Docs → http://localhost:8000/docs

5. Go to **Dashboard → AI Settings** to configure your AI provider and API key.

---

## 🤖 AI Provider Support

You can configure your preferred AI provider directly from the dashboard — no environment variables needed.

| Provider | Models | Cost |
|----------|--------|------|
| Google Gemini | gemini-1.5-pro, gemini-1.5-flash | Free / Paid |
| OpenAI | gpt-4o, gpt-4-turbo, gpt-3.5-turbo | Paid |
| OpenRouter | llama-3-70b, mistral-7b, claude-3-haiku | Flexible |

---

## 🏗️ Architecture

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, Tailwind CSS, Shadcn UI, Framer Motion |
| Backend | FastAPI, Celery, Redis |
| Database | PostgreSQL + SQLAlchemy |
| AI | Whisper (STT) + Multi-provider LLM support |

---

## 📂 Project Structure

```
ai-meeting-assistant/
├── frontend/        # Next.js application
├── backend/         # FastAPI app & background workers
├── docs/            # Technical documentation
└── docker-compose.yml
```

---

## 🛡️ Security

- JWT-based authentication
- Google OAuth2 integration
- RBAC (Role-Based Access Control)
- AES-256 encryption for data at rest

---

## 📄 Documentation

| Doc | Description |
|-----|-------------|
| [Architecture](./docs/architecture.md) | System design & component overview |
| [Database Schema](./docs/database.md) | Models & relationships |
| [Development Phases](./docs/phases.md) | Roadmap & milestones |
| [Security Strategy](./docs/security.md) | Auth & encryption details |
| [AI Prompts](./docs/prompts.md) | Prompt engineering reference |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

*Crafted with curiosity & code by*

### ✦ Mridul Sharma ✦

© 2026 · All rights reserved

</div>
