# 基本使用

## 代码高亮

这是GitHub上某个项目中的一个文件代码，若我想将这个文件的代码发送给别人看，那么只需将网页上的地址发送给别人即可，但如果该文件的代码量特别大，而我想提醒别人从哪个地方开始看，你就可以使用代码高亮。

那么问题是如何实现呢？我们先把当前的网址复制下来：

```sh
https://github.com/BlackmodeN/AwesomeBlog/blob/master/src/blog/dao/ArticleDao.java
```

实现高亮

```sh
# 比如你想要第14行高亮，那么很简单，在地址后面拼接一个#L关键字，并加上行号
https://github.com/BlackmodeN/AwesomeBlog/blob/master/src/blog/dao/ArticleDao.java#L14

# 而如果你想高亮显示一段代码，比如高亮显示第1行到第14行，也非常简单，修改网址
https://github.com/BlackmodeN/AwesomeBlog/blob/master/src/blog/dao/ArticleDao.java#L1-L14
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102012122.png" alt="image-20230410201224036" style="zoom:80%;" />

## 文件查找

在我们发现开源项目后，往往要进入项目详情页，通过查看文件和阅读源码来了解项目。

相信大多数同学是一级一级地点击项目目录去找文件，发现位置错了以后呢，还要回到最初的起点，呆呆地再换一个目录去找。对于 java 这种包路径层层嵌套的项目来说，实在是太麻烦了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301244318.png" alt="image-20220530124433238" style="zoom:67%;" />

其实，我们只需按下 `t` 键，就可以快速、实时地对仓库内的所有文件进行搜索了。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301244359.png" alt="image-20220530124448279" style="zoom:67%;" />

点进某个文件后，还有技巧，按下 `L` 键，就可以快速跳转到某一行。点击行号，就可以快速复制这行的代码，生成永久链接。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301245643.png" alt="image-20220530124501567" style="zoom:67%;" />

按 `b` 键还可以快速查看该文件的改动记录。是不是方便很多了呢？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301245179.png" alt="image-20220530124515103" style="zoom:67%;" />

查看尤大开发 vue 的过程除了上面这些，其实 GitHub 里还隐藏了非常多的快捷键，也可以在官方文档查看。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301245829.png" alt="image-20220530124527719" style="zoom: 67%;" />

> 官方文档：https://docs.github.com/cn/get-started/using-github/keyboard-shortcuts

除了快捷键，GitHub 其实还藏着一个命令面板，按 `ctrl + k` 打开，然后就可以快速查看内容，高效执行各种操作了，感兴趣的同学依然可以从官方文档去了解，这里不再赘述。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301245049.png" alt="image-20220530124543967" style="zoom:80%;" />

> 官方文档：https://docs.github.com/cn/get-started/using-github/github-command-palette

## 代码阅读

> 虽然通过上个技巧，我们已经能够很方便地搜索文件了，但是如果要完整阅读项目代码，可能要在文件间来回跳转，就非常麻烦。所以我们往往会把项目代码下载到本地，用更强大的编辑器来阅读。但是，在我们调研和选择项目时，有那么多我们不了解的项目，难道都要一个个下载到本地去阅读么？
>

> 当然不用！登录 GitHub 后，直接在仓库详情页按下 `。`（句号）键，神奇的事情发生了，你会发现，代码竟然直接在一个 **网页版** VS Code 编辑器中打开了！注意：英文句号就可以，直接进入项目主页，按键盘就行
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102008315.png" alt="image-20230410200815229" style="zoom:80%;" />

> 使用体验和本地的 VS Code 编辑器完全一致，不仅可以随时切换文件来阅读，代码高亮提示、快捷跳转、代码搜索、debug 等功能一应俱全，甚至还可以安装插件来增强编辑器的功能。谁用谁真香~

## 定期推送

> 除了主动搜索项目外，其实在 GitHub 的 Explorer 探索页面中，有一个非常不起眼的按钮 —— 获取邮件更新。我们可以根据自己的喜好，让 GitHub 定期给我们推送自己感兴趣的优质项目，可以持续扩大知识面、了解开源动态
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102021641.png" alt="image-20230410202103564" style="zoom:80%;" />



## 在线运行

除了一键在浏览器中查看项目源码外，GitHub 还藏着一个更 **无敌** 的功能。

让我们在项目地址前加上 `gitpod.io/#` 前缀，等待几秒钟，神奇的事情发生了。[Dashboard — Gitpod](https://gitpod.io/#github.com/JackChan1999/Java_Basic_Introduction)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102015324.png" alt="image-20230410201533244" style="zoom:80%;" />

> 直接使用Github账户登录，依托于 GitPod，我们不仅在一个网页编辑器中打开了项目代码、可以实时编辑和保存；而且它自动识别了项目的类型，并且自动安装了依赖包
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102016631.png" alt="image-20230410201634569" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301240516.png" alt="image-20220530124030408" style="zoom:50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301247296.png" alt="image-20220530124705201" style="zoom:67%;" />

接下来，我们完全可以把这个网页提供的远程服务器当做自己的电脑来使用，里面预装了 python、java、go 等等，啥环境都有！因此我们可以在控制台里为所欲为：可以输入命令来执行项目，并且直接在网页中查看项目的运行效果；甚至还可以一键构建 Docker 镜像，快得飞起！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202205301247428.png" alt="image-20220530124718345" style="zoom:67%;" />

这下再也不用把项目下载到本地，然后安装一堆环境来查看项目效果了。

> 没记错的话，GitPod 每月提供 50 个小时的免费使用时长，对绝大多数同学来说完全足够了。

## GitHub Wiki

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102025799.png" alt="image-20230410202506738" style="zoom:80%;" />

> 大家平时的项目，一般都使用 `Markdown` 来编写项目文档和 `README.md` 等。`Markdown` 一般情况下能够满足我们的文档编写需求，如果使用得当的话，效果也非常棒。不过当项目文档比较长的时候，阅读体验可能就不是那么理想了，这种情况我想大家应该都曾经遇到过。
>

> `GitHub` 每一个项目都有一个单独完整的 `Wiki` 页面，我们可以用它来实现项目信息管理，为项目提供更加完善的文档。我们可以把 `Wiki` 作为项目文档的一个重要组成部分，将冗长、具体的文档整理成 `Wiki`，将精简的、概述性的内容，放到项目中或是 `README.md` 里。关于`Wiki`使用，这里就不展开说明了，具体参考官方文档



## 在线创建文件

在有些时候，我们可能不太想用本地创建文件，然后通过`git`推送到远程这种方式去创建文件，那么有没有简单高效的一种做法呢？

很简单，通过`github`提供的 web 界面创建方式（`create new file`）去创建就可以了：

![图片](https://mmbiz.qpic.cn/mmbiz_png/LNrWl4n5XIIZZ6lFnm8MzlrHyZQUZ2q2h7zrXLBicKZoXMllfMicwsvwoibutcvqOLibkxWib2Tn9OfwWibBia31UThlw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 任务清单 

有时候我们需要标记一些任务清单去记录我们接下来要做的事情。普通的`markdown`文件中可创建`只读`的任务列表，比如在`README.md`中添加 `TODO list`:

```
接下来要做的事 🦀
- [x] 数据结构与算法
  - [ ] 贪心算法
  - [ ] 分治算法
- [ ] react源码
- [ ] docker
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102031409.png" alt="image-20230410203107337" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102030289.png" alt="image-20230410203027239" style="zoom:80%;" />

## Readme美化

当你持续在输出内容之后，一开始你会经历一个比较艰难的适应期，比如坚持了几周因为事情太忙就搁置了，所以这个时候你需要找点乐子，让自己保持新鲜感。你会发现 Github 已经可以写好看的自我介绍了：

https://github.com/anuraghazra/github-readme-stats

[github-readme-stats](https://github.com/anuraghazra/github-readme-stats/blob/master/docs/readme_cn.md)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102038288.png" alt="image-20230410203820233" style="zoom:80%;" />

好看的自我介绍

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102038098.png" alt="image-20230410203852040" style="zoom:80%;" />

比如记录的语言使用情况的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102039903.png" alt="image-20230410203928870" style="zoom:80%;" />

比如记录你的 Star、Commits、PR、Issue 情况的：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208021042838.png" alt="image-20220802104248747" style="zoom:50%;" />

把介绍写成诗句：https://github.com/anuraghazra

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)



## GitHub Actions

![图片](https://mmbiz.qpic.cn/mmbiz_png/LNrWl4n5XII518JS77yCFt6EBatK9XGOEsxmoN2H9In1sIoSH2l1F4Lt01G4SUqIemGQzb1haZTAaBENWd8Oicw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)`GitHub Actions` 是 `GitHub` 的持续集成服务。通常`持续集成`是由很多操作组成的，比如抓取代码、执行脚本、登录远程服务器、发布到第三方服务等。`GitHub`将这些操作称作`actions`。

如果你需要某个 `action`，不必自己写复杂的脚本，直接引用他人写好的 `action` 即可，整个持续集成过程，就变成了一个 `actions` 的组合。`GitHub` 做了一个官方市场，可以搜索到他人提交的 `actions`：![图片](https://mmbiz.qpic.cn/mmbiz_png/LNrWl4n5XII518JS77yCFt6EBatK9XGOlDhlgGiczI3uv7TCX4eQSjWmAibF68icIicMq18o2zRcKLVHniatQlpOWNQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)下面分别从基本概念和发布流程详细说明一下`GitHub Actions`。

### 基本概念

- `workflow` （流程）：持续集成一次运行的过程，就是一个 workflow。
- `job` （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
- `step`（步骤）：每个 job 由多个 step 构成，一步步完成。
- `action` （动作）：每个 step 可以依次执行一个或多个命令（action）。

### 实例：React 项目发布到 GitHub Pages

这里通过 `GitHub Actions` 构建一个 `React` 项目，并发布到 `GitHub Pages`。最终代码都在这个仓库里面，发布后的网址为`https://jack-cool.github.io/github-actions-demo/`。

#### 生成密钥

由于示例需要将构建成果发到`GitHub`仓库，因此需要 `GitHub` 密钥。按照官方文档，生成一个密钥。然后，将这个密钥储存到当前仓库的`Settings/Secrets`里面。![图片](https://mmbiz.qpic.cn/mmbiz_png/LNrWl4n5XII518JS77yCFt6EBatK9XGOOdRbvzW7JNAY0QoiaPUiafiavtypSGXD19f0UwDpakbBjhwsSnC3RLadw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)我这里环境变量的名字用的是`ACCESS_TOKEN`。

#### 创建 React 项目

使用`create-react-app`初始化一个 React 应用：

```
$ npx create-react-app github-actions-demo
$ cd github-actions-demo
```

在项目的`package.json`中，添加一个`homepage`字段（表示该应用发布后的根目录）

```
"homepage": "https://jack-cool.github.io/github-actions-demo"
```

#### 创建 workflow 文件

在项目的`.github/workflows`目录，创建一个`workflow`文件，这里用的是`ci.yml`。

上面已经提到`GitHub`有一个官方的市场，这里我们直接采用的是`JamesIves/github-pages-deploy-action`：

```
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
        with:
          persist-credentials: false
      # 安装依赖、打包
      - name: Install and Build
        run: |
          npm install
          npm run-script build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: build
```

这里梳理下配置文件都做了些什么：

1、 拉取代码。这里用的是 GitHub 官方的 action: `actions/checkout@v2`

2、安装依赖、打包

3、部署到`GitHub Pages`。使用了第三方作者的 action：`JamesIves/github-pages-deploy-action@releases/v3`。我这里详细介绍下这个 `action`：

使用 `with` 参数向环境中传入了三个环境变量：

- `ACCESS_TOKEN`：读取 `GitHub` 仓库 `secrets` 的 `ACCESS_TOKEN` 变量，也就是我们前面设置的
- `BRANCH`：部署分支 `gh-pages`（`GitHub Pages` 读取的分支）
- `FOLDER`：需要部署的文件在仓库中的路径，也就是我们使用 `npm run build` 生成的打包目录

> ❝
>
> 这里有一点需要注意：我使用的是 `v3` 版本，需要使用 `with` 参数传入环境变量，且需要自行构建；网上常见的教程使用的是 `v2` 版本，使用 `env` 参数传入环境变量，不需要自行构建，可使用 `BUILD_SCRIPT` 环境变量传入构建脚本。
>
> ❞

到这里，配置工作就完成了。

以后，你每次有代码 `push` 到 `master` 分支时，`GitHub` 都会开始自动构建。



## 查看项目的访问数据

在自己的项目下，点击 `Insights(洞察)`，然后再点击 `Traffic`，里面有 `Referring sites` 和 `Popular content` 的详细数据和排名

<img src="https://mmbiz.qpic.cn/mmbiz_png/LNrWl4n5XII518JS77yCFt6EBatK9XGO50Q9tG3dsHdHxvQVUhibdFEPQXN7ODlyfxTQJmy3dibSwgFIicGfHPXyQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:67%;" />

其中 `Referring sites` 表示大家都是从什么网站来到你的项目的，`Popular content` 则表示大家经常看你项目的哪些文件。

## 关注大牛

你喜欢 CSS 吗？CSS 领域最前沿的技术进展当属 TailwindCSS 这类 “实用类优先” 的 CSS 框架了，那我可以做些什么来跟进它的技术进展呢？

第一步：Star 这个项目。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208021034919.png" alt="image-20220802103439834" style="zoom:67%;" />

第二步：找到这个仓库的贡献者的前几名，关注他们！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208021034885.png" alt="image-20220802103453764" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208021035969.png" alt="image-20220802103510844" style="zoom:67%;" />

可以看看大佬们是如何努力工作的，Github 几乎全绿！🌚

当你关注他们之后，之后你已进入 Github 就可以在你自己的关注 Feed 流里面了解到这些人最近的动态，比如 Star 了哪些项目？Follow 了那些人？发布了那些包更新？久而久之，当你关注的人越来越多，你的个人关注 Feed 流就成为了你每天获取新技术信息的来源，站在这些 “巨人” 的肩膀上，获取高效的信息！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202208021036240.png" alt="image-20220802103627132" style="zoom:50%;" />

## GitHub 插件

`GitHub`的插件有很多很多，这里就推荐一下我常用的三个插件。

### Octotree

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102046791.png" alt="image-20230410204630738" style="zoom:80%;" />

我们有时经常需要在`github`上查找文件，但如果文件结构嵌套很深，查找起来是非常麻烦的，这时使用`Octotree`可以在仓库左侧显示当前项目的目录结构，让你可以在`github`上像使用`Web IDE`一样方便。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102046575.png" alt="image-20230410204641522" style="zoom:80%;" />

### isometric-contributions

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102046602.png" alt="image-20230410204656563" style="zoom:80%;" />

这个是可以更酷炫的 3D 立体式渲染`github`贡献。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102047314.png" alt="image-20230410204709251" style="zoom:80%;" />

### Enhanced GitHub

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102047633.png" alt="image-20230410204727594" style="zoom:80%;" />

这个插件支持在仓库中显示仓库大小、每个文件的大小以及每个文件的下载链接。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304102047388.png" alt="image-20230410204739323" style="zoom:80%;" />

# 快速找到优秀开源项目⭐

[玩转Github：三分钟教你如何用 Github 快速找到优秀的开源项目](https://mp.weixin.qq.com/s?__biz=MzI4Njc5NjM1NQ==&mid=2247538131&idx=1&sn=c5d26955931559b39634fe363654160b&chksm=ebd56affdca2e3e9d3b40eca7a361591bfd633b1c23eadf86eeb731c3a01fb29aae06d25d76d&mpshare=1&scene=23&srcid=0408NIJxALyJbVeJLA3icIiU&sharer_sharetime=1680928776617&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 常用词

- `watch`：会持续收到项目的动态
- `fork`：复制某个项目到自己的仓库
- `star`：点赞数，表示对该项目表示认可，点赞数越多的项目一般越火
- `clone`：将项目下载到本地
- `follow`：关注你感兴趣的作者，会收到他们的动态

## 一个完整的项目界面

![image-20230410193938618](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101939698.png)

> ① 此处是项目作者名/项目名
>
> ② 此处是项目的点赞数，和fock数，越火的项目点赞和fock就会越多
>
> ③ 项目的Description 和Website 和tags 也就是项目的说明和标签， 通过此处你可以一眼了解该项目的功能和简介
>
> ④ 项目的commits提交数 ，一般比较好的项目，维护会比较频繁，更新也会频繁，提交数就会多
>
> ⑤项目提交时间， 通过这里你可以看到项目的提交时间，防止自己下载了一些远古项目
>
> ⑥ README.md文件是一个项目的入门手册，里面介绍了整个项目的使用、功能等等。所以README文件写得好不好，关系到这个项目能不能更容易的被其他人了解和使用。

## 基本搜索

> 一般人用Github的步骤 直接搜索，选择一下Languages 设置下项目排序顺序 就直接下载
>
> 然后就是克隆仓库，阅读md，看项目源代码，看不懂，关闭项目，删除。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101943835.png" alt="image-20230410194343764" style="zoom:80%;" />

> 这样是很难找到真正适合自己的项目的，GitHub里面有很多有价值的开源项目和代码，如何在海量的代码库中搜索我们需要的信息，那么接下来将带你了解下如何利用GitHub强大的搜索功能，来找到适合自己的项目
>

## 高级搜索

GitHub有高级搜索功能，search/advanced可以输入关键字、代码库大小、包含作者、代码语、代码包含后缀文件名等。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudgR34CGTFXWTyTIgiaALicuXicNibI5PTWQLnybBJFYLAPQkwgdodQ0colnvocDYzcUrWgfVW3sSeDOQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudgR34CGTFXWTyTIgiaALicuXfiasDiaDwtibeNrLUJ00iaj3aJRcynVAyjsjchpCx7CZs5LYHH7IYOBBeA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这里我们假设正要学习 Spring Boot，要找一个 Spring Boot的 Demo 来进行参考学习。

## 高级搜索实战

### in关键词限制搜索范围

按照项目名/仓库名搜索（大小写不敏感）

- `in:name xxx` 项目名包含xxx
- `in:description xxx` 项目描述包含xxx
- `in:readme xxx` 项目介绍文档里含有xxx

比如我搜索项目名里含有 Spring Boot 的 `in:name Spring Boot`

会发现项目数量由17W变成了11W

![image-20230410194503528](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101945605.png)

搜索项目描述里含有 Spring Boot 的 `in:description Spring Boot`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101945725.png" alt="image-20230410194534654" style="zoom:80%;" />

### stars或fork数量去查找

一个项目 star 数的多少，一般代表该项目的受欢迎程度 越受欢迎的项目，star数和fork数一定也不会少

- `stars:>xxx stars`数大于xxx
- `stars:xx..xx stars`数在xx…xx之间
- `forks:>xxx forks`数大于xxx
- `forks:xx..xx forks`数在xx…xx之间

```sh
#查找star数大于等于5000的springboot项目
spring boot stars:>=5000
# 查找fork数大于500的springcloud项目
spring cloud forks:>500
# 查找fork在100到200之间并且stars数在80到100之间的springboot项目
spring boot forks:100..200 stars:80..100
```

我们进一步缩小范围，Star数量过滤，要求Star数量大于3000

```
in:name spring boot starts :> 3000
```

可以看到只有一千多个项目供我们选择了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101946362.png" alt="image-20230410194631282" style="zoom:80%;" />

### 按照地区和语言进行搜索

很多时候我们的项目是要用我们会的语言，你找到了一个Python写的好项目，但是没学过Python，下载了也看不懂，同时，为了更好的阅读README.md帮助文档以及项目注释，我想很多同学都会想要下载中文的项目，当然英语好请忽略

- location：地区
- language：语言

```sh
# 语言为javaScript   
language:javaScript   
# 地区为china
location: China
```

如果你要寻找使用 javascript 语言的国产项目，整个搜索条件就是：`language:javascript location:china`，从搜索结果来看，我们找到了五百多万javascript 项目，近 21000 多名地区信息填写为 China 的 javascript 开发者，

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudgR34CGTFXWTyTIgiaALicuXdKQOOAJ5B6GAIerdGwC1D1YkwibjofFXzPgymKicx774oC3icia3k8S1Gw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 根据仓库大小搜索

> 如果你只是想找一些小型的项目进行个人学习和开发，不想找特别复杂的，那么使用size关键字查找简单的 Demo，就成了你的首选
>

```
size:>= 数字
```

> 注意：100代表100Kb 单位为Kb

### 根据仓库是否在更新搜索

寻找项目当然是想要找到最新的项目，而不是好久都没有更新的老项目了，

- `pushed:> YYYY-MM-DD` 最后上传日期大于YYYY-MM-DD
- `created:> YYYY-MM-DD` 创建日期大于YYYY-MM-DD

比如我们想要寻找2020年最新更新的项目，可以用 `pushed:>2020-01-03 Spring Boot` ,这样子就可以找到今年一月份之后更新的最新项目

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudgR34CGTFXWTyTIgiaALicuXs2gz7063yT5G1bticzhZtmwj00iccRIUa9AIb1fhPgxvyA9ZxiaI0NVEg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 根据某个人或组织进行搜索

如果你想在GitHub 上找一下某个大神是不是提交了新的项目，可以对他们进行精准搜索

- `user: name` 查找某个用户
- `org: name` 查找某个组织
- `followers:>=xxx` 查找关注者数量超过xxx的开发者

比方说我们想要找一下廖雪峰老师的python开源项目

```
user:MichaelLiao language:python
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudgR34CGTFXWTyTIgiaALicuXUJX6ib7nFcaWic8zbLiaZvFHprxtI2pTdCLEQA24EMy3XbDzWHXIYvgow/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 根据仓库的LICENSE搜索

License是很多人容易忽略的一个问题

开源项目的License（项目授权协议） 有的开源项目作者明确禁止商用了，但是你不知情下载了，并且使用了，这就会很麻烦，“非常友好”的协议，比较出名的有这几种：BSD、MPL（Mozilla）、Apache、MIT。这些协议不但允许项目的使用者使用开源库，有些还允许对开源库进行修改并重新分发。因此用起来特别爽。上述这几个协议在细节上有些小差异，大伙儿可以去它们官网瞧一下。

以下这个网站，详细介绍了各个License的区别http://choosealicense.com/licenses/

`-license`:对应协议

例如咱们要找协议是最为宽松的 Apache License 2 的代码，

```
license:apache-2.0 Spring Boot
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudgR34CGTFXWTyTIgiaALicuXrHjwe7c5EeoiaN57QricBpq7piaRGaqqKr1GPA7aey5jU37Iaq5eOlByw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### awesome加强搜索

> Awesome 似乎已经成为不少 GitHub 项目喜爱的命名之一，Awesome 往往整合了大量的同一领域的资料，让大家可以更好的学习。awesome 关键字 awesome 系列一般是用来收集学习、工具、书籍类相关的项目
>

> 比如搜索优秀的python相关的项目，包括框架、教程等awesome java、awesome python

![](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101951808.png)

awesome-python，这个库提供了各个领域常见的python库支持。整体看下来，几乎涵盖了所有的常见的计算机领域，

### 热门搜索

> GitHub Trend 和 GitHub Topic页面总结了每天/每周/每月周期的热门 Repositories 和 Developers，你可以看到在某个周期处于热门状态的开发项目和开发者
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101948347.png" alt="image-20230410194839235" style="zoom:80%;" />

GitHub Topic 展示了最新和最流行的讨论主题，在这里你不仅能够看到开发项目，还能看到更多非开发技术讨论主题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101949853.png" alt="image-20230410194944766" style="zoom:80%;" />

### 多条件搜索

若想要在GitHub上搜索一些活跃用户，搜索一些行业内的大佬，该如何做呢？很简单，比如我学的是Java，我想搜索在杭州比较活跃的Java技术大佬，就可以输入`location:hangzhou language:java`：

```sh
location:hangzhou language:java
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101958387.png" alt="image-20230410195805305" style="zoom:80%;" />

这样就可以搜索到了。

（1）搜索主题：微服务

（2）stars数: stars > 1000

（3）仓库更新时间：在2020年8月1日之后

（4）所用语言：Java

```sh
in:description 微服务 language:java pushed:>2020-08-01 stars:>1000
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212101056458.png" alt="image-20221210105645369" style="zoom:80%;" />

  最终我们可以发现符合条件的搜索结果只有12条，是不是很高效呢~

## 查看提交记录热度图 👨‍🚀

> 查看文件时，可以按`b`查看提交记录和显示每一行的最近修改情况的热度图。它会告诉你每行代码的提交人，并且提供一个可以点击的链接去查看完整提交。中间有一个橙色的竖条。颜色越鲜艳，更改的时间就越近。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304101955280.png" alt="image-20230410195547185" style="zoom:80%;" />



# 最沙雕的5个开源项目

## 灭霸脚本

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/rcsf4tGt6JjP9HYWUrsbqvXfy4lErKDlEx9c6qJ9MZuiaOgfgdctvce8jwUvj0AMyJ9gRKerTU3EnmNdaKLIfuw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

《复联4》中的灭霸就是bug一般的存在，轻轻打一个响指，宇宙的生命就会消失一半，有网友灵机一动，写一个一个灭霸指令，可随机删除电脑上一般的文件！

这个命令会随机“删掉”您一半的文件。。

请不要在家里或其他地方使用。这是真家伙，要小心…

你可以在Story.md文件里发布你的故事，期待中…

开源地址：https://github.com/hotvulcan/Thanos.sh![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/rcsf4tGt6JjP9HYWUrsbqvXfy4lErKDl4bJh7Ly0Qrad79NnJXhOIFuYmAwibbZgU7leF5ygoJA5UbZENpdic9UQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 为所欲为gif

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/rcsf4tGt6JjP9HYWUrsbqvXfy4lErKDljDHFS5kdwyoUp6VEbgEcV4mejTsBFTKwkf5sRhJQwZYzXjFEwhX3iaA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在线制作`sorry 为所欲为`的gif

和我斗图，你有这个实力？没错，这就是一个非常牛逼的可以在线制作动态表情的开源项目

开源地址：
https://github.com/xtyxtyx/sorry

在线网址：
https://sorry.xuty.cc/

另外支持多种语言，可以学习学习哦！

- python版，由@East196编写
- java版，由@li24361编写
- nodejs版，由@q809198545编写
- C# ASP.NET版，由@shuangrain编写
- 微信小程序，由@CoXier编写
- nodejs版(使用Drawtext filter渲染)，由@SnailDev编写
- 网页版(使用Canvas渲染)，由@hhhhhg编写
- PHP版，由@PrintNow编写
- Golang版，由@Hentioe编写
- AlfredWork版，由@BlackDragonF编写
- nodejs版(使用koa2)，由@wadejs编写
- VuePress版，由@fritx编写
- 网页版，由@WincerChan编写

## 诺基亚短信

<img src="https://mmbiz.qpic.cn/sz_mmbiz_png/rcsf4tGt6JjP9HYWUrsbqvXfy4lErKDloOJsibBbhjQwt6IQorQ6pvBFPXo26jKkcPibF5hnoetqp9xcXT1MWjhA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom: 50%;" />

在线体验网址：
https://www.noddl.me/

**有内鬼终止交易**

该词出自电影《无间道1》里刘建明（刘德华饰演）向韩琛（曾志伟饰演）手机发送消息“有内鬼终止交易”。

用来调侃因为不可控的因素而失败终止。

开源地址：
https://github.com/dcalsky/zzkia

## nocode

真的，这个真的是一行代码也没有！截止目前，却标星41.2k。这是来自 Google 的一名工程师创建的一个项目。

开源地址：https://github.com/kelseyhightower/nocode

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/rcsf4tGt6JjP9HYWUrsbqvXfy4lErKDletlYZfSXFYZiarT5S30ZbA0NRrz7lvSibE3zzHQ6j5UUjcRkYB1br7Vg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)这是为啥？你仔细看了该项目的readme.md ,就知道了！

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/rcsf4tGt6JjP9HYWUrsbqvXfy4lErKDl2lBUb6TCOKYmrIsq4lTN88jlQEpHU6jy4lHx0MhH9ZH9SAgx9b498Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 女装大佬

果然，顶级程序员穿女装

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/rcsf4tGt6JjP9HYWUrsbqvXfy4lErKDltxn9eAKPCR0cNabxKpTkFjqyUOp2MeEocko46DCwFFPttbChtBs5Mg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

标星高达17.1k，普通程序员不能玩的开源项目！厉害了。

项目很简单且并不要求你贡献代码，没有编程技能都可以参加。你可以从这里学习从克隆项目，创建分支，提交和同步修改，到合并分支请求的整套流程，一次即可熟悉 Git/GitHub 的使用。

当然，你还要事先准备至少一张你的女装照。

开源地址：
https://github.com/komeiji-satori/Dress

在线地址：

- https://drsrel.github.io/
- http://satori.mycard.moe/
- https://wearadress.org/
- https://www.yoooooooooo.com/gitdress/





















































