package com.so_cili.dhtcrawler.constant;

public class SQL {
	
	/**
	 * 生成创建表sql语句
	 * @param i		分表序列
	 * @return		生成的建表语句
	 */
	public static String getCreateTableSql(int i) {
		return "CREATE TABLE IF NOT EXISTS `tb_file_" + i + "` (" +
					"`id`  bigint(32) NOT NULL," +
					"`info_hash`  varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ," +
					"`name`  varchar(600) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL ," +
					"`type`  varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL ," +
					"`find_date`  timestamp NULL DEFAULT NULL ," +
					"`size`  bigint(32) NULL DEFAULT NULL ," +
					"`hot`  int(11) UNSIGNED ZEROFILL NULL DEFAULT NULL ," +
					"`aid`  int(11) NULL DEFAULT NULL ," +
					"`subfiles`  mediumblob NULL ," +
					"PRIMARY KEY (`id`)," +
					"FOREIGN KEY (`aid`) REFERENCES `tb_aver` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION," +
					"UNIQUE INDEX `info_hash` (`info_hash`) USING BTREE ," +
					"INDEX `fk_1` (`aid`) USING BTREE " +
				")" +
				"ENGINE=InnoDB" +
				"DEFAULT CHARACTER SET=utf8 COLLATE=utf8_bin;";

	}
	
	public static String getInsertTableSql(int i) {
		return "INSERT INTO tb_file_" + i + "("
				+ "id, "
				+ "info_hash, name, "
				+ "type, find_date, "
				+ "size, "
				+ "hot, "
				+ "subfiles) values(?, ?, ?, ?, ?, ?)";
					
	}
}
