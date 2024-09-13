-- Drop tables in reverse order of creation to avoid foreign key constraint issues
-- Drop Authenticator table
DROP TABLE IF EXISTS "Authenticator";

-- Drop VerificationToken table
DROP TABLE IF EXISTS "VerificationToken";

-- Drop Session table
DROP TABLE IF EXISTS "Session";

-- Drop Account table
DROP TABLE IF EXISTS "Account";

-- Drop User table
DROP TABLE IF EXISTS "User";

