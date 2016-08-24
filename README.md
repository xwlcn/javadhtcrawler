# javadhtcrawler
a dht crawler, include crawler and web
不会写文档，也不想写文档，但还是要让小白能够成功跑起来，所以还是不得不瞎扯一下。不懂的再QQ联系：331319769
---------------------------------------
#跟新日志
* 1.解决大量SocksSocketImpl对象吃内存的问题！具体做法还请使用者自己按照我的说法去做：导致该问题的原因就是SocksSocketImpl的某个父类重写了finalize方法以至于大量对SocksSocketImpl的引用对象Finalizer在FinalizerThread线程的队列中得不到及时回收，解决办法：修改JDK源码中AbstractPlainSocketImpl.java删掉finalize方法重新编译，最后将编译的class文件替换到rt.jar包中去。
* 2.lucene分词器由mmseg4j换成IKAnalizer分词器
* 3.不再使用JFinal的DB + Record的方式操作数据库，因为它的做法是连接池的做法，在爬虫中使用通过jmap -dump发现大量的数据库连接对象占用内存。单独使用一个线程处理info_hash（在crawler中也可以配置多个），检测是已经否存数据库中，将单个info_hash检测改成批量检测，减轻数据库压力。
* 4.通过长时间监控，发现内存占用还是非常明显，原因就是JAVA的垃圾回收机制，不像其他语言，是程序员自己来管理内存，在爬虫中药创建大量Socket去下载metadata，有些Socket的生命周期就是两三秒的时间，这样一来启动程序的时候内存下降的十分明显，这也是在所难免的，因为Socket对象JVM并不会垃圾回收。所以内存下降明显请不要大惊小怪，使用free -m 查看内存使用情况，可以看到cache内存占绝大部分，是否存在其他内存漏洞还请各位自行jmap -dump查询。

# 运行环境
* 1.tomcat 8
* 2.mysql 5.1
* 3.redis
* 4.JDK 8

# java jdk怎么装？tomcat怎么装？mysql？redis？谷歌去。

# 安装步骤：
* 1.clone本项目到你的本地
* 2.eclipse导入本项目
* 3.修改src下的config.properties（数据库）和crawler.properties（爬虫参数）
* 4.war打包export导出项目
* 5.将war丢进tomcat的webapps目录下
* 6.进入tomcat的bin目录，执行：./startup.sh 启动tomcat

>tomcat端口什么的自己去配吧，不懂的google。
>`需要注意的是：mysql需要修改默认的最大连接数，因为默认的是100，可能不够用（根据你自己在crawler.properties中配置而定）`

忘记数据库建表了，下面拿去。。
================
```sql
CREATE TABLE `tb_aver` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`aver_name`  varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL ,
`cover`  varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL ,
`list`  mediumtext CHARACTER SET utf8 COLLATE utf8_bin NULL ,
PRIMARY KEY (`id`)
)

CREATE TABLE `tb_file` (
`id`  bigint(32) NOT NULL AUTO_INCREMENT ,
`info_hash`  varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ,
`name`  varchar(400) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`type`  varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL ,
`find_date`  timestamp NULL DEFAULT NULL ,
`size`  bigint(32) NULL DEFAULT NULL ,
`hot`  int(11) UNSIGNED ZEROFILL NULL DEFAULT NULL ,
`aid`  int(11) NULL DEFAULT NULL ,
`subfiles`  mediumblob NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`aid`) REFERENCES `tb_aver` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
UNIQUE INDEX `info_hash` (`info_hash`) USING BTREE ,
INDEX `fk_1` (`aid`) USING BTREE 
)
```
