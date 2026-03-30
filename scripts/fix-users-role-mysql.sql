-- Fix: Check constraint 'users_chk_1' violated on register (role column mismatch)
-- Run against your app database (e.g. ecom_api). Backup first in production.

USE ecom_api;

-- 1) Inspect current definition (optional)
-- SHOW CREATE TABLE users;

-- 2) Drop the offending check constraint (MySQL 8.0.19+)
-- If this fails, try: ALTER TABLE users DROP CONSTRAINT users_chk_1;
ALTER TABLE users DROP CHECK users_chk_1;

-- 3) Align role column with JPA @Enumerated(EnumType.STRING): ADMIN, USER
ALTER TABLE users
  MODIFY COLUMN role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- 4) If old rows used numeric or wrong values, fix manually after inspecting:
-- SELECT id, email, role FROM users;
-- UPDATE users SET role = 'USER' WHERE role NOT IN ('ADMIN','USER') OR role IS NULL;
