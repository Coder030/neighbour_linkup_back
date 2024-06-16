/*
  Warnings:

  - Added the required column `Lat` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Long` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "Lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Long" DOUBLE PRECISION NOT NULL;
