/*
  Warnings:

  - Added the required column `img` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "img" TEXT NOT NULL;
