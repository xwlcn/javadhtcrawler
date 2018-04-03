演示地址：http://so-cili.com

a dht crawler, include crawler and web

仅供参考使用，想要跑起来的同学还是算了吧，由于当时本人比较菜，代码写得比较杂乱，部署也较麻烦，所以仅供参考爬虫部分实现。

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
