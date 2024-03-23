/*
  Warnings:

  - Added the required column `description` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "label" TEXT NOT NULL;
