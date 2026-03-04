-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `translations` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_key_key`(`key`),
    INDEX `Category_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seed default categories
INSERT INTO `Category` (`id`, `key`, `order`, `translations`, `createdAt`, `updatedAt`) VALUES
('cat-dolls', 'dolls', 0, '{"ko":{"name":"인형"},"en":{"name":"Dolls"},"zh-CN":{"name":"娃娃"},"zh-TW":{"name":"娃娃"},"ja":{"name":"ぬいぐるみ"}}', NOW(3), NOW(3)),
('cat-cheering', 'cheering', 1, '{"ko":{"name":"응원용품"},"en":{"name":"Cheering"},"zh-CN":{"name":"应援用品"},"zh-TW":{"name":"應援用品"},"ja":{"name":"応援グッズ"}}', NOW(3), NOW(3)),
('cat-fashion', 'fashion', 2, '{"ko":{"name":"패션소품"},"en":{"name":"Fashion"},"zh-CN":{"name":"时尚配饰"},"zh-TW":{"name":"時尚配飾"},"ja":{"name":"ファッション小物"}}', NOW(3), NOW(3)),
('cat-keyrings', 'keyrings', 3, '{"ko":{"name":"키링/참"},"en":{"name":"Keyrings & Charms"},"zh-CN":{"name":"钥匙扣/吊饰"},"zh-TW":{"name":"鑰匙圈/吊飾"},"ja":{"name":"キーリング/チャーム"}}', NOW(3), NOW(3));

-- Add categoryId column (nullable first)
ALTER TABLE `Product` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- Migrate data from old category string to categoryId
UPDATE `Product` SET `categoryId` = CONCAT('cat-', `category`);

-- Make categoryId NOT NULL
ALTER TABLE `Product` MODIFY COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- Drop old category column
ALTER TABLE `Product` DROP COLUMN `category`;

-- Add foreign key and index
CREATE INDEX `Product_categoryId_idx` ON `Product`(`categoryId`);
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
