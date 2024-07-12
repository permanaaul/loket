-- CreateTable
CREATE TABLE `ticket_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `concert_tickets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `concertId` INTEGER NOT NULL,
    `ticketTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `concert_tickets` ADD CONSTRAINT `concert_tickets_concertId_fkey` FOREIGN KEY (`concertId`) REFERENCES `concerts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `concert_tickets` ADD CONSTRAINT `concert_tickets_ticketTypeId_fkey` FOREIGN KEY (`ticketTypeId`) REFERENCES `ticket_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
