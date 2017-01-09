-- create sequence table
CREATE TABLE IF EXISTS tb_sequence;
CREATE TABLE tb_sequence(
	table_name VARCHAR(50) NOT NULL,
	current_value BIGINT NOT NULL,
	increment INT NOT NULL DEFAULT 1,
	PRIMARY KEY(table_name) 
)
ENGINE INNODB;

-- create nextVal function
DROP FUNCTION IF EXISTS nextVal;
DELIMITER //
CREATE FUNCTION nextVal(seq CHAR(50)) RETURNS BIGINT
BEGIN
	UPDATE tb_sequence SET 
		current_value = LAST_INSERT_ID(current_value + increment) 
	WHERE seq_name = seq;
	RETURN LAST_INSERT_ID();
END 
//
DELIMITER ;

-- init default 16 sequence
DELETE FROM tb_sequence;
INSERT INTO tb_sequence VALUES('tb_file_0', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_1', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_2', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_3', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_4', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_5', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_6', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_7', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_8', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_9', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_a', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_b', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_c', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_d', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_e', 0, 1);
INSERT INTO tb_sequence VALUES('tb_file_f', 0, 1);

-- create a procedure to create table
DROP PROCEDURE IF EXISTS createTabProc;
DELIMITER //
CREATE PROCEDURE createTabProc(IN tab_name CHAR(50))
BEGIN
	SET @sql = CONCAT('CREATE TABLE IF NOT EXISTS ', tab_name, ' (
			`id`  bigint(32) PRIMARY KEY,
			`info_hash`  varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ,
			`name`  mediumblob NULL ,
			`type`  varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL ,
			`find_date`  timestamp NULL DEFAULT NULL ,
			`size`  bigint(32) NULL DEFAULT NULL ,
			`hot`  int(11) UNSIGNED ZEROFILL NULL DEFAULT NULL ,
			`subfiles`  mediumblob NULL ,
			UNIQUE INDEX `info_hash` (`info_hash`) USING BTREE
			)');
	PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END
//
DELIMITER ;