



# 基本配置

## 常用快捷键

关于VsCode是啥，安装就是常规的安装软件操作。下载下来之后，打开，是英文版，可以打开扩展， 搜Chinese安装中文包， 界面如下图:![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vl1BDHMWy5foaJhYVdYb2LqayvDd6GJCiauVt4xP0CspDankB0ECmSELw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)先记住两个快捷键:

`command+shift+p`: 这个是打开命令交互面板， 在命令面板中可以输入命令进行搜索(中英文都可以)，然后执行。命名面板中可以执行各种命令，包括编辑器自带的功能和插件提供的功能。![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlJKkiagKql33NFQFpliaeTxPpQpFE9XEh4PQAoc3n8Pia3dVgOexEXvzrw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

`comand+,`: 进入设置，这里可以进行用户和工作区的设置，像什么代码风格，字体风格各种设置都在这里
![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vl7MwYOBHs8G6AFrlfryrgrXursNS96nrjIbhNU6dgZyCibh5XiaGzXdpQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这两个快捷键建议记好。

另外， 这几个常用的快捷键最好也知道:

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vl25QTFaWBXuhPwNybtpbFxcyIMV6uGyCmJnLUFzX0DRTzpzTiafQnGnw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 编辑器与窗口管理

Ctrl+Shift+P: 打开命令面板。

Ctrl+Shift+N: 新建窗口。

Ctrl+Shift+W: 关闭窗口。

切分窗口：Ctrl+1/Ctrl+3/Ctrl+3

Ctrl+H：最小化窗口

Ctrl+B：显示/隐藏侧边栏

Ctrl+"+/-"：放大/缩小界面

### 文件操作

Ctrl+N：新建文件

Ctrl+W：关闭文件

Ctrl+Tab：文件切换

### 格式调整

Ctrl+C/Ctrl+V：复制或剪切当前行/当前选中内容

Alt+Up/Down：向上/下移动一行

Shift+Alt+Up//Down：向上/下复制一行

Ctrl+Delete：删除当前行

Shift+Alt+Left/Right：从光标开始向左/右选择内容

### 代码编辑

Ctrl+D：选中下一个相同内容

Ctrl+Shift+L：选中所有相同内容

Ctrl+F：查找内容

Ctrl+Shit+F：在整个文件夹中查找内容

## 常用设置

我们可以在settings.json中手动进行一些设置，让我们的编辑器更好用。

### 关闭标签介绍信息

我们在编写代码的时候鼠标移动到某个标签上，经常会自动弹出一些介绍信息，挡住部分代码，给我们的阅读带来了很大的困难，一直没有找到关闭它的方法，目前可以通过设置时间延迟暂时实现这个效果，我设置的5000毫秒，你可以设置的更大一些，基本上它就不会弹出来了。

```
"editor.hover.delay": 5000
```

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9mRmbBcWWW4b0YfyGrBejKvMHBLJmPdnmChOOjaTELnRMrHjFHeTkaw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

### 自动折行

设置代码根据编辑器窗口大小自动折行

```
"editor.wordWrap": "on"
```

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9Y9XJQiaTrFVu6aHZgEjcSzkZxyEv1SHXFtru0nVa1Fibl62KNsiakvsDQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

### 字体设置

```
// 一款适合代码显示的字体包（需要将字体包下载到本地）
   "editor.fontFamily": "Source Code Pro, 'Source Code Pro'",
   // 设置代码字体大小
   "editor.fontSize": 15,
```

### 自动保存

目前有四个选项：

- off：关闭自动保存。
- afterDelay：当文件修改后的时间超过"Files：Auto Save Delay"中配置的值时自动进行保存。
- onFocusChange：编辑器失去焦点时自动保存更新后的文件。
- onWindowChange：窗口失去焦点时自动保存更新后的文件。

```
"files.autoSave": "off"
```

### 关闭代码提示

```
"editor.quickSuggestions": { "other": false, "comments": false, "strings": false }
```



## 下载和安装

https://code.visualstudio.com/

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304021944393.png" alt="image-20230402194410296" style="zoom:67%;" />





# 编程项目配置

## C++项目配置

这里记录C++项目开发的相关配置，先安装3个插件:

- C/C++
- C/C++ Extension Pack
- CodeLLDB

然后检查下是否按照了clang/clang++ 编译器

```
clang++ -v
```

如果未安装，请前往 app store 下载 xcode安装。

准备工作完成，然后打开终端输入下面命令：

```
mkdir projects
cd projects
mkdir hello
cd hello
code .

# 上述步骤也可以在vscode中创建一个新的hello文件夹代替。
```

接下来，设置编译器路径， 交互面板下， 输入c/c++选下面这个UI的:![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vl2sPcAvSLG7uqGsMMGXvoJhZEJeKkIYjXYxBvclH8PMTPUtbI7Ds8Ig/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)采用默认即可，这里编译器我选了个clang++， 也可以默认。这样完事之后， .vscode目录下，自动多一个c_cpp_properties.json文件， 用于使用vscode自带的代码提示工具，支持代码跳转等， 在这里面进行配置如下:

```
{
    "configurations": [
        {
            "name": "Mac",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [],
            "compilerPath": "/usr/bin/clang++",
            "cStandard": "gnu17",
            "intelliSenseMode": "macos-gcc-x64",
            "cppStandard": "c++11"
        }
    ],
    "version": 4
}
```

这个完事。

接下来， 需要配置一个tasks.json文件， 用于编译c++文件。

1. 交互面板，输入task
2. 选择tasks: Configure Default Build Task
3. 选择Create tasks.json file from template
4. 选择Others， 会在.vscode下面自动创建tasks.json，在编辑器中打开
5. 进行如下配置

```
{
    "version": "2.0.0",
    "tasks": [
      {
        "label": "Build with Clang", //这个任务的名字在launch.json最后一项配置
        "type": "shell",
        "command": "clang++",
        "args": [
          "-std=c++17",
          "-stdlib=libc++",
          "-g",
          // 生成调试信息，GUN可使用该参数
          "${file}",
          // file指正在打开的文件
          "-o",
          // 生成可执行文件
          "${fileDirname}/${fileBasenameNoExtension}"
          // fileDirname指正在打开的文件所在的文件夹
          // fileBasenammeNoExtension指没有扩展名的文件，unix中可执行文件属于此类
        ],
        "options": {
          "cwd": "${workspaceFolder}"
        },
        "problemMatcher": ["$gcc"],
        "group": {
          "kind": "build",
          "isDefault": true
        }
      }
    ]
  }
  
```

这里面需要注意的是第一个label，后面的名字，要和下面这个配置文件名字最后一项保持一致。可行性文件这个保存的是路径位置。

接下来， 配置launch.json， 这个是用于使用vscode自带的debug工具（左侧的小虫图标）

1. 交互面板下输入launch，选择Debug：Open launch.json
2. 选择LLDB
3. 在.vscode下自动生成launch.json文件， 写入配置

```
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        
        {
            "name": "Debug",
            "type": "lldb",
            "request": "launch",
            "program": "${workspaceFolder}/${fileBasenameNoExtension}",
            "args": [],
            "cwd": "${workspaceFolder}",
            "preLaunchTask": "Build with Clang"
        }
    ]
}
```

这样，配置工作完成， 就可以写程序代码了。在该项目下面建立一个helloworld.cpp文件，写入如下代码：

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlwfc8YcTib4SjjTKmD5ocQ9GCCUJS4cSA1iakNia4qazS5PxcVE5m0EDaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)然后`command+shift+b`就可以进行编译，然后点击右上角的执行按钮即可运行程序了。注意，如果改变helloworld.cpp的位置，比如新建个src目录， 把这个cpp放入src目录，此时上面的task.json和launch.json相应位置需要做出改变。

```
# task.json
// 生成可执行文件
"${fileDirname}/src/${fileBasenameNoExtension}"

# launch.json
"program": "${workspaceFolder}/src/${fileBasenameNoExtension}",
```

如果想debug， 就点击左边的小虫子图标， 然后打断点， 在左上角再点击绿色箭头，就进入debug模式了。![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlgpSP1jx5zpISZNTvqH2qt5Jj0Pvq3GAdQBLcI3GAI62cJP8G9fMxPw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)到这里为止， C++环境配置完成。

在运行过程中，我其实遇到了一个c++11的bug：

```
[Running] cd "/Users/bytedance/projects/hello/" && g++ main.cpp -o main && "/Users/bytedance/projects/hello/"main
main.cpp:9:21: error: expected ';' at end of declaration
  vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};
                    ^
                    ;
main.cpp:11:27: warning: range-based for loop is a C++11 extension [-Wc++11-extensions]
  for (const string& word : msg)
                          ^
1 warning and 1 error generated.
```

这个卡了我好久其实， 上面文章中是没有写的， 这个原因解决方法可能有两个:

1. 看看插件里面是否安装了C/C++ Clang Command Adapter， 有的话卸载掉， 这个对我这个没有用
2. 进设置，搜Run Code Configuration， 打开setting.json文件， 那里面会有各类语言的执行map, 在里面找到cpp, 把后面的value改成:`"cpp": cd $dir && g++ -std=c++11 $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt`, 我用了这个方法解决的

至此， c++部分结束。

## Python项目配置

> 功能最强大的肯定是Pycharm，但是因为占内存，最重要的是得花钱，所以我一般用VSCode。还有其它的一些好用的插件，大家可以自行探索—— **如果有的选，建议Pycharm**。VSCode的安装就不多说，直接下载安装就可以了

### Python插件

为了更好地利用VSCode开发Python，推荐安装一些插件：

#### Python Snippets

Python Snippets：自动补全代码片段

![图片](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWcL12J2qqB0IZUCmicbcaqWq3Wq9ZuEICRJEP6s1fs0rqa5Gnx5XDvNsGQbZJ5WIEicGGSHwbKTR7Hw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)Python Snippets

#### Python

Python：VS Code官方自带插件

![图片](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWcL12J2qqB0IZUCmicbcaqWqyZkZEBA4gSJdwUkibSaeFbG6h7urDiafm6682Q21kMtd23JLrhmicmibQg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)Python extension for Visual Studio Code

#### LiveCode for python

LiveCode for python：可以实时显示每一个变量值

![图片](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWcL12J2qqB0IZUCmicbcaqWqy0rsNYd0oqk3XMTvDreNeqZUg7c5y7zJ6ZaITfNDMBkG3AkibRbPxrQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### Sourcery

Sourcery：可以自动审查和改进代码

![图片](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWcL12J2qqB0IZUCmicbcaqWqWV0WCtiaBwrm6V2Wg6yicQjk8A6gQtibI8nRB8f2htBEbalS58jDeZzbA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### IntelliCode

IntelliCode：官方提供的AI辅助开发插件，提供比较充分的代码提示

![图片](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWcL12J2qqB0IZUCmicbcaqWqlWjm8O1NbAeX9sCsAqtM1VViafqMRnKUyTBPx0xELqWGPib9JDwofx9Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### Python Indent

Python Indent：更好地进行Python代码的缩进

![图片](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWcL12J2qqB0IZUCmicbcaqWq1qFbzPPjZQCMjCyInzKAjTzh5ciaGJ6srmth2k0WzokNwCKL80J6icmg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

#### Python Test Explorer

Python Test Explorer：可视化代码测试

![图片](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWcL12J2qqB0IZUCmicbcaqWqlBMJiaicrvBCtLGJSjzJh75fFkuXbfoeQRhp6E6eRmibdeaqm6cePN2Cw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)Python Test Explorer

- 

### 环境设置

写大项目还是建议pycharm， yyds， 而如果写一些小demon啥的， 可以使用vscode了，这个配置起来，写代码项目也非常方便， 配置Python环境， 相对简单。首先，按照Python插件， command+shift+x， 然后搜Python即可安装插件。然后命令行输入命令：

```
mkdir projects
cd projects
mkdir hello
cd hello
code .
```

这时候会建立一个hello目录，如果提示code没有定义， 先安装code， 具体方法是command+shift+p， 然后在里面搜shell，就会显示这条命令，点击安装即可。

在hello里面，建立hello.py文件，这时候基于扩展左下角就会显示所用的Python版本， 这时候，其实就能简单运行.py文件了。比如打印个hello world。

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlevwmDDbRzJHZJG1oIHGSVVNExFeVXsR3T71w5iaiasrOxAjcpI5ufdCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**但是如何建立大项目，写更加复杂的代码呢？**这里可以安装anaconda， 然后在里面建立虚拟环境，然后在vscode中指定，就可以写了。 点击左下角的Python3.8.2这里。

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlHrZPsnt3WaiarmSSiaVTNk0F3af67uwg3DsPzGwR39YGyTpb1oliaGib7A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

我这里有3个anaconda3的环境，我选Arkrec_env的这个， 这里面专门写tf相关代码的，也安装好了大部分常用的包，点击选择即可。如果想写pytorch代码，我这里可以选择第一个。![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlladEqXo6n3OrC4lDbO4xuOd4LbXB50OgJaEBGibg1utsgfF87j2D4YQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

左下角就变了环境。



## Java项目配置

想运行Java项目， 也非常简单，主要包括三步:

1. 下载并运行「Extension Pack for Java」；
2. 下载并运行「JDK」；
3. 配置「Environment Variable」

**第一步，安装Extension Pack for Java插件**， `command+shift+x`然后输入这个插件名字， 点击安装。

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlLBXOMahVOQx9icKLwL0WfT5AuzgSXUTHIlHXH1AcGGMvQoAsdTKicOsQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这哥们其实在为我们安装了6个Java必备插件:

1. Language Support for Java(TM) by Red Hat: 运行Java代码
2. Debugger for Java: 调试
3. Java Test Runner: 单元测试
4. Maven for Java: 在Java环境下构建应用程序的软件

安装完毕之后.

**第二步****，下载并运行「JDK」**。「JDK」的全称是「Java Development Kit」，也就是中文所说的「Java开发套件」, 这个套件就是我们开发基于Java语言的软件所需要的一个工具包。 话不多说，直接操作。

`command+shift+p`进入命令窗口，搜索Java Overview， 在右侧Configure那里，点击Configure Java Runtime，通过VSCode默认的「AdoptOpenJDK」下载入口，选择我们需要下载的「JDK」和「JVM」的版本

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlHwS8agq9pfczLSkPoEh72uZHqOmkj0lKzuiaTqApq50b3cC4aMk0neg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)点击Download进入下载页面。下载下这个pkg包之后，点击安装即可。这时候，Reload Window，然后点击上面的Installed JDKs， 就会发现安装的JDK路径以及版本。

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlyQv69nZpl7cO4zJrhGqHGibaMwcw1hHwSvW0y2IjEibhEp1Mh0DregYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**第三步，配置「Environment Variable」**，也就是中文所说的「环境变量」。`command+,`进入设置页面， 搜索中输入javahome, 然后点击

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlric51d3dEokPIM86BhInogOZABUaXSticA0sP6uibWz4B59TKedibjBjJg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)在这里， 把上面的那个JDK的路径复制过来即可。

这样就可以愉快的写Java代码了， 测试下， `command+shift+p`， 在里面输入`Java: create Project`，输入项目名，在src文件夹中，选择Run运行Java代码，控制台数据Hello World则为成功。

![图片](https://mmbiz.qpic.cn/mmbiz_png/vI9nYe94fsHcNXOcViceTia4H6OHPGu0vlBab4jwFKMvBGxxKR2nuxaIvpNT41zibfIs9XxtneSXsjeicVibicaOAOBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)OK， Java配置完成。

这样下来， 就把Vscode打造成了能同时开发Python， C++以及Java项目的神器了， 当然， Vscode还能做更多语言的项目开发， 等后面具体用到了再整理吧， 这玩意辅助上Vim， 项目学习起来也是非常香的哈哈。



# VSCode 插件推荐

> Visual Studio Code 是由微软开发的一款免费的、针对于编写现代Web和云应用的跨平台源代码编辑器。它包含了一个丰富的插件市场，提供了很多实用的插件。下面就来分享 2023 年前端必备的 VS Code 插件！

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202302241000316.png" alt="image-20230224100011181" style="zoom:80%;" />

## 必备插件

### Chinese中文汉化包

对于一些英文不太好的小伙伴，上来第一件事肯定是要切换成中文语言环境，安装汉化包插件之后，按快捷键Ctrl+Shift+P调出命令面板，输入Configure Display Language，选择zh-ch，然后重启vs code即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304091044049.png" alt="image-20230409104453949" style="zoom:80%;" />

### Java Language Support

Java Extension Pack 包括多个用于编码辅助、调试、linting、格式化和测试的扩展。一些最受欢迎的扩展是：

- Java 开发工具包 (JDK) 11 或更高版本：您需要 JDK 来构建和运行 Java 应用程序。它提供完整的语言支持，包括语法突出显示、代码完成和调试等功能。
- IntelliCode Java Test Runner：这个扩展使得在项目中运行和调试单元测试变得容易。它与流行的测试框架（如 JUnit、TestNG 等）集成，以提供无缝的测试体验。
- Java 调试器：此扩展具有丰富的功能，使您能够设置断点、检查变量、逐步执行代码以及更多选项，以便于调试。
- Red Hat 对 Java 的语言支持：它有助于维护稳定和安全的 Java 开发平台，以及有助于构建、部署和管理 Java 应用程序的工具。总体而言，Java 语言支持包使您的 Java 环境更加高效并简化了您的 Java 开发体验。

## 前端框架

### ES7+ React/Redux/React-Native snippets

该插件提供了许多速记前缀来加速开发并帮助开发人员为 React、Redux、GraphQL 和 React Native 创建代码片段和语法。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hXmz2ia6AQalbCYSrQiaJj6XJEj9PWIm70SiaVChau9zfKDfEZPYF0AMmQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)例如，创建一个新文件并输入 rfce 然后按回车键，这将生成一个 React 函数组件，导入 React 并导出组件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hQpYHKrD166VDPc5S0kF0ULXibjI2YIlbEVlLicQmkBzic1zZ31cSxQ0Qw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### VSCode React Refactor

这是一个专门为 React 开发人员设计的 VS Code 扩展。在处理大型项目时，重构可能很有挑战性。可以使用 VSCode React Refactor 快速重构代码，它会将 JSX 代码片段提取到新的类、组件中。此外，它还支持 TypeScript、TSX、常规函数、类和箭头函数。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5huCqA8NibicaVKxyPCcenTZlBspTvvQ54jHVESq91nxv8KlWMjibbXgemw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Simple React Snippets

该插件提供了一组精心挑选的 React 代码片段，可以通过输入几个字母轻松地将其添加到代码中。例如，输入 imr 会将 React 导入到组件中。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5h5mqibVG5kZUVmhcseVk46D5gWup1JNsHibhPWmRys4ByQF39Snx4tJRQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Typescript React Code Snippets

此插件包含了使用 Typescript 的 React 代码片段，它支持 Typescript(.ts) 或 TypeScript React (.tsx) 等语言。以下是使用 TypeScript 创建 React 组件的两个片段。

- 默认导出 React：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hwUbhh3IDaTahLOhcQZaRsmytqC5Jqr0bg09FkOkvnbBic7PNtRLKp7A/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

- 导出 React 组件：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hNy9F5Cy49l7mFVm5iaxBoeniazwerjBQyRmXNkUVpEFUGkEqm0CSk34Q/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Vue Language Features (Volar)

默认情况下，我们的 Vue 组件看起来像这样：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hX3O3iaRTxgkorIxtX0C5cHibIvjscpHOQ5yyOpO3HAKBBlOkrpCoqaGg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)使用该插件可以获得漂亮的语法高亮显示、错误检查和代码格式化。并且，它还添加了很多 Vue 指令和事件处理程序，在输入时提供很好的建议。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hJpakjl74SgiaACKSmU0Z5ryA9W7VWcsZ6dz02gKYdlI24VFnUdSppiaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)volar 是专门为 Vue 3 构建的语言支持插件。它基于 @vue/reactivity 按需计算一切，实现原生 TypeScript 语言服务级别的性能。

随着 Vue 3 + TypeScript 越来越流行，Vetur（Vue 的官方 VS Code 扩展）开始出现问题，例如，将 Vue 与 TypeScript 一起使用时 CPU 使用率过高，或者不支持 Vue 3 的新 `<script setup>` 语法。而 Volar 就解决了 Vetur 的问题，并为 Vue 3 + TypeScript 用户提供了最佳的开发体验。它为 Vue 3 提供完整的语言支持，包括标准的单文件组**件** (SFC) 语法及其最新添加的 `<script setup>`。

### JavaScript (ES6) code snippets

通过此插件可以使用预定义的 ES6 语法片段速记，从而提高开发效率。这个 VS Code 插件可以自定义，因为它不特定于任何框架。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hGD0tqsNALdbT5EWy1UEHrMCAKyWbnWCGOXoIxTF1RgpTsXfDN7u7qg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## Vue开发

### vue-component

- 插件名：`vue-component`
- 功能：**输入组件名称自动导入找到的组件，自动导入路径和组件**选中后自动输入组件名（包含必填属性）、import语句、components属性

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77SWsfM6I0va1eMlwFNhRgt9hnUDu4djWw5MbGhuTnialDLFXria7ETFuQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77SWsfM6I0va1eMlwFNhRgt9hnUDu4djWw5MbGhuTnialDLFXria7ETFuQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77SWsfM6I0va1eMlwFNhRgt9hnUDu4djWw5MbGhuTnialDLFXria7ETFuQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### Vetur

Vue 开发必备插件，它为 Vue.js 提供了实用的工具，例如调试、错误检查、语法高亮、片段等。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gxkZT8sBFbQxe7SYjgibTe7Lx5EsPViaoicRn2qNHa7CaSa4zAAv0SicwgA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Vue 3 Snippets

这个插件包含了所有的 Vue.js 2 和 Vue.js 3 的 api 对应的代码片段。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hGTC1voOSxsVmuIJcMSMRsQOhwV6ib9nhX9bmvO1xaibLWzneaxvicO2Dg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Vue VSCode Snippets

此插件将 Vue 2 Snippets 和 Vue 3 Snippets 添加到 Visual Studio Code 中。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hu7tOBaPsB6eB08lJ9IUIeQAwY1x04sTFHHKOiaiao63p9w56efM5S3tQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Vscode-element-helper

使用element-ui库的可以安装这个插件，编写标签时自动提示element标签名称。

### Version Lens 工具包版本信息

在package.json中显示你下载安装的npm工具包的版本信息，同时会告诉你当前包的最新版本。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9eia0JqGr8FlArcE8oHL8FaUpmxLDzvMINE3efmBDqtd8AJrqpaV3ibqQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9PUj1GH6ick5xY11J2j3pCPFicnPMWrPwJXmF9Tex9v7gGdMJ1pHGjU7A/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)



## React开发

### React Style Helper

- 插件名：`React Style Helper`

- 功能：在`React`中更快速地编写内联样式，并对 CSS、LESS、SASS 等样式文件提供强大的辅助开发功能

- - 自动补全
  - 跳转至样式和变量定义位置
  - 创建 JSX/TSX 的行内样式
  - 预览样式及变量内容

- 行内样式自动补全，同时支持 SASS 变量的跳转及预览。

### ES7 Reactsnippets

- 插件名：`ES7 React/Redux/React-Native/JS snippets`
- 功能：很多`React`的代码段，很方便开发

### vscode-styled-components

- 插件名：`vscode-styled-components`
- 功能：在`JS`文件中写样式时，有智能提示

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHrzCuyrptP76hZnyIGqez77VSM2n9n01yO5UdCkFIIBJOLG2qibE6q0iaeV0QibhzsXvExIauRFWzrwQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### React Native Tools

React Native Tools 扩展由 Microsoft 团队构建，它为 React Native 项目提供了一个开发环境。该插件允许在不同的模拟器或仿真器上轻松运行和调试代码，从命令面板快速运行 react-native 命令，而无需在终端中手动运行命令，并使用 IntelliSense 浏览 React Native 的函数、对象和参数等。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hJcOdkgFD06KTjyMTxxR6Mf4kAArfialAvjAEVuCQXV6pX2RNTPsMYaQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Reactjs Code Snippets

> 通过提供整齐打包和预先编写的模板，Reactjs Code Snippets VS 代码扩展帮助开发人员改进他们的工作流程和代码速度。您只需键入触发命令即可获取所需的代码段。您可以使用此工具来最大程度地减少编码时间并专注于您最擅长的事情——解决现实世界中的问题。

### HTML CSS Support

HTML CSS 支持扩展用于文本编辑器和集成开发环境 (IDE)，以增强对 HTML 和 CSS 开发的支持。 它还提供了额外的功能，包括：

- 用于 HTML 和 CSS 的 IntelliSense：这是一种代码完成功能，可在编写代码时建议 HTML 标记、属性、CSS 属性、值和单位。
- Emmet 支持：它为 HTML 和 CSS 生成速记符号，以帮助您编写简洁的语法并将其扩展为完整的 HTML 或 CSS 代码，只需敲击几下。
- CSS 类名补全功能：自动补全 HTML 文档中的 CSS 类名。
- HTML 和 CSS 格式化和 linting 选项：一个必须的工具来格式化和构建 HTML 和 CSS 代码以提高可读性。
- 内置 CSS 颜色预览器：如果您在复杂的配色方案中苦苦挣扎，或者在微调网站颜色时感到迷茫，这个功能可以帮上忙。它在您的 CSS 颜色代码中显示颜色预览。

## Git 集成

### GitLens

该插件增强了 VS Code 中的 Git，并从每个存储库中释放隐藏数据。可以快速查看代码的编写者、轻松导航和探索 Git 存储库、通过丰富的可视化效果和强大的比较命令获取有效信息，以及执行更多操作，帮助我们更好地理解代码。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hI1JCkUuib26eeRU05iaNtd6UHkzp3ul3HJibPCLCVqjWyotypBHUUI7IA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Git History

该插件用于查看 Git 日志和文件历史记录并比较分支或提交。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hIMWCOYUc4vrcNtUQ7CreKlBY0iaYK8mK64ZA5yPR8I5SX17ug0utwoQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Git Graph

Git Graph 插件用于可视化查看存储库的 Git 操作，并从图形中轻松执行Git操作。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5he1VE5jn4TNehLdCUGTloZ8VQb0zY7SgibsuVCgkN5B3V28y7tf7eWicA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

## 数据分析

### Import Cost

在项目中导入多个包时可能会出现性能问题，Import Cost 就用于查看将特定库导入项目的成本。该插件会显示导入库的大小，如果大小为绿色，则表示库很小，而红色表示库很大。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hAI9Liba29lMe3Ju6RmyHgtpEmwzQiaHZaXRRI2fsDJ1Y7HiblQHmKyG6w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Time Master

从编程活动中自动生成的指标、见解和时间跟踪。它是一个开源项目，独立于网络环境，安全轻量。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hkJ88Ftqc25CD7A83RIGgdsNZ9jI2gyJqOdic8d7rVrIGCBqZL4iaVtiaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### VS Code Counter

VS Code Counter 插件用于统计项目代码的行数，安装插件之后，右键点击需要统计代码的文件夹，选择“Count lines in directory”，这时就会在项目根目录出现一个名为 .VSCodeCounter 的文件夹，包含了不同格式的结果，编辑器会打开其中的的 .md 格式。结果中会显示代码总行数，不同格式文件行数，不同路径文件函数等。代码行数中有纯代码行数、空白行数、注释行数。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5h0StFfAJAKse7fflTOuOfpotzRgictRCoicXrbxOjlw6KiadMtvSvH5bXQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 功能强化

### Docker Explorer

> Docker Explorer VS Code Extension 可以识别和管理当前正在运行的容器和镜像。它使开发人员可以轻松启动、停止和重新启动容器、检查日志和属性，甚至可以通过名称或 ID 定位特定容器或映像。

> 它可以从镜像生成新容器，也可以从注册表中推送和拉取镜像。总而言之，它简化了容器的创建和管理，使在实时环境中测试和部署代码变得简单。用于代码格式化和 linting 的 VS 代码扩展

### Duplicate Action

开发时我们可以能会遇到需要复制文件（组件）的情况，默认情况下，必须右键单击该文件，然后单击复制。右键单击要将文件复制到的文件夹，然后单击粘贴。再次右键单击该文件并重命名。

使用该插件，当右键单击文件时，将看到一个新的“Duplicate file or directory”选项。单击它，输入文件的新名称，然后按回车键即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5h87biagDaTrCR0BlhcV6kPqynEObP0fNWZrZf1rNOv6m0eUmt7Q75rSw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### npm Intellisense

该插件为 import 语句中的 npm 模块提供了自动完成功能。npm 模块的所有导入都会使用此扩展自动处理。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hQb4B1aJ4FEBglq0dqqttcNib6y2Wia7bWJo0jW9bySgXkj97MLbUlA4A/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Remote-SSH

Remote-SSH 可以使用任何带有 SSH 服务器的远程机器作为开发环境。由于扩展直接在远程机器上运行命令，因此无需在本地机器上放置源代码即可快速操作远程服务器。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gsfs08W7QwDIVD6jV4TsMibbaiac25FU54IvKlYLjN0UUDb2zODnKVmOQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)REST Client

###  JavaScript Booster

JavaScript Booster 通过分析代码及其上下文自动建议快速操作以重构或增强代码。它支持来自重构条件、声明、函数、TypeScript、promise、JSX 等的多种代码操作。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7grpeBRco7dBVTwBjkHhQWkVib78CICU6tA4yR3491OpluBtQtBf22LEA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Live SASS Compiler

Live SASS Compiler 扩展可以将 SASS 或 SCSS 文件实时编译或转译为 CSS 文件。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7goyjSF9CNyvUkYDBE4DWJQDbSmBfsrjHofjCM4mJygAg7UIsvTvIBbg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Debugger for chrome

Debugger for Chrome 是微软开发的插件，它允许我们在 VS Code 中调试 JS 代码。可以设置断点、逐步执行代码、调试动态添加的脚本等。它有助于在开发过程的早期检测错误。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gdrKsbkH6icea1Vibr6cqZMNAAmniacKrC83PWce3URZ69W9j6eLldHOyA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Path intellisense

该插件用于自动补全文件名。当 import 其它文件时，能够对文件进行提示，快速补全要引入的文件名。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hymn7LiavQB7JqViaGoicib5UCeJ2JCP3VZpZMt0zW9UwYF9rxwVrbuDRjQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Auto Rename Tag

使用该插件，可以在重命名一个 HTML 标签时，自动重命名 HTML 标签的开始和结束标签。避免只修改了开始标签，而忘记修改结束标签。该扩展适用于 HTML、XML、PHP 和 JavaScript。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hIpMNdiayl4jJhez9Z3QbJqOB3reegmbJsY1vycial6gZ3EBeGla438Hg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Auto Close Tag

通常想要使用一个特定的 HTML 元素时，需要输入开始标签和结束标签。使用该插件后，只需要输入开始标签，它就会自动添加结束标签。对于 Vue 开发人员来说，它还支持自定义类型名称。当输入自定义组件的开始标签时，它会自动添加结束标签。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hnCHJIgA1rviaOgLAQibFb25FJOTGlgw6pd10bBwMIML7nITFoicVWV8Hg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### CSS Peek

使用该插件，可以直接从 HTML 和 JavaScript 文件快速导航和编辑外部样式表中定义的 CSS 样式。它提供了一个“Peek”功能，在 HTML 中选择某个 class 或者 id 名称按住Ctrl键+鼠标左键可以直接定位到该名称的CSS的位置。

该插件有利于处理大型或复杂的 CSS 样式表，因为它可以快速查找和编辑应用于特定元素的样式，而无需浏览多个文件或搜索大量代码。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hfqAaI9SNTU77icFyxc4KgQictanTkjKEOTEonaa1jTMuaibccZGFMMObw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Regex Previewer

Regex Previewer 用于测试正则表达式。在编写正则表达式时，可以直接使用快捷键 Ctrl+Alt+M （windows）或者 ⌥+⌘+M（Mac）在编辑器右侧启动一个标签页，可以在这个标签页写一些正则表达式测试用例，写完之后，点击正则表达式上方的 Test Regex...，这时右侧标签页匹配到字符就会高亮显示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hDX0uDhHzLKJqxsWGb3T4miclhO4Heql6aMw4cBZzGFEtZ918YzpO8Kw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Code Spell Checker

Code Spell Checker 插件可以检查单词拼写是否出现错误，检查的规则遵循 camelCase （驼峰拼写法）。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hNR6FWnosd65WPiaibyJJ2YjM1YBJEENEggicsBLQ3T08EwJdbVoGqs7HQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Tabnine AI

> Tabnine 是一个多语言的插件，可以自动帮助我们完成代码的输入。Tabnine 的目标是通过基于 AI 的系统提高开发人员的生产力。Tabnine VS Code 扩展是关于生产力的。它是一个人工智能代码助手，可以加速您的开发过程，实时自动完成您的代码。它支持所有流行的编码语言和 IDE。
>

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gdibciciciaJOPeFCKKI61HgLdZoIUPrPVUFerGZVeItMjJIeqawF0kDbJA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Path Autocomplete

Path Autocomplete 提供了路径自动完成，因此不必记住那些很长的文件路径。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gwoK3H6SbLT1pJicsOT77NGetVTTujhxmx0ib8SbZG33khK8AZaKtGicPQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



### IntelliCode

IntelliCode 旨在帮助开发人员提供智能的代码建议。它默认支持 Python、TypeScript/JavaScript、React 和 Java。IntelliCode 将最有可能使用的内容放在列表的顶部，从而节省时间。IntelliCode 建议基于 GitHub 上的数千个开源项目。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gvWQSTiaenLxvAg9A8PvcYxaMD5f3ut8CGibQNaLK3jic2MmWSWvE0TB7A/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Import Cast

该插件用于在编辑器中内联显示导入包的大小。该扩展使用 webpack 来检测导入包的大小。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gf5z3RqR9L6potjXgsPS8wticgtQWxy16VoOnYnu7JEvEzBrkLhds75w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Code Time

Code Time 可以计算我们使用 Visual Studio Code 的时间，提供了多种数据指标。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gwm0ulTCCEsppHdy0xB6sRtIUibTDHfbMqj7FDppicRwV224EricPXpd9A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Settings Sync

Settings Sync 用于将 Visual Studio Code 的设置保存在 GitHub 上，并轻松地将其用于其他计算机，例如有关扩展的信息或系统设置。使用该插件就可以轻松地为许多不同的机器进行设置，而无需打开之前安装的扩展和相关设置。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7g7kUnC8Samdico4cs8wYra6FQM0Ovmn1rXtxqI6FHUtwIgXPE7Ehq27g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

有时候我们到了新公司或者换了新电脑需要配置新的开发环境，这时候一个一个下载插件，再重新配置vs code就非常麻烦而且你还不一定记得那么全面，通过这个插件我们可以将当前vs code中的配置上传到Gist，之后再通过Gist下载，就可以将所有配置同步到新环境中了。

在Github首页点击头像，选择Settings进入设置页面。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9kPq0QwPrF1EUpKO7eTlF9MSaltlZATxhyHUVibKF7ao8G1pUYhyibMqw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

点击左侧侧边栏Developer settings，进入开发者设置。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9NkZY8ru0Jer5HnkMNHqsuiasiad9rwesdKiboG7nlwmk317Sl1QAEm2AQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

选择Personal access tokens，点击右侧Generate new token。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9of9IszPGvSmVsG1Yrv1JFfPoReAD6T67cwCCPFgZME1K7LWG9JQyibw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

填写token名称，在下方勾选gist。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9mnWhhYOagXOt3XDqwDceC8Xl7ibkhAhiaH8hIsXGwW3hHMpW5Dh6bicMA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

点击下方的Generate token按钮生成一个新的token。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW94cLM0RibjPVoynoz1GPPyfA9iclBPm9MMOtuz6CEfEovibtk0BBKNebSQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

将生成的新的token保存下来。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9r2HQmyicIulme437FCeyV7helpShVgAL0wcAdrwqLia5SwCwB3pGQVzg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

在vscode中安装Settings Sync插件，输入Ctrl+Shift+p输入Sync，选择更新/上传配置。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9o6NIDv3ib8bOfhQHb05rErxicibSvhicpiaJOynCPuyeQa2vDdApMdh7rCA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

将github中生成的token输入，点击回车。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9IRzeC4CUeial5Tibs0QFUib10zZoNx0IGz7p99Er4FL3nPp4wmR6YWic3A/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

在控制台中自动生成一串id,之后便可以通过token和id进行配置同步。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9B50CFibsGh0kxbJJdlmtWsiahZluQ90HUAJG4xia1ViatQxUoFUHrxY2ibA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

输入Ctrl+Shift+p输入Sync，选择下载配置，输入token和id即可同步下载。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9jfxiaZfSO1UurVl16AsSc8nPoYibRpZ8YZl9dGOxZic3TN1tn2fUq4Cew/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

这篇文章中介绍的vs code配置已经全部同步到Gist，有需要的小伙伴可以下载一下。

```
token:b3c5f29c0e6f9f49b23b44ce89467226cd91c9c6

Id:338d5dfb6b7784c980250cffe8365899
```

可以在配置文件中选择是否自动上传和下载

```
"sync.removeExtensions": true,
      "sync.syncExtensions": true,
      "sync.autoDownload": true,
      "sync.autoUpload": true,
      "sync.gist": "338d5dfb6b7784c980250cffe8365899"
```

### Live Share

Live Share 帮助团队中的开发人员实时共享程序中的代码，从而轻松编辑和调试程序，例如共享调试会话、终端实例、localhost Web 应用程序、语音通话等。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gajuWqfznrAn5pJSUZibxZWjqjibd2YhsMVsAzUXfhOAwrATkWKHIibib7g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Live Server

安装这个插件之后，我们在编辑器中修改代码，按Ctrl+S保存，修改效果就会实时同步，显示在浏览器中，再不用手动刷新。

### Live ServerPP

- 插件名：`Live ServerPP`

- 功能：在服务器端打开你的文件，实时显示你修改的代码

- - 支持websocket 消息服务，可以用于调试websocket 客户端
  - 支持可编程虚拟文件，可用于模拟服务端API接口

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77Fd2z3C701sYPgUHXQY84oBzSPkK0QDLbbiaZbxrxmtcibEAI3ejecQlg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### REST Client

REST Client 允许发送 HTTP 请求并直接在 VS Code 中查看响应。它是 VS Code 的 Postman，可以方便地集成到代码编辑器中。REST 客户端同时支持 REST 和 GraphQL API。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gb5x3Vmuf386fmJ3xxxusWn9Swv7r69qdFtmoiadQ5Wu5pyz1lMTpJiag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### JavaScript Booster

JavaScript Booster 通过分析代码及其上下文自动建议快速操作以重构或增强代码。它支持来自重构条件、声明、函数、TypeScript、promise、JSX 等的多种代码操作。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7grpeBRco7dBVTwBjkHhQWkVib78CICU6tA4yR3491OpluBtQtBf22LEA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Live Server

Live Server是一个具有实时加载功能的小型服务器，可以在项目中用live-server作为一个实时服务器实时查看开发的网页或项目效果。它是为静态和动态页面启动具有实时重新加载功能的本地开发服务器，在状态栏中单击即可启动或停止服务器。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gm9BKYgLoEuTrclknibCpsNPfENncic2FpKY3BAPJBR6qGwVK6gbp3YgQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)



### 别名路径跳转

> 插件名：别名路径跳转
>
> 使用说明: **别名路径跳转插件**，支持任何项目，
>
> 使用场景: 当你在开发页面时, 想点击**别名路径导入的组件时**（演示如下）

#### 配置说明

- 下载后只需自定义配置一些自己常用的别名路径即可

  ```
  // 文件名别名跳转
    "alias-skip.mappings": {
      "~@/": "/src",
      "views": "/src/views",
      "assets": "/src/assets",
      "network": "/src/network",
      "common": "/src/common"
    },
  ```

- - 右击插件--》扩展设置--》路径映射在`settinas.json`中编辑

#### 效果展示

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez773tEwtia0bO2awB3jLmNRZm87hHm0gT7ZKA1ibF8rp3AviaNVicm70CdzvQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### 路径别名智能提示

- 插件名：`path-alias`
- 场景: 在导入组件的时候，使用**别名路径没用提示时**👇 (可和别名路径跳转同时使用, 无冲突)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/mshqAkialV7GxiavR8m9uoupPlIWBS2m8cOKbskAEDMiaTeVboEDFJdfev7ELqaXVeQwfobiaSjjt4vzdNeYX0fiadg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/mshqAkialV7GxiavR8m9uoupPlIWBS2m8cl4icHJ5Y6SQXhcSXJUZZ96bm6lNwE7yOmqLgsa045LYGqTnF6YoCLRA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Svg Preview

- 插件名：`Svg Preview`
- 功能：可以显示你的SVG图片，还可以编辑

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77DbicwNpHgpTHKInQ8c5eGk7kMT657tiaRNsaklezXmd0UhSjxaLW2g6g/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### CSS Initial Value

- 插件名：`vscode-icons`
- 功能：显示每个CSS属性的初始值，当光标停留在`css`属性时

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHrzCuyrptP76hZnyIGqez775p3GhCaxaIa1s2HOENHfIjhsWTjeia8QQokRRwU8fGPN5MibLXibTGrSg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 画板作图

- 插件名：`Draw.io Integration`
- 功能：在`VSCode`中画图，支持多人协作编辑图表..

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77iatWGb1vva3rr3kSINvTm0153NlQH1yQsh6NDoey3LTPUm6nX28bhWQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### Echars 智能提示插件

- 插件名：`echarts-vscode-extension`
- 使用：安装插件后，`ctrl+shift+p`输入`active Echars`即可开启智能提示
- 功能：提示各种`Echar中Option` 的属性，挺强大的

### 翻译插件

- 插件名：`A-super-translate`

- 使用方法：选中行，Ctrl+Shift+p 输入 翻译

- - 键入 ctrl+`再按下 ctrl+1 为翻译直接替换选中区域

- 功能：翻译识别代码中注释部分，不干扰阅读。支持不同语言，单行、多行注释、

- - 支持用户字符串与变量翻译,支持驼峰拆分

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77CYUEP1qLd6iawhLeHyLoaqnaibbWwvx4mVUTps57mcmQblewmiaAq69rg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77NMT1buInsI5YVia5p5z2jehEsgtbUMgdTKTEyEy3FUXkEyXibibTia09Zg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### open-in-browser

VS Code没有提供直接在浏览器中运行程序的内置功能，所以我们需要安装此插件，在浏览器中查看程序运行效果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304091046481.png" alt="image-20230409104604386" style="zoom:80%;" />

### WakaTime 计算代码工作量

这是一款时间记录工具，它可以帮助你在vs code中记录有效的编程的时间。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9J7yxfCNh5jVzVI01DCp8KlSic7NwKgdgXcB95n8PTAvqMgCicsDiaAVMA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)image

并且将数据用折线图的形式展示出来，为你呈现一周内的工作趋势，曾经编写项目的时候最多一天编程将近12个小时，你的付出和努力wakatime都知道。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW9cxR9LtKXOQrYbPE3THfsgia7X7Wyzkvu2XPa5AD8ibLbXIfnPpvsrVaA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

同时在他的官网中，也会显示用扇形图的形式显示你编写各个语言所占用的时间比例，以及你在各个项目中所用的时间占比，是一个非常好的数据报告，项目结束的时候你可以在它的Dashboard中清晰地看出自己的时间都是如何分配的。

![图片](https://mmbiz.qpic.cn/mmbiz/1NOXMW586uuPicba2bejQib2WhzviciaYuW95UOPe7saMefzz0xJAP7IutsicgHI6icMgKcC6iagNONZ3VMYUhiat4aziaA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)

### Color Info

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAoia1ftuicKURRue3tpXSnytaDt4YXGV27X7VEicj5SLTD2oFcu29KkDQw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

查看颜色详细信息的插件，可以小窗口显示颜色值，rgb,hsl,cmyk,hex等等，可以在配置项里添加要展示的信息类型。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.3.30/202304091101080.png" alt="image-20230409110149965" style="zoom:80%;" />

### Local History

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAicbURB1QK5b0XWUsfwmH8msYp54DxPsovWsh3F5nWUUzCMAsZCRlIUw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这个就很强了，本地代码的修改记录。通常我们写错代码了可以撤销，但是撤销完以后再修改，想要取消撤销就难了。有了这个插件直接看代码的修改记录。还可以跟当前版本进行对比，神器。安装完以后，项目根目录下会自动生成 `.history` 的文件夹。代码的修改记录就会放在这里面。记得添加`.gitignore`，不然每次提交代码的时候就要遭重了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VABErFiajnzdG1D2gnu8EHN7X6dgqkdhVyictiaiadVdFqV1Pxtic08XApgBw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Partial Diff

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAQVFEib4vXibBh2eJ222rhMT9XN2mVuhCeibefKibf3bv6CYibaKwljZKSFQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

文件比较界的大拿肯定是 `Beyond Compare` 了，但是它是收费的！那么 `Partial Diff` 这款神奇的插件就成为了良好的替代品，选中一代码，右键` Select Text for Compare` ，选中另外一部分代码，右键`Compare Text with Previous Selection`即可。我的是中文的，就更明显了🤣🤣

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAEK9JxLsEiaRWYdTjxwUesc2bibGs8CpyvJSXL4JicOquAvlB5HhWqSJtA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Postcode

`Postman` 都听说过吧，这个插件就基本上可以理解为，在 `vscode` 里面使用 `postman` 。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAnuHGaeNx4KcCRHkl9nhpbLZCakZzGxZYPvc7JjTqEqxS2JG4vKomqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

安装完以后左侧菜单会出现一个 **小盒子** 的图标，点开以后点击 `Create Request` 就可以正常使用了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAkqQkoduUdJTasc9icB66WLhpWN11kW3hYqP4wE6F8qoMdMlk8TeN3dA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAv7XYywiaMp9fY2IeytD0UHVFd8JicyMefbR8YuwCTwdzauC2Qqcznzdg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Project Manager

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAC9e4Eoibia34mFC3L2pIqsafb4Kj9GmvBxrChuic2nficeIgx9p0qaAAEg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

项目管理器，适用于经常切换项目的大佬，虽然我平时接触的项目也不多，不过自己搞着玩的工程也不少。有了这个插件，就不用新窗口打开项目了。

安装完以后左侧列表会出现一个 **文件夹** 的小图标，点开以后就可以进行项目管理了，通常都是操作`projects.json` 这个文件，点击项目名字就可以切换了，也可以新窗口打开。

另外，Java 工具系列全部整理好了，微信搜索Java技术栈，在后台发送：工具，可以在线阅读。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA0F4jickic6SkwhArlCIFmYiam8Y3iaq2icokc5NLMmMeeEfrbHzGoXo1fkg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Quokka.js

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAqdAGiavBGe9B01BnSz5p8OhrYfH2iaLNsRItXt9GeItR7xLiciatiaFZe5g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

实时显示代码的运行结果，使用方法请跳转链接

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAPEle8Lz5WKyj7Yicib0L8LVqGBHFUlSQibyVTaUVJYNM8xu4PBeicclmrw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

如何达到极致的编码效率，当然是能不手写则不手写。下面这些插件就是辅助大家进行一些自动化，这样就可以节省下很多的时间用来摸鱼了。

### Auto Import

`Typescript` 自动导入，其实现在很多的插件基本都内置了这种功能，已经不是必须品了。可能是因为我装了各种奇奇怪怪的插件，我现在想导入什么东西的时候，一大堆的提示，随便选一个都能导进来😂

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA4SdezhapkZ8KhKj6Tx52iasmiaeQtqX4tTsBcmwI7R1Wh2Bc6pViavrfg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Auto Rename Tag

自动修改标签名，重命名一个开始标签时，自动重命名配对的结束标签。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAqEncIRrAiaVkyzy1GU03ia2kILz4SiakOiaAVm9cuKIb9DaobbOFdbglFw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

一下子就对应的全修改掉了，是不是很 `nice`。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAGnLWPe5TQY4fVzFF8DhJrgiajuGnFqLFrczPpk78dnYvXxOfgy1SxQQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### change-case

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VApbXanyiachuGVwUIHtic6T5bC7X7QLhAWU2ib8UP17fvFibjicWL2zfgRIg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

快速切换变量格式，什么大坨峰，小驼峰，下划线等等，它里面有很多类型。使用方法按 `F1（windows）` ，输入对应命令即可。

## 编程强化

### Javascript Debugger

> Javascript 调试器扩展在您的代码中创建断点和步骤。这允许编码人员暂停代码执行并检查变量和调用堆栈，从而使识别和修复错误变得简单。

> 此 VS 代码扩展附带一个交互式控制台，使开发人员能够实时评估表达式、执行代码以及测试和调试代码。它为所有类型的 JavaScript 项目提供全面的调试体验。

### MarkdownLint

> MarkdownLint 扩展是一个用户友好的错误警告和纠正工具。可以通过单击代码编辑器中突出显示的问题来访问错误详细信息。MarkdownLint 还集成了其他流行的扩展程序，例如拼写检查器，允许您自动检查 markdown 文件中的拼写错误。

### Remote-SSH

> 您可以使用 VS Code 扩展从内部安全地连接到远程服务器，无需额外的软件或终端窗口。Remote-SSH 允许您在熟悉的 Visual Studio Code 界面中轻松访问、编辑和传输文件到远程服务器或从远程服务器传输文件。您可以使用它来提高您的整体生产力，而不是简化您的工作流程。

> 您可以在远程计算机上运行命令、调试代码，甚至使用扩展，从而不受本地设置的限制，充分利用 Visual Studio Code 的功能。Remote-SSH 是一个重要的 VS 代码扩展。尝试使用 VS Code 扩展来发现远程工作的功能和便利性

### Code Runner

- 插件名：`Code Runner`
- 功能：一键执行各种语言代码（常用于测试）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77rxobb3f6EhQDgcsgnDEicsTYFGayqXwbfAA2iaMzhZLUSo81NWicHeib2w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### Template String Converter

- 插件名：`Template String Converter`
- 功能：在字符串中输入$触发，将字符串转换为模板字符串

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77zvHlaB3dAMexeFo8qqoP22SpmhiaSKDtcwobic5UoWhylg0KwAADTE3w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### vscode-pigments

- 插件名：`vscode-pigments`
- 功能：实时预览设置的颜色

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/H8M5QJDxMHrzCuyrptP76hZnyIGqez77KV5VnLFHyhsibJRPa26e19ovHspZPiaRpXRb5Z3ibQEHCzT1MHbwB5u1w/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

### Parameter Hints

- 插件名：`Parameter Hints`
- 功能：提示函数的参数类型及消息

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHrzCuyrptP76hZnyIGqez77JicNtiaJ3qz8rIrDEXzPY0BBbvPg6W8JAxAxxGX9QcAg5TMuQBTPAPKQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Quokka.js

- 插件名：`Quokka.js`
- 使用：安装插件后，`ctrl+shift+p`输入`Quokka new JavaScr..`即可使用
- 功能：实时显示打印输出，更多功能自行探索（常用于测试）

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/H8M5QJDxMHrzCuyrptP76hZnyIGqez77DAfKP3TramZNorSZicywIibmxvcHicfibybNC9sJhKpVSjzqQZe1icOsc3Q/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&wx_co=1)

### CSS Peek

可以通过点击类名迅速定位到样式的定义。不知道是不是我自己的原因，有的时候会失效，需要点击 **禁用** ，再点击 **启用** 就好使了。具体使用方法参考链接

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAmWVR1PPAczpacTZTjfG2jeJafYhcTibHoN0FHTNChBmCqXbYmiavXZRg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### ECMAScript Quotes Transformer

用于 **模板字符串** 和 **普通字符串拼接** 的相互转化，但其实我日常开发基本上都是统一使用模板字符串的，很少有这种互相转化的需求。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAf1BlxWHy5yLymXTrXNuTS1DkBCmzJrUdpeLbsmws4zDy3mIiaREo5PA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

用法也是非常简单，选中需要转化的行，按 `f1` 输入命令即可，一般输入 `esq` 就出现提示了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA1C8BZs1t0X3n3nic42Nz4xUasdzOJiblppXia0PgZylIbdiarTjb8EAhCQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### embrace

快速的在选中代码两边添加各种引号、括号，不用来回移动光标，不过好像现在市面上的编辑器大多都内置这功能了吧🤨🤨

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAia7V2ibknpeeNojA25h6xXccdAGktA2EcPI2GTDht3B4Ctha28OIM2tg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### File Utils

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAVSicQgiaeVezV7PdQmHP6d587FIaqXXtbT4zx5Uj0mEsKYTYcLRfc1Dg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

创建，复制，移动，重命名，删除文件和目录的便捷方法，演示图片来自官网。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA2v0He4BUgdx6EENhFhnibkSsBibGxhPpEHB4UibeHN5SAs15PLfEhBlag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### javascript console utils

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAFl9CicmmQXcwr8tfbPVpFUiahSbKSaMQLnOJsgAVMHQzZ2jDnP8IRiaJQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

前端人员的调试少不了 `console.log` ，那么这就是一款快速生成 `console.log` 的插件。使用方法非常简单， 选中变量，然后按 `ctrl + shift + L` 就可以生成了。需要删除的时候按 `ctrl + shift + D` 即可删除。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAib0RqKg8CqTdRbZXnmD1kV8GTNsAq2taibh7vcsRRggdic6hKxxT7PbKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### json2ts

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA69j7vreT1RIMyqyEEVVjU7khyb41gV1QFhJufDl1Us9v3aGunPEKXA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

自动把 `json` 格式转成 `ts` 的类型，复制 `json` 之后按 `ctrl + alt + v` 即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAzdKX8ufthIKxsp3E2KCdN6I9znFaibaFiaoicbH0Fvjylhyt3bS4yvZGA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### koroFileHeader

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAgwwxUv1X1KaT4XicAb2FWIs0vHCc4Ik6RaGLXKlwC4NIsrbtyiaOjfgg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

自动添加 **头部注释** 和 **函数注释** 的插件。支持自定义内容，需要在 `settings.json` 中进行自定义配置。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAAZWb5rJBZW8ffb1bx36jZuYicOA4p9vkXxGsGB9qsv8XkGiaoI9IzxZw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```
"fileheader.customMade": {
    "Author": "一尾流莺",
    "Description": "",
    "Date": "Do not edit",
    "LastEditTime": "Do not edit",
    "FilePath": ""
  },

  "fileheader.cursorMode": {
    "description": "",
    "param": "",
    "return": ""
  },

```

### Mithril Emmet

快速生成代码结构，不过好像新版本 `vscode` 已经内置了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VARicr989mgw7Mzfq8YKsD8oPwQgpDNFPaDiaWRXtMNEVfm7ZCUF52GMYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Path Intellisense

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAkSAict5ELuPLRnooKveAz3YZofjqvlb7JcEffYVfhpwVQ6P8lyhEBQg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

引入文件的时候，路径自动补全。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAVhYuk8XZs9aR1VFbBeiaFSKRvYsumdMYQheCfxEibOPjiaEYhW2eDnN1w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Npm Intellisense

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAZ1w8RMfEfsPwIl01mRicYxsic7GHRN6LJbw421sB3XtBC9ncvfNribqtA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

导入 `npm` 包的时候，智能提示。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAtNNnH6PNMhQ2d24zvwCEbjib83SOZMTD30qfLGPcEV9IJFCNfeibicicFg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### px to rem & rpx (cssrem)

自动换算单位的插件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAEwCWvxNuTqHehxB2y1ZljM8TKPjtHicH9ncL7W1Lk162qdsqrfrJxyA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

很简单，出现提示以后回车即可。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAFN9z2ibZyCuBwibyfoDMatUDXvLa2NH1KYsmKffOdScF2rG2Hx7BQxpw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Turbo Console Log

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAmasuxlFzMibb6g7VIJTEl4lB1a9d0pVjl1ryHMhb6RHHn8Psww0oJtA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

另一个用来生成 `console.log` 的插件，不同的是，他支持自定义 `console.log` 的内容，包括文件名，路径，大小等，还可以添加自己喜欢的 `emoji` 表情，快捷键 `ctrl + alt + L`。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAjibhxDlIicY3Gbk5S2LEwlrY4gSuj2tJLC3BIV4HicFCyk90JzrAe5ib3A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 代码片段类插件

这一类的插件都很多，但功能都是提供代码片段，作用就是使用几个字符的简写，就可以敲出整段代码。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAjZiawVxBic9h4iaPc77xuXhtmsrll9ysX5XDDNdz6x6NedslaA2x8OqTA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- JavaScript (ES6) code snippets
- Jest Snippets
- HTML Snippets
- Vue VSCode Snippets
- Vue 3 Snippets
- ... ...

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAO3eYqVUsibO85kiayhQw5or7ziabGFzN2KMDz3dHOJyU1Jib25Q4WB4HMA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Beautify

用来代码格式化的，但是我好像安装了没怎么用，我一直都是 `eslint + prettier`，有正在用的小伙伴可以在评论区发表一下看法，感兴趣的请自己搜索使用方法。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAutnYykhHUKZYZxvleWtUhgrTW2dtfwMrqHD7Z07icY5EPLLBf1kVLmA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### ESLint

这个就不用说了吧，代码检查，不符合规范的就会跟你报错，或者警告。具体的规范需要在根目录下新建 `.eslintrc.js` 文件去配置，也可以用很多大公司现有的规范，太复杂了就不细讲了，贴出教程链接。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA8PibtcaTNp2foZqfGmUe5P6KY6fL8bhlMTvjmYwibqQVlBE7k8AtkjlQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Prettier - Code formatter

代码格式化插件，这个插件通常搭配 `eslint` 使用，也可以单独使用。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA0uoTWYlym4OmpUvibkOcLfRuAQjw6nO76tiaUsh65zjMu1ZJC4egXckw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在根目录下新建 `.prettierrc.json` 文件，在里面书写自己想要的格式就行了。更具体的配置内容查看链接

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA1vcmxHq0ib1OfQo2KyiaIqtpkY80136RIz8qddGvY7156pfdFrE7rAiag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### vetur / volar

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAjvS9PtUkA4icibYR1icSUE36OPtg4daU5npRa7dl782J5C7mQPWib7SkRQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VA9c9axjES13C6ia5MCcn4vMAC7TtcaTT73SuvndTFADibIP4OZ4bX9bMw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

使用 `vue` 进行开发的小伙伴都少不了跟它们打交道，`volar` 是跟 `vue3` 更配的，功能也能多，由于这两个插件功能过于庞大，就不展开讲了，感兴趣的自行搜索使用。

除了功能性插件，当然还有很多花里胡哨的玩意。下面给大家介绍几款可能对开发影响不大，但是非常好玩的插件。

### Emoji

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAkEfgHdpORbogheK4I2V6DWbrp1CHYKOYxa6e5qepP2TibpjSSg2VPFQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在代码中添加 `emoji` 表情，我自己除了写一些注释，`console.log` 之外，基本没有别的作用，但是挺好玩的，别人看你的代码中各种小表情，也会觉得你是一个可爱的人吧。

它的官方示例里面还可以把 `emoji` 设为变量名，我可不建议你们这样做。使用方法也是非常的简单，按 `f1（windows）` 输入 `emoji` ，可以看到有三个选项，分别是 `emoji` 表情，`markdown` 下的 `emoji`，还有 `unicode` 下的 `emoji`。选中一个模式回车进入列表，再回车就可以输入到代码中了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAoMgyfqrFjv2oNSPtbfCl3vp9gcaB3KjzknBQbqKYuZzPrQDejLJJicA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## 编程美化

### Bracket Pair Colorizer 2

- 插件名: `Bracket Pair Colorizer 2`
- 功能：给匹配的括号() 或者 对象{}.. 添加对应的颜色用于区分

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHrzCuyrptP76hZnyIGqez77V1ibpqRTH6iacx0Ch1gYj1nRicPsfpsGu0ficKZFa1nceItiajQNF3YBnZQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### indent-rainbow

- 插件名: `indent-rainbow`
- 功能：彩虹缩进

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHrzCuyrptP76hZnyIGqez77RhvSCVD8PDUVv4cSs0wicCJnTibWsWia5edl88RvMEDuJT4OsOVrlobhg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Beautify

Beautify 可以帮助我们以更美观的方式格式化代码。它支持 JavaScript、JSON、CSS、Sass 和 HTML 等流行语言。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gAmkpYsgkOH984CrzBdl5P50MS12K4MzbwpHibkBQ7tEJ0hg0JJc6sOQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Highlight Matching Tag

当有很多 HTML 标签时，有时很难将结束标签定位到对应的开始标签，反之亦然。使用该插件，单击开始标签时，会看到结束标签带有下划线。此外，它还会突出显示代码树中的开始和结束标签。如果需要，可以自定义样式以使下划线更加突出。

除此之外，该插件还有一些方便的命令，因此当单击标签时，可以使用`ctrl + shift + P`打开命令面板并搜索**“**Highlight Matching Tag**”**，会看到两个可以在项目中使用的命令。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hV0tNMykVsZyaRibZIALhY85HAGgWdsIjkaibne7bVuNgzicGHs13XJ6dw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### TODO Highlight

如果想在将代码发布到生产环境之前提醒自己注意事项或代码中未完成的事情，TODO Highlight VS Code 插件会非常有用。该插件会在代码注释中突出显示某些关键字，如 `FIXME:` 和 `TODO:` 以提醒注意事项或尚未完成的事情。

除此之外，使用快捷键 ctrl + shift + P 打开命令面板并搜索 Todo Highlight 选择 List the Highlighted annotations，然后选择 All 以列出在所有文件中留下的所有突出显示的注释。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5h5IFszF3XNggXeKcBrEGyBk9xZJtkYkeaZE4rA91kiaZHsH0dNxtyKfQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Better comments

该插件对不同类型的注释会附加了不同的颜色，更加方便区分，帮助我们在代码中创建更人性化的注释。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hlia0Cr9RK4l6IephUPeCvM9Zpm4uWalwhInMbmP4JwX3AHafjHAHxNg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Colorize

Colorize 会给颜色代码增加一个当前匹配代码颜色的背景。它通过 CSS 变量、预处理器变量、hsl/hsla 颜色、跨浏览器颜色、exa、rgb、rgba和argb的彩色背景将 CSS 颜色可视化，帮助开发者快速区分颜色。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hNmhT46ePumsoJEr3syrS0rZdGS8okUiaJ2tlgqctOSNAwl4icjQicXUEQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Image preview

通过此插件，当鼠标悬浮在图片的链接上时，可以实时预览该图片，除此之外，还可以看到图片的大小和分辨率。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hwhFWTxiaD3IExeAJoZETfo6yDsMC8PTDXk1CpK3204gDIozLWibCA3AQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### CodeSnap

CodeSnap 用于对代码的进行截图和共享。屏幕截图可以用文本或形状进行注释，并通过链接共享或包含在网站或文档中。只需使用 ctrl + shift + P 并输入 CodeSnap，然后按回车键，CodeSnap 窗口就会打开。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hZ8jsfRUm8NPZsfM950WVbwZ6wcbQq5oqvOWbuP8nujYLA9YXkCJ03Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Error Lens

Error Lens 是一款把代码检查(错误、警告、语法问题)进行突出显示的插件。Error Lens 通过使诊断更加突出，增强了语言的诊断功能，突出显示了由该语言生成的诊断所在的整行，并在代码行的位置以行方式在线打印了诊断消息。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hriaibxqFA9f2kWJRSjdwr9hOXdwLpbcf0oQfzkuJbDHJrY6iaWKtmwbHw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Bracket Pair Colorizer

使用该插件可以用不同颜色区分出代码中的括号，对于括号很多的代码非常实用。该插件还支持自定义括号颜色。

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gcE7ics0XAk0Wcj3GYDBsLibeibTam2D1rPso4KVskib4X7n5Ep8RAA3KhQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

### Color Highlight

此扩展可以用来设置 CSS 颜色的样式。除了 CSS 之外，它还会对不显示默认颜色的 JavaScript、HTML、JSON 等文件进行着色。该插件会对颜色名称、RGB、RGBA 和十六进制颜色进行着色。

<img src="https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7gxpHSxcgbfwTHNY5xGBIAltAC42dh5xD5Rd9u5exrl2gBUbRNbV6h5w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" alt="图片" style="zoom:80%;" />

### Community Material Theme

![图片](https://mmbiz.qpic.cn/mmbiz_png/TNUwKhV0JpTBq37BAyzPeibmaDkfng3VAv4ED0T1noRPuNJtRTiapl3chhewiatVP4yGKbOJh4Kl6dw1ThuYuU4rQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

修改编辑器的主题，内置很多种，我用的是 `Material Theme Palenight High Contrast` 这一款。安装完了以后点击 **设置颜色主题** 就可以了。



## 主题图标

### One Dark Pro

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hh81TLUacp4IEGkiahKJ8D26LdJB1Fem5tiaPCbdDVibqTXTrE54a8iaCbw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Dracula Official

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hFmNibvxvjXh0O5gvLFckOlU3qmM8MD5dd7wq9RkoZysLUiaOKA0yL5sg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### GitHub Theme

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hxDpM90IQadVgYcXv8zzLia4rLdU7A7YajnXDbYq5eACZGZBnbruicNbg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Winter Is Coming Theme

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hDk5PxgiciaRystOzAnQIxIYZKeyNY8hcvBXvAIOZibOzJZqQ0HmutP2KA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hM8Bp6jHzqWib3k6b64O4AQUkKWWIx5J4cycuTBRdu1JV8h4E8RJXUfA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Night Owl

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5ha0g75iaMfxVPZ1Br251AAibVaA6OpJBD5MLF9IyOwoRGuexvQ7ryhv1w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hys87luicnsMG3xcmdCGRMC3mM4GdrszY8horLYHWHYV0GmicjOOW6vEA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hIl5undYicBAf2DricY9e5tYygLNibCmibCUqfHB3zr1c6U0BaKrjr4gUvA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Monokai Pro

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hhG3C8yTG6ze1zGdEOia1s0WEn0cdZXdic2ib2hZ4A3FFNwhp5ibODT3K3Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### One Monokai

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hFKcq3icK3JI0E6Y9Id1EGmuFtvjUyf8QZhuzRCVaqHJVTTTGeFkbKzA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Shades of Purple

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5h3gob8e1s07dQUERmWK8rsicVIrfsYQQPNRgkskv5k41XLUU4hbfTqzw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Ayu

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hEGjibIGFo9NIWeI1cbR34v9U7Bo2iancVksG5rpdJ5pNPZuGsVHTTZ8g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hSmKw0hm7Q4EFYseRUdQ71VofHmDOwmRZDYvNsnpzpibErkrDzUHM5Mg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### vscode-icons

VSCode 官方出品的图标库。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5h7U1WZycHmQc9rB21mAPDd0CbnKqkZOMuXpDB6iabxQicdAvmBLE4Hm9Q/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### Material Icon Theme

该插件根据最新的 Material Design 主题为文件和文件夹提供图标。可以帮助我们识别文件并为编辑器添加自定义外观

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOxIicmuicZh8B7EJFT6yjV5hkfmL6xwHBTHlYqfyTVHxpsndwIa4xyGkMlXUb7Zft6e9ssgtxEoMKA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Project Dashboard

Project Dashboard 是一个项目仪表板插件，可以将经常访问的文件夹、文件等固定到仪表板上以快速访问它们。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMNIQmVPiaZiboibFc9fWiakxT7goMVUubINias7kRnLqgc7YKr7vzQwgBlcnvicljHv7DCkGEaHvKQn61jw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### Peacock

> Peacock 是一个 VS Code 扩展，它为你的编码体验增添了一抹色彩。此扩展允许您根据文件类型、文件夹或工作区等条件对编辑器选项卡进行颜色编码。

> 孔雀的显着特征之一是它的适应性。您可以更改用于每个标准的颜色，甚至可以设计您自己的配色方案。这使您可以根据自己的喜好定制界面，并区分不同类型的文件和项目。



## 摸鱼插件

[VS Code 摸鱼神器，确定不试一下？](https://mp.weixin.qq.com/s?__biz=MzU2MTIyNDUwMA==&mid=2247512141&idx=1&sn=ad7c95296ed5b1d20bfdf5457684c0c5&chksm=fc7efe16cb097700267b78993dbfaaa31a4a1a7b00741b9fe19c22caff3f649b3b3f79b90651&mpshare=1&scene=23&srcid=0208m01L1lg7ardp7SIcdooJ&sharer_sharetime=1675864073038&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

> VS Code 插件市场中不仅有很多实用的开发插件，还有很多好玩的摸鱼插件，下面就来分享 VS Code 中值得一试的摸鱼插件！

### Weixin Read

> 专门适配微信读书网页版的阅读插件，功能比较简单，可以阅读微信读书的内容，支持登录。安装完成之后，左侧工具栏会出现微信读书的图标，点击即可进入插件。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101455582.png" alt="image-20230210145529461" style="zoom:80%;" />

- **插件名：** Weixin Read
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=gamedilong.anes

### Zhihu On VSCode

> 知乎插件，提供包括阅读，搜索，创作，发布等一站式服务，内容加载速度比 Web 端更快，创新的 Markdown-Latex 混合语法让内容创作者更方便地插入代码块，数学公式，并一键发布至知乎。

![image-20230210145612755](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101456814.png)

- **插件名：** Zhihu On VSCode
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=niudai.vscode-zhihu

### Cloudmusic

> 网易云音乐插件，几乎支持了全部可用功能，包括账号登录，歌单同步、搜索、收藏、心动模式、私人FM、歌词显示、榜单查看等功能，还可以查看个人听歌排行、每日推荐，新歌上架等板块。安装完成之后，左侧工具栏会出现云音乐的图标，点击即可进入插件。

![image-20230210145632045](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101456117.png)

- **插件名：** Cloudmusic
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=yxl.cloudmusic

### 小霸王

> 小霸王是一款基于 vs code 的 nes 游戏插件，能让你在紧张的开发之余在vs code 里发松身心。提供了坦克大战、双节棍、魂斗罗、象棋、俄罗斯方块、坦克大战、彩虹岛等几十款经典游戏。安装完成之后，左侧工具栏会出现小霸王的图标，点击即可进入插件。

![image-20230210145651996](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101456057.png)

- **插件名：** 小霸王
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=gamedilong.anes

### Bangumi Open

> 番剧插件，需要配合 bilibili 使用，可以按照分类和时间来查看 B 站上对应的番剧更新时间和连载情况。使用快捷键 Ctrl+Shift+P  调出命令栏后，输入**Open Bangumi** 或 **Bangumi Open: Week Bangumi** 即可打开插件。

![image-20230210145712052](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101457129.png)

- **插件名：** Bangumi Open
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=SDTTTTT.bangumiopen

### daily anime

> 追番插件，功能简单，可以看到每天会对应更新的番剧列表，数据来源于bangumi。使用时，可以使用快捷键 **ctrl+shift+p**（Mac：command +shift+p） 来打开命令面板，输入 **anime** 可打开番剧页面，输入 **hitokoto** 可随机展示一条句子。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101457835.png" alt="image-20230210145737596" style="zoom:67%;" />

- **插件名：** daily anime
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=deepred.daily-anime

### z-reader

> 小说阅读插件，支持在线搜索和本地阅读，支持txt和epub格式，可以从起点网小说和笔趣阁进行小说搜索和阅读，阅读进度支持自动保存，支持进度跳转。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOPVByI1Xrj6PxaOibrp0r3FCkkH9iau5S3ia0XCQ4BOWHhzpkmuc16SzAvTjSkBicBcAxf0Q2ATFnqiaQ/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

- **插件名：** z-reader
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=aooiu.z-reader

### 韭菜盒子

韭菜盒子，VSCode 里也可以看股票 & 基金实时数据，做最好用的投资插件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMOPVByI1Xrj6PxaOibrp0r3F8qpSJENNPeA7274tTSH3oNcBBYa1oIRNJt7htYfKeFkLNzJpbfGHibg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

- **插件名：** 韭菜盒子
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=giscafer.leek-fund

### Rainbow Fart Waifu

> 在敲代码的时候一直用甜美的话语鼓励你，还提供了一位虚拟老婆供以娱乐，有多种模型可选。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOPVByI1Xrj6PxaOibrp0r3FjaFWd08x1ibc8HSy2ibQdbDLACmMrtc3r6sqlSvza2jiaxkHb8sVYzYuA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

- **插件名：** Rainbow Fart Waifu
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=ezshine.rainbow-fart-waifu

### Rainbow Fart

一个在你编程时持续夸你写的牛逼的扩展，可以根据代码关键字播放贴近代码意义的真人语音。

![image-20230210150146022](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101501100.png)

- **插件名：** Rainbow Fart
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=saekiraku.rainbow-fart

### 超越鼓励师

> 在 VS Code 中连续写代码一小时（时间可配置），会有杨超越提醒你该休息啦。除了每过一小时会自动弹出提醒页面，也可以按 F1, 然后输入 ycy: 打开提醒页面来打开提醒页面。

![image-20230210150202340](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101502501.png)

- **插件名：** 超级鼓励师
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=formulahendry.ycy

### Leetcode

一款强大的 Leetcode 刷题插件，可以直接同步Leetcode所有题目，并且可以直接在VS Code中提交和查看。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/EO58xpw5UMOPVByI1Xrj6PxaOibrp0r3FySFFkQTObOFppibrYog9G2HcdeNsxjxtNibApgVW4wlibwaxhfiblOfwGw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

- **插件名：** Leetcode
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=LeetCode.vscode-leetcode

### 掘金

> 基于 VS Code 的掘金插件，可以边看文章边写代码，不用在 VSCode 和浏览器间频繁切换，提高工作体验和学习效率。边写代码边刷沸点，光明正大地摸鱼。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202302101503143.png" alt="image-20230210150239645" style="zoom:67%;" />

- **插件名：** 掘金
- **官方地址：**https://marketplace.visualstudio.com/items?itemName=luzhenqian.juejin

## 数据库

### GraphQL

> GraphQL Visual Studio Code 扩展，为您提供一组工具来帮助您编写、验证和测试 GraphQL 代码。GraphQL 扩展包括自动完成功能——它会在您键入时建议在查询中使用的字段和参数，从而更容易编写有效的 GraphQL 代码。此功能可为您节省时间并降低出现语法错误的可能性。它安装了一个内置的 linter，可以检查您的代码是否有错误并提出修复建议。使用此扩展可防止 GraphQL 错误并提高效率。

























