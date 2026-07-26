# Security Implementation

## 1. Authentication & Authorization
- **JWT**: Stateless authentication with access and refresh tokens.
- **OAuth2**: Google Login for seamless enterprise access.
- **RBAC**: Roles: `ADMIN`, `USER`, `VIEWER`.

## 2. API Security
- **Rate Limiting**: Limit API calls per user/IP to prevent DDoS and brute force.
- **CORS**: Restricted to the frontend domain.
- **Input Validation**: Strict Pydantic models for all API requests.
- **SQL Injection**: Prevented by using SQLAlchemy ORM (parameterized queries).

## 3. Data Protection
- **Encryption at Rest**: Files in S3 are encrypted (AES-256).
- **Encryption in Transit**: All communication via HTTPS/TLS 1.3.
- **Secrets Management**: Use environment variables (`.env`) or AWS Secrets Manager; never commit keys to Git.

## 4. File Security
- **Validation**: Check MIME types and magic bytes for all uploads.
- **Size Limits**: Enforce maximum file size (e.g., 500MB).
- **Scan**: (Optional) Virus scanning for uploaded files.

## 5. Audit & Logging
- **Logs**: Structured logging with `structlog`.
- **Audit Trail**: Track sensitive actions (login, delete meeting, change password) in the `audit_logs` table.
