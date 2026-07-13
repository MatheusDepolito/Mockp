-- AlterTable
ALTER TABLE "Agent" ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Brokerage" ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
