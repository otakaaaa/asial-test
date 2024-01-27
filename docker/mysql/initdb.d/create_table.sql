CREATE TABLE IF NOT EXISTS `employee`.`tbl_syain` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(1000) NOT NULL COMMENT '名前',
  `nyusya_ymd` DATE NULL COMMENT '入社年月日',
  `role_id` INT DEFAULT 0 COMMENT '役職',
  `delete_flg` INT DEFAULT 0 COMMENT '削除フラグ',
  `delete_reason` TEXT NULL COMMENT '削除理由',
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `deleted_at` DATETIME NULL,
  `row_version` SMALLINT DEFAULT 0 COMMENT '行バージョン',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `employee`.`m_role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_name` NVARCHAR(100) NOT NULL COMMENT '役職名',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;