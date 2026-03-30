# Backend: what to do now and best practices

## What to do now (order matters)

1. **Fix the `users` table (register error `users_chk_1`)**  
   - Open MySQL (Workbench, CLI, or any client).  
   - Run the script: `scripts/fix-users-role-mysql.sql`  
   - If `DROP CHECK` fails, run `SHOW CREATE TABLE users;` and drop the constraint name MySQL shows (sometimes `DROP CONSTRAINT users_chk_1`).

2. **Restart the Spring Boot app**  
   So it picks up the latest code and config.

3. **Register again**  
   `POST /auth/register` with valid JSON (use a real email format if you add validation later).

4. **Promote one user to admin (only way to manage products with current rules)**  
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'your-admin@example.com';
   ```

5. **Login and get a new token**  
   `POST /auth/login` — always use a **fresh** token after changing JWT secret or role.

6. **Create products as admin**  
   `POST /products` with header: `Authorization: Bearer <token>`.

---

## Best practices

### Security and JWT

- **One signing key everywhere**: generate and store `security.jwt.secret-key` as a long random secret; never mix Base64 vs raw string signing in code (your app now uses UTF-8 bytes consistently).
- **Short-lived access tokens** for production; consider refresh tokens if you need long sessions.
- **HTTPS** in production; never send tokens over plain HTTP on the public internet.

### Roles

- **Default new registrations to `USER`**; promote `ADMIN` only via controlled process (DB, seed script, or a dedicated admin-only API).
- **Trust the database role** at request time: JWT identifies the user; load `UserDetails` (and authorities) from DB so role changes take effect on next login/token use.

### Database

- **Prefer explicit migrations** (Flyway/Liquibase) instead of only `ddl-auto=update` in production.
- After changing enums or columns, **align MySQL** with JPA (`ENUM('ADMIN','USER')` matches `@Enumerated(STRING)`).

### API hygiene

- Return **consistent error bodies** (JSON) for 401/403/400 instead of only stack traces in logs.
- Validate input (e.g. email format, password length) in DTOs or a validation library.

### Local development

- Use **`spring.jpa.show-sql=true`** only locally; turn it off or reduce logging in production.
- Keep **`.env` or local-only `application-local.properties`** out of git for secrets.

---

## File reference

| File | Purpose |
|------|---------|
| `scripts/fix-users-role-mysql.sql` | Repairs `users.role` / check constraint after enum mapping changes |
