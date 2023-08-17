

# 文件CURD和递归

![image-20211017115534505](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211017115534505.png)

- File类在包java.io.File包下、代表操作系统的文件对象(文件、文件夹)
- File类提供了诸如:定位文件、获取文件本身的信息、删除文件、创建文件、文件夹等功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021312782.png" alt="image-20220602131230726" style="zoom:80%;" />

## 文件和目录File

### File类创建对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206070943005.png" alt="image-20220607094304938" style="zoom:80%;" />

- File对象可以定位文件和文件夹
- File封装的对象仅仅是一个路径名，这个路径可以是存在的，也可以是不存在的。

```java
// pathname
File liuBei = new File("D:/三国/刘备.jpg");
// String parent, String child
File guanYu = new File("D:/三国", "关羽.jpg");
// 使用分隔符File.separator
File f = new File("D:" + File.separator+"resources"+ File.separator +"xueshan.jpeg");
// 目录
File sanGuo = new File("D:/三国");
// File parent, String child
File zhangFei = new File(sanGuo, "张飞.txt");
// 可以声明不存在的文件
File zhuGeLiang = new File(sanGuo, "诸葛亮.txt");
```

### 绝对路径和相对路径

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301080920748.png" alt="image-20230108092011598" style="zoom:50%;" />

```java
// 相对路径：一般定位模块中的文件的。 相对到工程下！！
File f2 = new File("src/com/itheima/data.txt"); // 相对路径
System.out.println(f2.length());
// F:\code\ad\bbb.java
System.out.println(f2.getAbsolutePath());
```

```java
// 2、File创建对象，支持绝对路径 支持相对路径（重点）
File dir = new File("D:/360yasuo"); // 这种方式也可以
File f1 = new File("D:\\resources\\beauty.jpeg"); // 绝对路径
System.out.println(f1.length());
```



### File类常用API

#### 创建、删除文件/文件夹

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021412577.png" alt="image-20220602141205524" style="zoom:80%;" />

> - delete方法默认只能删除文件和空文件夹
> - delete方法直接删除不走回收站

```java
File f = new File("file-io-app\\src\\data.txt");
// a.创建新文件，创建成功返回true ,反之 ,不需要这个，以后文件写出去的时候都会自动创建
System.out.println(f.createNewFile());
File f1 = new File("file-io-app\\src\\data02.txt");
System.out.println(f1.createNewFile()); // （几乎不用的，因为以后文件都是自动创建的！）

// b.mkdir创建一级目录
File f2 = new File("D:/resources/aaa");
System.out.println(f2.mkdir());

// c.mkdirs创建多级目录(重点)
File f3 = new File("D:/resources/ccc/ddd/eee/ffff");
System.out.println(f3.mkdirs()); // 支持多级创建

// d.删除文件或者空文件夹
System.out.println(f1.delete());
File f4 = new File("D:/resources/xueshan.jpeg");
System.out.println(f4.delete()); // 占用一样可以删除

// 只能删除空文件夹,不能删除非空文件夹.
File f5 = new File("D:/resources/aaa");
System.out.println(f5.delete());
```

上述方法比较简单，其中需要注意的是

- 创建多级目录时，mkdir创建失败，返回false，mkdirs创建成功，返回true（推荐使用mkdirs）
- 删除目录时，目录内不为空时，删除失败，返回false， 即只能删除文件或者空目录

```java
File shuiHu = new File("D:/四大名著/水浒传");
// 返回false 创建失败
boolean mkdir = shuiHu.mkdir();
// 返回true 创建失败
boolean mkdirs = shuiHu.mkdirs();

File four = new File("D:/四大名著");
// 返回false 删除目录时必须目录为空才能删除成功
boolean delete = four.delete();

File shuiHu = new File("D:/四大名著/水浒传");
// true 正确删除了水浒传目录
boolean delete1 = shuiHu.delete();

File liuBei = new File("D:/三国/刘备.jpg");
// 返回true 正确删除了刘备.jpg文件
boolean delete2 = liuBei.delete();
```

#### 判断文件类型、获取文件信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301080936733.png" alt="image-20230108093604616" style="zoom:67%;" />

```java
public class FileDemo02 {
    public static void main(String[] args) {
        // 1.绝对路径创建一个文件对象
        File f1 = new File("C:\\Users\\renshuo\\OneDrive\\图片\\y1.png");
        // a.获取它的绝对路径。
        System.out.println(f1.getAbsolutePath());
        // b.获取文件定义的时候使用的路径。
        System.out.println(f1.getPath());
        // c.获取文件的名称：带后缀。
        System.out.println(f1.getName());
        // d.获取文件的大小：字节个数。
        System.out.println(f1.length()); // 字节大小
        // e.获取文件的最后修改时间
        long time = f1.lastModified();
        System.out.println("最后修改时间：" + new 
                           SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(time));
        // f、判断文件是文件还是文件夹
        System.out.println(f1.isFile()); // true
        System.out.println(f1.isDirectory()); // false
        System.out.println(f1.exists()); // true
        // g、判断文件是否可读可写
        System.out.println(f1.isHidden()); // 判断是否隐藏
        System.out.println(f1.canRead()); // 判断是否可读
        System.out.println(f1.canWrite()); // 判断是否可写
        System.out.println(f1.canExecute());; // 判断是否可执行
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301080954564.png" alt="image-20230108095445463" style="zoom:55%;" />

#### 获取文件名后缀

```java
//获取文件后缀名
System.out.println(f.getName()); //data.txt
System.out.println(f.getName().substring(f2.getName().lastIndexOf(".") + 1)); //txt
```

#### 遍历文件夹

此时只能遍历单级文件夹，多级文件夹是要进行递归才能找到的

![image-20211017125443345](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211017125443345.png)

```java
public class FileDemo04 {
    public static void main(String[] args) {
        // 1、定位一个目录
        File f1 = new File("D:/anacoda2021");
        String[] names = f1.list();
        for (String name : names) {
            System.out.println(name);
        }

        // 2.一级文件对象
        // 获取当前目录下所有的"一级文件对象"到一个文件对象数组中去返回（重点）
        File[] files = f1.listFiles();
        for (File f : files) {
            System.out.println(f.getAbsolutePath());
        }

        // 注意事项
        File dir = new File("D:/360yasuo");
        File[] files1 = dir.listFiles();
        System.out.println(Arrays.toString(files1));
    }
}
```



## 方法递归

### 递归基本问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081031566.png" alt="image-20230108103109439" style="zoom: 50%;" />

```java
public class RecursionDemo01 {
    public static void main(String[] args) {
        test2(); // 没有终结条件，最后一定会栈溢出
    }

    public static void test(){
        System.out.println("=======test被执行========");
        test(); // 方法递归 直接递归形式
    }

    public static void test2(){
        System.out.println("=======test2被执行========");
        test3(); // 方法递归 间接递归
    }

    private static void test3() {
        System.out.println("=======test3被执行========");
        test2();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081036245.png" alt="image-20230108103649162" style="zoom:67%;" />

### 递归核心和执行流程

#### 计算1-n的阶乘

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081043632.png" alt="image-20230108104324523" style="zoom:67%;" />

```java
public class RecursionDemo02 {
    public static void main(String[] args) {
        System.out.println(f(5)); // 120
    }

    public static int f(int n){
        if(n == 1){
            return 1;
        }else {
            return f(n - 1) * n;
        }
    }
}
```

#### 递归三要素

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081047684.png" alt="image-20230108104717587" style="zoom: 50%;" />

### 规律化递归经典案例

#### 递归求1-n的和

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081049179.png" alt="image-20230108104940044" style="zoom: 50%;" />

```java
public class RecursionDemo03 {
    public static void main(String[] args) {
        System.out.println(f(5)); // 15
    }

    public static int f(int n){
        if(n == 1){
            return 1;
        }else {
            return f(n - 1)  + n;
        }
    }
}
```

#### 猴子吃桃问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081053240.png" alt="image-20230108105304030" style="zoom: 50%;" />

目标 猴子吃桃。

>  公式（合理的）： f(x) - f(x)/2 - 1 = f(x+1) ----------> f(x) = 2f(x + 1) + 2
>
> 求f(1) = ? ，终结点： f（10） = 1 ，递归的方向：合理的

```java
public class RecursionDemo04 {
    public static void main(String[] args) {
        System.out.println(f(1)); // 1534
        System.out.println(f(2)); // 766
        System.out.println(f(3)); // 382
    }

    public static int f(int n){
        if(n == 10){
            return 1;
        }else {
            return 2 * f(n + 1) + 2;
        }
    }
}
```

### 非规律化递归经典案例⭐

#### 文件搜索

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081114787.png" alt="image-20230108111402670" style="zoom:67%;" />

```java
public class RecursionDemo05 {
    public static void main(String[] args) {
        // 2、传入目录 和  文件名称
        searchFile(new File("D:/") , "resp.exe");
    }

    /**
     * 1、搜索某个目录下的全部文件，找到我们想要的文件。
     * @param dir  被搜索的源目录
     * @param fileName 被搜索的文件名称
     */
    public static void searchFile(File dir,String fileName){
        // 3、判断dir是否是目录
        if(dir != null && dir.isDirectory()){
            // 可以找了
            // 4、提取当前目录下的一级文件对象
            File[] files = dir.listFiles(); // null  []
            // 5、判断是否存在一级文件对象，存在才可以遍历
            if(files != null && files.length > 0) {
                for (File file : files) {
                    // 6、判断当前遍历的一级文件对象是文件 还是 目录
                    if(file.isFile()){
                        // 7、是不是咱们要找的，是把其路径输出即可
                        if(file.getName().contains(fileName)){
                            System.out.println("找到了：" + file.getAbsolutePath());
                            // 启动它。注意：普通文件不能启动，会报错
                            try {
                                Runtime r = Runtime.getRuntime();
                                r.exec(file.getAbsolutePath());
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }else {
                        // 8、是文件夹，需要继续递归寻找
                        searchFile(file, fileName);
                    }
                }
            }
        }else {
            System.out.println("对不起，当前搜索的位置不是文件夹！");
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081124534.png" alt="image-20230108112444441" style="zoom:80%;" />

#### 啤酒问题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081125084.png" alt="image-20230108112551734" style="zoom:50%;" />

```java
public class RecursionDemo06 {

    // 定义一个静态的成员变量用于存储可以买的酒数量
    public static int totalNumber; // 总数量
    public static int lastBottleNumber; // 记录每次剩余的瓶子个数
    public static int lastCoverNumber; // 记录每次剩余的盖子个数

    public static void main(String[] args) {
        // 1、拿钱买酒
        buy(10);
        System.out.println("总数：" + totalNumber);
        System.out.println("剩余盖子数：" + lastCoverNumber);
        System.out.println("剩余瓶子数：" + lastBottleNumber);
    }

    public static void buy(int money){
        // 2、看可以立马买多少瓶
        int buyNumber = money / 2; // 5
        totalNumber += buyNumber;

        // 3、把盖子 和瓶子换算成钱
        // 统计本轮总的盖子数  和 瓶子数
        int coverNumber = lastCoverNumber + buyNumber;
        int bottleNumber = lastBottleNumber + buyNumber;

        // 统计可以换算的钱
        int allMoney = 0;
        if(coverNumber >= 4){
            allMoney += (coverNumber / 4) * 2;
        }
        lastCoverNumber = coverNumber % 4;

        if(bottleNumber >= 2){
            allMoney += (bottleNumber / 2) * 2;
        }
        lastBottleNumber = bottleNumber % 2;

        if(allMoney >= 2){
            buy(allMoney);
        }

        Integer[] arr2 = new Integer[]{11, 22, 33};
        Arrays.sort(arr2);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081136618.png" alt="image-20230108113604535" style="zoom:67%;" />

#### 递归删除文件夹

```java
// 目标：删除非空文件夹
public class RecursionDemo07 {
    public static void main(String[] args) {
        deleteDir(new File("D:/www"));
    }

    // 删除文件夹，无所谓里面是否有内容，都可以删除
    public static void deleteDir(File dir){
        // 1、判断dir存在且是文件夹
        if(dir != null && dir.exists() && dir.isDirectory()){
            // 2、提取一级文件对象。
            File[] files = dir.listFiles();
            // 3、判断是否存在一级文件对象，存在则遍历全部的一级文件对象去删除
            if(files != null && files.length > 0){
                // 里面有内容
                for (File file : files) {
                    // 4、判断file是文件还是文件夹，文件直接删除
                    if(file.isFile()){
                        file.delete();
                    }else {
                        // 递归删除
                        deleteDir(file);
                    }
                }
            }
            // 删除自己
            dir.delete();
        } else {
            System.out.println("您输入的不是文件夹");
        }
    }
}
```

#### 递归获取文件文件夹大小

```java
long dirLength = getDirLength(new File("src/main/resources/static"));
System.out.println(dirLength);
```

```java
public static long getDirLength(File dir){
    if(dir.isFile()){ //如果是文件，直接返回文件的大小
        return dir.length();
    } else if(dir.isDirectory()){
        long sum = 0;
        File[] listFiles = dir.listFiles();
        for (File sub : listFiles) {
            //sum += 下一级的大小;
            sum += getDirLength(sub);
        }
        // sum是字节大小，转换成kb要除以1024
        return sum;
    }
    return 0;//既不是文件又不是文件夹，不存在
}
```

# IO读写操作

## IO 流概述

### 什么是IO流

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081220114.png" alt="image-20230108122036943" style="zoom:67%;" />

### IO 流分类



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081222496.png" alt="image-20230108122239371" style="zoom:67%;" />

### 输入输出流的四大类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081236699.png" alt="image-20230108123609601" style="zoom:67%;" />

### IO 流体系

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081238290.png" alt="image-20230108123815164" style="zoom:67%;" />

## 字节流

### 字节输入流(读取文件)

作用：以内存为基准，把磁盘文件中的数据以字节的形式读取到内存中去

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071051226.png" alt="image-20220607105146164" style="zoom: 67%;" />

#### 创建连接

```java
//下面两种创建方式都可以,传入绝对或相对路径
// 1、创建一个文件字节输入流管道与源文件接通。
InputStream is = new FileInputStream("f1.txt");
// 简化写法，推荐
InputStream is = new FileInputStream(new File("f1.txt"));     
```

#### 读取单个字节

> 如果是中文，读取单个字节就会出现乱码

```java
// 2、读取一个字节返回 （每次读取一滴水）
int b1 = is.read();
System.out.println((char)b1);
```

#### 字节数组读取所有

```java
InputStream is =new FileInputStream("f1.txt");
//定义一个字节数组,长度任意,尽量1024的整数倍，不然容易出现乱码
byte [] buffer = new byte[1024];
int len ; 
//记录每次读取的字节数
while ((len = is.read(buffer)) != -1){  
    System.out.print(new String(buffer,0,len));
}
```

```java
public static void s2() {
    //(1)指定文件
    File file = new File("src/main/resources/static/a.txt");
    //(2)创建字节输入流
    try(
         FileInputStream fis = new FileInputStream(file);){
        //(3)创建字节数组，用来存储每次读取的内容
        byte[] data = new byte[1024];
        //(4)用len记录每次读取的字节数
        int len;
        //(5)循环读取
        while((len = fis.read(data)) !=-1){
            System.out.println(new String(data,0,len));
        }
    }catch(Exception e){
        e.printStackTrace();
    }

```

#### 避免乱码

> 使用字节流读取中文输出乱码，如何使用字节输入流读取中文输出不乱码呢？
>
> **定义一个与文件一样大的字节数组，一次性读取完文件的全部字节。**
>
> 直接把文件数据全部读取到一个字节数组可以避免乱码，是否存在问题？
>
> l**如果文件过大，字节数组可能引起内存溢出。**

```java
// 目标：使用文件字节输入流一次读完文件的全部字节。可以解决乱码问题。
public class FileInputStreamDemo03 {
    public static void main(String[] args) throws Exception {
        // 1、创建一个文件字节输入流管道与源文件接通
        File f = new File("D:/data.txt");
        InputStream is = new FileInputStream(f);
        // 2、定义一个字节数组与文件的大小刚刚一样大。
        byte[] buffer = new byte[(int) f.length()];
        int len = is.read(buffer);
        System.out.println("读取了多少个字节：" + len);
        System.out.println("文件大小：" + f.length());
        System.out.println(new String(buffer));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081545764.png" alt="image-20230108154543670" style="zoom:67%;" />

> 第二种方式：readAllBytes，jdk11支持。这是直接把文件放在字节输入流里，有可能会出现内存溢出的问题，就是数组放不下了。
>

```java
File f = new File("f1.txt");
InputStream is = new FileInputStream(f);
byte[] buffrt  = is.readAllBytes();
System.out.println(buffrt);
```



### 字节输出流(写入文件)

> 作用：以内存为基准，把内存中的数据以字节的形式写出到磁盘文件中去的流
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081551758.png" alt="image-20230108155117645" style="zoom:67%;" />

#### 输出流 API

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071055910.png" alt="image-20220607105502844" style="zoom:67%;" />

#### 写入数据

```java
public class OutputStreamDemo04 {
    public static void main(String[] args) throws Exception {
        // 1、创建一个文件字节输出流管道与目标文件接通
        OutputStream os = new FileOutputStream("D:/data.txt" , true); // 追加数据管道
        // 先清空之前的数据，写新数据进入
        // OutputStream os = new FileOutputStream("file-io-app/src/out04.txt"); 

        // 2、写数据出去
        // a.public void write(int a):写一个字节出去
        os.write('a');
        os.write(98);
        os.write("\r\n".getBytes()); // 换行
        // os.write('徐'); // [ooo]

        // b.public void write(byte[] buffer):写一个字节数组出去。
        byte[] buffer = {'a' , 97, 98, 99};
        os.write(buffer);
        os.write("\r\n".getBytes()); // 换行

        byte[] buffer2 = "我是中国人".getBytes();
        // byte[] buffer2 = "我是中国人".getBytes("GBK");
        os.write(buffer2);
        os.write("\r\n".getBytes()); // 换行


        // c. public void write(byte[] buffer , int pos , int len):写一个字节数组的一部分出去。
        byte[] buffer3 = {'a',97, 98, 99};
        os.write(buffer3, 0 , 3);
        os.write("\r\n".getBytes()); // 换行

        // os.flush(); // 写数据必须，刷新数据 可以继续使用流
        os.close(); // 释放资源，包含了刷新的！关闭后流不可以使用了
    }
}
```

#### 文件拷贝

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081713264.png" alt="image-20230108171343138" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081714062.png" alt="image-20230108171410958" style="zoom:67%;" />

```java
public class Test9 {   
    public static void main(String[] args) {  
        try {       
            InputStream is = new FileInputStream("H:\\迅雷1\\WindowsPCHealthCheckSetup.msi");     
            OutputStream os = new FileOutputStream("H:\\迅雷1\\WSetup.msi");   
            byte [] buffer = new byte[1024];        
            int len;          
            while((len = is.read(buffer)) != -1){   
                os.write(buffer,0,len);        
            }       
            System.out.println("复制完成");   
            os.close();     
            is.close();      
        } catch (Exception e) {    
            e.printStackTrace();      
        } 
    }
}
```

字节流适合做一切文件数组的拷贝吗？

任何文件的底层都是字节，拷贝是一字不漏的转移字节，只要前后文件格式，编码一致没有问题。



## 资源释放的方式

### try-catch-finally

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081719037.png" alt="image-20230108171923924" style="zoom:67%;" />

finally最后一定会执行，一般资源释放都放在这里

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081719465.png" alt="image-20230108171900349" style="zoom:67%;" />

对拷贝代码进行优化

```java
public class Test9 {   
    public static void main(String[] args) throws IOException {   
        InputStream is = null;    
        OutputStream os = null;    
        try {        
            is = new FileInputStream("H:\\迅雷1\\WindowsPCHealthCheckSetup.msi");  
            os = new FileOutputStream("H:\\迅雷1\\WSetup.msi");     
            byte [] buffer = new byte[1024];    
            int len;         
            while((len = is.read(buffer)) != -1){    
                os.write(buffer,0,len);        
            }       
            System.out.println("复制完成");  
        } catch (Exception e) {    
            e.printStackTrace();    
        }finally {       
            if(os != null){         
                os.close();     
            }        
            if (is != null){    
                is.close();       
            }     
        }  
    }
}
```



### try-with-resource

finally虽然可以用于释放资源，但是释放资源的代码过于繁琐？有没有办法简化？

JDK 7和JDK9中都简化了资源释放操作

JDK 7 以及 JDK 9的()中只能放置资源对象，否则报错

什么是资源呢？资源都是实现了Closeable/AutoCloseable接口的类对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071108986.png" alt="image-20220607110836919" style="zoom:80%;" />

```java
// 目标：学会使用JDK 7的新方式释放资源
public class TryCatchResouceDemo2 {
    public static void main(String[] args) {
        try (
            // 这里面只能放置资源对象，用完会自动关闭：
            // 自动调用资源对象的close方法关闭资源（即使出现异常也会做关闭操作）
                // 1、创建一个字节输入流管道与原视频接通
               InputStream is = new FileInputStream("D:/data.txt");
                // 2、创建一个字节输出流管道与目标文件接通
               OutputStream os = new FileOutputStream("D:/data2.txt");
               // int age = 23; // 这里只能放资源,放这个会报错
               // 最终会自动调用资源的close方法，这句就是测试
                MyConnection connection = new MyConnection();) {
            // 3、定义一个字节数组转移数据
            byte[] buffer = new byte[1024];
            int len; // 记录每次读取的字节数。
            while ((len = is.read(buffer)) != -1){
                os.write(buffer, 0 , len);
            }
            System.out.println("复制完成了！");
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}

class MyConnection implements AutoCloseable{
    @Override
    public void close() throws IOException {
        System.out.println("连接资源被成功释放了！");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081731630.png" alt="image-20230108173116548" style="zoom:67%;" />

## 字符流

使用字节流读取中文会乱码，内存溢出，因此使用字符流

读取中文输出，哪个流更合适，为什么？字符流更合适，最小单位是按照单个字符读取的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081737400.png" alt="image-20230108173709287" style="zoom:67%;" />

### 字符输入流Reader

读取中文输出，哪个流更合适。**字符流更合适，最小单位是按照单个字符读取的。**

使用字符流读取中文**不会乱码，或者内存溢出**(前提是代码和文件编码格式一致)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081740120.png" alt="image-20230108174015000" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081740617.png" alt="image-20230108174057488" style="zoom:67%;" />



#### 读取文件

> 字符流一个一个字符的读取文本内容输出，可以解决中文读取输出乱码的问题。
> 字符流很适合操作文本文件内容。
> 但是：一个一个字符的读取文本内容性能较差！！

```java
public class FileReaderDemo01 {
    public static void main(String[] args) throws Exception {
        // 目标：每次读取一个字符。
        // 1、创建一个字符输入流管道与源文件接通
        Reader fr = new FileReader("D:/data.txt");

        // 2、读取一个字符返回，没有可读的字符了返回-1
        int code1 = fr.read();
        System.out.print((char)code1);

        int code2 = fr.read();
        System.out.print((char)code2);

        // 3、使用循环读取字符
        int code;
        while ((code = fr.read()) != -1){
            System.out.print((char) code);
        }
    }
}
```

#### 读取文件升级版

> 字符流按照字符数组循环读取数据，可以解决中文读取输出乱码的问题，而且性能也较好！！

```java
public class FileReaderDemo02 {
    public static void main(String[] args) throws Exception {
        // 1、创建一个文件字符输入流与源文件接通
        Reader fr = new FileReader("D:/data.txt");
        // 2、用循环，每次读取一个字符数组的数据。  1024 + 1024 + 8
        char[] buffer = new char[1024]; // 1K字符
        int len;
        while ((len = fr.read(buffer)) != -1) {
            String rs = new String(buffer, 0, len);
            System.out.print(rs);
        }
    }
}
```

### 字符输出流FileWriter

作用：以内存为基准，把内存中的数据以字符的形式写出到磁盘文件中去的流

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081756193.png" alt="image-20230108175607080" style="zoom:67%;" />

#### 输出流API

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081756984.png" alt="image-20230108175638793" style="zoom:67%;" />

#### 写入文件

```java
public class FileWriterDemo03 {
    public static void main(String[] args) throws Exception {
        // 1、创建一个字符输出流管道与目标文件接通
        // 覆盖管道，每次启动都会清空文件之前的数据
        // Writer fw = new FileWriter("file-io-app/src/out08.txt"); 
        // 覆盖管道，每次启动都会清空文件之前的数据

        Writer fw = new FileWriter("D:/data.txt", true); 
        // a.public void write(int c):写一个字符出去
        fw.write(98);
        fw.write('a');
        fw.write('徐'); // 不会出问题了
        fw.write("\r\n"); // 换行

        // b.public void write(String c)写一个字符串出去
        fw.write("abc我是中国人");
        fw.write("\r\n"); // 换行


        // c.public void write(char[] buffer):写一个字符数组出去
        char[] chars = "abc我是中国人".toCharArray();
        fw.write(chars);
        fw.write("\r\n"); // 换行


        // d.public void write(String c ,int pos ,int len):写字符串的一部分出去
        fw.write("abc我是中国人", 0, 5);
        fw.write("\r\n"); // 换行


        // e.public void write(char[] buffer ,int pos ,int len):写字符数组的一部分出去
        fw.write(chars, 3, 5);
        fw.write("\r\n"); // 换行


        // fw.flush();// 刷新后流可以继续使用
        fw.close(); // 关闭包含刷线，关闭后流不能使用
    }
}
```

## 字节流、字符流的使用场景

> - 字节流适合做一切文件数据的拷贝(音视频，文本)
> - 字节流不适合读取中文内容的输出
> - 字符流适合做文本文件的操作(读和写)

# 缓冲流(提升性能)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081907751.png" alt="image-20230108190710626" style="zoom:67%;" />

优化：复制大文件一定要使用缓冲流，不然特别慢

性能最优：字节缓冲输入、输出流，结合字节数组的方式，目前来看是最优性能的组合

- 缓冲流也称为高效流、或者高级流。之前学习的字节流可以称为原始流。
- 作用：缓冲流自带缓冲区、可以提高原始字节流、字符流读写数据的性能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091004780.png" alt="image-20230109100421617" style="zoom:67%;" />

## 缓冲流概述

> 缓冲流也称为高效流、或者高级流。之前学习的字节流可以称为原始流。
>
> 作用：缓冲流自带缓冲区、可以提高原始字节流、字符流读写数据的性能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301090935334.png" alt="image-20230109093539165" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301090936470.png" alt="image-20230109093603369" style="zoom:67%;" />

字节缓冲流性能优化原理

> - 字节缓冲输入流自带8kb缓冲池，以后我们直接从缓冲池中读取数据，所以性能好
> - 字节缓冲输出流自带8kb缓冲池，数据就直接写入到缓冲池中，写数据性能提高了

## 字节缓冲流

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301090938961.png" alt="image-20230109093805828" style="zoom:80%;" />

```java
try (
        // 这里面只能放置资源对象，用完会自动关闭：
        //自动调用资源对象的close方法关闭资源（即使出现异常也会做关闭操作）
        // 1、创建一个字节输入流管道与原视频接通
        InputStream is = new FileInputStream("D:\\resources\\newmeinv.jpeg");
        // a.把原始的字节输入流包装成高级的缓冲字节输入流
        InputStream bis = new BufferedInputStream(is);
        // 2、创建一个字节输出流管道与目标文件接通
        OutputStream os = new FileOutputStream("D:\\resources\\newmeinv222.jpeg");
        // b.把字节输出流管道包装成高级的缓冲字节输出流管道
        OutputStream bos = new BufferedOutputStream(os);
    ) {
        // 3、定义一个字节数组转移数据
        byte[] buffer = new byte[1024];
        int len; // 记录每次读取的字节数。
        while ((len = bis.read(buffer)) != -1){
            bos.write(buffer, 0 , len);
        }
        System.out.println("复制完成了！");
    } catch (Exception e){
        e.printStackTrace();
    }
}
```

## 字节缓冲流性能分析 (文件复制)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301090950470.png" alt="image-20230109095006361" style="zoom: 50%;" />

```java
private static final String SRC_FILE = "H:\\瑞克和莫迪第五季\\未消音版\\v1.mp4";
private static final String DEST_FILE = "H:\\瑞克和莫迪第五季\\未消音版\\";

public static void main(String[] args) {
     //copy01(); // 使用低级的字节流按照一个一个字节的形式复制文件：慢的让人简直无法忍受。直接被淘汰。
    //copy02(); // 使用低级的字节流按照一个一个字节数组的形式复制文件: 比较慢，但是还是可以忍受的！
    // copy03(); // 缓冲流一个一个字节复制：很慢，不建议使用。
    copy04(); // 缓冲流一个一个字节数组复制：飞快，简直太完美了（推荐使用）
}
```

> 使用低级的字节流按照一个一个字节的形式复制文件耗时，速度低的令人发指

```java
private static void copy01() {
    long startTime = System.currentTimeMillis();
    try (
         // 1、创建低级的字节输入流与源文件接通
         InputStream is = new FileInputStream(SRC_FILE);
         // 2、创建低级的字节输出流与目标文件接通
         OutputStream os = new FileOutputStream(DEST_FILE + "v1_copy.mp4")){
        // 3、定义一个变量记录每次读取的字节（一个一个字节的复制）
        int b;
        while ((b = is.read()) != -1){
            os.write(b);
        }
    }catch (Exception e){
        e.printStackTrace();
    }
    long endTime = System.currentTimeMillis();
    System.out.println("复制文件耗时：" + (endTime - startTime)/1000.0 + "s");
}
```

> 使用低级的字节流按照一个一个字节数组的形式复制文件: 比较慢，但是还是可以忍受的！用时：35.456s

```java
private static void copy02() {
    long startTime = System.currentTimeMillis();
    try (
        // 这里面只能放置资源对象，用完会自动关闭：
        //自动调用资源对象的close方法关闭资源（即使出现异常也会做关闭操作）
        // 1、创建一个字节输入流管道与原视频接通
        InputStream is = new FileInputStream(SRC_FILE);
        // 2、创建一个字节输出流管道与目标文件接通
        OutputStream os = new FileOutputStream(DEST_FILE + "v1_copy.mp4")) {
        // 3、定义一个字节数组转移数据
        byte[] buffer = new byte[1024];
        int len; // 记录每次读取的字节数。
        while ((len = is.read(buffer)) != -1){
            os.write(buffer, 0 , len);
        }
    } catch (Exception e){
        e.printStackTrace();
    }
    long endTime = System.currentTimeMillis();
    System.out.println("复制文件耗时：" + (endTime - startTime)/1000.0 + "s");
}
```

> 使用缓冲的字节流按照一个一个字节的形式复制文件耗时：19.976s，很慢，不建议使用。

```java
private static void copy03() {
    long startTime = System.currentTimeMillis();
    try (
         // 1、创建低级的字节输入流与源文件接通
         InputStream is = new FileInputStream(SRC_FILE);
         // a.把原始的字节输入流包装成高级的缓冲字节输入流
         InputStream bis = new BufferedInputStream(is);
         // 2、创建低级的字节输出流与目标文件接通
         OutputStream os = new FileOutputStream(DEST_FILE + "v1_copy.mp4");
         // b.把字节输出流管道包装成高级的缓冲字节输出流管道
         OutputStream bos = new BufferedOutputStream(os);){
        // 3、定义一个变量记录每次读取的字节（一个一个字节的复制）
        int b;
        while ((b = bis.read()) != -1){
            bos.write(b);
        }
    }catch (Exception e){
        e.printStackTrace();
    }
    long endTime = System.currentTimeMillis();
    System.out.println("复制文件耗时：" + (endTime - startTime)/1000.0 + "s");
}
```

> 缓冲流一个一个字节数组复制：飞快，简直太完美了（推荐使用）13.839s

```java
private static void copy04() {
    long startTime = System.currentTimeMillis();
    try (
            // 1、创建低级的字节输入流与源文件接通
            InputStream is = new FileInputStream(SRC_FILE);
            // a.把原始的字节输入流包装成高级的缓冲字节输入流
            InputStream bis = new BufferedInputStream(is);
            // 2、创建低级的字节输出流与目标文件接通
            OutputStream os = new FileOutputStream(DEST_FILE + "v1_copy.mp4");
            // b.把字节输出流管道包装成高级的缓冲字节输出流管道
            OutputStream bos = new BufferedOutputStream(os);
    ) {

        // 3、定义一个字节数组转移数据
        byte[] buffer = new byte[1024];
        int len; // 记录每次读取的字节数。
        while ((len = bis.read(buffer)) != -1){
            bos.write(buffer, 0 , len);
        }

    } catch (Exception e){
        e.printStackTrace();
    }
    long endTime = System.currentTimeMillis();
    System.out.println("复制文件耗时：" + (endTime - startTime)/1000.0 + "s");
}
```



## 字符缓冲流

- 字符缓冲输入流：BufferedReader。
- 作用：提高字符输入流读取数据的性能，除此之外多了按照行读取数据的功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091009155.png" alt="image-20230109100903023" style="zoom:67%;" />

### 字符缓冲输入流

```java
public static void t1() throws Exception {    
    Reader fr = new FileReader("f1.txt");  
    BufferedReader br = new BufferedReader(fr);  
    System.out.println(br.readLine()); //读取一行  
    //读取所有,经典读取内容的方式    
    String line;   
    while((line = br.readLine()) != null){       
        System.out.println(line);   
    }
}
```

### 字符缓冲输出流

- 字符缓冲输出流：BufferedWriter。
- 作用：提高字符输出流写取数据的性能，除此之外多了换行功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091010116.png" alt="image-20230109101008991" style="zoom:67%;" />

```java
public class BufferedWriterDemo2 {
    public static void main(String[] args) throws Exception {
        // 1、创建一个字符输出流管道与目标文件接通
        Writer fw = new FileWriter("out02.txt"); // 覆盖管道，每次启动都会清空文件之前的数据
        //Writer fw = new FileWriter("io-app2/src/out02.txt", true); // 追加数据
        BufferedWriter bw = new BufferedWriter(fw);

        // a.public void write(int c):写一个字符出去
        bw.write(98);
        bw.write('a');
        bw.write('徐'); // 不会出问题了
        bw.newLine(); // bw.write("\r\n"); // 换行

        // b.public void write(String c)写一个字符串出去
        bw.write("abc我是中国人");
        bw.newLine(); // bw.write("\r\n"); // 换行


        // c.public void write(char[] buffer):写一个字符数组出去
        char[] chars = "abc我是中国人".toCharArray();
        bw.write(chars);
        bw.newLine(); // bw.write("\r\n"); // 换行


        // d.public void write(String c ,int pos ,int len):写字符串的一部分出去
        bw.write("abc我是中国人", 0, 5);
        bw.newLine(); // bw.write("\r\n"); // 换行

        // e.public void write(char[] buffer ,int pos ,int len):写字符数组的一部分出去
        bw.write(chars, 3, 5);
        bw.newLine(); // bw.write("\r\n"); // 换行


        // fw.flush();// 刷新后流可以继续使用
        bw.close(); // 关闭包含刷线，关闭后流不能使用

    }
}
```

### 出师表案例

源文件顺序


```java
try(
        // 1、创建缓冲字符输入流管道与源文件接通
        BufferedReader br = new BufferedReader(new FileReader("src/csb.txt"));
        // 5、定义缓冲字符输出管道与目标文件接通
        BufferedWriter bw = new BufferedWriter(new FileWriter("src/new.txt"));
        ){
        // 2、定义一个List集合存储每行内容
        List<String> data = new ArrayList<>();
        // 3、定义循环，按照行读取文章
        String line;
        while ((line = br.readLine()) != null){
            data.add(line);
        }
        System.out.println(data);

        // 4、排序
        // 自定义排序规则
        List<String> sizes = new ArrayList<>();
        Collections.addAll(sizes, "一","二","三","四","五","陆","柒","八","九","十","十一");

        data.sort(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                // o1   八.,....
                // o2   柒.,....
                return sizes.indexOf(o1.substring(0, o1.indexOf(".")))
                        - sizes.indexOf(o2.substring(0, o2.indexOf(".")));
            }
        });
        System.out.println(data);

        // 6、遍历集合中的每行文章写出去，且要换行
        for (String datum : data) {
            bw.write(datum);
            bw.newLine(); // 换行
        }

    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206062215506.png" alt="image-20220606221516448" style="zoom:80%;" />



# 转换流(文件乱码解决)

如果代码编码和文件编码不一致，使用字符流直接读取还能不乱码吗？

> - 会乱码,文件编码和读取的编码必须一致才不会乱码
> - 解决不同格式编码文件出现乱码问题：InputStreamReader、OutputStreamReader

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091035258.png" alt="image-20230109103557079" style="zoom:67%;" />

## 字符输入转换流

字符输入转换流：InputStreamReader，可以把原始的字节流按照指定编码转换成字符输入流

- **使用字符输入转换流**
- 可以提取文件（GBK）的原始字节流，原始字节不会存在问题

- **然后把字节流以指定编码转换成字符输入流，这样字符输入流中的字符就不乱码了**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091024565.png" alt="image-20230109102448444" style="zoom:80%;" />

```java
public static void t3() throws Exception {    
    //1、提取原始字节流    
    InputStream is = new FileInputStream("src/log.txt");   
    //2、把原始字节流转换成字符输入流，以指定编码格式进行解析
    // 如果换成StandardCharsets.UTF_8，就正确读取了
    Reader isr = new InputStreamReader(is,"GBK"); 
    //3、读取内容
    BufferedReader br = new BufferedReader(isr);   
    String line;    
    while((line = br.readLine()) != null){      
        System.out.println(line);   
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206062138745.png" alt="image-20220606213834696" style="zoom:80%;" />



## 字符输出转换流

字符输入转换流：OutputStreamWriter，可以把字节输出流按照指定编码转换成字符输出流

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091028873.png" alt="image-20230109102805755" style="zoom:67%;" />

写入乱码解决

```java
public static void t4() throws Exception {  
    // 第二个参数表示允许追加
    OutputStream os = new FileOutputStream("f1.txt",true);    
    Writer fr = new OutputStreamWriter(os,"GBK"); //指定写入编码   
    BufferedWriter bf = new BufferedWriter(fr);   
    bf.newLine();//换行   
    bf.write("你好啊");   
    bf.close(); //刷新并关闭流
}
```



# Properties(用于系统配置)

> - 其实就是一个Map集合，但我们一般不会当成集合使用，因为HashMap更好用
> - 作用：代表一个属性文件，可以把自己对象中的键值对信息存入到一个属性文件中去
> - 属性文件：后缀是.properties结尾的文件，里面的内容是key=value，后续做系统配置信息的

与IO流结合,重点就是load和store

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211019105318917.png" alt="image-20211019105318917"  />

## 保存信息到文件

```java
// 需求：使用Properties把键值对信息存入到属性文件中去。
Properties properties = new Properties();
properties.setProperty("admin", "123456");
properties.setProperty("dlei", "003197");
properties.setProperty("heima", "itcast");
System.out.println(properties);

//参数一：保存管道 字符输出流管道
//参数二：保存心得(保存注释)
properties.store(new FileWriter("src/users.properties"), "save user info");
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206062039468.png" alt="image-20220606203911418" style="zoom:80%;" />

## 获取信息

```java
// 属性集对象可以加载读取属性文件中的数据!!
public class PropertiesDemo02 {
    public static void main(String[] args) throws Exception {
        // 需求：Properties读取属性文件中的键值对信息。（读取）
        Properties properties = new Properties();
        System.out.println(properties);

        // 加载属性文件中的键值对数据到属性对象properties中去
        properties.load(new FileReader("io-app2/src/users.properties"));

        System.out.println(properties);
        String rs = properties.getProperty("dlei");
        System.out.println(rs);
        String rs1 = properties.getProperty("admin");
        System.out.println(rs1);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206062040055.png" alt="image-20220606204035006" style="zoom:80%;" />



# 打印流(写数据简便)

作用：打印流可以实现方便、高效的打印数据到文件中去。打印流一般是指：PrintStream，PrintWriter两个类。

可以实现打印什么数据就是什么数据，例如打印整数97写出去就是97，打印boolean的true，写出去就是true。

高效、方便、自带缓冲输出流

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021448651.png" alt="image-20220602144816594" style="zoom:80%;" />

## PrintStream & PrintWriter

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091101318.png" alt="image-20230109110116182" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091102173.png" alt="image-20230109110219038" style="zoom:67%;" />

printWriter和printStream使用方式一样,不支持追加，但可以通过此方式实现追加

```java
PrintWriter ps = new PrintWriter(new FileOutputStream("f1.txt",true));
```

```java
/**
    目标：学会使用打印流 高效  方便写数据到文件。
 */
public class PrintDemo1 {
    public static void main(String[] args) throws Exception {
        // 1、创建一个打印流对象
        PrintStream ps1 = new PrintStream(new FileOutputStream("ps.txt"));
        // 追加数据，在低级管道后面加True
        PrintStream ps2 = new PrintStream(new FileOutputStream("ps.txt" , true)); 
        PrintStream ps3 = new PrintStream("ps.txt" );
        PrintWriter ps4 = new PrintWriter("ps.txt"); // 打印功能上与PrintStream的使用没有区别

        ps1.println(97);
        ps2.println('a');
        ps3.println(23.3);
        ps4.println(true);
        ps4.println("我是打印流输出的，我是啥就打印啥");

        ps4.close();
    }
}
```



## PrintStream & PrintWriter的区别

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091307075.png" alt="image-20230109130729942" style="zoom: 50%;" />



## 打印位置重定向(了解)

将本该打印在控制台中的数据打印到文件中

```java
// 目标：了解改变输出语句的位置到文件
public class PrintDemo2 {
    public static void main(String[] args) throws Exception {
        System.out.println("锦瑟无端五十弦");
        System.out.println("一弦一柱思华年");

        // 改变输出语句的位置（重定向）
        PrintStream ps = new PrintStream("log.txt");
        System.setOut(ps); // 把系统打印流改成我们自己的打印流

        System.out.println("庄生晓梦迷蝴蝶");
        System.out.println("望帝春心托杜鹃");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091311986.png" alt="image-20230109131153876" style="zoom:67%;" />

# 对象序列化

[Java程序员必备：序列化全方位解析 (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg3NzU5NTIwNg==&mid=2247487980&idx=1&sn=2a9ce519f87a1ffe1511022e6724208e&chksm=cf21cec5f85647d357c79860171fc1799ef3c44a2bdd0716e8437e31708a17d9000b4224bd36&mpshare=1&scene=23&srcid=07170APhPQBhkPKhA0fMbiEc&sharer_sharetime=1658069970660&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021449749.png" alt="image-20220602144908662" style="zoom:80%;" />

## 什么是Java序列化？

- 序列化：把Java对象转换为字节序列的过程
- 反序列：把字节序列恢复为Java对象的过程 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207201420566.png" alt="image-20220720142018489" style="zoom:67%;" />

## 为什么需要序列化？

Java对象是运行在JVM的堆内存中的，如果JVM停止后，它的生命也就戛然而止。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207201420329.png" alt="image-20220720142042245" style="zoom: 50%;" />

如果想在JVM停止后，把这些对象保存到磁盘或者通过网络传输到另一远程机器，怎么办呢？磁盘这些硬件可不认识Java对象，它们只认识二进制这些机器语言，所以我们就要把这些对象转化为字节数组，这个过程就是序列化啦~

> 打个比喻，作为大城市漂泊的码农，搬家是常态。当我们搬书桌时，桌子太大了就通不过比较小的门，因此我们需要把它拆开再搬过去，这个拆桌子的过程就是序列化。而我们把书桌复原回来（安装）的过程就是反序列化啦。

## 序列化用途

序列化使得对象可以脱离程序运行而独立存在，它主要有两种用途：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207201421853.png" alt="image-20220720142120780" style="zoom:50%;" />

- 序列化机制可以让对象地保存到硬盘上，减轻内存压力的同时，也起了持久化的作用；

> 比如 Web服务器中的Session对象，当有 10+万用户并发访问的，就有可能出现10万个Session对象，内存可能消化不良，于是Web容器就会把一些seesion先序列化到硬盘中，等要用了，再把保存在硬盘中的对象还原到内存中。

- 序列化机制让Java对象在网络传输不再是天方夜谭。

> 我们在使用Dubbo远程调用服务框架时，需要把传输的Java对象实现Serializable接口，即让Java对象序列化，因为这样才能让对象在网络上传输。



## 序列化代码演示 ⭐

- 作用：以内存为基准，把内存中的对象存储到磁盘文件中去，称为对象序列化
- 使用的流的对象字节输出流：ObjectOutputStream

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091043331.png" alt="image-20230109104347178" style="zoom:67%;" />

对象存入文件：实体类要继承implements Serializable接口

> 学会对象序列化，使用 ObjectOutputStream 把内存中的对象存入到磁盘文件中。
>

> transient修饰的成员变量不参与序列化了，对象如果要序列化，必须实现Serializable序列化接口。
>

> 申明序列化的版本号码，序列化的版本号与反序列化的版本号必须一致才不会出错！
> private static final long serialVersionUID = 1;

### 定义实体类

```java
// 对象如果要序列化，必须实现Serializable序列化接口。
public class Student implements Serializable {
    // 申明序列化的版本号码
    // 序列化的版本号与反序列化的版本号必须一致才不会出错！
    // 修改数据时可以修改版本号，这样读取旧数据就会出错，提醒更新
    private static final long serialVersionUID = 1;
    private String name;
    private String loginName;
    // transient修饰的成员变量不参与序列化了
    private transient String passWord;
    private int age ;

    public Student(){
    }

    public Student(String name, String loginName, String passWord, int age) {
        this.name = name;
        this.loginName = loginName;
        this.passWord = passWord;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", loginName='" + loginName + '\'' +
                ", passWord='" + passWord + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### 对象序列化

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091059753.png" alt="image-20230109105920623" style="zoom:50%;" />

```java
public class ObjectOutputStreamDemo1 {
    public static void main(String[] args) throws Exception {
        // 1、创建学生对象
        Student s = new Student("陈磊", "chenlei","1314520", 21);

        // 2、对象序列化：使用对象字节输出流包装字节输出流管道
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("obj.txt"));

        // 3、直接调用序列化方法
        oos.writeObject(s);

        // 4、释放资源
        oos.close();
        System.out.println("序列化完成了~~");
    }
}
```

### 反序列化对象

- 使用到的流是对象字节输入流：`ObjectInputStream`
- 作用：以内存为基准，把存储到磁盘文件中去的对象数据恢复成内存中的对象，称为对象反序列化。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091059326.png" alt="image-20230109105953081" style="zoom:50%;" />

```java
// 学会进行对象反序列化：使用对象字节输入流把文件中的对象数据恢复成内存中的Java对象。
public class ObjectInputStreamDemo2 {
    public static void main(String[] args) throws Exception {
        // 1、创建对象字节输入流管道包装低级的字节输入流管道
        ObjectInputStream is = new ObjectInputStream(new FileInputStream("obj.txt"));

        // 2、调用对象字节输入流的反序列化方法
        Student s = (Student) is.readObject();

        System.out.println(s);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091055162.png" alt="image-20230109105511068" style="zoom:80%;" />



# 字符集

## 基础

### 什么是字符集

- 计算机底层不可以直接存储字符的。计算机中底层只能存储二进制(0、1)
- 二进制是可以转换成十进制的

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071029346.png" alt="image-20220607102955294" style="zoom:80%;" />

结论：计算机底层可以表示十进制编号。计算机可以给人类字符进行编号存储，这套编号规则就是字符集

### 编码、解码

计算机只认识二进制的1和0，而人类都是有自己的语言的，双方要能进行信息交流，必须要有从文字到0、1的转化，以及0、1到文字转化。

**编码：**就是将文本字符转换成**计算机可以识别**的0、1机器码。

**解码：** 将存储在计算机中的二进制数解析成文字、字符。

## 字节、字符、字符集

#### 字节

字节是计算机信息技术用于计量存储容量的一种计量单位，作为一个单位来处理的一个二进制数字串，是构成信息的一个小单位。

```
1 B = 8 bit (1字节等于8位)
1 KB = 1024 B = 1024 字节
1 MB = 1024 KB
1 GB = 1024 MB
1 TB = 1024 GB
```

#### 字符

字符是指计算机中使用的字母、数字、字和符号，是数据结构中最小的数据存取单位。如a、A、B、b、大、+、*、%等都表示一个字符；

> 在 ASCII 编码中，一个英文字母字符存储需要1个字节。
>
> 在 GB 2312 编码或 GBK编码中，一个汉字字符存储需要2个字节。
>
> 在UTF-8编码中，一个英文字母字符存储需要1个字节，一个汉字字符储存需要3到4个字节。
>
> 在UTF-16编码中，一个英文字母字符或一个汉字字符存储都需要2个字节在UTF-32编码中，世界上任何字符的存储都需要4个字节

#### 字符集

字符集是多个字符的集合，字符集种类较多，每个字符集包含的字符个数不同。常见字符集名称：

```c
ASCII字符集
GB2312字符集
Unicode字符集
```



## 常见字符集及其编码⭐

### ASCII字符集

- ASCII(American Standard Code for Information Interchange，美国信息交换标准代码)：包括了数字、英文、符号。
- ASCII使用1个字节存储一个字符，一个字节是8位，总共可以表示128个字符信息，对于英文，数字来说是够用的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071031509.png" alt="image-20220607103120464" style="zoom:80%;" />

### GBK字符集

- window系统默认的码表。兼容ASCII码表，也包含了几万个汉字，并支持繁体汉字以及部分日韩文字
- 注意：GBK是中国的码表，**一个中文以两个字节**的形式存储。但不包含世界上所有国家的文字。

### Unicode编码

- unicode（又称统一码、万国码、单一码）是计算机科学领域里的一项业界字符编码标准。
- 容纳世界上大多数国家的所有常见文字和符号。
- 由于Unicode会先通过UTF-8，UTF-16，以及 UTF-32的编码成二进制后再存储到计算机，其中最常见的就是UTF-8

### 注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081156535.png" alt="image-20230108115657430" style="zoom:67%;" />

## 汉字存储和展示过程解析

![image-20211017175037726](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211017175037726.png)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301081205818.png" alt="image-20230108120533709" style="zoom: 50%;" />

## 编码和解码操作

字符串代表文字，只有中文才会出现乱码情况。乱码产生的原因主要有两个，一是**文本字符编码过程与解码过程使用了不同的编码方式**，二是**使用了缺少某种字体库的字符集引起的乱码**。

String编码

![image-20211017175246703](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211017175246703.png)

String解码

![image-20211017175306331](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211017175306331.png)

```java
public class Test {
    public static void main(String[] args) throws Exception {
        // 1、编码：把文字转换成字节（使用指定的编码）
        String name = "abc我爱你中国";
        // byte[] bytes = name.getBytes(); // 以当前代码默认字符集进行编码 （UTF-8）
        byte[] bytes = name.getBytes("GBK"); // 指定编码
        System.out.println(bytes.length);
        System.out.println(Arrays.toString(bytes));

        // 2、解码：把字节转换成对应的中文形式（编码前 和 编码后的字符集必须一致，否则乱码 ）
        // String rs = new String(bytes); // 默认的UTF-8
        String rs = new String(bytes, "GBK"); // 指定GBK解码
        System.out.println(rs);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071038551.png" alt="image-20220607103817504" style="zoom:80%;" />



# 文件写入的6种方法

在 Java 中操作文件的方法本质上只有两种：**字符流和字节流**，而字节流和字符流的实现类又有很多，因此在文件写入时我们就可以选择各种各样的类来实现。我们本文就来盘点一下这些方法，顺便测试一下它们性能，以便为我们选出最优的写入方法。

## 1.六种写入方法

### 方法 1：FileWriter

`FileWriter` 属于「字符流」体系中的一员，也是文件写入的基础类，它包含 5 个构造函数，可以传递一个具体的文件位置，或者 `File` 对象，第二参数表示是否要追加文件，默认值为 `false` 表示重写文件内容，而非追加文件内容（关于如何追加文件，我们后面会讲）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207032211257.png" alt="image-20220703221136142" style="zoom:50%;" />

`FileWriter` 类的实现如下：

```java
/**
  * 方法 1：使用 FileWriter 写文件
  * @param filepath 文件目录
  * @param content  待写入内容
  * @throws IOException
  */
public static void fileWriterMethod(String filepath, String content) throws IOException {
    try (FileWriter fileWriter = new FileWriter(filepath)) {
        fileWriter.append(content);
    }
}
```

只需要传入具体的文件路径和待写入的内容即可，调用代码如下：

```java
public static void main(String[] args) {
    fileWriterMethod("/Users/mac/Downloads/io_test/write1.txt", "哈喽,Java中文社群.");
}
```

然后我们打开写入的文件，实现结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207032219323.png" alt="image-20220703221904256" style="zoom:67%;" />

> 关于资源释放的问题：在 JDK 7 以上的版本，我们只需要使用 try-with-resource 的方式就可以实现资源的释放，就比如使用 try (FileWriter fileWriter = new FileWriter(filepath)) {...} 就可以实现 FileWriter 资源的自动释放。

### 方法 2：BufferedWriter(性能最高)

`BufferedWriter` 也属于字符流体系的一员，与 `FileWriter` 不同的是 `BufferedWriter` **自带缓冲区**，因此它写入文件的性能更高（下文会对二者进行测试）。

#### 小知识点：缓冲区

缓冲区又称为缓存，它是内存空间的一部分。也就是说，在内存空间中预留了一定的存储空间，这些存储空间用来缓冲输入或输出的数据，这部分预留的空间就叫做缓冲区。

**缓冲区的优势**以文件流的写入为例，如果我们不使用缓冲区，那么每次写操作 CPU 都会和低速存储设备也就是磁盘进行交互，那么整个写入文件的速度就会受制于低速的存储设备（磁盘）。但如果使用缓冲区的话，每次写操作会先将数据保存在高速缓冲区内存上，当缓冲区的数据到达某个阈值之后，再将文件一次性写入到磁盘上。因为内存的写入速度远远大于磁盘的写入速度，所以当有了缓冲区之后，文件的写入速度就被大大提升了。

了解了缓存区的优点之后，咱们回到本文的主题，接下来我们用 `BufferedWriter` 来文件的写入，实现代码如下：

```java
/**
 * 方法 2：使用 BufferedWriter 写文件
 * @param filepath 文件目录
 * @param content  待写入内容
 * @throws IOException
 */
public static void bufferedWriterMethod(String filepath, String content) throws IOException {
    try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filepath))) {
        bufferedWriter.write(content);
    }
}
```

调用代码和方法 1 类似，这里就不再赘述了。

### 方法 3：PrintWriter

`PrintWriter` 也属于字符流体系中的一员，它虽然叫“字符打印流”，但使用它也可以实现文件的写入，实现代码如下：

```java
/**
 * 方法 3：使用 PrintWriter 写文件
 * @param filepath 文件目录
 * @param content  待写入内容
 * @throws IOException
 */
public static void printWriterMethod(String filepath, String content) throws IOException {
    try (PrintWriter printWriter = new PrintWriter(new FileWriter(filepath))) {
        printWriter.print(content);
    }
}
```

从上述代码可以看出，无论是 `PrintWriter` 还是 `BufferedWriter` 都必须基于 `FileWriter` 类来完成调用。

### 方法 4：FileOutputStream

上面 3 个示例是关于字符流写入文件的一些操作，而接下来我们将使用字节流来完成文件写入。我们将使用 `String` 自带的 `getBytes()` 方法先将字符串转换成二进制文件，然后再进行文件写入，它的实现代码如下：

```java
/**
 * 方法 4：使用 FileOutputStream 写文件
 * @param filepath 文件目录
 * @param content  待写入内容
 * @throws IOException
 */
public static void fileOutputStreamMethod(String filepath, String content) throws IOException {
    try (FileOutputStream fileOutputStream = new FileOutputStream(filepath)) {
        byte[] bytes = content.getBytes();
        fileOutputStream.write(bytes);
    }
}
```

### 方法 5：BufferedOutputStream

`BufferedOutputStream` 属于字节流体系中的一员，与 `FileOutputStream` 不同的是，它自带了缓冲区的功能，因此性能更好，它的实现代码如下：

```java
/**
 * 方法 5：使用 BufferedOutputStream 写文件
 * @param filepath 文件目录
 * @param content  待写入内容
 * @throws IOException
 */
public static void bufferedOutputStreamMethod(String filepath, String content) throws 
    IOException {
    try (BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(
            new FileOutputStream(filepath))) {
        bufferedOutputStream.write(content.getBytes());
    }
}
```

### 方法 6：Files

接下来的操作方法和之前的代码都不同，接下来咱们就使用 JDK 7 中提供的一个新的文件操作类 `Files` 来实现文件的写入。

`Files` 类是 JDK 7 添加的新的操作文件的类，它提供了提供了大量处理文件的方法，例如文件复制、读取、写入，获取文件属性、快捷遍历文件目录等，这些方法极大的方便了文件的操作，它的实现代码如下：

```java
/**
 * 方法 6：使用 Files 写文件
 * @param filepath 文件目录
 * @param content  待写入内容
 * @throws IOException
 */
public static void filesTest(String filepath, String content) throws IOException {
    Files.write(Paths.get(filepath), content.getBytes());
}
```

以上这些方法都可以实现文件的写入，那哪一种方法性能更高呢？接下来我们来测试一下。

## 2.性能测试(重点)

我们先来构建一个比较大的字符串，然后分别用以上 6 种方法来测试文件写入的速度，最后再把结果打印出来，测试代码如下：

```java
public class t1 {
    public static void main(String[] args) throws IOException {
        // 构建写入内容
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < 1000000; i++) {
            stringBuilder.append("ABCDEFGHIGKLMNOPQRSEUVWXYZ");
        }
        // 写入内容
        final String content = stringBuilder.toString();
        // 存放文件的目录
        final String filepath1 = "src/main/resources/static/write1.txt";
        final String filepath2 = "src/main/resources/static/write2.txt";
        final String filepath3 = "src/main/resources/static/write3.txt";
        final String filepath4 = "src/main/resources/static/write4.txt";
        final String filepath5 = "src/main/resources/static/write5.txt";
        final String filepath6 = "src/main/resources/static/write6.txt";

        // 方法一:使用 FileWriter 写文件
        long stime1 = System.currentTimeMillis();
        fileWriterTest(filepath1, content);
        long etime1 = System.currentTimeMillis();
        System.out.println("FileWriter 写入用时:" + (etime1 - stime1));

        // 方法二:使用 BufferedWriter 写文件
        long stime2 = System.currentTimeMillis();
        bufferedWriterTest(filepath2, content);
        long etime2 = System.currentTimeMillis();
        System.out.println("BufferedWriter 写入用时:" + (etime2 - stime2));

        // 方法三:使用 PrintWriter 写文件
        long stime3 = System.currentTimeMillis();
        printWriterTest(filepath3, content);
        long etime3 = System.currentTimeMillis();
        System.out.println("PrintWriterTest 写入用时:" + (etime3 - stime3));

        // 方法四:使用 FileOutputStream  写文件
        long stime4 = System.currentTimeMillis();
        fileOutputStreamTest(filepath4, content);
        long etime4 = System.currentTimeMillis();
        System.out.println("FileOutputStream 写入用时:" + (etime4 - stime4));

        // 方法五:使用 BufferedOutputStream 写文件
        long stime5 = System.currentTimeMillis();
        bufferedOutputStreamTest(filepath5, content);
        long etime5 = System.currentTimeMillis();
        System.out.println("BufferedOutputStream 写入用时:" + (etime5 - stime5));

        // 方法六:使用 Files 写文件
        long stime6 = System.currentTimeMillis();
        filesTest(filepath6, content);
        long etime6 = System.currentTimeMillis();
        System.out.println("Files 写入用时:" + (etime6 - stime6));

    }

    /**
     * 方法六:使用 Files 写文件
     * @param filepath 文件目录
     * @param content  待写入内容
     * @throws IOException
     */
    private static void filesTest(String filepath, String content) throws IOException {
        Files.write(Paths.get(filepath), content.getBytes());
    }

    /**
     * 方法五:使用 BufferedOutputStream 写文件
     * @param filepath 文件目录
     * @param content  待写入内容
     * @throws IOException
     */
    private static void bufferedOutputStreamTest(String filepath, String content) throws 
        IOException {
        try (BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(
                new FileOutputStream(filepath))) {
            bufferedOutputStream.write(content.getBytes());
        }
    }

    /**
     * 方法四:使用 FileOutputStream  写文件
     * @param filepath 文件目录
     * @param content  待写入内容
     * @throws IOException
     */
    private static void fileOutputStreamTest(String filepath, String content) throws 
        IOException {
        try (FileOutputStream fileOutputStream = new FileOutputStream(filepath)) {
            byte[] bytes = content.getBytes();
            fileOutputStream.write(bytes);
        }
    }

    /**
     * 方法三:使用 PrintWriter 写文件
     * @param filepath 文件目录
     * @param content  待写入内容
     * @throws IOException
     */
    private static void printWriterTest(String filepath, String content) throws IOException {
        try (PrintWriter printWriter = new PrintWriter(new FileWriter(filepath))) {
            printWriter.print(content);
        }
    }
    /**
     * 方法二:使用 BufferedWriter 写文件
     * @param filepath 文件目录
     * @param content  待写入内容
     * @throws IOException
     */
    private static void bufferedWriterTest(String filepath, String content) throws 
        IOException {
        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filepath))) {
            bufferedWriter.write(content);
        }
    }
    /**
     * 方法一:使用 FileWriter 写文件
     * @param filepath 文件目录
     * @param content  待写入内容
     * @throws IOException
     */
    private static void fileWriterTest(String filepath, String content) throws IOException {
        try (FileWriter fileWriter = new FileWriter(filepath)) {
            fileWriter.append(content);
        }
    }
}
```

在查看结果之前，我们先去对应的文件夹看看写入的文件是否正常，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207032221114.png" alt="image-20220703222103053" style="zoom:67%;" />

从上述结果可以看出，每种方法都正常写入了 26 MB 的数据，它们最终执行的结果如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207032220171.png" alt="image-20220703222044112" style="zoom:67%;" />

从以上结果可以看出，字符流的操作速度最快，这是因为我们本次测试的代码操作的是字符串，所以在使用字节流时，需要先将字符串转换为字节流，因此在执行效率上不占优势。

从上述结果可以看出，**性能最好的是带有缓冲区的字符串写入流 `BufferedWriter`，性能最慢的是 `Files`**。

> PS：以上的测试结果只是针对字符串的操作场景有效，如果操作的是二进制的文件，那么就应该使用带缓冲区的字节流 BufferedOutputStream。



# 压缩流 | 解压缩流

## 压缩

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091634239.png" alt="image-20230109163435098" style="zoom:67%;" />

```java
public class ZipStreamDemo2 {
    public static void main(String[] args) throws IOException {
        /*
         *   压缩流
         *      需求：
         *          把D:\\a.txt打包成一个压缩包
         * */
        //1.创建File对象表示要压缩的文件
        File src = new File("D:\\demoR\\t");
        //2.创建File对象表示压缩包的位置
        File dest = new File("D:\\demoR");
        //3.调用方法用来压缩
        toZip(src,dest);
    }

    /*
    *   作用：压缩
    *   参数一：表示要压缩的文件
    *   参数二：表示压缩包的位置
    * */
    public static void toZip(File src,File dest) throws IOException {
        //1.创建压缩流关联压缩包
        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(new File(dest,"a.zip")));
        //2.创建ZipEntry对象，表示压缩包里面的每一个文件和文件夹
        //参数：压缩包里面的路径
        ZipEntry entry = new ZipEntry("aaa\\bbb\\a.txt");
        //3.把ZipEntry对象放到压缩包当中
        zos.putNextEntry(entry);
        //4.把src文件中的数据写到压缩包当中
        FileInputStream fis = new FileInputStream(src);
        int b;
        while((b = fis.read()) != -1){
            zos.write(b);
        }
        zos.closeEntry();
        zos.close();
    }
}
```

## 解压

![image-20230109163514285](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091635418.png)

```java
public class ZipStreamDemo1 {
    public static void main(String[] args) throws IOException {

        //1.创建一个File表示要解压的压缩包
        File src = new File("D:\\aaa.zip");
        //2.创建一个File表示解压的目的地
        File dest = new File("D:\\");
        //调用方法
        unzip(src,dest);
    }

    //定义一个方法用来解压
    public static void unzip(File src,File dest) throws IOException {
        //解压的本质：把压缩包里面的每一个文件或者文件夹读取出来，按照层级拷贝到目的地当中
        //创建一个解压缩流用来读取压缩包中的数据
        ZipInputStream zip = new ZipInputStream(new FileInputStream(src));
        //要先获取到压缩包里面的每一个zipentry对象
        //表示当前在压缩包中获取到的文件或者文件夹
        ZipEntry entry;
        while((entry = zip.getNextEntry()) != null){
            System.out.println(entry);
            if(entry.isDirectory()){
                //文件夹：需要在目的地dest处创建一个同样的文件夹
                File file = new File(dest,entry.toString());
                file.mkdirs();
            }else{
                //文件：需要读取到压缩包中的文件，并把他存放到目的地dest文件夹中（按照层级目录进行存放）
                FileOutputStream fos = new FileOutputStream(new File(dest,entry.toString()));
                int b;
                while((b = zip.read()) != -1){
                    //写到目的地
                    fos.write(b);
                }
                fos.close();
                //表示在压缩包中的一个文件处理完毕了。
                zip.closeEntry();
            }
        }
        zip.close();
    }
}
```

## 压缩文件夹

```java
public class ZipStreamDemo3 {
    public static void main(String[] args) throws IOException {
        /*
         *   压缩流
         *      需求：
         *          把D:\\aaa文件夹压缩成一个压缩包
         * */
        //1.创建File对象表示要压缩的文件夹
        File src = new File("D:\\demoR\\t");
        //2.创建File对象表示压缩包放在哪里（压缩包的父级路径）
        File destParent = src.getParentFile();//D:\\
        //3.创建File对象表示压缩包的路径
        File dest = new File(destParent,src.getName() + ".zip");
        //4.创建压缩流关联压缩包
        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(dest));
        //5.获取src里面的每一个文件，变成ZipEntry对象，放入到压缩包当中
        toZip(src,zos,src.getName());//aaa
        //6.释放资源
        zos.close();
    }

    /*
    *   作用：获取src里面的每一个文件，变成ZipEntry对象，放入到压缩包当中
    *   参数一：数据源
    *   参数二：压缩流
    *   参数三：压缩包内部的路径
    * */
    public static void toZip(File src,ZipOutputStream zos,String name) throws IOException {
        //1.进入src文件夹
        File[] files = src.listFiles();
        //2.遍历数组
        for (File file : files) {
            if(file.isFile()){
                //3.判断-文件，变成ZipEntry对象，放入到压缩包当中
                ZipEntry entry = new ZipEntry(name + "\\" + file.getName());//aaa\\no1\\a.txt
                zos.putNextEntry(entry);
                //读取文件中的数据，写到压缩包
                FileInputStream fis = new FileInputStream(file);
                int b;
                while((b = fis.read()) != -1){
                    zos.write(b);
                }
                fis.close();
                zos.closeEntry();
            }else{
                //4.判断-文件夹，递归
                toZip(file,zos,name + "\\" + file.getName());
                //     no1            aaa   \\   no1
            }
        }
    }
}
```



# commons-io(简化IO操作)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091440727.png" alt="image-20230109144026531" style="zoom:67%;" />

## commons-io 概述⭐

> - 这是apache提供的一组关于IO操作的类库，可以提高IO功能的开发效率。功能很多很强大
> - 它提供了很多IO操作的类，有两个主要的类FileUtils、IOUtils

### xml方式导入

```xml
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>
```

### jar包方式导入

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091427125.png" alt="image-20230109142732000" style="zoom:50%;" />

### FileUtils 主要方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091441595.png" alt="image-20230109144132418" style="zoom:67%;" />

### IOUtils 主要方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091442912.png" alt="image-20230109144207768" style="zoom:67%;" />

## 文件 & 文件夹操作

### 复制文件 | 文件夹

```java
public static void t1() throws IOException {
    // 复制文件，第一个参数是输入文件，第二个参数是输出文件
    IOUtils.copy(new FileInputStream("D:\\demoT\\data2.txt"),
                 new FileOutputStream("D:\\demoT\\data3.txt"));
    // 复制文件夹
    FileUtils.copyDirectory(new File("D:\\demoT"),new File("D:\\demoR"));
    // 拷贝网络资源到文件
	FileUtils.copyURLToFile(new URL("http://xx"), destFile);
    // 拷贝流到文件
    FileUtils.copyInputStreamToFile(new FileInputStream("test.txt"), destFile);
}
```

### 删除 | 清空文件夹

```java
public static void t1() throws IOException {
    // 删除文件夹
    FileUtils.deleteDirectory(new File("D:\\demoT"));
    // 清空文件夹
    FileUtils.cleanDirectory(new File("D:\\demoT"));
}
```

### 删除文件

```java
public static void t1() throws IOException {
    FileUtils.delete(new File("D:\\demoT\\data3.txt"));
}
```

### 移动文件 | 文件夹

```java
public static void t1() throws IOException {
    // 移动文件
    FileUtils.moveFile(new File("src.txt"), new File("dest.txt"));
    // 移动文件到目录
    FileUtils.moveFileToDirectory(new File("src.txt"), new File(""), true);
    // 移动目录
    FileUtils.moveDirectory(new File(""), new File(""));
}
```

### 拷贝大文件

这个方法适合拷贝较大的数据流，比如2G以上

IOUtils.copyLarge(Reader input, Writer output) // 默认会用1024*4的buffer来读取

IOUtils.copyLarge(Reader input, Writer output, char[] buffer)//可指定缓冲区大小

```java
public static void t1() throws IOException {
    // 默认会用1024*4的buffer来读取
    IOUtils.copyLarge(new FileInputStream("D:\\demoR\\data2.txt"),
                      new FileOutputStream("D:\\demoR\\data4.txt"));
    // 指定缓冲区大小
    IOUtils.copyLarge(new FileInputStream("D:\\demoR\\data2.txt"),
                      new FileOutputStream("D:\\demoR\\data5.txt"),new byte[2048]);
}
```

## 文件读写

### 文件写入

```java
public static void t1() throws IOException {
    // 将字符串写入文件
    FileUtils.writeStringToFile(new File("D:\\demoT\\data2.txt"), "测试文本", "UTF-8",true);
    // 将字符串列表一行一行写入文件
    List<String> lines = new ArrayList<>();
    Collections.addAll(lines,"张三","李四","王五");
    // \r\n表示换行，true表示允许追加
    FileUtils.writeLines(new File("D:\\demoT\\data2.txt"), lines, "\r\n",true);
}
```

### 文件读取

按照行读取结果

```java
public static void t1() throws IOException {
    InputStream is = new FileInputStream("D:/demoT/data.txt");
    List<String> lines = IOUtils.readLines(is, "UTF-8");
    lines.forEach(System.out::println);
}
```



## 文件属性

### 文件名称、后缀、路径

```java
public static void t1() throws IOException {
    File f = new File("D:/demoT/data.txt");
    String path = f.getAbsolutePath();
    String name = FilenameUtils.getName(path);
    String baseName = FilenameUtils.getBaseName(path);
    String extension = FilenameUtils.getExtension(path);
    String path1 = FilenameUtils.getPath(path);
    System.out.println("path = " + path);
    System.out.println("name = " + name);
    System.out.println("baseName = " + baseName);
    System.out.println("extension = " + extension);
    System.out.println("path1 = " + path1);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091457255.png" alt="image-20230109145750138" style="zoom:67%;" />

### 文件 | 文件夹大小

```java
public static void t1() {
    File f = new File("D://demoR//data3.txt");
    if (f.isFile()) {
        // 计算文件大小 单位：字节
        long s = FileUtils.sizeOf(f);
        System.out.println("文件大小 = " + s / 1024.0 /1024.0 + " MB");
    } else if (f.isDirectory()) {
        // 则递归计算目录总大小，参数不是目录会抛出异常
        long sd = FileUtils.sizeOfDirectory(f);
        System.out.println("文件夹大小 = " + sd / 1024.0 /1024.0 + " MB");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091556130.png" alt="image-20230109155634023" style="zoom:67%;" />

### 递归获取目录的所有文件

```java
public static void t1() {
    // 递归获取目录下的所有文件
    Collection<File> files = FileUtils.listFiles(new File("D:\\apache-maven-3.5.2"), null, true);
    files.forEach(System.out::println);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091559413.png" alt="image-20230109155930280" style="zoom:67%;" />

### 获取jvm中的io临时目录

```java
public static void t1() {
    File tempDirectory = FileUtils.getTempDirectory();
    System.out.println(tempDirectory);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091600591.png" alt="image-20230109160037485" style="zoom:67%;" />

## JDK7的Path操作

```Java
// path既可以表示目录也可以表示文件
// 获取当前路径
Path path = PathUtils.current();
// 删除path
PathUtils.delete(path);
// 路径或文件是否为空
PathUtils.isEmpty(path);
// 设置只读
PathUtils.setReadOnly(path, true);
// 复制
PathUtils.copyFileToDirectory(Paths.get("test.txt"), path);
PathUtils.copyDirectory(Paths.get("/srcPath"), Paths.get("/destPath"));
// 统计目录内文件数量
Counters.PathCounters counters = PathUtils.countDirectory(path);
counters.getByteCounter(); // 字节大小
counters.getDirectoryCounter(); // 目录个数
counters.getFileCounter(); // 文件个数
// ... ...
```



## 文件比较器

org.apache.commons.io.compare包有很多现成的文件比较器，可以对文件排序的时候直接拿来用。

**DefaultFileComparator**：默认文件比较器，直接使用File的compare方法。（文件集合排序（ Collections.sort() ）时传此比较器和不传效果一样）

**DirectoryFileComparator**：目录排在文件之前

**ExtensionFileComparator**：扩展名比较器，按照文件的扩展名的ascii顺序排序，无扩展名的始终排在前面

**LastModifiedFileComparator**：按照文件的最后修改时间排序

**NameFileComparator**：按照文件名称排序

**PathFileComparator**：按照路径排序，父目录优先排在前面

**SizeFileComparator**：按照文件大小排序，小文件排在前面（目录会计算其总大小）

**CompositeFileComparator**：组合排序，将以上排序规则组合在一起

使用示例如下：

```Java
List<File> files = Arrays.asList(new File[]{
        new File("/foo/def"),
        new File("/foo/test.txt"),
        new File("/foo/abc"),
        new File("/foo/hh.txt")});
// 排序目录在前
// ["/foo/def", "/foo/abc", "/foo/test.txt", "/foo/hh.txt"]
Collections.sort(files, DirectoryFileComparator.DIRECTORY_COMPARATOR); 
// 排序目录在后
// ["/foo/test.txt", "/foo/hh.txt", "/foo/def", "/foo/abc"]
Collections.sort(files, DirectoryFileComparator.DIRECTORY_REVERSE); 
// 组合排序，首先按目录在前排序，其次再按照名称排序
Comparator dirAndNameComp = new CompositeFileComparator(
            DirectoryFileComparator.DIRECTORY_COMPARATOR,
            NameFileComparator.NAME_COMPARATOR);
// ["/foo/abc", "/foo/def", "/foo/hh.txt", "/foo/test.txt"]
Collections.sort(files, dirAndNameComp); 
```



## 文件监视器

org.apache.commons.io.monitor包主要提供对文件的创建、修改、删除的监听操作，下面直接看简单示例。

```Java
public static void main(String[] args) throws Exception {
    // 监听目录下文件变化。可通过参数控制监听某些文件，默认监听目录所有文件
    FileAlterationObserver observer = new FileAlterationObserver("/foo");
    observer.addListener(new myListener());
    FileAlterationMonitor monitor = new FileAlterationMonitor();
    monitor.addObserver(observer);
    monitor.start(); // 启动监视器
    Thread.currentThread().join(); // 避免主线程退出造成监视器退出
}

class myListener extends FileAlterationListenerAdaptor {
    @Override
    public void onFileCreate(File file) {
        System.out.println("fileCreated:" + file.getAbsolutePath());
    }
    @Override
    public void onFileChange(File file) {
        System.out.println("fileChanged:" + file.getAbsolutePath());
    }
    @Override
    public void onFileDelete(File file) {
        System.out.println("fileDeleted:" + file.getAbsolutePath());
    }
}
```


![image-20220602161147872](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021611950.png)



# HuTool 

## HuTool 工具类

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091648730.png" alt="image-20230109164816506" style="zoom: 60%;" />

## Hutool 工具API

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091649156.png" alt="image-20230109164935985" style="zoom:67%;" />

## 常见方法演示

```java
public class Test1 {
    public static void main(String[] args) {
    /*
        FileUtil类:
                file：根据参数创建一个file对象
                touch：根据参数创建文件
                writeLines：把集合中的数据写出到文件中，覆盖模式。
                appendLines：把集合中的数据写出到文件中，续写模式。
                readLines：指定字符编码，把文件中的数据，读到集合中。
                readUtf8Lines：按照UTF-8的形式，把文件中的数据，读到集合中
                copy：拷贝文件或者文件夹
       */
        File file1 = FileUtil.file("D:\\", "aaa", "bbb", "a.txt");
        System.out.println(file1);//D:\aaa\bbb\a.txt

        File touch = FileUtil.touch(file1);
        System.out.println(touch);


        ArrayList<String> list = new ArrayList<>();
        list.add("aaa");
        list.add("aaa");
        list.add("aaa");

        File file2 = FileUtil.writeLines(list, "D:\\a.txt", "UTF-8");
        System.out.println(file2);

        ArrayList<String> list = new ArrayList<>();
        list.add("aaa");
        list.add("aaa");
        list.add("aaa");
        File file3 = FileUtil.appendLines(list, "D:\\a.txt", "UTF-8");
        System.out.println(file3);

        List<String> list = FileUtil.readLines("D:\\a.txt", "UTF-8");
        System.out.println(list);
    }
}
```



# NIO(了解)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021428413.png" alt="image-20220602142802363" style="zoom:80%;" />

## NIO和IO的区别

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021428923.png" alt="image-20220602142846856" style="zoom:80%;" />



## 相关API

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021433590.png" alt="image-20220602143311538" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021433280.png" alt="image-20220602143336199" style="zoom:80%;" />



## 通道

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021434957.png" alt="image-20220602143412902" style="zoom:80%;" />



## 缓冲区

### 七大类型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021434632.png" alt="image-20220602143451582" style="zoom:80%;" />

### 属性

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021435655.png" alt="image-20220602143518605" style="zoom:80%;" />



### 方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021435368.png" alt="image-20220602143551309" style="zoom:80%;" />

## 示例

### 读文件

```java
public static void test() throws IOException {
    Path path = Paths.get("src/main/resources/static/a.txt");
    FileChannel fc = FileChannel.open(path, StandardOpenOption.READ);//打开通道
    ByteBuffer bb = ByteBuffer.allocate(1024);
    StringBuilder sb = new StringBuilder();
    while (true) {
        //把数据放到缓冲区
        int len = fc.read(bb);//把数据装到缓冲区    对于缓冲区来说是存储，相当于put
        if (len <= 0) {
            break;
        }
        //切换
        bb.flip();
        //从缓冲区读取数据
        byte[] data = new byte[1024];
        bb.get(data, 0, bb.limit());
        // System.out.println(new String(data,0,bb.limit()));
        sb.append(new String(data, 0, bb.limit()));
        bb.clear();
    }
    System.out.println(sb);
}
```

### 复制文件

```java
public static void test()throws Exception{
    long start = System.currentTimeMillis();
    //将a.txt复制到b.txt
    FileChannel fc = FileChannel.open(Paths.get("src/main/resources/static/a.txt"),
                                      StandardOpenOption.READ);
    FileChannel to = FileChannel.open(Paths.get("src/main/resources/static/b.txt"),
                                      StandardOpenOption.WRITE,
                                      StandardOpenOption.CREATE_NEW);
    ByteBuffer bb = ByteBuffer.allocate(10);//定义缓冲区大小

    while(fc.read(bb)!=-1){//读取数据到缓冲区，即往缓冲区写  相当于put
        //修改limit为position  然后position为0,没有这个，
        //就从position开始读到limit,limit=capacity，position为写完的位置
        bb.flip();
        to.write(bb);
        //limit变成capicity  position=0,没有这个，
        //那么就会重复写第一次读取的内容，一会文件大小就很大，爆了
        bb.clear();
    }
    fc.close();
    to.close();
    long end = System.currentTimeMillis();
    System.out.println("ByteBuffer:"+ (end-start));
}
```

### 物理映射复制文件(速度快)

```java
public static void test2()throws Exception{
    long start = System.currentTimeMillis();
    FileChannel from = FileChannel.open(Paths.get("src/main/resources/static/她.jpg"),
                                        StandardOpenOption.READ);
    //如果CREAD,如果文件已经存在不会报错，但是会从文件头开始写
    FileChannel to = FileChannel.open(Paths.get("src/main/resources/static/girl.jpg"),
                                      StandardOpenOption.READ,
                                      StandardOpenOption.WRITE,
                                      StandardOpenOption.CREATE_NEW);
    MappedByteBuffer fbb = from.map(FileChannel.MapMode.READ_ONLY, 0, from.size());
    MappedByteBuffer tbb = to.map(FileChannel.MapMode.READ_WRITE, 0, from.size());
    tbb.put(fbb);
    from.close();
    to.close();
    long end = System.currentTimeMillis();
    System.out.println("ByteBuffer:"+ (end-start));
}
```



# 网络编程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101541339.png" alt="image-20230110154156228" style="zoom:67%;" />

## 网络通信基本模式

常见的通信模式有如下2种形式：Client-Server(CS) 、 Browser/Server(BS)

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071337435.png" alt="image-20220607133707365" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071338700.png" alt="image-20220607133807630" style="zoom:67%;" />



## 网络通信三要素

> - IP地址：设备在网络中的地址，是唯一的标识
> - 端口：应用程序在设备中的唯一标识
> - 协议：数据在网络中传输的规则，常见的协议有UDP和TCP协议

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211020092813408.png" alt="image-20211020092813408" style="zoom: 67%;" />

## IP地址

- IP（Internet Protocol）：全称”互联网协议地址”，是分配给上网设备的唯一标志
- 常见的IP分类为：IPv4和IPv6

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021957929.png" alt="image-20220602195756845" style="zoom:80%;" />

### IPv4

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101549443.png" alt="image-20230110154920351" style="zoom:67%;" />

### IPv6

> - IPv6：128位（16个字节），号称可以为地球每一粒沙子编号。
> - IPv6分成8个整数，每个整数用四个十六进制位表示， 数之间用冒号（：）分开。
> - 例如：ABCD:EF01:2345:6789:ABCD:EF01:2345:6789

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071340975.png" alt="image-20220607134030913" style="zoom:80%;" />

### IP地址基本寻路

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211020093152772.png" alt="image-20211020093152772" style="zoom: 80%;" />

### IP地址形式

> - 公网地址、和私有地址(局域网使用)
> - 192.168. 开头的就是常见的局域网地址，范围即为192.168.0.0--192.168.255.255，专门为组织机构内部使用。 

### IP常用命令

> - ipconfig：查看本机IP地址
> - ping IP地址：检查网络是否连通(重要) 例如：ping 127.0.0.1

### 特殊IP地址

本机IP: 127.0.0.1或者localhost：称为回送地址也可称本地回环地址，只会寻找当前所在本机



### IP操作-InetAddress⭐

此类表示Internet协议（IP）地址。InetAddress  API如下

![image-20211020094553344](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211020094553344.png)

```java
public class InetAddressDemo01 {
    public static void main(String[] args) throws Exception {
        // 1.获取本机地址对象。
        InetAddress ip1 = InetAddress.getLocalHost();
        System.out.println(ip1.getHostName());
        System.out.println(ip1.getHostAddress());

        // 2.获取域名ip对象
        InetAddress ip2 = InetAddress.getByName("www.baidu.com");
        System.out.println(ip2.getHostName());
        System.out.println(ip2.getHostAddress());

        // 3.获取公网IP对象,以下是百度的IP地址
        InetAddress ip3 = InetAddress.getByName("112.80.248.76");
        System.out.println(ip3.getHostName());
        System.out.println(ip3.getHostAddress());

        // 4.判断是否能通： ping  5s之前测试是否可通
        System.out.println(ip3.isReachable(5000));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071343539.png" alt="image-20220607134336480" style="zoom:80%;" />



## 端口号

端口号：唯一标识正在计算机设备上运行的进程（程序），被规定为一个 16 位的二进制，范围是 0~65535。

- 周知端口：0~1023，被预先定义的知名应用占用（如：HTTP占用 80，FTP占用21） 
- 注册端口：1024~49151，分配给用户进程或某些应用程序。（如：Tomcat占 用8080，MySQL占用3306）
- 动态端口：49152到65535，之所以称为动态端口，是因为它 一般不固定分配某种进程，而是动态分配。

> 注意：我们自己开发的程序选择注册端口，且一个设备中不能出现两个程序的端口号一样，否则出错
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071346886.png" alt="image-20220607134619832" style="zoom:80%;" />

## 网络通信协议

连接和通信数据的规则被称为网络通信协议

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022000141.png" alt="image-20220602200000069" style="zoom:80%;" />

- OSI参考模型：世界互联协议标准，全球通信规范，由于此模型过于理想化，未能在因特网上进行广泛推广。 
- TCP/IP参考模型(或TCP/IP协议)：事实上的国际标准。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211020095017949.png" alt="image-20211020095017949" style="zoom:80%;" />

传输层的2个常见协议

- TCP(Transmission Control Protocol) ：传输控制协议
- UDP(User Datagram Protocol)：用户数据报协议



## TCP协议

### TCP协议特点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101613278.png" alt="image-20230110161310188" style="zoom:67%;" />


TCP协议通信场景：对信息安全要求较高的场景，例如：文件下载、金融等数据通信。

### TCP三次握手建立连接

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211020095259089.png" alt="image-20211020095259089" style="zoom: 67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071348244.png" alt="image-20220607134850169" style="zoom:80%;" />



### TCP四次挥手断开连接

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211020095357458.png" alt="image-20211020095357458" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071349265.png" alt="image-20220607134921191" style="zoom:80%;" />

### TCP的API方法

注意：在java中只要是使用java.net.Socket类实现通信，底层即是使用了TCP协议

Socket

| 构造器                                | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| public Socket(String host , int port) | 创建发送端的Socket对象与服务端连接，参数为服务端程序的ip和端口。 |

Socket类成员方法

| 方法                           | 说明               |
| ------------------------------ | ------------------ |
| OutputStream getOutputStream() | 获得字节输出流对象 |
| InputStream getInputStream()   | 获得字节输入流对象 |



### TCP编程

#### 服务器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022029295.png" alt="image-20220602202917213" style="zoom:80%;" />

#### 客户端

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022029955.png" alt="image-20220602202941873" style="zoom:80%;" />



需求：客户端实现步骤
创建客户端的Socket对象，请求与服务端的连接。
使用socket对象调用getOutputStream()方法得到字节输出流。
使用字节输出流完成数据的发送。
释放资源：关闭socket管道。



### 一发一收实现

服务端

```java
class ServerDemo1 {
    public static void main(String[] args) throws Exception {
        //注册端口
        ServerSocket serverSocket = new ServerSocket(7777);
        //必须调用accept方法同意请求
        Socket socket = serverSocket.accept();
        InputStream is = socket.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String msg;
        if ((msg = br.readLine()) != null){
            System.out.println(socket.getRemoteSocketAddress()+"说了："+msg);
        }

    }
}
```

客户端

```java
class ClientDemo2 {
    public static void main(String[] args) throws Exception {
        //参数1：服务端Ip，参数2：端口号
        Socket socket = new Socket("127.0.0.1",7777);
        //2、从socket通信管道中得到一个字节输出流，负责发送数据
        OutputStream os = socket.getOutputStream();
        //3、把低级的字节流包装成打印流
        PrintStream ps = new PrintStream(os);
        //4、发送消息
        ps.println("我是客户端TCP，我已与你对接，并发出邀请，约吗？");
        //5、刷新
        ps.flush();
    }
}
```

### 多发多收实现

需求：使用TCP通信方式实现：多发多收消息。
具体要求：

- 可以使用死循环控制服务端收完消息继续等待接收下一个消息。
- 客户端也可以使用死循环等待用户不断输入消息。
- 客户端一旦输入了exit，则关闭客户端程序，并释放资源。

```java
class ServerDemo1 {
    public static void main(String[] args) throws Exception {
        //注册端口
        ServerSocket serverSocket = new ServerSocket(7777);
        //必须调用accept方法同意请求
        Socket socket = serverSocket.accept();
        InputStream is = socket.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String msg;
        while ((msg = br.readLine()) != null){
            System.out.println(socket.getRemoteSocketAddress()+"说了："+msg);
        }
    }
}
```

```java
class ClientDemo2 {
    public static void main(String[] args) throws Exception {
        //参数1：服务端Ip，参数2：端口号
        Socket socket = new Socket("127.0.0.1",7777);
        //2、从socket通信管道中得到一个字节输出流，负责发送数据
        OutputStream os = socket.getOutputStream();
        //3、把低级的字节流包装成打印流
        PrintStream ps = new PrintStream(os);
        Scanner sc = new Scanner(System.in);
        while(true) {
            //4、发送消息
            System.out.println("请说：");
            String msg = sc.nextLine();
            ps.println(msg);
            //5、刷新
            ps.flush();
        }
    }
}
```

本案例实现了多发多收，那么是否可以同时接收多个客户端的消息？

- 不可以的。
- 因为服务端现在只有一个线程，只能与一个客户端进行通信。

现在服务端为什么不可以同时接收多个客户端的消息。

- 目前服务端是单线程的，每次只能处理一个客户端的消息。

如何才可以让服务端可以处理多个客户端的通信需求？

- 引入多线程。

使用线程池

目前的通信架构存在什么问题？

- 客户端与服务端的线程模型是： N-N的关系。
- 客户端并发越多，系统瘫痪的越快。

本次使用线程池的优势在哪里？

- 服务端可以复用线程处理多个客户端，可以避免系统瘫痪。
- 适合客户端通信时长较短的场景。

这个不需要修改

```java
class ClientDemo4 {
    public static void main(String[] args) throws Exception {
        //参数1：服务端Ip，参数2：端口号
        Socket socket = new Socket("127.0.0.1",6666);
        //2、从socket通信管道中得到一个字节输出流，负责发送数据
        OutputStream os = socket.getOutputStream();
        //3、把低级的字节流包装成打印流
        PrintStream ps = new PrintStream(os);
        Scanner sc = new Scanner(System.in);
        while(true) {
            //4、发送消息
            System.out.println("请说：");
            String msg = sc.nextLine();
            ps.println(msg);
            //5、刷新
            ps.flush();
        }
    }
}
```

```java
class ServerDemo3 {
    private static ExecutorService pool = new ThreadPoolExecutor(3,5,6, TimeUnit.SECONDS,
            new ArrayBlockingQueue<>(2), Executors.defaultThreadFactory(),
    new ThreadPoolExecutor.AbortPolicy());

    public static void main(String[] args) throws Exception {

        while (true) {
            //注册端口
            ServerSocket serverSocket = new ServerSocket(6666);
            while (true) {
                //必须调用accept方法同意请求
                Socket socket = serverSocket.accept();
                System.out.println(socket.getRemoteSocketAddress() + "他来了，上线");
                Runnable target = new ServerReader(socket);//调用Runnable接口
                pool.execute(target);
            }
        }
    }
}
```

多线程接口

```java
class ServerReader implements Runnable{

    private Socket socket;

    public ServerReader(Socket socket) {
        this.socket = socket;
    }

    @SneakyThrows
    @Override
    public void run() {
        InputStream is = socket.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String msg;
        while ((msg = br.readLine()) != null){
            System.out.println(socket.getRemoteSocketAddress()+"说了："+msg);
        }
    }
}
```



## UDP协议

### 协议分析

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101621783.png" alt="image-20230110162128664" style="zoom:67%;" />

UDP协议通信场景：语音通话，视频会话等

### UDP编程步骤

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022017966.png" alt="image-20220602201740884" style="zoom:80%;" />

### API方法

DatagramPacket：数据包对象（韭菜盘子）

| 构造器                                                       | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| public DatagramPacket(byte[] buf, int length, InetAddress address, int port) | `创建发送端数据包对象buf：要发送的内容，字节数组length：要发送内容的字节长度address：接收端的IP地址对象port：接收端的端口号` |
| public DatagramPacket(byte[] buf, int length)                | `创建接收端的数据包对象buf：用来存储接收的内容length：能够接收内容的长度` |

DatagramPacket常用方法

| 方法                   | 说明                       |
| ---------------------- | -------------------------- |
| public int getLength() | `获得实际接收到的字节个数` |

DatagramSocket：发送端和接收端对象（人）

| 构造器                          | 说明                                               |
| ------------------------------- | -------------------------------------------------- |
| public DatagramSocket()         | `创建发送端的Socket对象，系统会随机分配一个端口号` |
| public DatagramSocket(int port) | `创建接收端的Socket对象并指定端口号`               |

DatagramSocket类成员方法

| 方法                                  | 说明         |
| ------------------------------------- | ------------ |
| public void send(DatagramPacket dp)   | `发送数据包` |
| public void receive(DatagramPacket p) | `接收数据包` |

UDP的接收端为什么可以接收很多发送端的消息？接收端只负责接收数据包，无所谓是哪个发送端的数据包.



### 发送和接收案例

需求：客户端实现步骤

- 创建DatagramSocket对象（发送端对象）                      扔韭菜的人
- 创建DatagramPacket对象封装需要发送的数据（数据包对象）                 韭菜盘子
- 使用DatagramSocket对象的send方法传入DatagramPacket对象                 开始抛出韭菜
- 释放资源

发送端

```java
//发送端
public class ClientDemo1 {
    public static void main(String[] args) throws Exception {
        System.out.println("====再启动发送端=====");
        //1、创建发送端对象
        DatagramSocket socket = new DatagramSocket();
        Scanner sc = new Scanner(System.in);
        while(true) {
            System.out.println("请说：");
            String msg = sc.nextLine();
            if ("exit".equals(msg)){
                System.out.println("离线成功!");
                socket.close();
                break;
            }
            //2、创建一个数据包对象封装数据
            byte [] buffer = msg.getBytes();
            //参数1，2，3，4分别是要封装的数据、发送数据的大小、服务端主机的IP地址、服务端的端口
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length,
                                                       InetAddress.getLocalHost(),8888);
            //3、发送数据出去
            socket.send(packet);
        }
    }
}
```

```java
//接收端
piblic class ServerDemo2 {
    public static void main(String[] args) throws Exception {
        System.out.println("====先启动接收端====");
        //1、创建接收端对象，注册端口
        DatagramSocket socket = new DatagramSocket(8888);
        //2、创建一个数据包接收数据
        byte [] buffer = new byte[1024*64];
        DatagramPacket packet = new DatagramPacket(buffer, buffer.length );

        while (true) {
            //3、等待接收数据
            socket.receive(packet);

            //4、取出数据，读多少写多少
            int len = packet.getLength();
            String rs = new String(buffer, 0, len);
            System.out.println("收到了来自"+packet.getAddress()+
                               "对方的端口是"+packet.getPort()+"的消息"+ rs);
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022024514.png" alt="image-20220602202457450" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022025931.png" alt="image-20220602202518866" style="zoom:80%;" />



### 多发多收案例

#### 分析

`UDP的接收端为什么可以接收很多发送端的消息？接收端只负责接收数据包，无所谓是哪个发送端的数据包`

①发送端可以一直发送消息。

②接收端可以不断的接收多个发送端的消息展示。

③发送端输入了exit则结束发送端程序。

#### 需求：客户端实现步骤

①创建DatagramSocket对象（发送端对象）           扔韭菜的人

②使用while死循环不断的接收用户的数据输入，如果用户输入的exit则退出程序

③如果用户输入的不是exit, 把数据封装成DatagramPacket           韭菜盘子

④使用DatagramSocket对象的send方法将数据包对象进行发送          开始抛出韭菜

⑤释放资源

#### 需求：接收端实现步骤

①创建DatagramSocket对象并指定端口（接收端对象）           接韭菜的人

②创建DatagramPacket对象接收数据（数据包对象）         韭菜盘子

③使用while死循环不断的进行第4步

④使用DatagramSocket对象的receive方法传入DatagramPacket对象         开始接收韭菜







### UDP的三种通信方式(了解)

- 单播：单台主机与单台主机之间的通信。
- 广播：当前主机与所在网络中的所有主机通信。
- 组播：当前主机与选定的一组主机的通信。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211020103320107.png" alt="image-20211020103320107" style="zoom: 50%;" />

#### UDP如何实现广播

- 使用广播地址：255.255.255.255
- 具体操作：
  1. 发送端发送的数据包的目的地写的是广播地址、且指定端口。 （255.255.255.255  ,   9999）
  2. 本机所在网段的其他主机的程序只要注册对应端口就可以收到消息了。（9999）

#### UDP如何实现组播

- 使用组播地址：224.0.0.0 ~ 239.255.255.255
- 具体操作：
  1. 发送端的数据包的目的地是组播IP  (例如：224.0.1.1,  端口：9999)
  2. 接收端必须绑定该组播IP(224.0.1.1)，端口还要注册发送端的目的端口9999 ，这样即可接收该组播消息。
  3. DatagramSocket的子类MulticastSocket可以在接收端绑定组播IP。



## URL编程

### 编程流程

服务器端：Web服务器

客户端

1、创建URL的对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022035317.png" alt="image-20220602203545247" style="zoom:80%;" />

2、与服务器建立连接

- 这种方式只能使用get方法与服务器进行通信
- 如果要给服务器传参数只能在网址后面通过?参数名=参数值&参数名=参数值...

```java
InputStream is = url.openStream();
```

- 这种方式可以使用post方法与服务器进行通信
- 如果要给服务器传数据，那么需要hc.setDoOutput(true);
- 然后用OutputStream进行发送数据

```java
HttpURLConnection tc = (HttpURLConnection)url.openConnection();
```

3、处理接收到数据

### 示例一

```java
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
/*
 * tomcat：是一个服务器
 * 浏览器：客户端
 */
public class TestURL {
    public static void main(String[] args) throws Exception{
        //自定义客户端

      URL url = new URL("http://127.0.0.1:8080/test/name?name=tom");
      System.out.println("协议：" + url.getProtocol());
      System.out.println("主机名：" + url.getHost());
      System.out.println("端口号：" + url.getPort());
      System.out.println("路径名：" + url.getPath());
      InputStream input = url.openStream();
      InputStreamReader isr = new InputStreamReader(input);
      BufferedReader br  = new BufferedReader(isr);
      // 获取参数
      String str ;
      while((str=br.readLine())!=null){
           System.out.println("参数："+str);
      }
   }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206022051987.png" alt="image-20220602205146914" style="zoom:80%;" />

### 示例二(GET)

```java
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
public class TestURL2 {
	public static void main(String[] args) throws Exception{
		URL url = new URL("http://192.168.24.71:8080/myweb/login?username=admin&pass=123");
		InputStream input = url.openStream();
		InputStreamReader isr = new InputStreamReader(input);
		BufferedReader br  = new BufferedReader(isr);	
		String str ;
		while((str=br.readLine())!=null){
			System.out.println(str);
		}
	}
}
```

### 示例三(POST)

```java
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.HttpURLConnection;
import java.net.URL;
public class TestURL3 {
	public static void main(String[] args) throws Exception{
		URL url = new URL("http://192.168.24.71:8080/myweb/login");	
		HttpURLConnection hc = (HttpURLConnection) url.openConnection();
		hc.setDoOutput(true);
		OutputStream output = hc.getOutputStream();
		PrintStream ps = new PrintStream(output);
//		output.write("username=chai&pass=123".getBytes());
		ps.println("username=chai&pass=123");
		
		InputStream input = hc.getInputStream();
		InputStreamReader isr = new InputStreamReader(input);
		BufferedReader br  = new BufferedReader(isr);	
		
		String str ;
		while((str=br.readLine())!=null){
			System.out.println(str);
		}
	}
}
```



# 多线程

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091701320.png" alt="image-20230109170116191" style="zoom:67%;" />

## 什么是线程？

### 什么是多线程

> 多线程是指从软硬件上实现多条执行流程的技术。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091700380.png" alt="image-20230109170003248" style="zoom:67%;" />

### 多线程应用场景

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091700022.png" alt="image-20230109170047875" style="zoom:67%;" />

## 多线程的创建

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091715353.png" alt="image-20230109171504218" style="zoom: 60%;" />

### 继承Thread类

> Java是通过java.lang.Thread 类来代表线程的。 按照面向对象的思想，Thread类应该提供了实现多线程的方式。
>
> 优点：编码简单  ；缺点：线程类已经继承Thread，无法继承其他类，不利于扩展。

#### 实现案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091703813.png" alt="image-20230109170353698" style="zoom: 50%;" />

```java
// 目标：多线程的创建方式一：继承Thread类实现。
public class ThreadDemo1 {
    public static void main(String[] args) {
        // 3、new一个新线程对象
        Thread t = new MyThread();
        // 4、调用start方法启动线程（执行的还是run方法）
        t.start();
        for (int i = 0; i < 5; i++) {
            System.out.println("主线程执行输出：" + i);
        }
    }
}

// 1、定义一个线程类继承Thread类
class MyThread extends Thread{
    // 2、重写run方法，里面是定义线程以后要干啥
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("子线程执行输出：" + i);
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091707323.png" alt="image-20230109170706198" style="zoom:50%;" />

#### 注意事项

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091708597.png" alt="image-20230109170810470" style="zoom:50%;" />

### 实现Runnable接口

> 优点：线程任务类只是实现接口，可以继续继承类和实现接口，扩展性强。
>
> 缺点：编程多一层对象包装，如果线程有执行结果是不可以直接返回的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091709719.png" alt="image-20230109170904595" style="zoom:50%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091708175.png" alt="image-20230109170851061" style="zoom:50%;" />

```java
// 目标：学会线程的创建方式二，理解它的优缺点。
public class ThreadDemo2 {
    public static void main(String[] args) {
        // 3、创建一个任务对象
        Runnable target = new MyRunnable();
        // 4、把任务对象交给Thread处理
        Thread t = new Thread(target);
        // Thread t = new Thread(target, "1号");
        // 5、启动线程
        t.start();
        for (int i = 0; i < 5; i++) {
            System.out.println("主线程执行输出：" + i);
        }
    }
}

// 1、定义一个线程任务类 实现Runnable接口
class MyRunnable  implements Runnable {
    // 2、重写run方法，定义线程的执行任务的
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("子线程执行输出：" + i);
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091710073.png" alt="image-20230109171056963" style="zoom:67%;" />

### 实现Callable接口

> **JDK 5.0提供了Callable和FutureTask来实现。这种方式的优点是：可以得到线程执行的结果。**
>
> 优点：线程任务类只是实现接口，可以继续继承类和实现接口，扩展性强。
>
> **可以在线程执行完毕后去获取线程执行的结果。**
>
> 缺点：编码复杂一点。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091718309.png" alt="image-20230109171816187" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091712176.png" alt="image-20230109171247028" style="zoom:50%;" />

```java
// 目标：学会线程的创建方式三：实现Callable接口，结合FutureTask完成。
public class ThreadDemo3 {
    public static void main(String[] args) {
        // 3、创建Callable任务对象
        Callable<String> call = new MyCallable(100);
        // 4、把Callable任务对象 交给 FutureTask 对象
        //  FutureTask对象的作用1： 是Runnable的对象（实现了Runnable接口），可以交给Thread了
        //  FutureTask对象的作用2： 可以在线程执行完毕之后通过调用其get方法得到线程执行完成的结果
        FutureTask<String> f1 = new FutureTask<>(call);
        // 5、交给线程处理
        Thread t1 = new Thread(f1);
        // 6、启动线程
        t1.start();
        
        Callable<String> call2 = new MyCallable(200);
        FutureTask<String> f2 = new FutureTask<>(call2);
        Thread t2 = new Thread(f2);
        t2.start();

        try {
            // 如果f1任务没有执行完毕，这里的代码会等待，直到线程1跑完才提取结果。
            String rs1 = f1.get();
            System.out.println("第一个结果：" + rs1);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            // 如果f2任务没有执行完毕，这里的代码会等待，直到线程2跑完才提取结果。
            String rs2 = f2.get();
            System.out.println("第二个结果：" + rs2);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

// 1、定义一个任务类 实现Callable接口  应该申明线程任务执行完毕后的结果的数据类型
class MyCallable implements Callable<String>{
    private int n;
    public MyCallable(int n) {
        this.n = n;
    }

    // 2、重写call方法（任务方法）
    @Override
    public String call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= n ; i++) {
            sum += i;
        }
        return "子线程执行的结果是：" + sum;
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091714184.png" alt="image-20230109171439060" style="zoom:67%;" />

### 匿名内部类改进语法

```java
public class ThreadDemo2Other {
    public static void main(String[] args) {
        Runnable target = new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println("子线程1执行输出：" + i);
                }
            }
        };
        Thread t = new Thread(target);
        t.start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println("子线程2执行输出：" + i);
                }
            }
        }).start();

        for (int i = 0; i < 10; i++) {
            System.out.println("主线程执行输出：" + i);
        }
    }
}
```



## Thread 常用方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091732456.png" alt="image-20230109173227321" style="zoom:67%;" />

### Thread构造器

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091727094.png" alt="image-20230109172712961" style="zoom: 67%;" />

### Thread常用方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091726935.png" alt="image-20230109172622795" style="zoom:67%;" />

### 案例演示

```java
public class MyThread extends Thread{
    public MyThread() {
    }

    public MyThread(String name) {
        // 为当前线程对象设置名称，送给父类的有参数构造器初始化名称
        super(name);
    }

    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + "输出：" + i);
        }
    }
}
```

```java
public class ThreadDemo01 {
    // main方法是由主线程负责调度的
    public static void main(String[] args) {
        Thread t1 = new MyThread("1号");
        // t1.setName("1号");
        t1.start();
        System.out.println(t1.getName());

        Thread t2 = new MyThread("2号");
        // t2.setName("2号");
        t2.start();
        System.out.println(t2.getName());

        // 哪个线程执行它，它就得到哪个线程对象（当前线程对象）
        // 主线程的名称就叫main
        Thread m = Thread.currentThread();
        System.out.println(m.getName());
        m.setName("最牛的线程");

        for (int i = 0; i < 5; i++) {
            System.out.println( m.getName() + "输出：" + i);
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091734105.png" alt="image-20230109173410976" style="zoom: 67%;" />

```java
public class ThreadDemo02 {
    // main方法是由主线程负责调度的
    public static void main(String[] args) throws Exception {
        for (int i = 1; i <= 5; i++) {
            System.out.println("输出：" + i);
            if(i == 3){
                // 让当前线程进入休眠状态
                // 段子：项目经理让我加上这行代码，如果用户愿意交钱，我就注释掉。
                Thread.sleep(3000);
            }
        }
    }
}
```



## 线程安全

> 多个线程同时操作同一个共享资源的时候可能会出现业务安全问题，称为线程安全问题。
>
> 出现原因：存在多线程并发；同时访问共享资源；存在修改共享资源

### 取钱模型演示

> 需求：小明和小红是一对夫妻，他们有一个共同的账户，余额是10万元。
>
> 如果小明和小红同时来取钱，而且2人都要取钱10万元，可能出现什么问题呢？

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091741241.png" alt="image-20230109174112017" style="zoom:67%;" />

### 取钱案例

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091906877.png" alt="image-20230109190632728" style="zoom: 60%;" />

```java
public class Account {
    private String cardId;
    private double money; // 账户的余额

    public Account(){

    }

    public Account(String cardId, double money) {
        this.cardId = cardId;
        this.money = money;
    }

    /**
       小明 小红
     */
    public void drawMoney(double money) {
        // 0、先获取是谁来取钱，线程的名字就是人名
        String name = Thread.currentThread().getName();
        // 1、判断账户是否够钱
        if(this.money >= money){
            // 2、取钱
            System.out.println(name + "来取钱成功，吐出：" + money);
            // 3、更新余额
            this.money -= money;
            System.out.println(name + "取钱后剩余：" + this.money);
        }else {
            // 4、余额不足
            System.out.println(name +"来取钱，余额不足！");
        }

    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

}
```

```java
// 取钱的线程类
public class DrawThread extends Thread {
    // 接收处理的账户对象
    private Account acc;
    public DrawThread(Account acc,String name){
        super(name);
        this.acc = acc;
    }
    @Override
    public void run() {
        // 小明 小红：取钱
        acc.drawMoney(100000);
    }
}
```

```java
// 需求：模拟取钱案例。
public class ThreadDemo {
    public static void main(String[] args) {
        // 1、定义线程类，创建一个共享的账户对象
        Account acc = new Account("ICBC-111", 100000);

        // 2、创建2个线程对象，代表小明和小红同时进来了。
        new DrawThread(acc, "小明").start();
        new DrawThread(acc, "小红").start();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091747279.png" alt="image-20230109174711164" style="zoom:67%;" />

## 线程同步

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092140053.png" alt="image-20230109214012888" style="zoom:67%;" />

### 同步代码块

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092144132.png" alt="image-20230109214403966" style="zoom:50%;" />

```java
public void drawMoney(double money) {
    // 1、拿到是谁来取钱
    String name = Thread.currentThread().getName();
    // 同步代码块
    // 小明 小红
    // this == acc 共享账户
    synchronized (this) {
        // 2、判断余额是否足够
        if(this.money >= money){
            // 钱够了
            System.out.println(name+"来取钱，吐出：" + money);
            // 更新余额
            this.money -= money;
            System.out.println(name+"取钱后，余额剩余：" + this.money);
        }else{
            // 3、余额不足
            System.out.println(name+"来取钱，余额不足！");
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092144423.png" alt="image-20230109214433268" style="zoom:67%;" />



### 同步方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092145913.png" alt="image-20230109214552742" style="zoom:50%;" />

```java
public synchronized void drawMoney(double money) {
    // 1、拿到是谁来取钱
    String name = Thread.currentThread().getName();
    // 2、判断余额是否足够
    // 小明  小红
    if(this.money >= money){
        // 钱够了
        System.out.println(name+"来取钱，吐出：" + money);
        // 更新余额
        this.money -= money;
        System.out.println(name+"取钱后，余额剩余：" + this.money);
    }else{
        // 3、余额不足
        System.out.println(name+"来取钱，余额不足！");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092146740.png" alt="image-20230109214611592" style="zoom:67%;" />

### Lock 锁

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092147476.png" alt="image-20230109214745296" style="zoom: 50%;" />

```java
// final修饰后：锁对象是唯一和不可替换的，非常专业
private final Lock lock = new ReentrantLock();

public void drawMoney(double money) {
    // 1、拿到是谁来取钱
    String name = Thread.currentThread().getName();
    // 2、判断余额是否足够
    lock.lock(); // 上锁
    try {
        if(this.money >= money){
            // 钱够了
            System.out.println(name+"来取钱，吐出：" + money);
            // 更新余额
            this.money -= money;
            System.out.println(name+"取钱后，余额剩余：" + this.money);
        }else{
            // 3、余额不足
            System.out.println(name+"来取钱，余额不足！");
        }
    } finally {
        lock.unlock(); // 解锁
    }
}
```



## 线程通信(了解)

### 线程通信基本概念

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092150836.png" alt="image-20230109215026568" style="zoom:67%;" />

### 线程通信案例模拟

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092151718.png" alt="image-20230109215119533" style="zoom:50%;" />

### 等待和唤醒方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092152836.png" alt="image-20230109215221674" style="zoom:80%;" />

### 完整案例演示

```java
// 呼叫系统
public class CallSystem {
    // 定义一个变量记录当前呼入进来的电话。
    public static int number = 0; // 最多只接听一个。

    // 接入电话
    public synchronized static void call() {
        try {
            number++;
            System.out.println("成功接入一个用户，等待分发~~~~");

            // 唤醒别人 : 1个
            CallSystem.class.notify();
            // 让当前线程对象进入等待状态。
            CallSystem.class.wait();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // 分发电话
    public synchronized static void receive() {
        try {
            String name = Thread.currentThread().getName();
            if(number == 1){
                System.out.println(name + "此电话已经分发给客服并接听完毕了~~~~~");
                number--;
                // 唤醒别人 : 1个
                CallSystem.class.notify();
                CallSystem.class.wait(); // 让当前线程等待
            }else {
                // 唤醒别人 : 1个
                CallSystem.class.notify();
                CallSystem.class.wait(); // 让当前线程等待
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class CallThread extends Thread{
    @Override
    public void run() {
        // 不断的打入电话
        while (true){
            CallSystem.call();
        }
    }
}
```

```java
// 接电话线程类
public class ReceiveThread extends Thread{
    @Override
    public void run() {
        // 1号  2号
        while (true){
            CallSystem.receive();
        }
    }
}
```

```java
public class TestDemo {
    public static void main(String[] args) {
        // 1、生产者线程：负责不断接收打进来的电话
        CallThread call = new CallThread();
        call.start();

        // 2、消费者线程：客服，每个客服每次接听一个电话
        ReceiveThread r1 = new ReceiveThread();
        r1.start();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092154097.png" alt="image-20230109215440953" style="zoom:67%;" />

## 线程池⭐

### 线程池概述

> 线程池就是一个可以复用线程的技术。

#### 不使用线程池的问题 

> 如果用户每发起一个请求，后台就创建一个新线程来处理，下次新任务来了又要创建新线程，而创建新线程的开销是很大的，这样会严重影响系统的性能。

#### 如何得到线程池对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092158534.png" alt="image-20230109215826376" style="zoom: 50%;" />

### ThreadPoolExecutor 构造器的参数

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092159431.png" alt="image-20230109215900213" style="zoom:67%;" />



### 线程池常见面试题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092200245.png" alt="image-20230109220015099" style="zoom: 50%;" />

### 线程池处理Runnable任务

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092202157.png" alt="image-20230109220229962" style="zoom:67%;" />

```java
public class MyRunnable implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + "输出了：HelloWorld ==> "  + i);
        }
        try {
            System.out.println(Thread.currentThread().getName() + "线程进入休眠了~~~");
            Thread.sleep(10000000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class ThreadPoolDemo1 {
    public static void main(String[] args) {
        // 1、创建线程池对象
        ExecutorService pool = new ThreadPoolExecutor(3, 5 ,
                6, TimeUnit.SECONDS, new ArrayBlockingQueue<>(5) , 
                                     Executors.defaultThreadFactory(),
               new ThreadPoolExecutor.AbortPolicy() );

        // 2、给任务线程池处理。
        Runnable target = new MyRunnable();
        pool.execute(target);
        pool.execute(target);
        pool.execute(target);

        pool.execute(target);
        pool.execute(target);
        pool.execute(target);
        pool.execute(target);
        pool.execute(target);

        // 创建临时线程
        pool.execute(target);
        pool.execute(target);
        // 不创建，拒绝策略被触发！！！
        pool.execute(target);

        // 关闭线程池（开发中一般不会使用）。
        // pool.shutdownNow(); // 立即关闭，即使任务没有完成，会丢失任务的！
        pool.shutdown(); // 会等待全部任务执行完毕之后再关闭（建议使用的）
    }
}
```

### 新任务拒绝策略

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092203911.png" alt="image-20230109220324739" style="zoom:67%;" />



### 线程池处理Callable任务

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092201850.png" alt="image-20230109220127689" style="zoom:67%;" />

```java
// 1、定义一个任务类 实现Callable接口  应该申明线程任务执行完毕后的结果的数据类型
public class MyCallable implements Callable<String>{
    private int n;
    public MyCallable(int n) {
        this.n = n;
    }

    // 2、重写call方法（任务方法）
    @Override
    public String call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= n ; i++) {
            sum += i;
        }
        return Thread.currentThread().getName()
                + "执行 1-" + n+ "的和，结果是：" + sum;
    }
}
```

```java
public class ThreadPoolDemo2 {
    public static void main(String[] args) throws Exception {
        // 1、创建线程池对象
        ExecutorService pool = new ThreadPoolExecutor(3, 5 ,
                6, TimeUnit.SECONDS, new ArrayBlockingQueue<>(5) , 
                                     Executors.defaultThreadFactory(),
               new ThreadPoolExecutor.AbortPolicy() );

        // 2、给任务线程池处理。
        Future<String> f1 = pool.submit(new MyCallable(100));
        Future<String> f2 = pool.submit(new MyCallable(200));
        Future<String> f3 = pool.submit(new MyCallable(300));
        Future<String> f4 = pool.submit(new MyCallable(400));
        Future<String> f5 = pool.submit(new MyCallable(500));

//        String rs = f1.get();
//        System.out.println(rs);

        System.out.println(f1.get());
        System.out.println(f2.get());
        System.out.println(f3.get());
        System.out.println(f4.get());
        System.out.println(f5.get());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092213619.png" alt="image-20230109221358486" style="zoom:67%;" />

### Executors工具类实现线程池

Executors：线程池的工具类通过调用方法返回不同类型的线程池对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092126701.png" alt="image-20230109212606529" style="zoom:67%;" />

```java
public class MyRunnable implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + "输出了：HelloWorld ==> "  + i);
        }
        try {
            System.out.println(Thread.currentThread().getName() + "本任务与线程绑定了，线程休眠");
            Thread.sleep(10000000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class ThreadPoolDemo3 {
    public static void main(String[] args) throws Exception {
        // 1、创建固定线程数据的线程池
        ExecutorService pool = Executors.newFixedThreadPool(3);
        pool.execute(new MyRunnable());
        pool.execute(new MyRunnable());
        pool.execute(new MyRunnable());
        pool.execute(new MyRunnable()); // 已经没有多余线程了
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092137568.png" alt="image-20230109213632490" style="zoom:55%;" />

### Executors使用可能存在的陷阱

大型并发系统环境中使用Executors如果不注意可能会出现系统风险。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092127013.png" alt="image-20230109212732853" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092128155.png" alt="image-20230109212811998" style="zoom:67%;" />



## 定时器

定时器是一种控制任务延时调用，或者周期调用的技术。作用：闹钟、定时邮件发送。

### Timer

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092113824.png" alt="image-20230109211343686" style="zoom:67%;" />

```java
public class TimerDemo1 {
    public static void main(String[] args) {
        // 1、创建Timer定时器
        Timer timer = new Timer();  // 定时器本身就是一个单线程。
        // 2、调用方法，处理定时任务
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行AAA~~~" + new Date());
            }
        }, 0, 2000);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行BB~~~"+ new Date());
                System.out.println(10/0);
            }
        }, 0, 2000);

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行CCC~~~"+ new Date());
            }
        }, 0, 3000);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092114481.png" alt="image-20230109211407352" style="zoom:67%;" />

### ScheduledExecutorService

> ScheduledExecutorService是 jdk1.5中引入了并发包，目的是为了弥补Timer的缺陷, ScheduledExecutorService内部为线程池。基于线程池，某个任务的执行情况不会影响其他定时任务的执行。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092117393.png" alt="image-20230109211752236" style="zoom:67%;" />

```java
public class TimerDemo2 {
    public static void main(String[] args) {
        // 1、创建ScheduledExecutorService线程池，做定时器
        ScheduledExecutorService pool = Executors.newScheduledThreadPool(3);

        // 2、开启定时任务
        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行输出：AAA  ==》 " + 
                                   new Date());
                try {
                    Thread.sleep(100000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, 0, 2, TimeUnit.SECONDS);


        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行输出：BBB  ==》 " + 
                                   new Date());
                System.out.println(10 / 0);
            }
        }, 0, 2, TimeUnit.SECONDS);

        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行输出：CCC  ==》 " + 
                                   new Date());
            }
        }, 0, 2, TimeUnit.SECONDS);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092119372.png" alt="image-20230109211942247" style="zoom:67%;" />

## 并发、并行

> 正在运行的程序（软件）就是一个独立的进程， 线程是属于进程的，多个线程其实是并发与并行同时进行的。
>
> **并发：CPU分时轮询的执行线程。**
>
> **并行：同一个时刻同时在执行**。

### 并发

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091914591.png" alt="image-20230109191409436" style="zoom:50%;" />

### 并行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301091915786.png" alt="image-20230109191523636" style="zoom: 50%;" />

## 线程的生命周期

### 状态

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092108004.png" alt="image-20230109210803817" style="zoom:67%;" />

### 线程的状态

> 线程的状态：也就是线程从生到死的过程，以及中间经历的各种状态及状态转换。
>
> 理解线程的状态有利于提升并发编程的理解能力。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092109452.png" alt="image-20230109210917309" style="zoom:67%;" />

### 线程的6种状态互相转换

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092110639.png" alt="image-20230109211014449" style="zoom: 67%;" />

### 线程的6种状态

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092110229.png" alt="image-20230109211039068" style="zoom:67%;" />

### 线程的6种状态分析

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301092111266.png" alt="image-20230109211111115" style="zoom:50%;" />



# 单元测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101624742.png" alt="image-20230110162412645" style="zoom:67%;" />

## 单元测试概述

### 直接测试缺点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101626935.png" alt="image-20230110162647810" style="zoom:67%;" />

### JUnit优点

> - JUnit可以灵活的选择执行哪些测试方法，可以一键执行全部测试方法。
> - Junit可以生成全部方法的测试报告。
> - 单元测试中的某个方法测试失败了，不会影响其他测试方法的测试。

## 单元测试快速入门

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101629797.png" alt="image-20230110162927681" style="zoom:67%;" />



### 业务功能

```java
public class UserService {
    // 登录功能
    public String loginName(String loginName , String passWord){
        if("admin".equals(loginName) && "123456".equals(passWord)){
            return "登录成功";
        }else {
            return "用户名或者密码有问题";
        }
    }
    // 查询全部用户功能
    public void selectNames(){
        System.out.println(10/2);
        System.out.println("查询全部用户名称成功~~");
    }
}
```



### 测试方法

```java
//注意点：必须是公开的，无参数，无返回值的方法。必须要用@Test注解标记
@Test
public void testLoginName(){
    UserService userService = new UserService();
    String rs = userService.loginName("admin1","123456");
    // 进行预期结果的正确性测试：断言。结果正确不输出，结果错误会输出异常
    Assert.assertEquals("您的登录业务可能出现问题", "登录成功", rs );
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101640272.png" alt="image-20230110164037171" style="zoom:80%;" />

## 常用注解

其实用处不多

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101641046.png" alt="image-20230110164102947" style="zoom: 67%;" />

- 开始执行的方法:初始化资源。
- 执行完之后的方法:释放资源。

Junit5中把@Before和@After等改成@BeforeAll和@AfterAll，作用是相同的

```java
public class TestUserService {

    // 修饰实例方法的
    @Before
    public void before(){
        System.out.println("===before方法执行一次===");
    }

    @After
    public void after(){
        System.out.println("===after方法执行一次===");
    }

    // 修饰静态方法
    @BeforeClass
    public static void beforeClass(){
        System.out.println("===beforeClass方法执行一次===");
    }

    @AfterClass
    public static void afterClass(){
        System.out.println("===afterClass方法执行一次===");
    }

}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101643507.png" alt="image-20230110164312423" style="zoom:80%;" />

# 反射

[Java反射是什么？看这篇绝对会了！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486739&idx=2&sn=a8b848f33267ed989d50b83b3b143fa3&chksm=fc2fb11bcb58380d9e153e76688e8f609d13be2d359bd1ce35f0cd4a800dff11fb723a78b7fa&mpshare=1&scene=23&srcid=0812Ait0rCuSr6bH29oMVXyp&sharer_sharetime=1660273034281&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 概述

### 反射概述

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101644212.png" alt="image-20230110164455117" style="zoom:67%;" />

### 反射的关键

> - 反射的第一步都是先得到编译后的Class类对象，然后就可以得到Class的全部成分。
> - **反射的核心思想和关键就是:得到编译以后的class文件对象。**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101644206.png" alt="image-20230110164426123" style="zoom: 67%;" />

## 获取类的对象

反射的第一步：获取Class类的对象，如此才可以解析类的全部成分

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051930866.png" alt="image-20211020144058701" style="zoom: 80%;" />

获取Class类对象的三种方式

- 方式一：Class c1 = Class.forName(“全类名，就是相对路径全名，从src开始”);
- 方式二：Class c2 = 类名.class     (重要，最简单的方式)
- 方式三：Class c3 = 对象.getClass();

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101650618.png" alt="image-20230110165034483" style="zoom:67%;" />

```java
public class Test {
    public static void main(String[] args) throws Exception {
        // 1、Class类中的一个静态方法：forName(全限名：包名 + 类名)
        Class c = Class.forName("com.itheima.d2_reflect_class.Student");
        System.out.println(c); // Student.class

        // 2、类名.class
        Class c1 = Student.class;
        System.out.println(c1);

        // 3、对象.getClass() 获取对象对应类的Class对象。
        Student s = new Student();
        Class c2 = s.getClass();
        System.out.println(c2);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101652589.png" alt="image-20230110165226509" style="zoom:67%;" />

## 获取对象详细操作

### 获取构造器对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051932396.png" alt="image-20220605193255335" style="zoom:80%;" />

实体类

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Student {
    private String name;
    private int age;
}
```

#### 获取构造器对象并使用⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101700364.png" alt="image-20230110170004218" style="zoom:67%;" />

```java
@Test
public void test2(){
    // a.第一步：获取类对象
    Class<Student> c = Student.class;
    // b.提取类中的全部的构造器对象(这里只能拿public修饰)
    // Constructor[] constructors = c.getConstructors();
    // b.提取类中的全部的构造器对象
    Constructor<?>[] constructors = c.getDeclaredConstructors();
    // b.定位单个构造器对象 (按照参数定位无参数构造器 只能拿public修饰的某个构造器)
    // Constructor cons = c.getConstructor();
    
    //构造方法getParameterCount()来判定参数为多少
    for (Constructor constructor:constructors){
        //无参和有参构造方法
        System.out.println(constructor.getName()+"====="+constructor.getParameterCount());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206052153931.png" alt="image-20220605215304881" style="zoom:80%;" />

获取构造器的作用依然是初始化一个对象返回

#### 用于创建对象的方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101712041.png" alt="image-20230110171242940" style="zoom:67%;" />

```java
public class TestStudent02 {
    // 1.调用构造器得到一个类的对象返回。
    @Test
    public void getDeclaredConstructor() throws Exception {
        // a.第一步：获取类对象
        Class c = Student.class;
        // b.定位单个构造器对象 (按照参数定位无参数构造器)
        Constructor cons = c.getDeclaredConstructor();
        System.out.println(cons.getName() + "===>" + cons.getParameterCount());

        // 如果遇到了私有的构造器，可以暴力反射
        cons.setAccessible(true); // 权限被打开

        Student s = (Student) cons.newInstance();
        System.out.println(s);

        System.out.println("-------------------");

        // c.定位某个有参构造器
        Constructor cons1 = c.getDeclaredConstructor(String.class, int.class);
        System.out.println(cons1.getName() + "===>" + cons1.getParameterCount());

        Student s1 = (Student) cons1.newInstance("孙悟空", 1000);
        System.out.println(s1);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101708335.png" alt="image-20230110170837240" style="zoom:67%;" />



### 获取成员变量

#### API 简介

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101713425.png" alt="image-20230110171343295" style="zoom:67%;" />

获取成员变量的作用依然是在某个对象中取值、赋值

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051938881.png" alt="image-20220605193850837" style="zoom: 67%;" />

#### 实体类

```java
public class Student {
    private String name;
    private int age;
    public static String schoolName;
    public static final String  COUNTTRY = "中国";

    public Student(){
        System.out.println("无参数构造器执行！");
    }

    public Student(String name, int age) {
        System.out.println("有参数构造器执行！");
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

#### 获取全部的成员变量

```java
/**
 * 1.获取全部的成员变量。
 * Field[] getDeclaredFields();
 *  获得所有的成员变量对应的Field对象，只要申明了就可以得到
 */
@Test
public void getDeclaredFields(){
    // a.定位Class对象
    Class c = Student.class;
    // b.定位全部成员变量
    Field[] fields = c.getDeclaredFields();
    // c.遍历一下
    for (Field field : fields) {
        System.out.println(field.getName() + "==>" + field.getType());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101728017.png" alt="image-20230110172846926" style="zoom:67%;" />

#### 获取某个成员变量对象

```java
// 2.获取某个成员变量对象 Field getDeclaredField(String name);
@Test
public void getDeclaredField() throws Exception {
    // a.定位Class对象
    Class c = Student.class;
    // b.根据名称定位某个成员变量
    Field f = c.getDeclaredField("age");
    System.out.println(f.getName() +"===>" + f.getType());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101729734.png" alt="image-20230110172932648" style="zoom:80%;" />

#### 赋值和取值

```java
@Test
public void setField() throws Exception {
    // a.反射第一步，获取类对象
    Class c = Student.class;
    // b.提取某个成员变量
    Field ageF = c.getDeclaredField("age");

    ageF.setAccessible(true); // 暴力打开权限

    // c.赋值
    Student s = new Student();
    ageF.set(s , 18);  // s.setAge(18);
    System.out.println(s);

    // d、取值
    int age = (int) ageF.get(s);
    System.out.println(age);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101730548.png" alt="image-20230110173034460" style="zoom:67%;" />

### 获取方法对象

#### API 简介

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101715715.png" alt="image-20230110171526575" style="zoom:67%;" />

获取成员方法的作用依然是在某个对象中进行执行此方法，Method类中用于触发执行的方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051946788.png" alt="image-20220605194608737" style="zoom: 67%;" />

#### 实体类

```java
public class Dog {
    private String name ;
    public Dog(){
    }

    public Dog(String name) {
        this.name = name;
    }

    public void run(){
        System.out.println("狗跑的贼快~~");
    }

    private void eat(){
        System.out.println("狗吃骨头");
    }

    private String eat(String name){
        System.out.println("狗吃" + name);
        return "吃的很开心！";
    }

    public static void inAddr(){
        System.out.println("在黑马学习Java!");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

#### 获得类中的所有成员方法对象

```java
@Test
public void getDeclaredMethods(){
    // a.获取类对象
    Class c = Dog.class;
    // b.提取全部方法；包括私有的
    Method[] methods = c.getDeclaredMethods();
    // c.遍历全部方法
    for (Method method : methods) {
        System.out.println(method.getName() +" 返回值类型：" + method.getReturnType() + 
                           " 参数个数：" + method.getParameterCount());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101725643.png" alt="image-20230110172544545" style="zoom:67%;" />

#### 获取某个方法对象

```java
@Test
public void getDeclardMethod() throws Exception {
    // a.获取类对象
    Class c = Dog.class;
    // b.提取单个方法对象
    Method m = c.getDeclaredMethod("eat");
    Method m2 = c.getDeclaredMethod("eat", String.class);

    // 暴力打开权限了
    m.setAccessible(true);
    m2.setAccessible(true);

    // c.触发方法的执行
    Dog d = new Dog();
    // 注意：方法如果是没有结果回来的，那么返回的是null.
    Object result = m.invoke(d);
    System.out.println(result);

    Object result2 = m2.invoke(d, "骨头");
    System.out.println(result2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101726032.png" alt="image-20230110172638946" style="zoom:67%;" />

## 反射案例：绕过编译阶段为集合添加数据

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101734407.png" alt="image-20230110173450244" style="zoom:67%;" />

```java
public class ReflectDemo {
    public static void main(String[] args) throws Exception {
        // 需求：反射实现泛型擦除后，加入其他类型的元素
        ArrayList<String> lists1 = new ArrayList<>();
        ArrayList<Integer> lists2 = new ArrayList<>();

        System.out.println(lists1.getClass());
        System.out.println(lists2.getClass());
        System.out.println(lists1.getClass() ==  lists2.getClass());  // ArrayList.class

        System.out.println("---------------------------");
        ArrayList<Integer> lists3 = new ArrayList<>();
        lists3.add(23);
        lists3.add(22);
        // lists3.add("黑马");

        Class c = lists3.getClass(); // ArrayList.class  ===> public boolean add(E e)
        // 定位c类中的add方法，类型定义为Object
        Method add = c.getDeclaredMethod("add", Object.class);
        boolean rs = (boolean) add.invoke(lists3, "黑马"); // 执行add方法添加元素
        System.out.println(rs);
        System.out.println(lists3);
        // 此时泛型已经被擦除
        ArrayList list4 = lists3;
        list4.add("白马");
        list4.add(false);
        System.out.println(lists3);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101741479.png" alt="image-20230110174125386" style="zoom:67%;" />

## 反射做通用框架

- 可以在运行时得到一个类的全部成分然后操作。
- 可以破坏封装性。（很突出）
- 也可以破坏泛型的约束性。（很突出）
- 更重要的用途是适合：做Java高级框架
- 基本上主流框架都会基于反射设计一些通用技术功能。

需求：给你任意一个对象，在不清楚对象字段的情况可以，可以把对象的字段名称和对应值存储到文件中去。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206051948804.png" alt="image-20220605194810729" style="zoom:80%;" />

### 流程分析

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101745848.png" alt="image-20230110174508732" style="zoom: 50%;" />

### 实体类

```java
public class Student {
    private String name;
    private char sex;
    private int age;
    private String className;
    private String hobby;

    public Student(){

    }

    public Student(String name, char sex, int age, String className, String hobby) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.className = className;
        this.hobby = hobby;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }
}
```

```java
public class Teacher {
    private String name;
    private char sex;
    private double salary;

    public Teacher(){

    }

    public Teacher(String name, char sex, double salary) {
        this.name = name;
        this.sex = sex;
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
```

### MybatisUtil 工具类

```java
public class MybatisUtil {
    // 保存任意类型的对象
    public static void save(Object obj){
        try (
            PrintStream ps = new PrintStream(new FileOutputStream("data.txt", true));){
            // 1、提取这个对象的全部成员变量：只有反射可以解决
            Class c = obj.getClass();  
            //   c.getSimpleName()获取当前类名   c.getName获取全限名：包名+类名
            ps.println("================" + c.getSimpleName() + "================");

            // 2、提取它的全部成员变量
            Field[] fields = c.getDeclaredFields();
            // 3、获取成员变量的信息
            for (Field field : fields) {
                String name = field.getName();
                // 提取本成员变量在obj对象中的值（取值）
                field.setAccessible(true);
                String value = field.get(obj) + "";
                ps.println(name  + "=" + value);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 测试

```java
// 目标：提供一个通用框架，支持保存所有对象的具体信息。
public class ReflectDemo {
    public static void main(String[] args) throws Exception {
        Student s = new Student();
        s.setName("猪八戒");
        s.setClassName("西天跑路1班");
        s.setAge(1000);
        s.setHobby("吃，睡");
        s.setSex('男');
        MybatisUtil.save(s);

        Teacher t = new Teacher();
        t.setName("波仔");
        t.setSex('男');
        t.setSalary(6000);
        MybatisUtil.save(t);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101802522.png" alt="image-20230110180218413" style="zoom:50%;" />

# 注解

[基础篇：谈谈JAVA注解机制 (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg3NzU5NTIwNg==&mid=2247488075&idx=1&sn=5212e7fde570d900451b75c8fa600e0e&chksm=cf21cd62f85644740469b462bb838cd50a7924848d4abd1d81f82bf718824d1a91d171efa34a&mpshare=1&scene=23&srcid=07185gVt5Tz5vkSCkDtazTjJ&sharer_sharetime=1658118856752&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 概述和作用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101803110.png" alt="image-20230110180319976" style="zoom:67%;" />

## 自定义注解

### 声明格式

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301101804696.png" alt="image-20230110180429585" style="zoom:50%;" />

### 特殊属性

就是说注解内只有一个参数，则使用注解时不用写参数名，否则要写参数名。

> - value属性，如果只有一个value属性的情况下，使用value属性的时候可以省略value名称不写!!
> - 但是如果有多个属性,  且多个属性没有默认值，那么value名称是不能省略的。

```java
public @interface Book {
    String value(); // 特殊属性
    double price() ;
    // double price() default 9.9;
}
```

```java
@Book(value = "/delete") // 不可以
@Book("/delete") // 不可以
@Book(value = "/delete", price = 23.5) // 可以
```

### 实现案例

```java
public @interface MyBook {
    String name();
    String[] authors();
    double price();
}
```

```java
//注解可以加在任意上，类上，方法，参数，都可以
@MyBook(name="《精通JavaSE》",authors = {"黑马", "dlei"} , price = 199.5)
public class AnnotationDemo1 {

    @MyBook(name="《精通JavaSE2》",authors = {"黑马", "dlei"} , price = 199.5)
    private AnnotationDemo1(){

    }

    @MyBook(name="《精通JavaSE1》",authors = {"黑马", "dlei"} , price = 199.5)
    public static void main(String[] args) {
        @MyBook(name="《精通JavaSE2》",authors = {"黑马", "dlei"} , price = 199.5)
        int age = 21;
    }
}
```

## 元注解

元注解：就是放在自定义注解上的注解。

**让给程序员开发自定义注解的元注解（和关键字@interface配合使用的注解）**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207201530232.png" alt="image-20220720153045156" style="zoom:80%;" />

### @Target

@Target中可使用的值定义在ElementType枚举类中，常用值如下

-  TYPE，类，接口
-  FIELD, 成员变量
-  METHOD, 成员方法
-  PARAMETER, 方法参数
-  CONSTRUCTOR, 构造器
-  LOCAL_VARIABLE, 局部变量

```java
@Target({ElementType.METHOD,ElementType.FIELD}) // 元注解，只能用于方法和变量上
@Retention(RetentionPolicy.RUNTIME) // 一直活着，在运行阶段这个注解也不消失
public @interface MyTest {
}
```

```java
public class AnnotationDemo2 {

    @MyTest
    private String name;

    @MyTest
    public void test(){

    }
    
    public static void main(String[] args) {

    }
}
```

### @Retention

@Retention中可使用的值定义在RetentionPolicy枚举类中，常用值如下

-  SOURCE： 注解只作用在源码阶段，生成的字节码文件中不存在
-  CLASS：  注解作用在源码阶段，字节码文件阶段，运行阶段不存在，默认值
-  RUNTIME：注解作用在源码阶段，字节码文件阶段，运行阶段（开发常用）

```java
//使用注解
@MyBook(name = "<<你好>>",authors = "{heima,asd}",price = 123.3)
public class demo1 {

}
//自定义注解
@Target({ElementType.FIELD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME) //运行阶段不消失
@interface MyBook {
    String name();
    String []authors();
    double price();
}
```



## 注解解析

### 注解解析方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102135604.png" alt="image-20230110213548407" style="zoom:80%;" />

### 解析注解的技巧

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102136469.png" alt="image-20230110213628348" style="zoom:67%;" />

### 注解解析示例⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102147141.png" alt="image-20230110214731001" style="zoom: 50%;" />

#### 定义注解

```java
@Target({ElementType.TYPE,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Bookk {
    String value();
    double price() default 100;
    String[] author();
}
```

#### 使用注解

```java
@Bookk(value = "《情深深雨濛濛》", price = 99.9, author = {"琼瑶", "dlei"})
class BookStore{

    @Bookk(value = "《三少爷的剑》", price = 399.9, author = {"古龙", "熊耀华"})
    public void test(){
    }
}
```

#### 解析注解

```java
@Test
public void parseClass(){
    // a.先得到类对象
    Class c = BookStore.class;
    // b.判断这个类上面是否存在这个注解
    if(c.isAnnotationPresent(Bookk.class)){
        //c.直接获取该注解对象
        Bookk book = (Bookk) c.getDeclaredAnnotation(Bookk.class);
        System.out.println(book.value());
        System.out.println(book.price());
        System.out.println(Arrays.toString(book.author()));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102144585.png" alt="image-20230110214425491" style="zoom:67%;" />

```java
@Test
public void parseMethod() throws NoSuchMethodException {
    // a.先得到类对象
    Class c = BookStore.class;
    //获取方法上(获取方法上注解才需要写它)
    Method m = c.getDeclaredMethod("test");

    // b.判断这个类上面是否存在这个注解
    if(m.isAnnotationPresent(Bookk.class)){
        //c.直接获取该注解对象
        Bookk book = (Bookk) m.getDeclaredAnnotation(Bookk.class);
        System.out.println(book.value());
        System.out.println(book.price());
        System.out.println(Arrays.toString(book.author()));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102145081.png" alt="image-20230110214506988" style="zoom: 67%;" />

## 模拟Junit框架

定义若干个方法，只要加了MyTest注解，就可以在启动时被触发执行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102149268.png" alt="image-20230110214937151" style="zoom:67%;" />

### 定义注解

```java
@Target({ElementType.TYPE,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyTest {
}
```

### 测试加启动

```java
public class Demo3 {

    @MyTest
    public void test1(){
        System.out.println("test1`====");
    }

    public void test2(){
        System.out.println("test2`====");
    }

    @MyTest
    public void test3(){
        System.out.println("test3`====");
    }

    public static void main(String[] args) throws Exception {
        //创建对象才能调用该类方法
        Demo3 t = new Demo3();
        //获取类对象
        Class<Demo3> c = Demo3.class;
        //获取该类的所有方法
        Method[] methods = c.getDeclaredMethods();
        //遍历方法，看是否有注解，有就跑它
        for (Method method:methods){
            if (method.isAnnotationPresent(MyTest.class)){
                method.invoke(t);
            }
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102151749.png" alt="image-20230110215115646" style="zoom:80%;" />

# 动态代理

## 底层原理

> 代理就是被代理者没有能力或者不愿意去完成某件事情，需要找个人代替自己去完成这件事，动态代理就是用来对业务功能（方法）进行代理的。
>

## 关键步骤

> 必须有接口，实现类要实现接口（代理通常是基于接口实现的）。创建一个实现类的对象，该对象为业务对象，紧接着为业务对象做一个代理对象。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102154432.png" alt="image-20230110215448315" style="zoom:67%;" />

## 代理案例⭐

### 接口

```java
// 模拟用户业务功能
public interface UserService {
    String login(String loginName , String passWord) ;
    void selectUsers();
    boolean deleteUsers();
    void updateUsers();
}
```

### 实现类

```java
public class UserServiceImpl implements UserService{
    @Override
    public String login(String loginName, String passWord)  {
        try {
            Thread.sleep(1000);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if("admin".equals(loginName) && "1234".equals(passWord)) {
            return "success";
        }
        return "登录名和密码可能有毛病";

    }

    @Override
    public void selectUsers() {
        System.out.println("查询了100个用户数据！");
        try {
            Thread.sleep(2000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean deleteUsers() {
        try {
            System.out.println("删除100个用户数据！");
            Thread.sleep(500);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void updateUsers() {
        try {
            System.out.println("修改100个用户数据！");
            Thread.sleep(2500);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 代理类

```java
/**
    public static Object newProxyInstance(ClassLoader loader,  
                         Class<?>[] interfaces, InvocationHandler h)
    参数一：类加载器，负责加载代理类到内存中使用。
    参数二：获取被代理对象实现的全部接口。代理要为全部接口的全部方法进行代理
    参数三：代理的核心处理逻辑
 */
public class ProxyUtil {
    // 生成业务对象的代理对象
    public static <T> T getProxy(T obj) {
        // 返回了一个代理对象了
        return (T)Proxy.newProxyInstance(obj.getClass().getClassLoader(),
                obj.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws 
                        Throwable {
                        // 参数一：代理对象本身。一般不管
                        // 参数二：正在被代理的方法
                        // 参数三：被代理方法，应该传入的参数
                       long startTimer = System .currentTimeMillis();
                        // 马上触发方法的真正执行。(触发真正的业务功能)
                        Object result = method.invoke(obj, args);

                        long endTimer = System.currentTimeMillis();
                        System.out.println(method.getName() + "方法耗时：" + 
                                          (endTimer - startTimer) / 1000.0 + "s");
                        // 把业务功能方法执行的结果返回给调用者
                        return result;
           }
        });
    }
}
```

### 测试类

```java
public class Test {
    public static void main(String[] args) {
        // 1、把业务对象，直接做成一个代理对象返回，代理对象的类型也是 UserService类型
        UserService userService = ProxyUtil.getProxy(new UserServiceImpl());
        System.out.println(userService.login("admin", "1234"));
        System.out.println(userService.deleteUsers());
        userService.selectUsers();
        userService.updateUsers(); // 走代理
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102200779.png" alt="image-20230110220054672" style="zoom: 67%;" />

## 动态代理的优点

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301102153559.png" alt="image-20230110215338410" style="zoom: 50%;" />





## 后续学习目标



# 日志框架

**想清楚的知道一个系统运行的过程和详情怎么办？**

- 生活中的日志： 生活中的日志就好比日记，可以记录你生活的点点滴滴。

- 程序中的日志： 程序中的日志可以用来记录程序运行过程中的信息，并可以进行永久存储。

## 日志优势

### 以前记录日志方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071425533.png" alt="image-20220607142508446" style="zoom: 67%;" />

### 日志技术具备的优势

- 可以将系统执行的信息选择性的记录到指定的位置（控制台、文件中、数据库中）
- 可以随时以开关的形式控制是否记录日志，无需修改源代码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071426334.png" alt="image-20220607142627262" style="zoom:80%;" />



## 日志体系结构

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111124576.png" alt="image-20230111112448455" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111124778.png" alt="image-20230111112411671" style="zoom:67%;" />

## Logback日志框架

官网：https://logback.qos.ch/index.html

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111127087.png" alt="image-20230111112752907" style="zoom:67%;" />

## Logback快速入门⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111131614.png" alt="image-20230111113124462" style="zoom: 50%;" />



## Logback 配置详解

### 输出位置、格式设置

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111137928.png" alt="image-20230111113735769" style="zoom:67%;" />



### 日志级别设置

> 如果系统上线后只想记录一些错误的日志信息或者不想记录日志了，怎么办？可以通过设置日志的输出级别来控制哪些日志信息输出或者不输出
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111140771.png" alt="image-20230111114034636" style="zoom:67%;" />



## Logback 基础配置⭐

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- CONSOLE ：表示当前的日志信息是可以输出到控制台的 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--输出流对象 默认 System.out 改为 System.err-->
        <target>System.out</target>
        <encoder>
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度
                %msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%-5level]  %c [%thread] : %msg%n</pattern>
        </encoder>
    </appender>

    <!-- File是输出的方向通向文件的 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - 
                %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <!--日志输出路径-->
        <file>C:/code/itheima-data.log</file>
        <!--指定日志文件拆分和压缩规则-->
        <rollingPolicy
                class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--通过指定压缩文件名称，来确定分割文件方式-->
            <fileNamePattern>C:/code/itheima-data2-%d{yyyy-MM-dd}.log%i.gz</fileNamePattern>
            <!--文件拆分大小-->
            <maxFileSize>1MB</maxFileSize>
        </rollingPolicy>
    </appender>

    <!--
    level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR|ALL 和 OFF， 默认debug
    <root>可以包含零个或多个<appender-ref>元素，标识这个输出位置将会被本日志级别控制。
    -->
    <root level="ALL">
        <!-- 注意：如果这里不配置关联打印位置，该位置将不会记录日志-->
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

# 阶段项目实战⭐

## 商品管理系统功能演示

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111149239.png" alt="image-20230111114900075" style="zoom:67%;" />

## 技术点分析

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111149034.png" alt="image-20230111114940888" style="zoom:67%;" />

## 日志框架搭建、系统对象设计

logback.xml就是上面的Logback基础配置里的内容

### 实体类详解

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111206737.png" alt="image-20230111120659617" style="zoom:67%;" />

### 用户类

```java
// 用户类（客户和商家的父类 ）
public class User {
    private String loginName;  // 假名  不能重复
    private String userName; // 真名
    private String passWord;
    private char sex;
    private String phone;
    private double money;
    // 省略了基础方法
}
```

### 店铺类

```java
public class Business extends User{
    // 店铺名称
    private String shopName;
    // 店铺地址
    private String address;
    // 省略了基础方法
}
```

### 客户角色

```java
public class Customer extends User{
    // 定义一个属性存储购买记录。
    private Map<String, Boolean> buyMovies = new HashMap<>();

    public Map<String, Boolean> getBuyMovies() {
        return buyMovies;
    }

    public void setBuyMovies(Map<String, Boolean> buyMovies) {
        this.buyMovies = buyMovies;
    }
}
```

### 电影

```java
public class Movie {
    private String name;
    private String actor;
    private double time;
    private double price;
    private int number; // 余票
    private Date startTime; // 放映时间

    public Movie() {
    }

    public Movie(String name, String actor, double time, double price, int number, 
                 Date startTime) {
        this.name = name;
        this.actor = actor;
        this.time = time;
        this.price = price;
        this.number = number;
        this.startTime = startTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public double getScore() {
        List<Double> scores = MovieSystem.MOVIES_SCORE.get(name);
        if(scores!=null && scores.size() > 0){
            double sum = 0;
            for (Double score : scores) {
                sum += score;
            }
            return BigDecimal.valueOf(sum)
                             .divide(BigDecimal.valueOf(scores.size()), 2 , RoundingMode.UP)
                             .doubleValue();
        }else {
            return 0;
        }
    }


    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
}
```

## 容器定义和数据准备

```java
public class MovieSystem {
    // 1、定义系统的数据容器用户存储数据，存储很多用户（客户对象，商家对象）
    public static final List<User> ALL_USERS = new ArrayList<>();
    // 2、存储系统全部商家和其排片信息，商家1 = [p1,p2,p3,...]，商家2 = [p2,p3,...] ...
    public static final Map<Business, List<Movie>> ALL_MOVIES = new HashMap<>();

    public static final Scanner SYS_SC = new Scanner(System.in);

    // 定义一个静态的User类型的变量记住当前登录成功的用户对象
    public static User loginUser;
    public static SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    public static final Logger LOGGER = LoggerFactory.getLogger("MovieSystem.class");

    // 3、准备一些测试数据
    static {
        // 定义用户
        Customer c = new Customer();
        c.setLoginName("zyf888");
        c.setPassWord("123456");
        c.setUserName("黑马刘德华");
        c.setSex('男');
        c.setMoney(10000);
        c.setPhone("110110");
        ALL_USERS.add(c);

        Customer c1 = new Customer();
        c1.setLoginName("gzl888");
        c1.setPassWord("123456");
        c1.setUserName("黑马关之琳");
        c1.setSex('女');
        c1.setMoney(2000);
        c1.setPhone("111111");
        ALL_USERS.add(c1);
	    // 定义商家
        Business b = new Business();
        b.setLoginName("baozugong888");
        b.setPassWord("123456");
        b.setUserName("黑马包租公");
        b.setMoney(0);
        b.setSex('男');
        b.setPhone("110110");
        b.setAddress("火星6号2B二层");
        b.setShopName("甜甜圈国际影城");
        ALL_USERS.add(b);
        // 注意，商家一定需要加入到店铺排片信息中去
        List<Movie> movies = new ArrayList<>();
        ALL_MOVIES.put(b , movies); // b = []

        Business b2 = new Business();
        b2.setLoginName("baozupo888");
        b2.setPassWord("123456");
        b2.setUserName("黑马包租婆");
        b2.setMoney(0);
        b2.setSex('女');
        b2.setPhone("110110");
        b2.setAddress("火星8号8B八层");
        b2.setShopName("巧克力国际影城");
        ALL_USERS.add(b2);
        // 注意，商家一定需要加入到店铺排片信息中去
        List<Movie> movies3 = new ArrayList<>();
        ALL_MOVIES.put(b2 , movies3); // b2 = []
    }
}
```

## 首页、登录、商家界面、用户界面

![image-20230111122558835](https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111226752.png)

### 首页

```java
private static void showMain() {
    while (true) {
        System.out.println("===============黑马电影首页=================");
        System.out.println("1、登录");
        System.out.println("2、用户注册");
        System.out.println("3、商家注册");
        System.out.println("请输入操作命令：");
        String command = SYS_SC.nextLine();
        switch (command) {
            case "1":
                // 登录了
                login();
                break;
            case "2":
                break;
            case "3":
                break;
            default:
                System.out.println("命令有误，请确认！");
        }
    }
}
```

### 登录功能

```java
private static void login() {
    while (true) {
        System.out.println("请您输入登录名称：");
        String loginName = SYS_SC.nextLine();
        System.out.println("请您输入登录密码：");
        String passWord = SYS_SC.nextLine();

        // 1、根据登录名称查询用户对象。
        User u = getUserByLoginName(loginName);
        // 2、判断用户对象是否存在，存在说明登录名称正确了
        if(u != null){
            // 3、比对密码是否正确
            if(u.getPassWord().equals(passWord)){
                // 登录成功了：...
                loginUser = u; // 记住登录成功的用户
                LOGGER.info(u.getUserName() +"登录了系统~~~");
                // 判断是用户登录的，还是商家登录的。
                if(u instanceof Customer) {
                    // 当前登录的是普通用户
                    showCustomerMain();
                }else {
                    // 当前登录的肯定是商家用户
                    showBusinessMain();
                }
                return;
            }else {
                System.out.println("密码有毛病~~");
            }
        }else {
            System.out.println("登录名称错误，请确认");
        }
    }
}
```

```java
public static User getUserByLoginName(String loginName){
    for (User user : ALL_USERS) {
        // 判断这个用户的登录名称是否是我们想要的
        if(user.getLoginName().equals(loginName)){
            return user;
        }
    }
    return null; // 查询此用户登录名称
}
```

### 用户界面

```java
private static void showCustomerMain() {
    while (true) {
        System.out.println("============黑马电影客户界面===================");
        System.out.println(loginUser.getUserName() + 
                          (loginUser.getSex()=='男'? "先生":"女士" + "欢迎您进入系统" +
                           "\t余额：" + loginUser.getMoney()));
        System.out.println("请您选择要操作的功能：");
        System.out.println("1、展示全部影片信息功能:");
        System.out.println("2、根据电影名称查询电影信息:");
        System.out.println("3、评分功能:");
        System.out.println("4、购票功能:");
        System.out.println("5、退出系统:");
        System.out.println("请输入您要操作的命令：");
        String command = SYS_SC.nextLine();
        switch (command){
            case "1":
                // 展示全部排片信息
                showAllMovies();
                break;
            case "2":
                break;
            case "3":
                // 评分功能
                scoreMovie();
                showAllMovies();
                break;
            case "4":
                // 购票功能
                buyMovie();
                break;
            case "5":
                return; // 干掉方法
            default:
                System.out.println("不存在该命令！！");
                break;
        }
    }
}
```

### 商家界面

```java
private static void showBusinessMain() {
    while (true) {
        System.out.println("============黑马电影商家界面===================");
        System.out.println(loginUser.getUserName() + 
                          (loginUser.getSex()=='男'? "先生":"女士" + "欢迎您进入系统"));
        System.out.println("1、展示详情:");
        System.out.println("2、上架电影:");
        System.out.println("3、下架电影:");
        System.out.println("4、修改电影:");
        System.out.println("5、退出:");

        System.out.println("请输入您要操作的命令：");
        String command = SYS_SC.nextLine();
        switch (command){
            case "1":
                // 展示全部排片信息
                showBusinessInfos();
                break;
            case "2":
                // 上架电影信息
                addMovie();
                break;
            case "3":
                // 下架电影信息
                deleteMovie();
                break;
            case "4":
                // 修改电影信息
                updateMovie();
                break;
            case "5":
                System.out.println(loginUser.getUserName() +"请您下次再来啊~~~");
                return; // 干掉方法
            default:
                System.out.println("不存在该命令！！");
                break;
        }
    }
}
```



## 商家功能

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111243170.png" alt="image-20230111124317045" style="zoom:67%;" />

### 展示详情

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111248915.png" alt="image-20230111124844795" style="zoom:67%;" />

```java
// 展示商家的详细：展示当前商家的信息。
private static void showBusinessInfos() {
    System.out.println("================商家详情界面=================");
    LOGGER.info(loginUser.getUserName() +"商家，正在看自己的详情~~~");
    // 根据商家对象(就是登录的用户loginUser)，作为Map集合的键 
    // 提取对应的值就是其排片信息 ：Map<Business , List<Movie>> ALL_MOVIES
    Business business = (Business) loginUser;
    System.out.println(business.getShopName() + "\t\t电话：" + business.getPhone()
            + "\t\t地址:" + business.getAddress() + "\t\t余额：" + business.getMoney());
    List<Movie> movies = ALL_MOVIES.get(business);
    if(movies.size() > 0) {
        System.out.println("片名\t\t\t主演\t\t时长\t\t评分\t\t票价\t\t余票数量\t\t放映时间");
        for (Movie movie : movies) {
            System.out.println(movie.getName()+"\t\t\t" + movie.getActor()+ 
                               "\t\t" + movie.getTime()
                    + "\t\t" + movie.getScore() + "\t\t" + movie.getPrice() + 
                               "\t\t" + movie.getNumber() + "\t\t"
                    +   sdf.format(movie.getStartTime()));
        }
    }else {
        System.out.println("您的店铺当前无片在放映~~~~");
    }
}
```

```java
public static User getUserByLoginName(String loginName){
    for (User user : ALL_USERS) {
        // 判断这个用户的登录名称是否是我们想要的
        if(user.getLoginName().equals(loginName)){
            return user;
        }
    }
    return null; // 查询此用户登录名称
}
```

```java
public static Movie getMovieByShopAndName(Business business , String name){
    List<Movie> movies = ALL_MOVIES.get(business);
    for (Movie movie : movies) {
        if(movie.getName().contains(name)){
            return movie;
        }
    }
    return null;
}
```

```java
// 根据商家店铺名称查询商家对象
public static Business getBusinessByShopName(String shopName){
    Set<Business> businesses = ALL_MOVIES.keySet();
    for (Business business : businesses) {
        if(business.getShopName().equals(shopName)){
            return  business;
        }
    }
    return null;
}
```

### 商品上架

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111158603.png" alt="image-20230111115817507" style="zoom:60%;" />

```java
/**
  商家进行电影上架
 Map<Business , List<Movie>> ALL_MOVIES
 u1 = [p1,p2,p3]
 u2 = [p1,p2,p3]
 */
private static void addMovie() {
    System.out.println("================上架电影====================");
    // 根据商家对象(就是登录的用户loginUser)，作为Map集合的键 
    // 提取对应的值就是其排片信息 ：Map<Business , List<Movie>> ALL_MOVIES
    Business business = (Business) loginUser;
    List<Movie> movies = ALL_MOVIES.get(business);

    System.out.println("请您输入新片名：");
    String name  = SYS_SC.nextLine();
    System.out.println("请您输入主演：");
    String actor  = SYS_SC.nextLine();
    System.out.println("请您输入时长：");
    String time  = SYS_SC.nextLine();
    System.out.println("请您输入票价：");
    String price  = SYS_SC.nextLine();
    System.out.println("请您输入票数：");
    String totalNumber  = SYS_SC.nextLine(); // 200\n
    while (true) {
        try {
            System.out.println("请您输入影片放映时间：");
            String stime  = SYS_SC.nextLine();
            // public Movie(String name, String actor, double time,
            //              double price, int number, Date startTime)       
            // 封装成电影对象 ，加入集合movices中去
            Movie movie = new Movie(name, actor ,Double.valueOf(time) , Double.valueOf(price)
                    , Integer.valueOf(totalNumber) ,  sdf.parse(stime));
            movies.add(movie);
            System.out.println("您已经成功上架了：《" + movie.getName() + "》");
            return; // 直接退出去
        } catch (ParseException e) {
            e.printStackTrace();
            LOGGER.error("时间解析出了毛病");
        }
    }
}
```

### 商家退出



### 商品修改

```java
private static void updateMovie() {
    System.out.println("================修改电影====================");
    Business business = (Business) loginUser;
    List<Movie> movies = ALL_MOVIES.get(business);

    if(movies.size() == 0) {
        System.out.println("当期无片可以修改~~");
        return;
    }

    // 2、让用户选择需要下架的电影名称
    while (true) {
        System.out.println("请您输入需要修改的电影名称：");
        String movieName = SYS_SC.nextLine();

        // 3、去查询有没有这个影片对象。
        Movie movie = getMovieByName(movieName);
        if(movie != null){
            // 修改它
            System.out.println("请您输入修改后的片名：");
            String name  = SYS_SC.nextLine();
            System.out.println("请您输入修改后主演：");
            String actor  = SYS_SC.nextLine();
            System.out.println("请您输入修改后时长：");
            String time  = SYS_SC.nextLine();
            System.out.println("请您输入修改后票价：");
            String price  = SYS_SC.nextLine();
            System.out.println("请您输入修改后票数：");
            String totalNumber  = SYS_SC.nextLine(); // 200\n
            while (true) {
                try {
                    System.out.println("请您输入修改后的影片放映时间：");
                    String stime  = SYS_SC.nextLine();

                    movie.setName(name);
                    movie.setActor(actor);
                    movie.setPrice(Double.valueOf(price));
                    movie.setTime(Double.valueOf(time));
                    movie.setNumber(Integer.valueOf(totalNumber));
                    movie.setStartTime(sdf.parse(stime));

                    System.out.println("恭喜您，您成功修改了该影片了！！！");
                    showBusinessInfos();
                    return; // 直接退出去
                } catch (Exception e) {
                    e.printStackTrace();
                    LOGGER.error("时间解析出了毛病");
                }
            }
        }else {
            System.out.println("您的店铺没有上架该影片！");
            System.out.println("请问继续修改吗？y/n");
            String command = SYS_SC.nextLine();
            switch (command) {
                case "y":
                    break;
                default:
                    System.out.println("好的！");
                    return;
            }
        }
    }
}
```

### 商品下架

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111158384.png" alt="image-20230111115852292" style="zoom:60%;" />

```java
private static void deleteMovie() {
    System.out.println("================下架电影====================");
    Business business = (Business) loginUser;
    List<Movie> movies = ALL_MOVIES.get(business);
    if(movies.size() == 0) {
        System.out.println("当期无片可以下架~~");
        return;
    }

    // 2、让用户选择需要下架的电影名称
    while (true) {
        System.out.println("请您输入需要下架的电影名称：");
        String movieName = SYS_SC.nextLine();

        // 3、去查询有没有这个影片对象。
        Movie movie = getMovieByName(movieName);
        if(movie != null){
            // 下架它
            movies.remove(movie);
            System.out.println("您当前店铺已经成功下架了：" + movie.getName());
            showBusinessInfos();
            return;
        }else {
            System.out.println("您的店铺没有上架该影片！");
            System.out.println("请问继续下架吗？y/n");
            String command = SYS_SC.nextLine();
            switch (command) {
                case "y":
                    break;
                default:
                    System.out.println("好的！");
                    return;
            }
        }
    }
}
```

### 电影评分

```java
private static void scoreMovie() {
    // 1、查询当前登录成功的用户历史购买记录，看哪些电影是它可以评分的。
    Customer c = (Customer) loginUser;
    Map<String, Boolean> movies = c.getBuyMovies();
    if(movies.size() == 0 ){
        System.out.println("当前您没有看过电影，不能评价！");
        return;
    }

    // 买过了 ，看哪些电影是它可以评分的。
    movies.forEach((name, flag) -> {
        if(flag){
            System.out.println(name +"此电影已评价");
        }else {
            System.out.println("请您对：" + name +"进行打分（0-10）：");
            double score = Double.valueOf(SYS_SC.nextLine());

            // 先根据电影名称拿到评分数据
            List<Double> scores = MOVIES_SCORE.get(name); // MOVIES_SCORE = [名称=[10] , ...]
            if(scores == null){
                // 说明此电影是第一次评价
                scores = new ArrayList<>();
                scores.add(score);
                MOVIES_SCORE.put(name , scores);
            }else {
                scores.add(score);
            }
            movies.put(name, true);
        }
    });
}
```



## 用户购票

```java
private static void buyMovie() {
    showAllMovies();
    System.out.println("=============用户购票功能=================");
    while (true) {
        System.out.println("请您输入需要买票的门店：");
        String shopName = SYS_SC.nextLine();
        // 1、查询是否存在该商家。
        Business business = getBusinessByShopName(shopName);
        if(business == null){
            System.out.println("对不起，没有该店铺！请确认");
        }else {
            // 2、此商家全部的排片
            List<Movie> movies = ALL_MOVIES.get(business);
            // 3、判断是否存在上映的电影
            if(movies.size() > 0) {
                // 4、开始进行选片购买
                while (true) {
                    System.out.println("请您输入需要购买电影名称：");
                    String movieName = SYS_SC.nextLine();
                    // 去当前商家下，查询该电影对象。
                    Movie movie = getMovieByShopAndName(business, movieName);
                    if(movie != null){
                        // 开始购买
                        while (true) {
                            System.out.println("请您输入要购买的电影票数：");
                            String number = SYS_SC.nextLine();
                            int buyNumber = Integer.valueOf(number);
                            // 判断电影是否购票
                            if(movie.getNumber() >= buyNumber){
                                // 可以购买了
                                // 当前需要花费的金额
                                double money = BigDecimal.valueOf(movie.getPrice())
                                    .multiply(BigDecimal.valueOf(buyNumber))
                                        .doubleValue();
                                if(loginUser.getMoney() >= money){
                                    // 终于可以买票了
                                    System.out.println("您成功购买了"+ movie.getName() + 
                                                       buyNumber +
                                             "张票！总金额是：" + money);
                                    // 更新自己的金额 更新商家的金额
                                    loginUser.setMoney(loginUser.getMoney() - money);
                                    business.setMoney(business.getMoney() + money);
                                    movie.setNumber(movie.getNumber() -  buyNumber);

                                    Customer c = (Customer) loginUser;
                                    // 记录购买电影的信息
                                    // 第一个参数是购买的电影，第二个参数是没有评价的标记！
                                    c.getBuyMovies().put(movie.getName(), false);

                                    return;// 结束方法
                                }else {
                                    // 钱不够！
                                    System.out.println("是否继续~~");
                                    System.out.println("是否继续买票？y/n");
                                    String command = SYS_SC.nextLine();
                                    switch (command) {
                                        case "y":
                                            break;
                                        default:
                                            System.out.println("好的！");
                                            return;
                                    }
                                }
                            }else {
                                // 票数不够
                                System.out.println("您当前最多可以购买：" + movie.getNumber());
                                System.out.println("是否继续买票？y/n");
                                String command = SYS_SC.nextLine();
                                switch (command) {
                                    case "y":
                                        break;
                                    default:
                                        System.out.println("好的！");
                                        return;
                                }
                            }
                        }

                    }else {
                        System.out.println("电影名称有毛病~~");
                    }
                }

            }else {
                System.out.println("该电影院关门了~~~");
                System.out.println("是否继续买票？y/n");
                String command = SYS_SC.nextLine();
                switch (command) {
                    case "y":
                        break;
                    default:
                        System.out.println("好的！");
                        return;
                }
            }
        }
    }
}
```

# XML解析

## XML概述

> XML是可扩展标记语言（eXtensible Markup Language）的缩写，它是是一种数据表示格式，可以描述非常复杂的数据结构，常用于传输和存储数据。
>

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301110954957.png" alt="image-20230111095400857" style="zoom:67%;" />

XML的几个特点和使用场景

> - 一是纯文本，默认使用UTF-8编码；二是可嵌套
> - 如果把XML内容存为文件，那么它就是一个XML文件
> - XML的使用场景：XML内容经常被当成消息进行网络传输，或者作为配置文件用于存储系统的信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081032185.png" alt="image-20220608103231099" style="zoom:80%;" />



## XML创建和语法规则

就是创建一个XML类型的文件，`要求文件的后缀必须使用xml`，如hello_world.xml

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081033996.png" alt="image-20220608103339928" style="zoom:80%;" />

- XML文件的后缀名为：xml
- 文档声明必须是第一行

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081034810.png" alt="image-20220608103420755" style="zoom:80%;" />



## XML的标签(元素)规则

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301110958856.png" alt="image-20230111095816751" style="zoom:80%;" />

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- 注释：根标签有且仅能有一个 -->
<student> <!-- 标签必须成对出现 -->
    <name>女儿国王</name>
    <sex>女</sex>
    <hobby>唐僧，追唐僧</hobby>
    <info>
        <age>30</age>
        <addr>女儿国</addr>
    </info>
    <sql>
        <!-- >、<等用如下替换 -->
        select * from user where age &lt; 18;
        select * from user where age &lt; 18;
        select * from user where age &lt; 18 &amp;&amp; age &gt; 10
        <!-- 不想写特殊字符，用CDATA包裹 -->
        <![CDATA[
                select * from user where age < 18
        ]]>
    </sql>
</student>
```

## XML的其他组成

- XML文件中可以定义注释信息：`<!-- 注释内容 -->`
- XML文件中可以存在以下特殊字符
- XML文件中可以存在CDATA区: `<![CDATA[  …内容… ]]>`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081037988.png" alt="image-20220608103703933"  />

## 文档约束

> 问题：**由于XML文件可以自定义标签，导致XML文件可以随意定义，程序在解析的时候可能出现问题**。文档约束：是用来限定xml文件中的标签以及属性应该怎么写。以此强制约束程序员必须按照文档约束的规定来编写xml文件。，有DTD和schema两种约束
>

### DTD约束

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111003125.png" alt="image-20230111100331028" style="zoom: 50%;" />

```xml-dtd
<!-- data.dtd -->
<!ELEMENT 书架 (书+)>
<!ELEMENT 书 (书名,作者,售价)>
<!ELEMENT 书名 (#PCDATA)>
<!ELEMENT 作者 (#PCDATA)>
<!ELEMENT 售价 (#PCDATA)>
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE 书架 SYSTEM "data.dtd">
<书架>
    <书>
        <书名>精通JavaSE加强</书名>
        <作者>dlei</作者>
        <售价>很贵</售价>
    </书>
    <书>
        <书名></书名>
        <作者></作者>
        <售价></售价>
    </书>
    <书>
        <书名></书名>
        <作者></作者>
        <售价></售价>
    </书>
</书架>
```

### schema约束

- schema可以约束具体的数据类型，约束能力上更强大
- schema本身也是一个xml文件，本身也受到其他约束文件的要求，所以编写的更加严谨

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081058214.png" alt="image-20220608105826146" style="zoom:80%;" />

编写schema约束文档，后缀必须是.xsd，具体的形式到代码中观看

```xml-dtd
<!-- data.xsd -->
<?xml version="1.0" encoding="UTF-8" ?>
<schema xmlns="http://www.w3.org/2001/XMLSchema"
        targetNamespace="http://www.itcast.cn"
        elementFormDefault="qualified" >
    <!-- targetNamespace:申明约束文档的地址（命名空间）-->
    <element name='书架'>
        <!-- 写子元素 -->
        <complexType>
            <!-- maxOccurs='unbounded': 书架下的子元素可以有任意多个！-->
            <sequence maxOccurs='unbounded'>
                <element name='书'>
                    <!-- 写子元素 -->
                    <complexType>
                        <sequence>
                            <element name='书名' type='string'/>
                            <element name='作者' type='string'/>
                            <element name='售价' type='double'/>
                        </sequence>
                    </complexType>
                </element>
            </sequence>
        </complexType>
    </element>
</schema>
```

在需要编写的XML文件中导入该schema约束文档

按照约束内容编写XML文件的标签

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<书架 xmlns="http://www.itcast.cn"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.itcast.cn data.xsd">
    <!-- xmlns="http://www.itcast.cn"  基本位置
         xsi:schemaLocation="http://www.itcast.cn books02.xsd" 具体的位置 -->
    <书>
        <书名>神雕侠侣</书名>
        <作者>金庸</作者>
        <售价>399.9</售价>
    </书>
    <书>
        <书名>神雕侠侣</书名>
        <作者>金庸</作者>
        <售价>19.5</售价>
    </书>

</书架>
```



## XML解析技术

XML的数据的作用是什么，最终需要怎么处理？

- 存储数据、做配置信息、进行数据传输
- 最终需要被程序进行读取，解析里面的信息

### DOM常见的解析工具

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111014057.png" alt="image-20230111101415926" style="zoom:67%;" />

### DOM解析解析文档对象模型

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111016409.png" alt="image-20230111101611327" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111015625.png" alt="image-20230111101553492" style="zoom:80%;" />



## Dom4j 解析XML

### Jar包使用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111016284.png" alt="image-20230111101656194" style="zoom: 50%;" />

### 得到Document对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111018739.png" alt="image-20230111101804622" style="zoom:50%;" />

### 解析XML的元素属性和文本

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111019345.png" alt="image-20230111101939205" style="zoom:67%;" />

### 使用示例⭐

Contacts.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<contactList>
    <contact id="1" vip="true">
        <name>   潘金莲  </name>
        <gender>女</gender>
        <email>panpan@itcast.cn</email>
    </contact>
    <contact id="2" vip="false">
        <name>武松</name>
        <gender>男</gender>
        <email>wusong@itcast.cn</email>
    </contact>
    <contact id="3" vip="false">
        <name>武大狼</name>
        <gender>男</gender>
        <email>wuda@itcast.cn</email>
    </contact>
    <user>
    </user>
</contactList>
```

```java
@Test
public void parseXMLData() throws Exception {
    // 1、创建一个Dom4j的解析器对象，代表了整个dom4j框架
    SAXReader saxReader = new SAXReader();

    // 2、把XML文件加载到内存中成为一个Document文档对象
    //    需要通过模块名去定位
    // Document document = saxReader.read(new File("xml-app\\src\\Contacts.xml")); 
    // Document document = saxReader.read(new FileInputStream("xml-app\\src\\Contacts.xml"));

    // 注意: getResourceAsStream中的/是直接去src下寻找的文件
    InputStream is = Dom4JHelloWorldDemo1.class.getResourceAsStream("/Contacts.xml");
    Document document = saxReader.read(is);

    // 3、获取根元素对象
    Element root = document.getRootElement();
    System.out.println(root.getName());

    // 4、拿根元素下的全部子元素对象(一级)
    // List<Element> sonEles =  root.elements();
    List<Element> sonEles =  root.elements("contact");
    for (Element sonEle : sonEles) {
        System.out.println(sonEle.getName());
    }

    // 拿某个子元素
    Element userEle = root.element("user");
    System.out.println(userEle.getName());

    // 默认提取第一个子元素对象 (Java语言)
    Element contact = root.element("contact");
    // 获取子元素文本
    System.out.println(contact.elementText("name"));
    // 去掉前后空格
    System.out.println(contact.elementTextTrim("name"));
    // 获取当前元素下的子元素对象
    Element email = contact.element("email");
    System.out.println(email.getText());
    // 去掉前后空格
    System.out.println(email.getTextTrim());

    // 根据元素获取属性值
    Attribute idAttr = contact.attribute("id");
    System.out.println(idAttr.getName() + "-->" + idAttr.getValue());
    // 直接提取属性值
    System.out.println(contact.attributeValue("id"));
    System.out.println(contact.attributeValue("vip"));

}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081107494.png" alt="image-20220608110723436" style="zoom:80%;" />

### 案例实战

> 利用Dom4J的知识，将Contact.xml文件中的联系人数据封装成List集合，其中每个元素是实体类Contact。打印输出 List 中的每个元素。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111023482.png" alt="image-20230111102333320" style="zoom:67%;" />

```java
public class Contact {
    private String name;
    private int id;
    private boolean vip;
    private char gender;
    private String email;

    public Contact() {
    }

    public Contact(String name, int id, boolean vip, char gendar, String email) {
        this.name = name;
        this.id = id;
        this.vip = vip;
        this.gender = gendar;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isVip() {
        return vip;
    }

    public void setVip(boolean vip) {
        this.vip = vip;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "name='" + name + '\'' +
                ", id=" + id +
                ", vip=" + vip +
                ", gendar=" + gender +
                ", email='" + email + '\'' +
                '}';
    }
}
```

使用的是上面的xml

```java
@Test
public void parseToList() throws Exception {
    // 需求：解析XML中的数据成为一个List集合对象。
    // 1、导入框架（做过）
    // 2、创建SaxReader对象
    SAXReader saxReader = new SAXReader();
    // 3、加载XML文件成为文档对象Document对象。
    Document document =
            saxReader.read(Dom4JTest2.class.getResourceAsStream("/Contacts.xml"));
    // 4、先拿根元素
    Element root = document.getRootElement();
    // 5、提取contact子元素
    List<Element> contactEles = root.elements("contact");
    // 6、准备一个ArrayList集合封装联系人信息
    List<Contact> contacts = new ArrayList<>();
    // 7、遍历Contact子元素
    for (Element contactEle : contactEles) {
        // 8、每个子元素都是一个联系人对象
        Contact contact = new Contact();
        contact.setId(Integer.parseInt(contactEle.attributeValue("id")));
        contact.setVip(Boolean.parseBoolean(contactEle.attributeValue("vip")));
        contact.setName(contactEle.elementTextTrim("name"));
        contact.setGender(contactEle.elementTextTrim("gender").charAt(0));
        contact.setEmail(contactEle.elementText("email"));
        // 9、把联系人对象数据加入到List集合
        // 报错不用管
        contacts.add(contact);
    }
    // 10、遍历List集合
    for (Contact contact : contacts) {
        System.out.println(contact);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081110186.png" alt="image-20220608111043129" style="zoom:80%;" />



## XML检索技术：Xpath

如果需要从XML文件中检索需要的某个信息（如name）怎么解决？

> Dom4J可以用于解析整个XML的数据。但是如果要检索XML中的某些信息，建议使用XPath.（Xpath依赖Dom4j技术）。Dom4J用于解析数据，Xpath用于检索数据。

- **Dom4j**需要进行文件的全部解析，然后再寻找数据。
- **Xpath技术更加适合做信息检索**

### 使用步骤

> 导入dom4j框架。（XPath依赖于Dom4j技术,必须先导入dom4j框架！）
>
> 导入XPath独有的框架包。jaxen-1.1.2.jar

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111026504.png" alt="image-20230111102611386" style="zoom: 50%;" />

### Xpath的四大检索方案

```xml
1.绝对路径： /根元素/子元素/子元素。
2.相对路径： ./子元素/子元素。 (.代表了当前元素)
3.全文搜索：
       //元素  在全文找这个元素
       //元素1/元素2  在全文找元素1下面的一级元素2
       //元素1//元素2  在全文找元素1下面的全部元素2
4.属性查找
       //@属性名称  在全文检索属性对象。
       //元素[@属性名称]  在全文检索包含该属性的元素对象。
       //元素[@属性名称=值]  在全文检索包含该属性的元素且属性值为该值的元素对象。
```

#### Contacts2.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<contactList>
    <contact id="1" vip="true">
        <name>   潘金莲  </name>
        <gender>女</gender>
        <email>panpan@itcast.cn</email>
    </contact>
    <contact id="2" vip="false">
        <name>武松</name>
        <gender>男</gender>
        <email>wusong@itcast.cn</email>
    </contact>
    <contact id="3" vip="false">
        <name>武大狼</name>
        <gender>男</gender>
        <email>wuda@itcast.cn</email>
    </contact>
    <user>
        <contact>
            <info>
                <name id="888">我是西门庆</name>
            </info>
         </contact>
    </user>
</contactList>
```

#### 绝对路径

采用绝对路径获取从根节点开始逐层的查找/contactList/contact/name节点列表并打印信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081114480.png" alt="image-20220608111403422" style="zoom:80%;" />

```java
// 1.绝对路径: /根元素/子元素/子元素。
@Test
public void parse01() throws Exception {
    // a、创建解析器对象
    SAXReader saxReader = new SAXReader();
    // b、把XML加载成Document文档对象
    Document document =
            saxReader.read(XPathDemo.class.getResourceAsStream("/Contacts2.xml"));
    // c、检索全部的名称
    List<Node> nameNodes = document.selectNodes("/contactList/contact/name");
    for (Node nameNode : nameNodes) {
        Element  nameEle = (Element) nameNode;
        System.out.println(nameEle.getTextTrim());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081205020.png" alt="image-20220608120533956" style="zoom:80%;" />

#### 相对路径

- 先得到根节点contactList
- 再采用相对路径获取下一级contact 节点的name子节点并打印信息

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081114684.png" alt="image-20220608111426625" style="zoom:80%;" />

```java
/**
 2.相对路径： ./子元素/子元素。 (.代表了当前元素)
 */
@Test
public void parse02() throws Exception {
    // a、创建解析器对象
    SAXReader saxReader = new SAXReader();
    // b、把XML加载成Document文档对象
    Document document =
            saxReader.read(XPathDemo.class.getResourceAsStream("/Contacts2.xml"));
    Element root = document.getRootElement(); // 得到根节点
    // c、检索全部的名称
    List<Node> nameNodes = root.selectNodes("./contact/name");
    for (Node nameNode : nameNodes) {
        Element  nameEle = (Element) nameNode;
        System.out.println(nameEle.getTextTrim());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081206517.png" alt="image-20220608120657457" style="zoom:80%;" />

#### 全文检索

直接全文搜索所有的name元素并打印

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081114288.png" alt="image-20220608111443228" style="zoom:80%;" />

```java
/**
 3.全文搜索：
 //元素  在全文找这个元素
 //元素1/元素2  在全文找元素1下面的一级元素2
 //元素1//元素2  在全文找元素1下面的全部元素2
 */
@Test
public void parse03() throws Exception {
    // a、创建解析器对象
    SAXReader saxReader = new SAXReader();
    // b、把XML加载成Document文档对象
    Document document =
            saxReader.read(XPathDemo.class.getResourceAsStream("/Contacts2.xml"));
    // c、检索数据
    //List<Node> nameNodes = document.selectNodes("//name");
    // List<Node> nameNodes = document.selectNodes("//contact/name");
    List<Node> nameNodes = document.selectNodes("//contact//name");
    for (Node nameNode : nameNodes) {
        Element  nameEle = (Element) nameNode;
        System.out.println(nameEle.getTextTrim());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081247633.png" alt="image-20220608124741577" style="zoom:80%;" />

#### 属性查找

`在全文中搜索属性，或者带属性的元素`

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081115104.png" alt="image-20220608111504041" style="zoom:80%;" />

```JAVA
/**
     4.属性查找。
     //@属性名称  在全文检索属性对象。
     //元素[@属性名称]  在全文检索包含该属性的元素对象。
     //元素[@属性名称=值]  在全文检索包含该属性的元素且属性值为该值的元素对象。
     */
    @Test
    public void parse04() throws Exception {
        // a、创建解析器对象
        SAXReader saxReader = new SAXReader();
        // b、把XML加载成Document文档对象
        Document document =
                saxReader.read(XPathDemo.class.getResourceAsStream("/Contacts2.xml"));
        // c、检索数据
        List<Node> nodes = document.selectNodes("//@id");
        for (Node node : nodes) {
            Attribute attr = (Attribute) node;
            System.out.println(attr.getName() + "===>" + attr.getValue());
        }

        // 查询name元素（包含id属性的）
//      Node node = document.selectSingleNode("//name[@id]");
        Node node = document.selectSingleNode("//name[@id=888]");
        Element ele = (Element) node;
        System.out.println(ele.getTextTrim());
    }
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206081248889.png" alt="image-20220608124818829" style="zoom:80%;" />



# 工厂模式 & 装饰模式

## 工厂模式

### 什么是工厂模式

> 之前我们创建类对象时, 都是使用new 对象的形式创建,在很多业务场景下也提供了不直接new的方式 。
>
> 工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一， 这种类型的设计模式属于创建型模式，它提供了一种获取对象的方式。

### 工厂模式作用

> 工厂的方法可以封装对象的创建细节，比如：为该对象进行加工和数据注入。
>
> 可以实现类与类之间的解耦操作（核心思想）。工厂模式的思想是提供一个工厂方法返回对象！

### 工厂模式演示

#### 定义抽象类和实现类

```java
public abstract class Computer {
    private String name;
    private double price;
	// 定义start抽象方法
    public abstract void start();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
```

```java
public class Huawei extends Computer{
    @Override
    public void start() {
        System.out.println(getName() + "开机了，展示了华为的菊花图标~~~~");
    }
}
```

```java
public class Mac extends Computer{
    @Override
    public void start() {
        System.out.println(getName() + "以非常优雅的方法启动了，展示了一个苹果logo");
    }
}
```

#### 定义工厂方法

```java
public class FactoryPattern {
    // 定义一个方法，创建对象返回
    public static Computer createComputer(String info){
        switch (info){
            case "huawei":
                Computer c = new Huawei();
                c.setName("huawei pro 16");
                c.setPrice(5999);
                return c;
            case "mac":
                Computer c2 = new Mac();
                c2.setName("MacBook pro");
                c2.setPrice(11999);
                return c2;
            default:
                return null;
        }
    }
}
```

### 测试实现

```java
public class FactoryDemo {
    public static void main(String[] args) {
        Computer c1 = FactoryPattern.createComputer("huawei");
        c1.start();

        Computer c2 = FactoryPattern.createComputer("mac");
        c2.start();
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111054310.png" alt="image-20230111105455215" style="zoom:67%;" />

## 装饰模式

> 创建一个新类，包装原始类，从而在新类中提升原来类的功能。

### 装饰模式作用

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111046124.png" alt="image-20230111104609014" style="zoom:67%;" />

### 装饰模式演示

#### 共同父类

```java
public abstract class InputStream {
    public abstract int read();
    public abstract int read(byte[] buffer);
}
```

#### 原始类

```java
public class FileInputStream extends InputStream{
    @Override
    public int read() {
        System.out.println("低性能的方式读取了一个字节a");
        return 97;
    }

    @Override
    public int read(byte[] buffer) {
        buffer[0] = 97;
        buffer[1] = 98;
        buffer[2] = 99;
        System.out.println("低性能的方式读取了一个字节数组：" + Arrays.toString(buffer));
        return 3;
    }
}
```

#### 装饰类

```java
// 装饰类：继承InputStream 拓展原始类的功能
public class BufferedInputStream extends InputStream{
    private InputStream is;
    public BufferedInputStream(InputStream is){
        this.is = is;
    }
    @Override
    public int read() {
        System.out.println("提供8KB的缓冲区，提高读数据性能~~~~");
        return is.read();
    }

    @Override
    public int read(byte[] buffer) {
        System.out.println("提供8KB的缓冲区，提高读数据性能~~~~");
        return is.read(buffer);
    }
}
```

#### 测试实现

```java
/**
  装饰模式
    定义父类：InputStream
    定义实现类：FileInputStream 继续父类 定义功能
    定义装饰实现类：BufferedInputStream 继承父类 定义功能 包装原始类，增强功能。
 */
public class DecoratorPattern {
    public static void main(String[] args) {
        InputStream is = new BufferedInputStream(new FileInputStream());
        System.out.println(is.read());
        System.out.println(is.read(new byte[3]));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301111118178.png" alt="image-20230111111830080" style="zoom:67%;" />

# 内存溢出

作为程序员，多多少少都会遇到一些内存溢出的场景，如果你还没遇到，说明你工作的年限可能比较短，或者你根本就是个假程序员！哈哈，开个玩笑。今天，我们就以 Java 代码的方式来列举几个典型的内存溢出案例，希望大家在日常工作中，尽量避免写这些 low 水平的代码。我们先来看看今天要介绍哪些内存溢出案例，如下所示。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.2.30/202301211826179.png" alt="image-20230121182620072" style="zoom: 50%;" />

## 定义主类结构

首先，我们创建一个名称为 BlowUpJVM 的类，之后所有的案例实验都是基于这个类进行，如下所示。

```java
public class BlowUpJVM {  
} 
```

## 栈深度溢出

```java
public static void  testStackOverFlow(){ 
      BlowUpJVM.testStackOverFlow(); 
} 
```

栈不断递归，而且没有处理，所以虚拟机栈就不断深入不断深入，栈深度就这样溢出了。

## 永久代内存溢出

```java
public static void testPergemOutOfMemory1(){ 
   //方法一失败 
   List<String> list = new ArrayList<String>(); 
   while(true){ 
      list.add(UUID.randomUUID().toString().intern()); 
   } 
} 
```

打算把 String 常量池堆满，没想到失败了，JDK1.7 后常量池放到了堆里，也能进行垃圾回收了。

然后换种方式，使用 cglib，用 Class 把老年代堆满。

```java
public static void testPergemOutOfMemory2(){ 
   try { 
      while (true) { 
         Enhancer enhancer = new Enhancer(); 
         enhancer.setSuperclass(OOM.class); 
         enhancer.setUseCache(false); 
         enhancer.setCallback(new MethodInterceptor() { 
            @Override 
            public Object intercept(Object obj, Method method, Object[] args, 
                                    MethodProxy proxy) throws Throwable { 
               return proxy.invokeSuper(obj, args); 
            } 
         }); 
         enhancer.create(); 
      } 
   } 
   catch (Exception e){ 
      e.printStackTrace(); 
   } 
} 
```

虚拟机成功内存溢出了，那 JDK 动态代理产生的类能不能溢出呢？

```java
public static void testPergemOutOfMemory3(){ 
   while(true){ 
   final OOM oom = new OOM(); 
   Proxy.newProxyInstance(oom.getClass().getClassLoader(), oom.getClass().getInterfaces(), 
                          new InvocationHandler() { 
         public Object invoke(Object proxy, Method method, Object[] args) throws Throwable { 
            Object result = method.invoke(oom, args); 
            return result; 
         } 
      }); 
   } 
} 
```

事实表明，JDK 动态代理产生的类不会造成内存溢出，原因是：JDK 动态代理产生的类信息，不会放到永久代中，而是放在堆中。

## 本地方法栈溢出

```java
public static void testNativeMethodOutOfMemory(){ 
   int j = 0; 
   while(true){ 
      Printer.println(j++); 
      ExecutorService executors = Executors.newFixedThreadPool(50); 
      int i=0; 
      while(i++<10){ 
         executors.submit(new Runnable() { 
            public void run() { 
            } 
         }); 
      } 
   } 
} 
```

这个的原理就是不断创建线程池，而每个线程池都创建 10 个线程，这些线程池都是在本地方法区的，久而久之，本地方法区就溢出了。

## JVM栈内存溢出

```java
public static void testStackOutOfMemory(){ 
    while (true) {   
            Thread thread = new Thread(new Runnable() {   
                   public void run() { 
                          while(true){ 
                      } 
                   }   
            });   
            thread.start();   
     }   
} 
```

线程的创建会直接在 JVM 栈中创建，但是本例子中，没看到内存溢出，主机先挂了，不是 JVM 挂了，真的是主机挂了，无论在 mac 还是在 windows，都挂了。

**温馨提示，这个真的会死机的。**

## 堆溢出

```java
public static void testOutOfHeapMemory(){ 
   List<StringBuffer> list = new ArrayList<StringBuffer>(); 
   while(true){ 
      StringBuffer B = new StringBuffer(); 
      for(int i = 0 ; i < 10000 ; i++){ 
         B.append(i); 
      } 
      list.add(B); 
   } 
} 
```

不断往堆中塞新增的 StringBuffer 对象，堆满了就直接溢出了。



# JDK 常用的内置命令

了解这些命令后会在死锁、CPU 占用过高问题的排查、程序性能调优上会有很大的帮助，以后还会介绍 JDK 自带的图形化工具以及 CPU 占用过高的排查实例。

## javap

使用 `javap` 可以查看 Java 字节码反编译的源文件，`javap` 的命令格式如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221555627.png" alt="image-20220822155521484" style="zoom:67%;" />

下面来演示下用 `javap -c` 对代码进行反编译，首先写个 `HelloWorld` 类，如下：

```java
public class HelloWorld {
    public static void main(String []args) {
       System.out.println("Hello World");
    }
}
```

接着使用 `javap -c HelloWorld.class` 就可以反编译得到结果



## jps

`jps` 是用来查询当前所有进程 pid 的，命令的用法如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221556596.png" alt="image-20220822155604491" style="zoom:67%;" />

执行 `jps` 可以获取本机 Java 程序的 pid，运行结果如下：

```
[root@wupx ~]# jps
8825 spring-boot-0.0.1-SNAPSHOT.jar
```

使用 `jps -mlvV` 可以获取到这个进程的 pid、jar 包的名字以及 JVM 参数等。

```
[root@wupx ~]# jps -mlvV
8825 /root/spring-boot-0.0.1-SNAPSHOT.jar --server.port=8090 --logging.file=/root/log/spring-boot.log -Xmx1024m -Xms1024m
```

## jstat

`jstat` 主要用于监控 JVM，主要是 GC 信息，在性能优化的时候经常用到，命令内容如下所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221600528.png" alt="image-20220822160047392" style="zoom:80%;" />

比如，上面我们通过 `jps` 查到的进程号 8825，我们使用 `jstat -gc 8825` 来查看该进程的 GC 信息：

```
jstat -gc 8825
```

其中 `S0C` 表示当前 `Survivor0` 的容量，`S1C` 表示当前 `Survivor1` 的容量，`S0U` 表示当前 `Survivor0` 的利用率，`S1U` 表示当前 `Survivor1` 的利用率，`EC` 表示 Eden 的容量，`EU` 表示 Eden 的利用率，`OC` 表示老年代的容量，`OU` 表示老年代的利用率，`MC` 表示 Metaspace 的容量，`MU` 表示 Metaspace 的利用率，`CCSC` 表示类指针压缩空间容量，`CCSU` 表示使用的类指针压缩空间，`YGC` 表示新生代 GC 的次数，`YGCT` 表示新生代 GC 的时间，`FGC` 表示 Full Gc 的次数，`FGCT` 表示 Full GC 的时间，`GCT` 表示 GC 总时间。

> 每个对象都有一个指向它自身类的指针，_klass: 指向类的 4 字节指针，64 位平台上 _klass: 指向类的 8 字节的指针，为了节约这些空间，引入了类指针压缩空间。

## jcmd

`jcmd` 可以查看 JVM 信息，常用的命令内容如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221600778.png" alt="image-20220822160027667" style="zoom:80%;" />

先使用 `jcmd 8825 help` 来查看都支持什么命令：

```
[root@wupx ~]# jcmd 8825 help
8825:
The following commands are available:
JFR.stop
JFR.start
JFR.dump
JFR.check
VM.native_memory
VM.check_commercial_features
VM.unlock_commercial_features
ManagementAgent.stop
ManagementAgent.start_local
ManagementAgent.start
VM.classloader_stats
GC.rotate_log
Thread.print
GC.class_stats
GC.class_histogram
GC.heap_dump
GC.finalizer_info
GC.heap_info
GC.run_finalization
GC.run
VM.uptime
VM.dynlibs
VM.flags
VM.system_properties
VM.command_line
VM.version
help
```

下面我就选一个参数给大家举个例子，比如打印堆的信息，使用 `jcmd 8825 GC.heap_dump` 命令：

```c
jcmd 8825 GC.heap_info
```

可以看出可以获取新生代、老年代、元空间、Eden、From Survivor 以及 To Survivor 的大小和占比。

## jmap

`jmap` 打印出 Java 进程内存中 Object 的情况，或者将 JVM 中的堆以二进制输出成文本，命令内容如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221559267.png" alt="image-20220822155929155" style="zoom:67%;" />

使用 `jmap -heap 8825` 查看当前堆的使用信息：

```
[root@wupx ~]# jmap -heap 8825
Attaching to process ID 8825, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.201-b09

using thread-local object allocation.
Parallel GC with 10 thread(s)

Heap Configuration:
   MinHeapFreeRatio         = 0
   MaxHeapFreeRatio         = 100
   MaxHeapSize              = 8575254528 (8178.0MB)
   NewSize                  = 178782208 (170.5MB)
   MaxNewSize               = 2858418176 (2726.0MB)
   OldSize                  = 358088704 (341.5MB)
   NewRatio                 = 2
   SurvivorRatio            = 8
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 0 (0.0MB)

Heap Usage:
PS Young Generation
Eden Space:
   capacity = 624427008 (595.5MB)
   used     = 32083672 (30.597373962402344MB)
   free     = 592343336 (564.9026260375977MB)
   5.138098062536078% used
From Space:
   capacity = 19398656 (18.5MB)
   used     = 15687272 (14.960548400878906MB)
   free     = 3711384 (3.5394515991210938MB)
   80.86782919394004% used
To Space:
   capacity = 20447232 (19.5MB)
   used     = 0 (0.0MB)
   free     = 20447232 (19.5MB)
   0.0% used
PS Old Generation
   capacity = 256901120 (245.0MB)
   used     = 22278496 (21.246429443359375MB)
   free     = 234622624 (223.75357055664062MB)
   8.672012017697703% used

24741 interned Strings occupying 2987512 bytes.
```

首先会打印**堆的一些相关配置**，比如最大新生代、元空间的大小等；下面为**堆的使用情况**，包括新生代的 Eden 区、S0 区、S1 区以及老年代。

`jmap` 还可以将堆的信息以文件的形式保存下来，相当于文件快照，执行 `jmap -dump:live,format=b,file=heap.bin 8825` 命令：

```
[root@wupx ~]# jmap -dump:live,format=b,file=heap.bin 8825
Dumping heap to /root/heap.bin ...
Heap dump file created
```

这个 `heap.bin` 可以使用 `jhat` 命令打开，是以 html 的形式展示的。

## jhat

`jhat` 分析 Java 堆的命令，可以将堆中对象以 `html` 的形式显示出来，支持对象查询语言 OQL，命令内容如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221558519.png" alt="image-20220822155823378" style="zoom:67%;" />

现在执行 `jhat -port 9999 heap.bin` 来将刚刚保存的 `heap.bin` 以 html 展示出来：

```
[root@wupx ~]# jhat -port 9999 heap.bin
Reading from heap.bin...
Dump file created Tue May 12 22:31:55 CST 2020
Snapshot read, resolving...
Resolving 570997 objects...
Chasing references, expect 114 dots..................................................................................................................
Eliminating duplicate references..................................................................................................................
Snapshot resolved.
Started HTTP server on port 9999
Server is ready.
```

执行完毕后，打开 `:9999/` 就可以看到类的实例的堆占用情况，它是按照包名来分组的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/PkPSxQkjY4HOia1L91ro4b04oSuZWf4tAO1CMbD6wNnWWAfIKLb6RJz8IKgVtrUTGfGMDaq4aY27GV9A4L4CRCA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

网页的底部还有许多 Query 方式：

![图片](https://mmbiz.qpic.cn/mmbiz_png/PkPSxQkjY4HOia1L91ro4b04oSuZWf4tAYUiaSxsAe4rWHOonWm1bUia97FBsibfDGib3SuVOEzWN7BiaCqicG14VrZYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

下面以 OQL 为例，打开后是一个类似 SQL 查询的窗口，比如输入 `select s from java.lang.String s where s.value.length >= 100` 就可以查询字符串长度大于 100 的实例：

![图片](https://mmbiz.qpic.cn/mmbiz_png/PkPSxQkjY4HOia1L91ro4b04oSuZWf4tAzQw8FdroHyPcadEcbia80NPJETw02gc4y5cvROV4BxH0xD1tKEcuSyw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## jstack

`jstack` 是**堆栈跟踪工具**，主要用于打印给定进程 pid 的堆栈信息，一般在发生死锁或者 CPU 100% 的时候排查问题使用，可以去查询当前运行的线程以及线程的堆栈信息是什么情况，命令内容如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208221557844.png" alt="image-20220822155756746" style="zoom:67%;" />

下面执行 `jstack -F 8825 > jstack.log` 命令，将线程的信息保存下来：

因为内容比较多，截取了部分内容，可以看出会打印出线程的信息、状态以及堆栈，也会打印出 GC Task 的线程信息（ParallelGC 属于并行收集器，默认为 2 个线程），从中可以分析出每个线程都在做什么，如果服务器 CPU 占用高，可以看有多少个线程处于 `RUNNABLE` 状态，一般是由于处于 `RUNNABLE` 状态的线程过多，导致 CPU 过高；如果很多线程处于 `TIMED_WAITING` 状态，理论上 CPU 占用不会很高。





































