/*
  Warnings:

  - Added the required column `availableSeats` to the `concert_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `concert_tickets` ADD COLUMN `availableSeats` INTEGER NOT NULL;
