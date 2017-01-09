# javadhtcrawler（对你有用能否赏个Star？）
a dht crawler, include crawler and web
不会写文档，也不想写文档，但还是要让小白能够成功跑起来，所以还是不得不瞎扯一下。不懂的再QQ联系：331319769
---------------------------------------
#跟新日志
* ~~1.解决大量SocksSocketImpl对象吃内存的问题！具体做法还请使用者自己按照我的说法去做：导致该问题的原因就是SocksSocketImpl的某个父类重写了finalize方法以至于大量对SocksSocketImpl的引用对象Finalizer在FinalizerThread线程的队列中得不到及时回收，解决办法：修改JDK源码中AbstractPlainSocketImpl.java删掉finalize方法重新编译，最后将编译的class文件替换到rt.jar包中去。~~
* 2.lucene分词器由mmseg4j换成IKAnalizer分词器
* ~~3.不再使用JFinal的DB + Record的方式操作数据库，因为它的做法是连接池的做法，在爬虫中使用通过jmap -dump发现大量的数据库连接对象占用内存。单独使用一个线程处理info_hash（在crawler中也可以配置多个），检测是已经否存数据库中，将单个info_hash检测改成批量检测，减轻数据库压力。~~
* ~~4.通过长时间监控，发现内存占用还是非常明显，原因就是JAVA的垃圾回收机制，不像其他语言，是程序员自己来管理内存，在爬虫中药创建大量Socket去下载metadata，有些Socket的生命周期就是两三秒的时间，这样一来启动程序的时候内存下降的十分明显，这也是在所难免的，因为Socket对象JVM并不会垃圾回收。所以内存下降明显请不要大惊小怪，使用free -m 查看内存使用情况，可以看到cache内存占绝大部分，是否存在其他内存漏洞还请各位自行jmap -dump查询。~~
* 5.进行了一次大改优化，原先没考虑分表存储，爬虫跑到900W数据的时候，速度直线下降，跑一天也就100多左右，明显这是数据库的问题。经过了Very Long的一段时间，这段时间我也不知道在干什么去了。。。就是不想再碰这个BUG众多的程序。12月份辞职回到家里闲着也是没事做，所以决定来次大改。更新内容：数据库的分表设计，设计思路我就不多说了，想了解的自己看DBUtil.java里面的代码，这个是主要的更新内容。再就是从原生的mysql操作数据再次回到JFinal的DB+Record方式操作数据库，由于分表，所以不能使用JFinal的表映射操作数据库了，这个时候发现JFinal的ActiveRecord插件是真的方便。最后就是优化程序的异常处理部分，主要就是减少异常发生的可能，程序对info_hash采用两次数据库校验：下载metadata之前与入库之前。这样确保了数据库ID的连续性。再就是项目停止线程的停止处理，自己来控制线程的停止我还真没有一个优雅的方式，总是各种异常，或者线程不是自动跑完被我强制退出，这样一来数据sequence序列将会出现很多断续的ID。所以线程的操作全部换成线程池，这样一来线程的优雅关闭就不需要我来写代码了，结果就是效果非常好，项目终止基本上没有抛出任何异常。还有个重大发现就是，经过本次的重大改进，内存占用也比以前少了很多。
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

本项目仅供学习使用，请勿用于其他用途，一切使用后果与作者无关。
