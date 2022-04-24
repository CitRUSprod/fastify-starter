-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "creationDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "creationDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "registrationDate" DROP DEFAULT;
