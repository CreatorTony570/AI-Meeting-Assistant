# Database Design

## Schema Overview
We use a relational schema in PostgreSQL to ensure data integrity and complex querying capabilities.

### Tables

#### 1. `users`
- `id`: UUID (PK)
- `email`: String (Unique)
- `hashed_password`: String
- `full_name`: String
- `is_active`: Boolean
- `created_at`: Timestamp

#### 2. `meetings`
- `id`: UUID (PK)
- `user_id`: UUID (FK)
- `title`: String
- `original_filename`: String
- `s3_key`: String
- `status`: Enum (PENDING, PROCESSING, COMPLETED, FAILED)
- `duration`: Integer (seconds)
- `language`: String
- `created_at`: Timestamp

#### 3. `transcripts`
- `id`: UUID (PK)
- `meeting_id`: UUID (FK)
- `content`: Text (Full transcript)
- `segments`: JSONB (Timestamps, speaker ID, text)
- `confidence_score`: Float

#### 4. `summaries`
- `id`: UUID (PK)
- `meeting_id`: UUID (FK)
- `executive_summary`: Text
- `key_points`: JSONB (List)
- `decisions`: JSONB (List)
- `sentiment`: String

#### 5. `action_items`
- `id`: UUID (PK)
- `meeting_id`: UUID (FK)
- `task`: String
- `owner`: String
- `priority`: Enum (LOW, MEDIUM, HIGH)
- `deadline`: Timestamp
- `status`: String

#### 6. `emails`
- `id`: UUID (PK)
- `meeting_id`: UUID (FK)
- `subject`: String
- `body`: Text
- `recipient_type`: String (Client, Team, etc.)

## Indexes
- `idx_meetings_user_id`: Speed up dashboard queries.
- `idx_meetings_status`: For background worker efficiency.
- `gin_transcript_content`: For full-text search.

## Migration Strategy
- Use **Alembic** for version-controlled migrations.
- Always perform `revision --autogenerate` for schema changes.
