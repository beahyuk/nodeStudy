# 图片对比查看器

## 组件选择

**vue轮播插件vue-awesome-swiper**

官方效果展示:<https://github.surmon.me/vue-awesome-swiper/>

项目中使用 **:**< <https://www.cnblogs.com/instelly/p/12674612.html>>  示例如何使用,包括属性说明

​					<https://www.jianshu.com/p/c4925ef55eaa?utm_source=oschina-app> 结合项目

swiper的api官方说明:<https://www.swiper.com.cn/api/index.html>

## 遇到问题

- 安装了vue-awesome-swiper,报错,需要安装swiper
  - --已解决, `npm install swiper`

- `import 'swiper/css/swiper.css'` 在node_modules中引入失败
  - --已解决,因为版本不同,可以使用`  import 'swiper/swiper-bundle.css'` 引入swiper的样式

- swiper 分页器不起作用

  - --已解决,因为swiper的版本太高,有6开头了.所以按照GitHub上的package.json,按照版本安装了

- swiper的上下页失效,不能按,只能滑动

  - --已解决,同上,版本的问题

- swiper图片放数组无法显示,但是单个图片能显示

  ![1598436533127](readme.assets/1598436533127.png)

  - --已解决，因为src的动态路径错误，参考地址：<https://www.cnblogs.com/shirliey/p/9680820.html>
  - 在src中加入require表达式，并且下面的url数组直接的asset/

  ![1598438101155](readme.assets/1598438101155.png)

  ![1598438129963](readme.assets/1598438129963.png)