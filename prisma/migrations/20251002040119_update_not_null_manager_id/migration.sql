/*
  Warnings:

  - Made the column `m_manager_id` on table `atasan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `atasan` DROP FOREIGN KEY `atasan_m_manager_id_fkey`;

-- DropIndex
DROP INDEX `atasan_m_manager_id_fkey` ON `atasan`;

-- AlterTable
ALTER TABLE `atasan` MODIFY `m_manager_id` VARCHAR(10) NOT NULL;

-- AddForeignKey
ALTER TABLE `atasan` ADD CONSTRAINT `atasan_m_manager_id_fkey` FOREIGN KEY (`m_manager_id`) REFERENCES `atasan`(`m_rep_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
