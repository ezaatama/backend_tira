-- CreateTable
CREATE TABLE `atasan` (
    `m_rep_id` VARCHAR(7) NOT NULL,
    `m_branch_id` VARCHAR(3) NOT NULL,
    `m_name` VARCHAR(255) NOT NULL,
    `m_current_position` VARCHAR(10) NOT NULL,
    `m_manager_id` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`m_rep_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `member` ADD CONSTRAINT `member_m_manager_id_fkey` FOREIGN KEY (`m_manager_id`) REFERENCES `atasan`(`m_rep_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atasan` ADD CONSTRAINT `atasan_m_manager_id_fkey` FOREIGN KEY (`m_manager_id`) REFERENCES `atasan`(`m_rep_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
