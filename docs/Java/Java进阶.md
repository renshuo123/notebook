







# 日期和时间

## JDK8之前的日期

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206012123164.png" alt="image-20220601212353047" style="zoom:80%;" />

### Date

#### 输出时间

```java
Date date =new Date();
System.out.println(date); //Tue Oct 12 15:58:57 CST 2021
```

#### 传入时间

```java
long d = 1000*60*60;
Date date1 = new Date(d);
System.out.println(date1); //Thu Jan 01 09:00:00 CST 1970
```

#### 获取毫秒值

指的是从1970年1月1日   00:00:00走到此刻的总的毫秒数，应该是很大的

```java
Date d1 =new Date();
System.out.println(d1.getTime());//1634026020671
long l = System.currentTimeMillis(); //1634026088648
```

#### 时间计算

```java
// 2、当前时间往后走 1小时  121s
long time2 = System.currentTimeMillis();
time2 += (60 * 60 + 121) * 1000; // *1000是因为毫秒要转换成秒

// 3、把时间毫秒值转换成对应的日期对象。
Date d2 = new Date(time2);
System.out.println(d2);
```



### SimpleDateFormat

> - 可以对Date对象或时间毫秒值**格式化**成我们喜欢的时间形式。
> - 也可以把字符串的时间形式**解析**成日期对象。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052136086.png" alt="image-20230105213652973" style="zoom:67%;" />



#### 语法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052137525.png" alt="image-20230105213743435" style="zoom: 50%;" />



<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052138439.png" alt="image-20230105213835363" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052139670.png" alt="image-20230105213938602" style="zoom:67%;" />

#### 格式化毫秒

```java
// 1、日期对象
Date d = new Date();
System.out.println(d);
// 2、格式化这个日期对象 (指定最终格式化的形式)
SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss EEE a");
// 3、开始格式化日期对象成为喜欢的字符串形式
String rs = sdf.format(d);
System.out.println(rs);
System.out.println("----------------------------");
// 4、格式化时间毫秒值
// 需求：请问121秒后的时间是多少
long time1 = System.currentTimeMillis() + 121 * 1000;
String rs2 = sdf.format(time1);
System.out.println(rs2);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061447547.png" alt="image-20220606144739457" style="zoom:80%;" />



#### 从Date到String

```java
Date d2 = new Date();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
String s = sdf.format(d2);
System.out.println(s); //2021年10月12日 16:13:36
```



#### 从String到Date

```java
String s1 ="2018-11-21 12:32:11";
SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date f = sdf1.parse(s1);
System.out.println(f); //Wed Nov 21 12:32:11 CST 2018
```

```java
// 目标: 学会使用SimpleDateFormat解析字符串时间成为日期对象。
// 有一个时间 2021年08月06日 11:11:11 往后 2天 14小时 49分 06秒后的时间是多少。
// 1、把字符串时间拿到程序中来
String dateStr = "2021年08月06日 11:11:11";

// 2、把字符串时间解析成日期对象（本节的重点）:形式必须与被解析时间的形式完全一样，否则运行时解析报错！
SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
Date d = sdf.parse(dateStr);

// 3、往后走2天 14小时 49分 06秒
long time = d.getTime() + (2L*24*60*60 + 14*60*60 + 49*60 + 6) * 1000;

// 4、格式化这个时间毫秒值就是结果
System.out.println(sdf.format(time));
```



### 秒杀活动⭐

```java
public class SimpleDateFormatTest3 {
    public static void main(String[] args) throws ParseException {
        // 1、开始 和 结束时间
        String startTime = "2021-11-11 00:00:00";
        String endTime = "2021-11-11 00:10:00";

        // 2、小贾 小皮
        String xiaoJia =  "2021-11-11 00:03:47";
        String xiaoPi =  "2021-11-11 00:10:11";

        // 3、解析他们的时间，parse将字符串转换成Date类型的时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d1 = sdf.parse(startTime);
        Date d2 = sdf.parse(endTime);
        Date d3 = sdf.parse(xiaoJia);
        Date d4 = sdf.parse(xiaoPi);

        if(d3.after(d1) && d3.before(d2)){
            System.out.println("小贾秒杀成功，可以发货了！");
        }else {
            System.out.println("小贾秒杀失败！");
        }

        if(d4.after(d1) && d4.before(d2)){
            System.out.println("小皮秒杀成功，可以发货了！");
        }else {
            System.out.println("小皮秒杀失败！");
        }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061450634.png" alt="image-20220606145040545" style="zoom:80%;" />



### Calendar日历类

#### Calendar 概述

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052151928.png" alt="image-20230105215108843" style="zoom:50%;" />

#### Calendar 常用方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052151111.png" alt="image-20230105215154991" style="zoom:67%;" />

```java
public class CalendarDemo{
    public static void main(String[] args) {
        // 1、拿到系统此刻日历对象
        Calendar cal = Calendar.getInstance();
        System.out.println(cal);

        // 2、获取日历的信息:public int get(int field)：取日期中的某个字段信息
        int year = cal.get(Calendar.YEAR);
        System.out.println(year);

        int mm = cal.get(Calendar.MONTH) + 1; // 获取时间，注意月份要加一
        System.out.println(mm);

        int days = cal.get(Calendar.DAY_OF_YEAR) ;
        System.out.println(days);

        // 3、public void set(int field,int value)：修改日历的某个字段信息。
        // cal.set(Calendar.HOUR , 12);
        // System.out.println(cal);

        // 4.public void add(int field,int amount)：为某个字段增加/减少指定的值
        // 请问64天后是什么时间
        cal.add(Calendar.DAY_OF_YEAR , 64);
        cal.add(Calendar.MINUTE , 59);

        //  5.public final Date getTime(): 拿到此刻日期对象。
        Date d = cal.getTime();
        System.out.println(d);

        //  6.public long getTimeInMillis(): 拿到此刻时间毫秒值
        long time = cal.getTimeInMillis();
        System.out.println(time);
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301052154961.png" alt="image-20230105215445890" style="zoom:67%;" />

## JDK8新增日期⭐⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071829218.png" alt="image-20220807182918049" style="zoom:67%;" />

旧版日期时间 API 存在的问题

> 设计很差： 在java.util和java.sql的包中都有日期类，java.util.Date同时包含日期和时间，而java.sql.Date仅包含日期。此外用于格式化和解析的类在java.text包中定义。
>
> 非线程安全：java.util.Date 是非线程安全的，所有的日期类都是可变的，这是Java日期类最大的问题之一。
>
> 时区处理麻烦：日期类并不提供国际化，没有时区支持，因此Java引入了java.util.Calendar和
> java.util.TimeZone类，但他们同样存在上述所有的问题。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071820988.png" alt="image-20220807182001792" style="zoom:80%;" />

该包的API提供了大量相关的方法，这些方法一般有一致的方法前缀:

- of: 静态工厂方法。
- parse: 静态工厂方法，关注于解析。
- get: 获取某些东西的值。
- is: 检查某些东西的是否是true。
- with: 不可变的setter等价物。
- plus: 加一些量到某个对象。
- minus: 从某个对象减去一些量。
- to: 转换到另一个类型。
- at: 把这个对象与另一个对象组合起来，例如:  date.atTime(time)。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061349999.png" alt="image-20230106134938917" style="zoom:67%;" />

## 日期 LocalDate

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061348916.png" alt="image-20230106134841829" style="zoom:67%;" />

```java
public class Demo01LocalDate {
    public static void main(String[] args) {
        // 1、获取本地日期对象。
        LocalDate nowDate = LocalDate.now();
        System.out.println("今天的日期：" + nowDate);//今天的日期

        int year = nowDate.getYear();
        System.out.println("year：" + year);


        int month = nowDate.getMonthValue();
        System.out.println("month：" + month);

        int day = nowDate.getDayOfMonth();
        System.out.println("day：" + day);

        //当年的第几天
        int dayOfYear = nowDate.getDayOfYear();
        System.out.println("dayOfYear：" + dayOfYear);

        //星期
        System.out.println(nowDate.getDayOfWeek());
        System.out.println(nowDate.getDayOfWeek().getValue());

        //月份
        System.out.println(nowDate.getMonth());//AUGUST
        System.out.println(nowDate.getMonth().getValue());//8

        System.out.println("------------------------");
        LocalDate bt = LocalDate.of(1991, 11, 11);
        System.out.println(bt);//直接传入对应的年月日
        System.out.println(LocalDate.of(1991, Month.NOVEMBER, 11));//相对上面只是把月换成了枚举
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061342771.png" alt="image-20230106134241700" style="zoom:67%;" />

## 时间LocalTime

```java
public class Demo02LocalTime {
    public static void main(String[] args) {
        // 1、获取本地时间对象。
        LocalTime nowTime = LocalTime.now();
        System.out.println("今天的时间：" + nowTime);//今天的时间：

        int hour = nowTime.getHour();//时
        System.out.println("hour：" + hour);//hour：

        int minute = nowTime.getMinute();//分
        System.out.println("minute：" + minute);//minute：

        int second = nowTime.getSecond();//秒
        System.out.println("second：" + second);//second：

        int nano = nowTime.getNano();//纳秒
        System.out.println("nano：" + nano);//nano：

        System.out.println("-----");
        System.out.println(LocalTime.of(8, 20));//时分
        System.out.println(LocalTime.of(8, 20, 30));//时分秒
        System.out.println(LocalTime.of(8, 20, 30, 150));//时分秒纳秒
        LocalTime mTime = LocalTime.of(8, 20, 30, 150);

        System.out.println("---------------");
        System.out.println(LocalDateTime.of(1991, 11, 11, 8, 20));
        System.out.println(LocalDateTime.of(1991, Month.NOVEMBER, 11, 8, 20));
        System.out.println(LocalDateTime.of(1991, 11, 11, 8, 20, 30));
        System.out.println(LocalDateTime.of(1991, Month.NOVEMBER, 11, 8, 20, 30));
        System.out.println(LocalDateTime.of(1991, 11, 11, 8, 20, 30, 150));
        System.out.println(LocalDateTime.of(1991, Month.NOVEMBER, 11, 8, 20, 30, 150));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061344693.png" alt="image-20230106134416620" style="zoom:67%;" />

## 时间和日期LocalDateTime

### 获取年月日时分秒

```java
// 日期 时间
LocalDateTime nowDateTime = LocalDateTime.now();
System.out.println("今天是：" + nowDateTime);//今天是：
System.out.println(nowDateTime.getYear());//年
System.out.println(nowDateTime.getMonthValue());//月
System.out.println(nowDateTime.getDayOfMonth());//日
System.out.println(nowDateTime.getHour());//时
System.out.println(nowDateTime.getMinute());//分
System.out.println(nowDateTime.getSecond());//秒
System.out.println(nowDateTime.getNano());//纳秒
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061150969.png" alt="image-20220606115037894" style="zoom:80%;" />

### 获取当年天、星期、月份

```java
//日：当年的第几天
System.out.println("dayOfYear：" + nowDateTime.getDayOfYear());//dayOfYear：249
//星期
System.out.println(nowDateTime.getDayOfWeek());//THURSDAY
System.out.println(nowDateTime.getDayOfWeek().getValue());//4
//月份
System.out.println(nowDateTime.getMonth());//SEPTEMBER
System.out.println(nowDateTime.getMonth().getValue());//9
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061209168.png" alt="image-20220606120942096" style="zoom:80%;" />

### 设定时间

```java
System.out.println(LocalDateTime.of(1991, 11, 11, 8, 20));
System.out.println(LocalDateTime.of(1991, Month.NOVEMBER, 11, 8, 20));
System.out.println(LocalDateTime.of(1991, 11, 11, 8, 20, 30));
System.out.println(LocalDateTime.of(1991, Month.NOVEMBER, 11, 8, 20, 30));
System.out.println(LocalDateTime.of(1991, 11, 11, 8, 20, 30, 150));
System.out.println(LocalDateTime.of(1991, Month.NOVEMBER, 11, 8, 20, 30, 150));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061206607.png" alt="image-20220606120638533" style="zoom:80%;" />

### 修改时间

```java
System.out.println(LocalDateTime.now().withYear(2020).withMonth(1).withDayOfMonth(1));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072250757.png" alt="image-20220807225051618" style="zoom:67%;" />

### 转换成LocalDate或LocalTime

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061347387.png" alt="image-20230106134757312" style="zoom:67%;" />

```java
LocalDate ld = nowDateTime.toLocalDate();
System.out.println(ld);

LocalTime lt = nowDateTime.toLocalTime();
System.out.println(lt);
System.out.println(lt.getHour());
System.out.println(lt.getMinute());
System.out.println(lt.getSecond());
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061157013.png" alt="image-20220606115729938" style="zoom:80%;" />



## 比较判断运算⭐

> - LocalDateTime 综合了 LocalDate 和 LocalTime 里面的方法，所以下面只用 LocalDate 和 LocalTime 来举例。
> - 这些方法返回的是一个新的实例引用，因为LocalDateTime 、LocalDate 、LocalTime 都是不可变的。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061347853.png" alt="image-20230106134739757" style="zoom:67%;" />

### 获取对应时间前后

#### 获取时间前

```java
LocalTime nowTime = LocalTime.now();
System.out.println(nowTime);//当前时间
System.out.println(nowTime.minusHours(1));//一小时前
System.out.println(nowTime.minusMinutes(1));//一分钟前
System.out.println(nowTime.minusSeconds(1));//一秒前
System.out.println(nowTime.minusNanos(1));//一纳秒前
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061215752.png" alt="image-20220606121514680" style="zoom:80%;" />

#### 获取时间后

```java
System.out.println(nowTime.plusHours(1));//一小时后
System.out.println(nowTime.plusMinutes(1));//一分钟后
System.out.println(nowTime.plusSeconds(1));//一秒后
System.out.println(nowTime.plusNanos(1));//一纳秒后
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061215885.png" alt="image-20220606121525815" style="zoom:80%;" />

### 判断时间前后

#### ChronoUnit判断时间前后

LocalDate日期不包含时间信息，它的plus()方法用来增加天、周、月，ChronoUnit类声明了这些时间单位。由于LocalDate也是不变类型，返回后一定要用变量赋值。

```java
public static void t1(){
    LocalDate today = LocalDate.now();
    System.out.println("今天的日期为:"+today);
    LocalDate nextWeek = today.plus(1, ChronoUnit.WEEKS);
    System.out.println("一周后的日期为:"+nextWeek);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212072355133.png" alt="image-20221207235531989" style="zoom:80%;" />

利用minus()方法计算一年前的日期

```java
public static void t1(){
    LocalDate today = LocalDate.now();

    LocalDate previousYear = today.minus(1, ChronoUnit.YEARS);
    System.out.println("一年前的日期 : " + previousYear);

    LocalDate nextYear = today.plus(1, ChronoUnit.YEARS);
    System.out.println("一年后的日期:"+nextYear);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212072352734.png" alt="image-20221207235243653" style="zoom:80%;" />

#### 判断日期前后⭐

```java
@Test
public void testEquals() {
    LocalDate myDate = LocalDate.of(2018, 9, 5);
    LocalDate nowDate = LocalDate.now();
    //2018-09-05是否在2018-09-06之前？ true
    System.out.println(myDate + "是否在" + nowDate + "之前？ " + myDate.isBefore(nowDate));
    //2018-09-05是否在2018-09-06之后？ false
    System.out.println(myDate + "是否在" + nowDate + "之后？ " + myDate.isAfter(nowDate));
    //今天是2018-09-06吗？ false
    System.out.println("今天是2018-09-06吗？ " + myDate.isEqual(nowDate)); //  false
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021411645.png" alt="image-20230102141149580" style="zoom:67%;" />

### 自定义调整时间

有时我们可能需要获取例如：将日期调整到“下一个月的第一天”等操作。可以通过时间校正器来进行。

TemporalAdjuster : 时间校正器。

TemporalAdjusters : 该类通过静态方法提供了大量的常用TemporalAdjuster的实现。

```java
// TemporalAdjuster类:自定义调整时间
@Test
public void test09() {
    LocalDateTime now = LocalDateTime.now();

    // 将日期调整到“下一个月的第一天”操作。
    TemporalAdjuster firstDayOfNextMonth = temporal -> {
        // temporal要调整的时间
        LocalDateTime dateTime = (LocalDateTime)temporal;
        return dateTime.plusMonths(1).withDayOfMonth(1); // 下一个月的第一天
    };

    // JDK中自带了很多时间调整器
    // LocalDateTime newDateTime = now.with(firstDayOfNextMonth);
    LocalDateTime newDateTime = now.with(TemporalAdjusters.firstDayOfNextYear());
    System.out.println("newDateTime = " + newDateTime);
}
```

### Instant 时间戳加减

```java
// 1、得到一个Instant时间戳对象，标准时间，不带时区
Instant instant = Instant.now();
// 判断时间是否在前和在后
System.out.println(instant.minusSeconds(100));
System.out.println(instant.minusMillis(100));
System.out.println(instant.plusNanos(100000));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072219994.png" alt="image-20220807221934865" style="zoom:67%;" />

### 判断日期案例

#### 1 检查像生日这种周期性事件

只要当天的日期和生日匹配，无论是哪一年都会打印出祝贺信息。你可以把程序整合进系统时钟，看看生日时是否会受到提醒，或者写一个单元测试来检测代码是否运行正确。

```java
public static void t1(){
    LocalDate date1 = LocalDate.now(); // 获取当前时间
    LocalDate date2 = LocalDate.of(1998,12,7); // 封装自己出生日期
    
    // MonthDay表示月日对象，指定月日参数
    MonthDay birthday = MonthDay.of(date2.getMonth(),date2.getDayOfMonth());
    MonthDay currentMonthDay = MonthDay.from(date1); // 直接获取月日
    
    if(currentMonthDay.equals(birthday)){
        System.out.println("是你的生日");
    }else{
        System.out.println("你的生日还没有到");
    }
}
```

#### 2 判断是否是闰年

```java
public static void t1(){
    LocalDate today = LocalDate.now();
    if(today.isLeapYear()){
        System.out.println("This year is Leap year");
    }else {
        System.out.println("2018 is not a Leap year");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212072336839.png" alt="image-20221207233640765" style="zoom:80%;" />

#### 3 信用卡到期这类固定日期

> 与 MonthDay检查重复事件的例子相似，YearMonth是另一个组合类，用于表示信用卡到期日、FD到期日、期货期权到期日等。还可以用这个类得到 当月共有多少天，YearMonth实例的lengthOfMonth()方法可以返回当月的天数，在判断2月有28天还是29天时非常有用。

```java
public static void t1(){
    YearMonth currentYearMonth = YearMonth.now();
    System.out.printf("Days in month year %s: %d%n", currentYearMonth, 
                      currentYearMonth.lengthOfMonth());
    YearMonth creditCardExpiry = YearMonth.of(2019, Month.FEBRUARY);
    System.out.printf("Your credit card expires on %s %n", creditCardExpiry);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212072340907.png" alt="image-20221207234016794" style="zoom:80%;" />



## 日期格式化

> SimpleDateFormat **是个线程不安全的，使用的时候，只能在方法内部创建新的局部变量**。而 **DateTimeFormatter 不但是不变对象，它还是线程安全的**。所以 DateTimeFormatter 可以只创建一个实例，到处引用
>

- 在JDK8中，引入了一个全新的日期与时间格式化器DateTimeFormatter
- 正反都能调用format方法

### 日期格式化

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072229529.png" alt="image-20220807222922386" style="zoom:67%;" />

```java
public class Demo06DateTimeFormat {
    public static void main(String[] args) {
        // 本地此刻  日期时间 对象
        LocalDateTime ldt = LocalDateTime.now();
        System.out.println(ldt);

        // 解析/格式化器
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss EEE a");
        // 正向格式化
        System.out.println(dtf.format(ldt));
        // 逆向格式化
        System.out.println(ldt.format(dtf));

        // 解析字符串时间
        DateTimeFormatter dtf1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        // 解析当前字符串时间成为本地日期时间对象
        LocalDateTime ldt1 = LocalDateTime.parse("2019-11-11 11:11:11" ,  dtf1);
        System.out.println(ldt1);
        System.out.println(ldt1.getDayOfYear());
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061354737.png" alt="image-20230106135410666" style="zoom:67%;" />

### 时间戳格式化

```java
public class t1 {
    public static void main(String[] args) {
        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS")
                         .format(System.currentTimeMillis());
        System.out.println("现在时刻："+time);
    }
}
```

## 时间间隔⭐

有一个常见日期操作是计算两个日期之间的天数、周数或月数。在Java 8中可以用java.time.Period类来做计算。

### Period

> - 在Jdk8中，我们使用java.time.Period计算日期间隔
> - 主要是用Period类方法getYears()、getMonths()、和getDays()来计算，只能精确到年月日
> - 用于LocalDate之间的比较

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061429081.png" alt="image-20220606142939985" style="zoom:80%;" />

```java
public static void test() {
    // 当前本地 年月日
    LocalDate today = LocalDate.now();
    System.out.println(today);//
    // 生日的 年月日
    LocalDate birthDate = LocalDate.of(1998, 10, 4);
    System.out.println(birthDate);
    Period period = Period.between(birthDate, today);//第二个参数减第一个参数
    System.out.println(period.getYears());
    System.out.println(period.getMonths());
    System.out.println(period.getDays());
    // 计算两个日期之间的月数
    System.out.println(period.toTotalMonths());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072255085.png" alt="image-20220807225535918" style="zoom:67%;" />

### Duration

> - 在Jdk8中，我们可以使用java.time.Duration来计算时间间隔
> - 它提供了使用基于时间的值测量时间量的方法
> - 用于LocalDateTime之间的比较。也可以用于Instant之间的比较

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061431068.png" alt="image-20220606143138974" style="zoom:80%;" />

```java
// 本地日期时间对象
LocalDateTime today = LocalDateTime.now();
System.out.println(today);

// 出生的日期时间对象
LocalDateTime birthDate = LocalDateTime.of(2021,8,06,01,00,00);

System.out.println(birthDate);
// 返回时间间隔对象
Duration duration = Duration.between(today , birthDate);//第二个参数减第一个参数
// 时间转换演示
System.out.println(duration.toDays());//两个时间差的天数
System.out.println(duration.toHours());//两个时间差的小时数
System.out.println(duration.toMinutes());//两个时间差的分钟数
System.out.println(duration.toMillis());//两个时间差的毫秒数
System.out.println(duration.toNanos());//两个时间差的纳秒数
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206061432283.png" alt="image-20220606143227198" style="zoom:80%;" />

### ChronoUnit⭐⭐

支持计算所有时间间隔

ChronoUnit类可用于在单个时间单位内测量一段时间，这个工具类是最全的了，可以用于比较所有的时间单位

ChronoUnit能获取所有的时间间隔，用法如下

```java
public class Demo09ChronoUnit {
    public static void main(String[] args) {
        // 本地日期时间对象：此刻的
        LocalDateTime today = LocalDateTime.now();
        System.out.println(today);
        // 生日时间
        LocalDateTime birthDate = LocalDateTime.of(1998,10,4,10,50,59);
        System.out.println(birthDate);

        System.out.println("相差的年数：" + ChronoUnit.YEARS.between(birthDate, today));
        System.out.println("相差的月数：" + ChronoUnit.MONTHS.between(birthDate, today));
        System.out.println("相差的周数：" + ChronoUnit.WEEKS.between(birthDate, today));
        System.out.println("相差的天数：" + ChronoUnit.DAYS.between(birthDate, today));
        System.out.println("相差的时数：" + ChronoUnit.HOURS.between(birthDate, today));
        System.out.println("相差的分数：" + ChronoUnit.MINUTES.between(birthDate, today));
        System.out.println("相差的秒数：" + ChronoUnit.SECONDS.between(birthDate, today));
        System.out.println("相差的毫秒数：" + ChronoUnit.MILLIS.between(birthDate, today));
        System.out.println("相差的微秒数：" + ChronoUnit.MICROS.between(birthDate, today));
        System.out.println("相差的纳秒数：" + ChronoUnit.NANOS.between(birthDate, today));
        System.out.println("相差的半天数：" + ChronoUnit.HALF_DAYS.between(birthDate, today));
        System.out.println("相差的十年数：" + ChronoUnit.DECADES.between(birthDate, today));
        System.out.println("相差的世纪（百年）数：" + ChronoUnit.CENTURIES.between(birthDate, 
                                                                        today));
        System.out.println("相差的千年数：" + ChronoUnit.MILLENNIA.between(birthDate, today));
        System.out.println("相差的纪元数：" + ChronoUnit.ERAS.between(birthDate, today));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061404127.png" alt="image-20230106140426050" style="zoom:67%;" />



## 时间戳 Instant

### Instant 简介

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301061350812.png" alt="image-20230106135041701" style="zoom:50%;" />

### Instant 方法概览

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071859023.png" alt="image-20220807185904853" style="zoom:67%;" />

JDK8获取时间戳特别简单，且功能更丰富。Instant类由一个静态的工厂方法now()可以返回当前时间戳

- 时间戳是包含日期和时间的，与java.util.Date很类似，事实上Instant就是类似JDK8 以前的Date。
- Instant和Date这两个类可以进行转换。

```java
// 修改时间
@Test
public void testLocalDateTime2() {
    // 1、得到一个Instant时间戳对象，标准时间，不带时区
    Instant instant = Instant.now();
    System.out.println(instant);

    // 2、系统此刻的时间戳怎么办？
    Instant instant1 = Instant.now();
    System.out.println(instant1.atZone(ZoneId.systemDefault()));

    // 3、获取指定时区的时间
    System.out.println(instant1.atZone(ZoneId.of("Asia/Shanghai")));

    // 4、如何去返回Date对象
    Date date = Date.from(instant);
    System.out.println(date);
    Instant i2 = date.toInstant();
    System.out.println(i2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021422602.png" alt="image-20230102142209533" style="zoom:67%;" />



### 获取时间戳⭐

```java
@Test
public void testInstant1() {
    // 方式1：System.currentTimeMillis()
    System.out.println(System.currentTimeMillis());
    // 方式2：getTime()
    System.out.println(new Date().getTime());
    // 方式3：Instant 默认获取的是UTC时区
    System.out.println(Instant.now().toEpochMilli());
    // 方式3：Clock
    System.out.println(Clock.systemDefaultZone().millis());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021428653.png" alt="image-20230102142852587" style="zoom:67%;" />

### 时间戳转Instant

```java
public static void test() {
    // 根据(秒/毫秒/纳秒)获取Instant对象
    Instant instant = Instant.ofEpochMilli(0L);
    Instant instant1 = Instant.ofEpochSecond(0L);
    // 1秒+100000纳秒
    Instant instant2 = Instant.ofEpochSecond(1L, 100000L);
    System.out.println(instant);
    System.out.println(instant1);
    System.out.println(instant2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208072205036.png" alt="image-20220807220536836" style="zoom:67%;" />



## 时区⭐

### ZonedId 获取和指定时区

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071832901.png" alt="image-20220807183253749" style="zoom: 50%;" />

```java
@Test
public void testZoneId() {
    // 获取所有时区名称
    Set<String> availableZoneIds = ZoneId.getAvailableZoneIds();
    System.out.println(availableZoneIds);
    // 获取系统默认时区
    ZoneId zoneId = ZoneId.systemDefault();
    System.out.println(zoneId);
    // 获取指定时区
    ZoneId zoneId1 = ZoneId.of("America/New_York");
    System.out.println(zoneId1);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021434739.png" alt="image-20230102143433667" style="zoom:67%;" />

### ZonedDateTime 带时区的时间

> Java8 中加入了对时区的支持，LocalDate、LocalTime、LocalDateTime是不带时区的，带时区的日期时间类分别为：ZonedDate、ZonedTime、ZonedDateTime。其中每个时区都对应着 ID，ID的格式为 “区域/城市” 。例如 ：Asia/Shanghai 等。

该日期格式能被格式化的。如果你需要特定时区的信息，则可以使用 ZoneDateTime，它保存有 ISO-8601 日期系统的日期和时间，而且有时区信息，实例如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071844695.png" alt="image-20220807184418516" style="zoom: 50%;" />

```java
@Test
public void test10() {
    // 1.获取所有的时区ID
    ZoneId.getAvailableZoneIds().forEach(System.out::println);

    // 不带时间,获取计算机的当前时间
    LocalDateTime now = LocalDateTime.now(); // 中国使用的东八区的时区.比标准时间早8个小时
    System.out.println("now = " + now);

    // 2.操作带时区的类
    // now(Clock.systemUTC()): 创建世界标准时间
    ZonedDateTime bz = ZonedDateTime.now(Clock.systemUTC());
    System.out.println("bz = " + bz);

    // now(): 使用计算机的默认的时区,创建日期时间
    ZonedDateTime now1 = ZonedDateTime.now();
    System.out.println("now1 = " + now1); 

    // 使用指定的时区创建日期时间
    ZonedDateTime now2 = ZonedDateTime.now(ZoneId.of("America/Vancouver"));
    System.out.println("now2 = " + now2); 

    // 修改时区
    // withZoneSameInstant: 即更改时区,也更改时间
    ZonedDateTime withZoneSameInstant = now2.withZoneSameInstant(ZoneId.of("Asia/Shanghai"));
    System.out.println("withZoneSameInstant = " + withZoneSameInstant); 

    // withZoneSameLocal: 只更改时区,不更改时间
    ZonedDateTime withZoneSameLocal = now2.withZoneSameLocal(ZoneId.of("Asia/Shanghai"));
    System.out.println("withZoneSameLocal = " + withZoneSameLocal); 
}
```

```java
public static void t1(){
    // Date and time with timezone in Java 8
    ZoneId america = ZoneId.of("America/New_York");
    LocalDateTime localtDateAndTime = LocalDateTime.now();
    ZonedDateTime dateAndTimeInNewYork  = ZonedDateTime.of(localtDateAndTime, america );
    System.out.println("Current date and time in a particular timezone : " + 
                       dateAndTimeInNewYork);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212072343685.png" alt="image-20221207234304597" style="zoom:80%;" />

```java
public static void test() {
    // 获取当前时间日期
    ZonedDateTime zonedDatetime = ZonedDateTime.now();
    // 自定义年月日时分秒和时区
    ZonedDateTime zonedDatetimeFromClock = ZonedDateTime.of(2021, 1, 1, 0, 0, 0, 0,
                                                            ZoneId.of("Asia/Shanghai"));
    // 根据Instant获取ZonedDateTime
    ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(Instant.now(), 
                                                          ZoneId.of("Asia/Shanghai"));
    ZonedDateTime zonedDatetime = Instant.now().atZone(ZoneId.of("Asia/Shanghai"));
    
    // 根据LocalDateTime获取ZonedDateTime
    ZonedDateTime zonedDateTimeFromLocalDateTime = ZonedDateTime.of(LocalDateTime.now(),
                                                                 ZoneId.of("Asia/Shanghai"));
    // withxxx修改时间
    ZonedDateTime zonedDateTimeWithYear = zonedDatetime.withYear(2020);
    ZonedDateTime zonedDateTimeWithMonth = zonedDatetime.withMonth(1);
    // minusxxx减少时间
    ZonedDateTime zonedDateTimeMinusYear = zonedDatetime.minusYears(1);
    ZonedDateTime zonedDateTimeMinusMonth = zonedDatetime.minusMonths(1);
    ZonedDateTime zonedDateTimeMinusDay = zonedDatetime.minusDays(1);
    // plusxxx增加时间
    ZonedDateTime zonedDateTimePlusYear = zonedDatetime.plusYears(1);
    ZonedDateTime zonedDateTimePlusMonth = zonedDatetime.plusMonths(1);
    ZonedDateTime zonedDateTimePlusDay = zonedDatetime.plusDays(1);
}
```

```java
@Test
public void test10() {
    // 1.获取所有的时区ID
    ZoneId.getAvailableZoneIds().forEach(System.out::println);

    // 不带时间,获取计算机的当前时间
    // 中国使用的东八区的时区.比标准时间早8个小时
    LocalDateTime now = LocalDateTime.now(); 
    System.out.println("now = " + now); //now = 2021-11-03T15:20:59.741

    // 2.操作带时区的类
    // now(Clock.systemUTC()): 创建世界标准时间
    ZonedDateTime bz = ZonedDateTime.now(Clock.systemUTC());
    System.out.println("bz = " + bz); //bz = 2021-11-03T07:20:59.742Z

    // now(): 使用计算机的默认的时区,创建日期时间
    ZonedDateTime now1 = ZonedDateTime.now();
    System.out.println("now1 = " + now1); 
    //now1 = 2021-11-03T15:20:59.742+08:00[Asia/Shanghai]

    // 使用指定的时区创建日期时间
    ZonedDateTime now2 = ZonedDateTime.now(ZoneId.of("America/Vancouver"));
    System.out.println("now2 = " + now2); 
    //now2 = 2021-11-03T00:20:59.743-07:00[America/Vancouver]

    // 修改时区
    // withZoneSameInstant: 即更改时区,也更改时间
    ZonedDateTime withZoneSameInstant = 
        now2.withZoneSameInstant(ZoneId.of("Asia/Shanghai"));
    System.out.println("withZoneSameInstant = " + withZoneSameInstant); 
    //2021-11-03T15:20:59.743+08:00[Asia/Shanghai]

    // withZoneSameLocal: 只更改时区,不更改时间
    ZonedDateTime withZoneSameLocal = 
        now2.withZoneSameLocal(ZoneId.of("Asia/Shanghai"));
    System.out.println("withZoneSameLocal = " + withZoneSameLocal); 
    //2021-11-03T00:20:59.743+08:00[Asia/Shanghai]
}
```



## 全局时间格式化⭐

### 方案一：Jackson

答案是：有的。我们可以不改任何代码，只需要在配置文件中设置一下就可以实现时间格式化的功能了。

首先，我们找到 Spring Boot 的配置文件 application.properties（或 application.yml），只需要在 application.properties 配置文件中添加以下两行配置：

> 注意：只能格式化Date类型数据

```properties
# 格式化全局时间字段
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
# 指定时间区域类型
spring.jackson.time-zone=GMT+8
```

这样设置之后，进行还原

数据库表

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301505845.png" alt="image-20220630150505755" style="zoom:67%;" />

实体类

```java
@Data
public class log {
    private Integer id;
    private String info;
    private Date createDate;
}
```

获取数据

```java
@GetMapping("getLog")
public List<log> getLog(){
    return logMapper.selectList(null);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301506273.png" alt="image-20220630150623174" style="zoom: 67%;" />

为什么在配置文件中设置一下，就可以实现所有时间字段的格式化了呢？

> 这是因为 Controller 在返回数据时，会自动调用 Spring Boot 框架中内置的 JSON 框架 Jackson，对返回的数据进行统一的 JSON 格式化处理，在处理的过程中它会判断配置文件中是否设置了“spring.jackson.date-format=yyyy-MM-dd HH:mm:ss”，如果设置了，那么 Jackson 框架在对时间类型的字段输出时就会执行时间格式化的处理，这样我们就通过配置来实现全局时间字段的格式化功能了。

为什么要指定时间区域类型“spring.jackson.time-zone=GMT+8”呢？

> 最现实的原因是，如果我们不指定时间区域类型，那么查询出来的时间就会比预期的时间少 8 个小时，这因为我们（中国）所处的时间区域比世界时间少 8 个小时导致的，而当我们设置了时区之后，我们的时间查询才会和预期时间保持一致。

### 方案二：JsonFormat

部分时间格式化

某些场景下，我们不需要对全局的时间都进行统一的处理，这种情况我们可以使用注解的方式来实现部分时间字段的格式化。我们需要在实体类 UserInfo 中添加 `@JsonFormat` 注解，这样就可以实现时间的格式化功能了，实现代码如下：

注意事项：只是获取数据时进行格式化，存储数据时还是正常的该是Date该是LocalTime就是那样不变

使用`@JsonFormat`注解格式化时间，应该算是一个基本操作了，大部分开发者都应用此种方式，简单方便。

```java
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class User {
    private Integer id;
    private String name;
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(locale = "zh", timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
}
```

进行测试使用

```java
@GetMapping("/hello1")
public User hello1() {
    User u = new User();
    u.setId(1);
    u.setName("张三");
    u.setCreateTime(LocalDateTime.now());
    u.setUpdateTime(new Date());
    return u;
}
```

结果

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220416155816160.png" alt="image-20220416155816160" style="zoom: 55%;" />

测试一下结果，发现 `Date` 类型和 `LocalDateTime` 类型都格式化成功，但还是有个问题，这样做仍然比较繁琐，每个实体类的日期字段都要加`@JsonFormat`注解，重复的工作量也不小。接着往下看~



### 方案三：全局配置

`Springboot` 已经为我们提供了日期格式化 `${spring.jackson.date-format:yyyy-MM-dd HH:mm:ss}`，这里我们需要进行全局配置，配置比较简单，也无需在实体类属性上添加`@JsonFormat`注解。

只需要用`@Configuration`定义一个配置类，注入两个`Bean`即可完成全局日期格式化处理，这种方式也是当前我项目中正在用的方式。

#### 实体类

```java
@Data
public class User {
    private Integer id;
    private String name;
    private LocalDateTime createTime;
    private Date updateTime;
}
```

#### 配置类

```java
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
//声明为配置类
@Configuration
public class LocalDateTimeSerializerConfig {

    @Value("${spring.jackson.date-format:yyyy-MM-dd HH:mm:ss}")
    private String pattern;

    @Bean
    public Jackson2ObjectMapperBuilder mapperBuilder() {
        Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder = new
                                    Jackson2ObjectMapperBuilder();
        return jackson2ObjectMapperBuilder.dateFormat(new SimpleDateFormat(pattern))
                .serializerByType(LocalDateTime.class, localDateTimeSerializer())
                .deserializerByType(LocalDateTime.class, localDateTimeDeserializer());
    }
    @Bean
    public LocalDateTimeSerializer localDateTimeSerializer() {
        return new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(pattern));
    }

    @Bean
    public LocalDateTimeDeserializer localDateTimeDeserializer() {
        return new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(pattern));
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20220416162845389.png" alt="image-20220416162845389" style="zoom:67%;" />

这种方式可支持 `Date` 类型和 `LocalDateTime` 类型并存，那么有一个问题就是现在全局时间格式是`yyyy-MM-dd HH:mm:ss`，但有的字段却需要`yyyy-MM-dd`格式咋整？

那就需要配合`@JsonFormat`注解使用，在特定的字段属性添加`@JsonFormat`注解即可，因为`@JsonFormat`注解优先级比较高，会以`@JsonFormat`注解标注的时间格式为主。



## 检查字符串是否合法的日期

### 为什么要检查时间格式

后端接口在接收数据的时候，都需要进行检查。检查全部通过后，才能够执行业务逻辑。对于时间格式，我们一般需要检查这么几方面：

1. 字符串格式是否正确，比如格式是不是`yyyy-MM-dd`
2. 时间在合法范围内，比如我们需要限定在一个月内的时间
3. 字符串可以解析为正常的时间，比如 2 月 30 号就不是正常时间

> 对于时间格式的判断，我们可以通过正则表达式来检查。不过考虑到正则表达式的性能、输入数据的复杂性，一般能用别的方式，就不选正则表达式。我们还是选择一种更加通用、更加高效的检查方式。

首先，定义时间校验器的接口：

```java
public interface DateValidator {
    boolean isValid(String dateStr);
}
```

接口方法接收一个字符串，返回布尔类型，表示字符串是否是合法的时间格式。

### 实现方法

接下来就是通过不同方式实现`DateValidator`。

#### 1.使用 DateFormat 检查

Java 提供了格式化和解析时间的工具：`DateFormat`抽象类和`SimpleDataFormat`实现类。我们借此实现时间校验器：

```java
public class DateValidatorUsingDateFormat implements DateValidator {
    private final String dateFormat;

    public DateValidatorUsingDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    @Override
    public boolean isValid(String dateStr) {
        final DateFormat sdf = new SimpleDateFormat(this.dateFormat);
        sdf.setLenient(false);
        try {
            sdf.parse(dateStr);
        } catch (ParseException e) {
            return false;
        }
        return true;
    }
}
```

这里需要注意一下，`DateFormat`和`SimpleDataFormat`是非线程安全的，所以每次方法调用时，都需要新建实例。

我们通过单元测试验证下：

```java
@Test
public void t1() {
    final DateValidator validator = new DateValidatorUsingDateFormat("yyyy-MM-dd");
    System.out.println(validator.isValid("2021-02-28"));
    System.out.println(validator.isValid("2021-02-30"));
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.23/202206301417253.png" alt="image-20220630141749151" style="zoom:67%;" />

在 Java8 之前，一般都是用这种方式来验证。Java8 之后，我们有了更多的选择。



#### 2.使用 LocalDate 检查

Java8 引入了更加好用日期和时间 API（想要了解更多内容，请移步参看 Java8 中的时间类及常用 API）。其中包括`LocalDate`类，是一个不可变且线程安全的时间类。

`LocalDate`提供了两个静态方法，用来解析时间。这两个方法内部都是使用`java.time.format.DateTimeFormatter`来处理数据：

- 使用 DateTimeFormatter.ISO_LOCAL_DATE 处理数据
- 使用提供的 DateTimeFormatter 处理数据

通过`LocalDate`的`parse`方法实现我们的校验器：

```java
public class DateValidatorUsingLocalDate implements DateValidator {
    private final DateTimeFormatter dateFormatter;

    public DateValidatorUsingLocalDate(DateTimeFormatter dateFormatter) {
        this.dateFormatter = dateFormatter;
    }

    @Override
    public boolean isValid(String dateStr) {
        try {
            LocalDate.parse(dateStr, this.dateFormatter);
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }
}
```

`java.time.format.DateTimeFormatter`类是不可变的，也就是天然的线程安全，我们可以在不同线程使用同一个校验器实例。

我们通过单元测试验证下：

```java
@Test
public void t1() {
    final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_LOCAL_DATE;
    final DateValidator validator = new DateValidatorUsingLocalDate(dateFormatter);
    System.out.println(validator.isValid("2021-02-28"));
    System.out.println(validator.isValid("2021-02-30"));
}
```

既然`LocalDate#parse`是通过`DateTimeFormatter`实现的，那我们也可以直接使用`DateTimeFormatter`。



#### 3.使用 DateTimeFormatter 检查

`DateTimeFormatter`解析文本总共分两步。第一步，根据配置将文本解析为日期和时间字段；第二步，用解析后的字段创建日期和时间对象。

实现验证器：

```java
public class DateValidatorUsingDateTimeFormatter implements DateValidator {
    private final DateTimeFormatter dateFormatter;

    public DateValidatorUsingDateTimeFormatter(DateTimeFormatter dateFormatter) {
        this.dateFormatter = dateFormatter;
    }

    @Override
    public boolean isValid(String dateStr) {
        try {
            this.dateFormatter.parse(dateStr);
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }
}
```

通过单元测试验证：

```java
class DateValidatorUsingDateTimeFormatterTest {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter
                                           .ofPattern("uuuu-MM-dd", Locale.CHINA);

    @Test
    void isValid() {
        final DateTimeFormatter dateFormatter = DATE_FORMATTER
                                               .withResolverStyle(ResolverStyle.STRICT);
        final DateValidator validator = new 
              DateValidatorUsingDateTimeFormatter(dateFormatter);

        System.out.println(validator.isValid("2021-02-28"));
        System.out.println(validator.isValid("2021-02-30"));
    }
}
```

可以看到，我们指定了转换模式是`ResolverStyle.STRICT`，这个类型是说明解析模式。共有三种：

- STRICT：严格模式，日期、时间必须完全正确。
- SMART：智能模式，针对日可以自动调整。月的范围在 1 到 12，日的范围在 1 到 31。比如输入是 2 月 30 号，当年 2 月只有 28 天，返回的日期就是 2 月 28 日。
- LENIENT：宽松模式，主要针对月和日，会自动后延。结果类似于`LocalData#plusDays`或者`LocalDate#plusMonths`

> `ResolverStyle.STRICT`是严格控制，用来做时间校验比较合适；`ResolverStyle.LENIENT`可以最大程度将字符串转化为时间对象，在合理范围内可以随便玩；`ResolverStyle.SMART`名为智能，但智力有限，两不沾边，优势不够明显。JDK 提供的`DateTimeFormatter`实现，都是`ResolverStyle.STRICT`模式。

说了 JDK 自带的实现，接下来说说第三方组件的实现方式。

#### 4.使用 validator检查

Apache Commons 项目提供了一个校验器框架，包含多种校验规则，包括日期、时间、数字、货币、IP 地址、邮箱、URL 地址等。本文主要说检查时间，所以重点看看`GenericValidator`类提供的`isDate`方法：

先引入依赖：

```xml
<dependency>
    <groupId>commons-validator</groupId>
    <artifactId>commons-validator</artifactId>
    <version>1.7</version>
</dependency>
```

实现验证器：

```java
public class DateValidatorCommonsValidator implements DateValidator {
    private final String dateFormat;

    public DateValidatorUsingCommonsValidator(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    @Override
    public boolean isValid(String dateStr) {
        return GenericValidator.isDate(dateStr, dateFormat, true);
    }
}
```

通过单元测试验证：

```java
class DateValidatorUsingCommonsValidatorTest {
    @Test
    void isValid() {
        final DateValidator dateValidator = new DateValidatorCommonsValidator("yyyy-MM-dd");

        Assertions.assertTrue(dateValidator.isValid("2021-02-28"));
        Assertions.assertFalse(dateValidator.isValid("2021-02-30"));
    }
}
```

看`org.apache.commons.validator.DateValidator#isValid`源码可以发现，内部是通过`DateFormat`和`SimpleDateFormat`实现的。



# 字符串⭐⭐

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031137939.png" alt="image-20230103113702781" style="zoom:67%;" />

## 字符串的特点

> String类定义的变量可以用于存储字符串，同时String类提供了很多操作字符串的功能，我们可以直接使用。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031136831.png" alt="image-20230103113602631" style="zoom:80%;" />

## String 概述

> - java.lang.String 类代表字符串，**String类定义的变量可以用于指向字符串对象，然后操作该字符串。**
> - Java 程序中的所有字符串文字（例如“abc”）都为此类的对象。
> - **String其实常被称为不可变字符串类型，它的对象在创建后不能被更改**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031140835.png" alt="image-20230103114028671" style="zoom:80%;" />

从上述代码可以看出字符串变量name指向的字符串对象，**那为何还说字符串不可变呢？**

> - String变量每次的修改其实都是**产生并指向了新的字符串对象。**
> - 原来的字符串对象都是没有改变的，所以称不可变字符串。

**字符串对象存在哪里？** 以“”方式给出的字符串对象，在字符串常量池中存储。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031142343.png" alt="image-20230103114223170" style="zoom:67%;" />



## 创建字符串对象

方式一：直接使用“”定义。（推荐方式）

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031151013.png" alt="image-20230103115132873" style="zoom:80%;" />

方式二：通过String类的构造器创建对象。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031151786.png" alt="image-20230103115155621" style="zoom: 50%;" />

有什么区别吗？（面试常考）

> - 以“”方式给出的字符串对象，在字符串常量池中存储，而且相同内容只会在其中存储一份。
> - 通过构造器new对象，每new一次都会产生一个新对象，放在堆内存中。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031153028.png" alt="image-20230103115338878" style="zoom:67%;" />

```java
public static void main(String[] args) {
    // 方式一：直接使用双引号得到字符串对象
    String name = "我爱你中国";
    System.out.println(name);

    // 方式二：
    // 1、public String(): 创建一个空白字符串对象，不含有任何内容 （几乎不用）
    String s1 = new String(); // s1 = ""
    System.out.println(s1);

    // 2、public String(String): 根据传入的字符串内容，来创建字符串对象（几乎不用）
    String s2 = new String("我是中国人");
    System.out.println(s2);

    // 3、public String(char[] c): 根据字符数组的内容，来创建字符串对象
    char[] chars = {'a' , 'b' , '中', '国'};
    String s3 = new String(chars);
    System.out.println(s3);

    // 4、public String(byte[] b):  根据字节数组的内容，来创建字符串对象
    byte[] bytes = {97, 98, 99, 65, 66, 67};
    String s4 = new String(bytes);
    System.out.println(s4);

    System.out.println("---------------------------------------");
    String ss1 = "abc";
    String ss2 = "abc";
    System.out.println(ss1 == ss2);

    char[] chars1 = {'a' , 'b' , 'c'};
    String ss3 = new String(chars1);
    String ss4 = new String(chars1);
    System.out.println(ss3 == ss4);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031216744.png" alt="image-20230103121616608" style="zoom:67%;" />

## 字符串内容比较

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031144397.png" alt="image-20230103114453230" style="zoom:67%;" />

![image-20211016132732479](https://edu-8673.oss-cn-beijing.aliyuncs.com/img/image-20211016132732479.png)

```java
public static void main(String[] args) {
    // 1、正确登录名和密码
    String okName = "itheima";
    String okPassword = "123456";

    // 2、请您输入登录名称和密码
    Scanner sc = new Scanner(System.in);
    System.out.println("登录名称：");
    String name = sc.next();
    System.out.println("登录密码：");
    String password = sc.next();

    // 3、判断用户输入的登录名称和密码与正确的内容是否相等。
    if(okName.equals(name) && okPassword.equals(password)){
        System.out.println("登录成功！");
    }else {
        System.out.println("用户名或者密码错误了！");
    }

    // 4、忽略大小写比较内容的Api: 一般用于比较验证码这样的业务逻辑
    String sysCode = "23AdFh";
    String code1 = "23aDfH";
    System.out.println(sysCode.equals(code1)); // false
    System.out.println(sysCode.equalsIgnoreCase(code1)); // true
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031213028.png" alt="image-20230103121319872" style="zoom:67%;" />

## 字符串常用API⭐⭐

### 基本方法

> **字符串是一个不可变的类型（final类），几乎所有的字符串操作都会返回一个新字符串而不是在原有基础上进行修改**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071422614.png" alt="image-20211016155303074" style="zoom:80%;" />

### 字符串判空⭐

方式一

```java
public static void s1(String str) {
    if (str == null || "".equals(str)) {
        System.out.println("学校名称为空");
    } else {
        System.out.println("学校名称为：" + str);
    }
}
```

方式二

```java
public static void s1(String str) {
    if (str == null || str.isEmpty()) {
        System.out.println("学校名称为空");
    } else {
        System.out.println("学校名称为：" + str);
    }
}
```

### length 字符串长度

```java
String s3 = " 天津理工大学 计算机科学与工程学院 ";
System.out.println(s3.length()); //19
```

### replace 字符串替换

```java
String str1 = "Hello World";
//字符串替换,替换所有,用字符newChar替换当前字符串中所有的oldChar字符，并返回一个新的字符串
System.out.println("r8 : " + str1.replace("o", "h"));
//字符串替换,替换所有
System.out.println("r9 : " + str1.replaceAll("o", "h"));
//字符串替换,替换第一个
System.out.println("r10 : " + str1.replaceFirst("o", "h"));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071407131.png" alt="image-20220807140710003" style="zoom:67%;" />

### toUpperCase 大小写转换

```java
String str1 = "Hello World";
//字符串转大写
System.out.println("r13 : " + str1.toUpperCase());
//字符串转小写
System.out.println("r14 : " + str1.toLowerCase());
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071410528.png" alt="image-20220807141004427" style="zoom:67%;" />

### contains|index|lastIndex字符串查找

```java
//是否包含
System.out.println("r5 : " + str1.contains("llo"));
//字符串查找indexOf，返回的是找到的第一个的位置，没找到返回-1。从0开始
System.out.println("r5 : " + str1.indexOf("llo"));
//查找字符串最后一次出现的位置lastIndexOf
System.out.println("r6 : " + str1.lastIndexOf("llo"));
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071418992.png" alt="image-20220807141807892" style="zoom:67%;" />

### substring字符串截取⭐

```java
//删除字符串中的一个字符,字符串从0开始的 substring(a, b)
//返回指定起始位置（含）到结束位置（不含）之间的字符串
// substring(start, end)，substring(start)
// r7 : HelloWorld
System.out.println("r7 : " + str1.substring(0, 5) + str1.substring(6));
```

### startsWith 判断开头结尾

```java
//测试此字符串是否以指定的后缀结束
System.out.println("r18 : " + str1.endsWith("d"));
//测试此字符串是否以指定的前缀开始
System.out.println("r19 : " + str1.startsWith("H"));
//测试此字符串从指定索引开始的子字符串是否以指定前缀开始
System.out.println("r20 : " + str1.startsWith("ll", 2));
```

### equals 字符串判相等

```java
//比较字符串的内容是否相同
System.out.println("r22 : " + str1.equals(str2));
//与equals方法类似，忽略大小写
System.out.println("r23 : " + str1.equalsIgnoreCase(str2));
```

### compareTo 字符串比较大小

```java
//比较两个字符串的大小compareTo(返回的是int),0相等，复数小于，正数大于
System.out.println("r2 : " + str1.compareTo(str2));
//比较两个字符串的大小compareTo(返回的是int),0相等，复数小于，正数大于
System.out.println("r3 : " + str1.compareTo(str3));
//字符串比较compareToIgnoreCase，忽略大小写。0相等，复数小于，正数大于
System.out.println("r4 : " + str1.compareToIgnoreCase(str3));
```

### trim 去空格

```java
//去掉首尾空格
System.out.println("r15 : " + str4.trim());
```

### reverse 字符串反转

```java
//字符串反转
System.out.println("r11 : " + new StringBuffer(str1).reverse());
```

### toCharArray 字符串转字符数组

```java
char[] chars = s3.toCharArray();
System.out.println(chars); //天津理工大学 计算机科学与工程学院 
```

### charAt 指定位置字符 | 遍历字符串

```java
//返回指定位置字符
System.out.println("r17 : " + str1.charAt(4));
```

```java
System.out.println("------------遍历字符串中的每个字符--------------");
String name = "我爱你中国love";
for (int i = 0; i < name.length(); i++) {
    char ch = name.charAt(i);
    System.out.println(ch);
}
```

### concat字符串拼接

```java
//将指定字符串连接到此字符串的结尾。等价于用“+”
System.out.println("r21 : " + str1.concat("haha"));
```

### split 字符串分隔成数组

```java
String name4 = "王宝强,贾乃亮,陈羽凡";
String[] names = name4.split(",");
for (int i = 0; i < names.length; i++) {
    System.out.println("选择了：" + names[i]);
}
```

### valueOf 强转字符串

```java
String s1 = String.valueOf(12.99);
System.out.println(s1);
```

### 完整案例演示⭐⭐

```java
public static void test() {
    String str1 = "Hello World";
    String str2 = "Hello World";
    String str3 = "hello world";
    String str4 = " hello world ";
    //返回字符串的长度
    System.out.println("r1: " + str1.length());
    //比较两个字符串的大小compareTo(返回的是int),0相等，复数小于，正数大于
    System.out.println("r2 : " + str1.compareTo(str2));
    //比较两个字符串的大小compareTo(返回的是int),0相等，复数小于，正数大于
    System.out.println("r3 : " + str1.compareTo(str3));
    //字符串比较compareToIgnoreCase，忽略大小写。0相等，复数小于，正数大于
    System.out.println("r4 : " + str1.compareToIgnoreCase(str3));
    //字符串查找indexOf，返回的是找到的第一个的位置，没找到返回-1。从0开始
    System.out.println("r5 : " + str1.indexOf("o"));
    //查找字符串最后一次出现的位置lastIndexOf
    System.out.println("r6 : " + str1.lastIndexOf("o"));
    //删除字符串中的一个字符,字符串从0开始的 substring(a, b)
    //返回指定起始位置（含）到结束位置（不含）之间的字符串
    System.out.println("r7 : " + str1.substring(0, 5) + str1.substring(6));
    //字符串替换,替换所有
    System.out.println("r8 : " + str1.replace("o", "h"));
    //字符串替换,替换所有
    System.out.println("r9 : " + str1.replaceAll("o", "h"));
    //字符串替换,替换第一个
    System.out.println("r10 : " + str1.replaceFirst("o", "h"));
    //字符串反转
    System.out.println("r11 : " + new StringBuffer(str1).reverse());
    //字符串反转
    System.out.println("r11’: " + new StringBuilder(str1).reverse());
    //字符串分割
    String[] temp = str1.split("\\ ");
    for (String str : temp) {
        System.out.println("r12 : " + str);
    }
    //字符串转大写
    System.out.println("r13 : " + str1.toUpperCase());
    //字符串转小写
    System.out.println("r14 : " + str1.toLowerCase());
    //去掉首尾空格
    System.out.println("r15 : " + str4.trim());
    //是否包含,大小写区分
    System.out.println("r16 : " + str1.contains("World"));
    //返回指定位置字符
    System.out.println("r17 : " + str1.charAt(4));
    //测试此字符串是否以指定的后缀结束
    System.out.println("r18 : " + str1.endsWith("d"));
    //测试此字符串是否以指定的前缀开始
    System.out.println("r19 : " + str1.startsWith("H"));
    //测试此字符串从指定索引开始的子字符串是否以指定前缀开始
    System.out.println("r20 : " + str1.startsWith("ll", 2));
    //将指定字符串连接到此字符串的结尾。等价于用“+”
    System.out.println("r21 : " + str1.concat("haha"));
    //比较字符串的内容是否相同
    System.out.println("r22 : " + str1.equals(str2));
    //与equals方法类似，忽略大小写
    System.out.println("r23 : " + str1.equalsIgnoreCase(str2));
    //判断是否是空字符串
    System.out.println("r24:  " + str1.isEmpty());  
}
```

## 字符和字节

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012142726.png" alt="image-20220601214219630" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012142976.png" alt="image-20220601214239886" style="zoom:80%;" />

首先，让我们先看个例子：

```java
public class Main {
    public static void main(String[] args) {
        // 中文常见字
        String s = "你好";
        System.out.println("1. string length =" + s.length());
        System.out.println("1. string bytes length =" + s.getBytes().length);
        System.out.println("1. string char length =" + s.toCharArray().length);
        System.out.println();
        // emojis
        s = "👦👩";
        System.out.println("2. string length =" + s.length());
        System.out.println("2. string bytes length =" + s.getBytes().length);
        System.out.println("2. string char length =" + s.toCharArray().length);
        System.out.println();
        // 中文生僻字
        s = "𡃁妹";
        System.out.println("3. string length =" + s.length());
        System.out.println("3. string bytes length =" + s.getBytes().length);
        System.out.println("3. string char length =" + s.toCharArray().length);
        System.out.println();
    }
}
```

运行这个程序，你觉得输出结果是什么？

输出结果:

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.8.30/202208071507978.png" alt="image-20220807150744815" style="zoom:67%;" />

我们知道， String.getBytes()如果不指定编码格式，Java会使用操作系统的编码格式得到字节数组，在我的MacOS中，默认使用UTF-8作为字符编码(locale命令可以查看操作系统的编码)，所以在我的机器运行，String.getBytes()会返回UTF-8编码的字节数组。

- String.length返回Unicode code units的长度。
- String.toCharArray返回字符数组。

我们设置的字符串都是两个unicode字符，输出结果：

- **普通的中文字：**字符串的长度是2，每个中文字按UTF-8编码是三个字节，字符数组的长度看起来也没问题
- **emojis字符：**我们设置了两个emojis字符，男女头像。结果字符串的长度是4, UTF-8编码8个字节，字符数组的长度是4
- **生僻的中文字：**我们设置了两个中文字，其中一个是生僻的中文字。结果字符串的长度是3， UTF-8编码7个字节，字符数组的长度是3

国外的有些用户用emojis字符做自己的昵称，导致有些系统不能正确的显示出来，这是因为这些系统粗暴的使用Charactor来表示，在显示的时候截断的时候有时候可能不是在正确的代码点上进行截断。

我们在进行字符串截取的时候,比如String.substring有可能会踩到一些坑，尤其经常使用的emojis字符。

自 Java 1.5 java.lang.String就提供了Code Point方法， 用来获取完整的Unicode字符和Unicode字符数量:

```java
public int codePointAt(int index)
public int codePointBefore(int index)
public int codePointCount(int beginIndex, int endIndex)
```

注意这些方法中的index使用的是code unit值。

## 字符串强转

**1、toString()，可能会抛空指针异常**

在这种使用方法中，因为java.lang.Object类里已有public方法.toString()，所以java对象都可以调用此方法。但在使用时要注意，必须保证object不是null值，否则将抛出NullPointerException异常。采用这种方法时，通常派生类会覆盖Object里的toString()方法。



**2、String.valueOf()，推荐使用，返回字符串“null”**

String.valueOf()方法是小编推荐使用的，因为它不会出现空指针异常，而且是静态的方法，直接通过String调用即可，只是有一点需要注意，就是上面提到的，如果为null，String.valueOf()返回结果是字符串“null”。而不是null。String.valueOf()比toString多了一个非空判断。



**3、String强转，不推荐使用**

String是标准的类型转换，将Object类型转为String类型，使用String强转时，最好使用instanceof做一个类型检查，以判断是否可以进行强转，否则容易抛出ClassCastException异常。需要注意的是编写的时候，编译器并不会提示有语法错误，所以这个方法要谨慎的使用。



## String常见面试题

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.5.13/202206012128904.png" alt="image-20220601212838791" style="zoom:80%;" />

### 创建对象的两种方式

### 通过“”定义字符串内存原理

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031155684.png" alt="image-20230103115512503" style="zoom: 50%;" />

### 通过new构造器得到字符串对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031156420.png" alt="image-20230103115639250" style="zoom:67%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031157201.png" alt="image-20230103115729020" style="zoom:80%;" />

Java存在编译优化机制，程序在编译时： **“a”** + **“b”** + **“c”** **会直接转成** "abc"

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301031158201.png" alt="image-20230103115802038" style="zoom:67%;" />

### 如何比较字符串相同？

在java中比较对象是否相同，通常有两种方法：

- `==`
- `equals`方法

注意`==`用于基本数据类型的比较和用于引用类型的比较的区别。

> ==比较基本数据类型，比较的是值
>
> ==比较引用数据类型，比较的是地址值

另外，`String`对`equals`方法进行了重写，所以比较字符串咱们还是要使用`equals`方法来比较。主要是`String`的`equals`方法里包含了`==`的判断（请看前面源码分析部分）。

**案例**

```java
public class StringDemo {
   public static void main(String[] args) {
     String st1 = "abc";
     String st2 = "abc";
     System.out.println(st1 == st2);
     System.out.println(st1.equals(st2)); 
   }
}
```

输出

```java
true
true
```



### String str=new String("abc")创建了几个对象

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071317523.png" alt="image-20220607131719433" style="zoom:80%;" />

看下面这段代码：

```java
String str1 = "abc";  // 在常量池中
String str2 = new String("abc"); // 在堆上
```

关于这段代码，创建了几个对象，网上答案有多重，1个，2个还有3个的。下面我们就来聊聊到底是几个？

首先，我们需要明确的是；不管是str1还是str2，他们都是String类型的变量，不是对象，平时，可能我们会叫str2对象，那只是为了便于理解，本质上来说str2、str1都不是对象。

其次，`String str="abc"；`的时候，字符串“abc”会被存储在字符串常量池中，只有1份，此时的赋值操作等于是创建0个或1个对象。如果常量池中已经存在了“abc”，那么不会再创建对象，直接将引用赋值给str1；如果常量池中没有“abc”，那么创建一个对象，并将引用赋值给str1。

那么，通过new String("abc");的形式又是如何呢？

> 答案是1个或2个。

当JVM遇到上述代码时，会先检索常量池中是否存在“abc”，如果不存在“abc”这个字符串，则会先在常量池中创建这个一个字符串。然后再执行new操作，会在堆内存中创建一个存储“abc”的String对象，对象的引用赋值给str2。此过程创建了2个对象。

当然，如果检索常量池时发现已经存在了对应的字符串，那么只会在堆内创建一个新的String对象，此过程只创建了1个对象。

> 最后，如果单独问`String str=new String("abc");`创建了几个对象，切记：常量池中是否存在"abc"，存在，创建一个对象；不存在创建两个对象。

### String | StringBuilder | StringBuffer区别

**线程安全性**

String 中的对象是不可变的，也就可以理解为常量，线程安全。AbstractStringBuilder 是 StringBuilder 与 StringBuffer 的公共父类，定义了一些字符串的基本操作，如 expandCapacity、append、insert、indexOf 等公共方法。StringBuffer 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。StringBuilder 并没有对方法进行加同步锁，所以是非线程安全的。

**性能**

每次对 String 类型进行改变的时候，都会生成一个新的 String 对象，然后将 指针指向新的 String 对象。StringBuffer 每次都会对 StringBuffer 对象本身进行操作，而不是生成新的对象并改变对象引用。相同情况下使用 StringBuilder 相比使用 StringBuffer 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。

对于三者使用的总结：

- 操作少量的数据 ，推荐使用`String`
- 单线程操作字符串缓冲区下操作大量数据，推荐使用 `StringBuilder`
- 多线程操作字符串缓冲区下操作大量数据 ，推荐使用 `StringBuffer`

### String 和 JVM有什么关系

String 常见的创建方式有两种，new String() 的方式和直接赋值的方式，直接赋值的方式会先去字符串常量池中查找是否已经有此值，如果有则把引用地址直接指向此值，否则会先在常量池中创建，然后再把引用指向此值；而 new String() 的方式一定会先在堆上创建一个字符串对象，然后再去常量池中查询此字符串的值是否已经存在，如果不存在会先在常量池中创建此字符串，然后把引用的值指向此字符串。

**JVM中的常量池**

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207211750778.png" alt="image-20220721175038662" style="zoom:80%;" />

**字面量—文本字符串**，也就是我们举例中的 `public String s = " abc ";` 中的 "abc"。

用 final 修饰的成员变量，包括静态变量、实例变量和局部变量。

请看下面这段代码：

```java
String s1 = new String("Java");
String s2 = s1.intern();
String s3 = "Java";
System.out.println(s1 == s2); // false
System.out.println(s2 == s3); // true
```

它们在 JVM 存储的位置，如下图所示：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207211751679.png" alt="image-20220721175101565" style="zoom:80%;" />

> 注意：JDK 1.7 之后把永生代换成的元空间，把字符串常量池从方法区移到了 Java 堆上。

除此之外编译器还会对 String 字符串做一些优化，例如以下代码：

```java
String s1 = "Ja" + "va";
String s2 = "Java";
System.out.println(s1 == s2);
```

虽然 s1 拼接了多个字符串，但对比的结果却是 true，我们使用反编译工具，看到的结果如下：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071317881.png" alt="image-20220607131751793" style="zoom: 67%;" />

从编译代码 #2 可以看出，代码 "Ja"+"va" 被直接编译成了 "Java" ，因此 s1==s2 的结果才是 true，这就是编译器对字符串优化的结果。

### 判断两个字符串中含有几个相同字符

- 将字符串转化成数组
- HashMap 方法
- 字符串直接进行比较
- 正则表达式
- HashSet 方法

### String有没有长度限制？是多少

下面先看看length方法源码：

```java
private final char value[];
public int length() {
        return value.length;
}
```

length()方法返回的是int类型，那可以得知String类型的长度肯定不能超过`Integer.MAX_VALUE`的。

答：首先字符串的内容是**由一个字符数组 char[] 来存储**的，由于数组的长度及索引是整数，且String类中返回字符串长度的方法length() 的返回值也是**int** ，所以通过查看java源码中的类Integer我们可以看到Integer的最大范围是2^31 -1,由于数组是从0开始的，所以**数组的最大长度可以使【0~2^31】**通过计算是大概4GB。

但是通过翻阅java虚拟机手册对class文件格式的定义以及常量池中对String类型的结构体定义我们可以知道对于**索引定义了u2，就是无符号占2个字节**，2个字节可以表示的最大范围是**2^16 -1 = 65535**。

但是由于**JVM需要1个字节表示结束指令**，所以这个范围就为**65534**了。超出这个范围在编译时期是会报错的，但是运行时拼接或者赋值的话范围是在整形的最大范围。

### 字符串对象能否用在switch表达式

从`JDK7`开始的话，我们就可以在switch条件表达式中使用字符串了，也就是说7之前的版本是不可以的。

```java
switch (str.toLowerCase()) {
      case "tian":
           value = 1;
           break;
      case "jiang":
           value = 2;
           break;
}
```

### 说说String中intern方法

在`JDK7`之前的版本，调用这个方法的时候，会去常量池中查看是否已经存在这个常量了，如果已经存在，那么直接返回这个常量在常量池中的地址值，如果不存在，则在常量池中创建一个，并返回其地址值。

但是在`JDK7`以及之后的版本中，常量池从perm区搬到了heap区。intern检测到这个常量在常量池中不存在的时候，不会直接在常量池中创建该对象了，而是将堆中的这个对象的引用直接存到常量池中，减少内存开销。

下面的案例

```java
public class InternTest {
  public static void main(String[] args) {
    String str1 = new String("hello") + new String("world");
    str1.intern();
    String str2 = "helloworld";
    System.out.println(str1 == str2);//true
    System.out.println(str1.intern() == str2);//true
  }
}
```



## StringBuilder

> StringBuilder是一个可变的字符串的操作类，我们可以把它看成是一个对象容器。
>
> 使用StringBuilder的核心作用：**操作字符串的性能比String要更高（如拼接、修改等）**。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041518789.png" alt="image-20230104151853719" style="zoom:67%;" />

### 和String的区别

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012158699.png" alt="image-20220601215846606" style="zoom:80%;" />

### 常用方法

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041517325.png" alt="image-20230104151732237" style="zoom:80%;" />

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206012157539.png" alt="image-20220601215712447" style="zoom:80%;" />

### API 演示

#### 拼接和反转方法

```java
StringBuilder s6 = new StringBuilder();
s6.append("ren");
s6.append("shuo");
s6.append("nihao").append("maoyan");
System.out.println(s6); //renshuonihaomaoyan
s6.reverse();
System.out.println(s6); //nayoamoahinouhsner
```

#### 输出字符串长度

```java
int length = s6.length();
System.out.println(length);
```

#### StringBuilder和String相互转换⭐

1、StringBilder转String

```java
// 注意：StringBuilder只是拼接字符串的手段：效率好。
// 最终的目的还是要恢复成String类型。
StringBuilder s7 = new StringBuilder();
s7.append("java");
String s = s7.toString();
System.out.println(s);
```

2、String转StringBuilder

```java
String a1 = "hello";
StringBuilder sb = new StringBuilder(a1);
System.out.println(sb);
```

### 案例：打印整型数组内容

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041524307.png" alt="image-20230104152423225" style="zoom:67%;" />

```java
public class StringBuilderTest2 {
    public static void main(String[] args) {
        int[] arr1 = null;
        System.out.println(toString(arr1));

        int[] arr2 = {10, 88, 99};
        System.out.println(toString(arr2));

        int[] arr3 = {};
        System.out.println(toString(arr3));
    }

    // 1、定义方法接收任意整型数组，返回数组内容格式
    public static String toString(int[] arr){
       if(arr != null){
            // 2、开始拼接内容。
           StringBuilder sb = new StringBuilder("[");
           for (int i = 0; i < arr.length; i++) {
               sb.append(arr[i]).append(i == arr.length - 1 ? "" : ", ");
           }
           sb.append("]");
           return sb.toString();
       }else {
           return null;
       }
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301041525587.png" alt="image-20230104152540519" style="zoom:80%;" />

## 字符串拼接一般方法

### 1. “+”号操作符

要说姿势，“+”号操作符必须是字符串拼接最常用的一种了，没有之一。

```java
String chenmo = "沉默";
String wanger = "王二";

System.out.println(chenmo + wanger);
```

我们把这段代码使用 JAD 反编译一下。

```java
String chenmo = "\u6C89\u9ED8"; // 沉默
String wanger = "\u738B\u4E8C"; // 王二
System.out.println((new StringBuilder(String.valueOf(chenmo))).append(wanger).toString());
```

我去，原来编译的时候把“+”号操作符替换成了 StringBuilder 的 append 方法。也就是说，“+”号操作符在拼接字符串的时候只是一种形式主义，让开发者使用起来比较简便，代码看起来比较简洁，读起来比较顺畅。算是 Java 的一种语法糖吧。

### 2. StringBuilder

除去“+”号操作符，StringBuilder 的 append 方法就是第二个常用的字符串拼接姿势了。

先来看一下 StringBuilder 类的 append 方法的源码：

```java
public StringBuilder append(String str) {
    super.append(str);
    return this;
}
```

这 3 行代码没啥可看的，可看的是父类 AbstractStringBuilder 的 append 方法：

```java
public AbstractStringBuilder append(String str) {
    if (str == null)
        return appendNull();
    int len = str.length();
    ensureCapacityInternal(count + len);
    str.getChars(0, len, value, count);
    count += len;
    return this;
}
```

1）判断拼接的字符串是不是 null，如果是，当做字符串“null”来处理。`appendNull` 方法的源码如下：

```java
private AbstractStringBuilder appendNull() {
    int c = count;
    ensureCapacityInternal(c + 4);
    final char[] value = this.value;
    value[c++] = 'n';
    value[c++] = 'u';
    value[c++] = 'l';
    value[c++] = 'l';
    count = c;
    return this;
}
```

2）拼接后的字符数组长度是否超过当前值，如果超过，进行扩容并复制。`ensureCapacityInternal` 方法的源码如下：

```java
private void ensureCapacityInternal(int minimumCapacity) {
    // overflow-conscious code
    if (minimumCapacity - value.length > 0) {
        value = Arrays.copyOf(value,
                newCapacity(minimumCapacity));
    }
}
```

3）将拼接的字符串 str 复制到目标数组 value 中。

```java
str.getChars(0, len, value, count)
```

### 3. StringBuffer

先有 StringBuffer 后有 StringBuilder，两者就像是孪生双胞胎，该有的都有，只不过大哥 StringBuffer 因为多呼吸两口新鲜空气，所以是线程安全的。

```java
public synchronized StringBuffer append(String str) {
    toStringCache = null;
    super.append(str);
    return this;
}
```

StringBuffer 类的 append 方法比 StringBuilder 多了一个关键字 synchronized，可暂时忽略 `toStringCache = null`。

synchronized 是 Java 中的一个非常容易脸熟的关键字，是一种同步锁。它修饰的方法被称为同步方法，是线程安全的。

### 4. String 类的 concat 方法

单就姿势上来看，String 类的 concat 方法就好像 StringBuilder 类的 append。

```java
String chenmo = "沉默";
String wanger = "王二";

System.out.println(chenmo.concat(wanger));
```

文章写到这的时候，我突然产生了一个奇妙的想法。假如有这样两行代码：

```java
chenmo += wanger
chenmo = chenmo.concat(wanger)
```

它们之间究竟有多大的差别呢？

之前我们已经了解到，`chenmo += wanger` 实际上相当于 `(new StringBuilder(String.valueOf(chenmo))).append(wanger).toString()`。

要探究“+”号操作符和 `concat` 之间的差别，实际上要看 append 方法和 concat 方法之间的差别。

append 方法的源码之前分析过了。我们就来看一下 concat 方法的源码吧。

```java
public String concat(String str) {
    int otherLen = str.length();
    if (otherLen == 0) {
        return this;
    }
    int len = value.length;
    char buf[] = Arrays.copyOf(value, len + otherLen);
    str.getChars(buf, len);
    return new String(buf, true);
}
```

1）如果拼接的字符串的长度为 0，那么返回拼接前的字符串。

```java
if (otherLen == 0) {
    return this;
}
```

2）将原字符串的字符数组 value 复制到变量 buf 数组中。

```java
char buf[] = Arrays.copyOf(value, len + otherLen);
```

3）把拼接的字符串 str 复制到字符数组 buf 中，并返回新的字符串对象。

```java
str.getChars(buf, len);
return new String(buf, true);
```

通过源码分析我们大致可以得出以下结论：

1）如果拼接的字符串是 null，concat 时候就会抛出 NullPointerException，“+”号操作符会当做是“null”字符串来处理。

2）如果拼接的字符串是一个空字符串（""），那么 concat 的效率要更高一点。毕竟不需要 `new StringBuilder` 对象。

3）如果拼接的字符串非常多，concat 的效率就会下降，因为创建的字符串对象越多，开销就越大。

**注意了！****！！**

弱弱地问一下啊，还有在用 JSP 的同学吗？EL 表达式中是不允许使用“+”操作符来拼接字符串的，这时候就只能用 `concat` 了。

```java
${chenmo.concat('-').concat(wanger)}
```

### 5. String 类的 join 方法

JDK 1.8 提供了一种新的字符串拼接姿势：String 类增加了一个静态方法 join。

```java
String chenmo = "沉默";
String wanger = "王二";
String cmower = String.join("", chenmo, wanger);
System.out.println(cmower);
```

第一个参数为字符串连接符，比如说：

```java
String message = String.join("-", "王二", "太特么", "有趣了");
```

输出结果为：王二-太特么-有趣了

我们来看一下 join 方法的源码：

```java
public static String join(CharSequence delimiter, CharSequence... elements) {
    Objects.requireNonNull(delimiter);
    Objects.requireNonNull(elements);
    // Number of elements not likely worth Arrays.stream overhead.
    StringJoiner joiner = new StringJoiner(delimiter);
    for (CharSequence cs: elements) {
        joiner.add(cs);
    }
    return joiner.toString();
}
```

发现了一个新类 StringJoiner，类名看起来很 6，读起来也很顺口。StringJoiner 是 `java.util` 包中的一个类，用于构造一个由分隔符重新连接的字符序列。限于篇幅，本文就不再做过多介绍了，感兴趣的同学可以去了解一下。

### 6. StringUtils.join

实战项目当中，我们处理字符串的时候，经常会用到这个类——`org.apache.commons.lang3.StringUtils`，该类的 join 方法是字符串拼接的一种新姿势。

```java
String chenmo = "沉默";
String wanger = "王二";
StringUtils.join(chenmo, wanger);
```

该方法更善于拼接数组中的字符串，并且不用担心 NullPointerException。

```java
StringUtils.join(null)            = null
StringUtils.join([])              = ""
StringUtils.join([null])          = ""
StringUtils.join(["a", "b", "c"]) = "abc"
StringUtils.join([null, "", "a"]) = "a"
```

通过查看源码我们可以发现，其内部使用的仍然是 StringBuilder。

大家读到这，不约而同会有这样一种感觉：我靠（音要拖长），没想到啊没想到，字符串拼接足足有 6 种姿势啊，晚上回到家一定要一一尝试下。

### 7. String.format(推荐)

这时可以使用`String.format`方法优化：

```java
String requestUrl = "http://susan.sc.cn?userName=%s&age=%s&address=%s&sex=%s&roledId=%s";
String url = String.format(requestUrl,userName,age,address,sex,roledId);
```

代码的可读性，一下子提升了很多。

我们平常可以使用`String.format`方法拼接url请求参数，日志打印等字符串。



### 8. 不建议在 for 中用”+”号拼接

他一定会明白为什么阿里巴巴不建议在 for 循环中使用”+”号操作符进行字符串拼接了。

来看两段代码。

第一段，for 循环中使用”+”号操作符。

```java
String result = "";
for (int i = 0; i < 100000; i++) {
    result += "六六六";
}
```

第二段，for 循环中使用 append。

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append("六六六");
}
```

这两段代码分别会耗时多长时间呢？在我的 iMac 上测试出的结果是：

1）第一段代码执行完的时间为 6212 毫秒

2）第二段代码执行完的时间为 1 毫秒



## 字符串拼接StringJoiner

[你只会用 StringBuilder？试试 StringJoiner，真香！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247488117&idx=1&sn=ec8c334c6e4403bf9635cba82d8fb704&chksm=fc2fae7dcb58276bdb8b4577f2016f70e2998a5fe43b3856e8db5f3fe37bcddbf1ddcb6a4600&mpshare=1&scene=23&srcid=051091aFAvJBg6WBtIIbpK8a&sharer_sharetime=1652146471443&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

### 基本使用

字面上理解就是用来拼接字符串的，一般需要分隔符进行拼接，如：

> hello, guys, 欢迎使用StringJoiner

这种三段式由 "," 分隔的字符串，在 Java 8 之前要使用 StringBuilder/ StringBuffer 进行拼接，如：

```java
public static void t1() {
    StringBuilder sb = new StringBuilder();
    sb.append("hello");
    sb.append(",");
    sb.append("欢迎使用StringJoiner");
    String str = sb.toString();
    System.out.println(str);
}
```

都是相同的分隔符逗号，这样拼接显然过于傻瓜式，如果要拼接的字符串非常多，代码会十分难看，写完感觉要崩溃。

然而 Java 8 之后有了 StringJoiner，这件事件就变得更简单，分隔符这种全部一次性交给 StringJoiner 即可。

StringJoiner 基本使用示例：

```java
public static void t1() {
    StringJoiner stringJoiner = new StringJoiner(",");
    stringJoiner.add("hello");
    stringJoiner.add("guys");
    stringJoiner.add("欢迎使用StringJoiner");
    System.out.println(stringJoiner.toString());
}
```

输出：

> hello,guys,欢迎使用StringJoiner

可以看到，这样写十分的干净清爽，也省去了许多没有必要的分隔符拼接操作，代码更优雅、只是可读性没 SB 直接拼接那么直观。

### 相关方法

StringJoiner 还有其他几种用法，下面的篇幅栈长会带大家解读一下。

它的父类就是 Object，这些成员变量和方法都有什么用呢？

成员变量

- prefix：拼接后的字符串前缀
- delimiter：拼接时的字符串分隔符
- suffix：拼接后的字符串后缀
- value：拼接后的值
- emptyValue：空值的情况，value为 null 时返回

公开方法：

- setEmptyValue：设置空值
- toString：转换成 String
- add：添加字符串
- merge：从另一个 StringJoiner 合并
- length：长度（包括前缀后缀）

```java
public static void t1() {
    StringJoiner stringJoiner = new StringJoiner(",").add("hello")
                                .add("guys").add("欢迎使用StringJoiner");
    System.out.println(stringJoiner.toString());
}
```

> hello,guys,欢迎使用StringJoiner

### 前后缀拼接

在示例中需要指定前后缀：

```java
public static void t1() {
    //值依次是分割符 , 前缀  ,后缀
    StringJoiner stringJoiner = new StringJoiner(",", "[", "]");
    stringJoiner.add("hello");
    stringJoiner.add("guys");
    stringJoiner.add("欢迎使用StringJoiner");
    System.out.println(stringJoiner.toString());
}
```

> [hello,guys,欢迎使用StringJoiner]

如上所示，前后都带中括号进行了包装。

### 空值处理

没有拼接任何字符串的几个空值处理场景。

输出空白字符串：

```java
public static void t1() {
    StringJoiner stringJoiner = new StringJoiner(",");
    System.out.println(stringJoiner.toString());
}
```

输出前后缀：

```java
public static void t1() {
    StringJoiner stringJoiner = new StringJoiner(",", "[", "]");
    System.out.println(stringJoiner.toString());
}
```

输出：

> []

输出指定字符串：

通过 `setEmptyValue` 进行设置。

```java
public static void t1() {
    StringJoiner stringJoiner = new StringJoiner(",", "[", "]");
    stringJoiner.setEmptyValue("void");
    System.out.println(stringJoiner.toString());
}
```

输出：

> void

### 简化写法⭐

String.join() 这是针对 StringJoiner 又封装了一层的 API，同样出自 Java 8，可以传入动态参数或者迭代器。

- java.lang.String#join(java.lang.CharSequence, java.lang.CharSequence...)
- java.lang.String#join(java.lang.CharSequence, java.lang.Iterable<? extends java.lang.CharSequence>)

源码如下：

看源码，这两个方法只能进行简单的拼接操作，不能添加前后缀、空值设置处理等。

来个示例：

```java
public static void t1() {
    String str = String.join(",", "hello", "guys", "欢迎使用StringJoiner");
    System.out.println(str);
}
```

> hello,guys,欢迎使用StringJoiner

可以看到，简单处理这样使用更简便



### 总结

今天介绍了 StringJoiner、StringBuilder、String.join() 之间的关系及使用。在使用拼间多个相同的分隔符时，使用 StringJoiner，简单处理使用 String.join() 也能完成。

针对不同的场景使用不同的 API，这才是最佳最优雅的处理方式，不要只会使用 StringBuilder！



## 字符串工具(好用)

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
</dependency>
```

### 1. 字符串判空

#### isEmpty

是否为空. 可以看到 " " 空格是会绕过这种空判断,因为是一个空格,并不是严格的空值,会导致 `isEmpty(" ")=false`

```Java
String str = "";
// 原生写法
if (str == null || str.length() == 0) {
    // Do something
}
// StringUtils.isNotEmpty(str);
// commons写法
if (StringUtils.isEmpty(str)) {
    // Do something
}  
/* StringUtils.isEmpty(null)      = true
 * StringUtils.isEmpty("")        = true
 * StringUtils.isEmpty(" ")       = false
 * StringUtils.isEmpty("bob")     = false
 * StringUtils.isEmpty("  bob  ") = false
 */
```

#### isBlank

```Java
// 是否为真空值(空格或者空值)
/* 
 * null, 空串，空格为true
 * StringUtils.isBlank(null)      = true
 * StringUtils.isBlank("")        = true
 * StringUtils.isBlank(" ")       = true
 * StringUtils.isBlank("bob")     = false
 * StringUtils.isBlank("  bob  ") = false
 */
StringUtils.isBlank(str);
// isBlank取反
StringUtils.isNotBlank(str);
// 任意一个参数为空则结果为true
StringUtils.isAnyEmpty(str1, str2, str3);
// 所有参数为空则结果为true
StringUtils.isAllEmpty(str1, str2, str3);
```



### 2. 字符串去空格

```Java
// 去除两端空格，不需要判断null
String newStr = StringUtils.trim(str);
/*
 * 去除两端空格，如果是null则转换为空字符串
 * StringUtils.trimToEmpty(null)          = ""
 * StringUtils.trimToEmpty("")            = ""
 * StringUtils.trimToEmpty("     ")       = ""
 * StringUtils.trimToEmpty("abc")         = "abc"
 * StringUtils.trimToEmpty("    abc    ") = "abc"
 */
newStr = StringUtils.trimToEmpty(str);
/*
 * 去除两端空格，如果结果是空串则转换为null
 * StringUtils.trimToNull(null)          = null
 * StringUtils.trimToNull("")            = null
 * StringUtils.trimToNull("     ")       = null
 * StringUtils.trimToNull("abc")         = "abc"
 * StringUtils.trimToNull("    abc    ") = "abc"
 */
newStr = StringUtils.trimToNull(str);
/*
 * 去两端 给定字符串中任意字符
 * StringUtils.strip(null, *)          = null
 * StringUtils.strip("", *)            = ""
 * StringUtils.strip("abc", null)      = "abc"
 * StringUtils.strip("  abc", null)    = "abc"
 * StringUtils.strip("abc  ", null)    = "abc"
 * StringUtils.strip(" abc ", null)    = "abc"
 * StringUtils.strip("  abcyx", "xyz") = "  abc"
 */
newStr = StringUtils.strip(str, "stripChars");
// 去左端 给定字符串中任意字符
newStr = StringUtils.stripStart(str, "stripChars");
// 去右端 给定字符串中任意字符
newStr = StringUtils.stripEnd(str, "stripChars");
```



### 3. 字符串分割

```Java
/*
 * 按照空格分割字符串 结果为数组
 * StringUtils.split(null)       = null
 * StringUtils.split("")         = []
 * StringUtils.split("abc def")  = ["abc", "def"]
 * StringUtils.split("abc  def") = ["abc", "def"]
 * tringUtils.split(" abc ")    = ["abc"]
 */
StringUtils.split(str);
// 按照某些字符分割 结果为数组，自动去除了截取后的空字符串
StringUtils.split(str, ",");
```



### 4. 取子字符串

```Java
// 获得"ab.cc.txt"中最后一个.之前的字符串
StringUtils.substringBeforeLast("ab.cc.txt", "."); // ab.cc
// 相似方法
// 获得"ab.cc.txt"中最后一个.之后的字符串（常用于获取文件后缀名）
StringUtils.substringAfterLast("ab.cc.txt", "."); // txt
// 获得"ab.cc.txt"中第一个.之前的字符串
StringUtils.substringBefore("ab.cc.txt", "."); // ab
// 获得"ab.cc.txt"中第一个.之后的字符串
StringUtils.substringAfter("ab.cc.txt", "."); // cc.txt
// 获取"ab.cc.txt"中.之间的字符串
StringUtils.substringBetween("ab.cc.txt", "."); // cc
// 看名字和参数应该就知道干什么的了
StringUtils.substringBetween("a(bb)c", "(", ")"); // bb
```



### 5. 其他

```Java
// 首字母大写
StringUtils.capitalize("test"); // Test
// 字符串合并
StringUtils.join(new int[]{1,2,3}, ",");// 1,2,3
// 缩写
StringUtils.abbreviate("abcdefg", 6);// "abc..."
// 判断字符串是否是数字
StringUtils.isNumeric("abc123");// false
// 删除指定字符
StringUtils.remove("abbc", "b"); // ac
// ... ... 还有很多，感兴趣可以自己研究
```



### 6. 随机字符串

RandomStringUtils类的实现上也是依赖了工具类。java.util.Random

```java
public static void test3(){
    // 随机生成长度为5的字符串
    String random = RandomStringUtils.random(5);
    System.out.println(random);
    // 随机生成长度为5的"只含大小写字母"字符串
    String s = RandomStringUtils.randomAlphabetic(5);
    System.out.println(s);
    // 随机生成长度为5的"只含大小写字母和数字"字符串
    String s1 = RandomStringUtils.randomAlphanumeric(5);
    System.out.println(s1);
    // 随机生成长度为5的"只含数字"字符串
    String s2 = RandomStringUtils.randomNumeric(5);
    System.out.println(s2);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206021629172.png" alt="image-20220602162901074" style="zoom:80%;" />

```java
@Test
public void test1() {
    // Creates a 64 chars length random string of number.
    String result = RandomStringUtils.random(64, false, true);
    System.out.println("random = " + result);

    // Creates a 64 chars length of random alphabetic string.
    result = RandomStringUtils.randomAlphabetic(64);
    System.out.println("random = " + result);

    // Creates a 32 chars length of random ascii string.
    result = RandomStringUtils.randomAscii(32);
    System.out.println("random = " + result);

    // Creates a 32 chars length of string from the defined array of
    // characters including numeric and alphabetic characters.
    result = RandomStringUtils.random(32, 0, 20, true, true,
                                      "qw32rfHIJk9iQ8Ud7h0X".toCharArray());
    System.out.println("random = " + result);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207061604436.png" alt="image-20220706160432338" style="zoom:67%;" />

## 字符串案例

### 生成验证码

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071236128.png" alt="image-20220607123653039" style="zoom:80%;" />

```java
public static void r1() {
    // 1、定义可能出现的字符信息
    String datas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // 2、循环5次，每次生成一个随机的索引，提取对应的字符连接起来即可
    String code = "";
    Random r = new Random();
    for (int i = 0; i < 5; i++) {
        // 随机一个索引
        int index = r.nextInt(datas.length());
        char c = datas.charAt(index);
        code += c;
    }
    // 3、输出字符串变量即可
    System.out.println(code);
}
```



### 登录次数测试

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071236541.png" alt="image-20220607123626453" style="zoom:80%;" />

```java
public static void r1() {
    // 1、定义正确的登录名称和密码
    String okLoginName = "admin";
    String okPassword = "itheima";

    // 2、定义一个循环，循环3次，让用户登录
    Scanner sc = new Scanner(System.in);
    for (int i = 1; i <= 3; i++) {
        System.out.println("请您输入登录名称：");
        String loginName = sc.next();
        System.out.println("请您输入登录密码：");
        String password = sc.next();

        // 3、判断登录是否成功！
        if(okLoginName.equals(loginName)){
            // 4、判断密码是否正确
            if(okPassword.equals(password)){
                System.out.println("登录成功！欢迎进入系统随意浏览~~~~");
                break;
            }else {
                // 密码错误了
                System.out.println("您的密码不正确！您还剩余" + (3 - i) +"次机会登录！");
            }
        }else {
            System.out.println("您的登录名称不正确！您还剩余" + (3 - i) +"次机会登录！");
        }

    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071235203.png" alt="image-20220607123544125" style="zoom:80%;" />

### 手机号隐私保护

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071237661.png" alt="image-20220607123716581" style="zoom:80%;" />

```java
// 1、键盘录入一个手机号码
Scanner sc = new Scanner(System.in);
System.out.println("请您输入您的手机号码：");
String tel = sc.next();

// 2、截取号码的前三位，后四位    18665666520
String before = tel.substring(0, 3); // 0  1  2
String after = tel.substring(7);  // 从索引7开始截取到手机号码的末尾

String s = before + "****" + after;
System.out.println(s);
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.11/202206071259874.png" alt="image-20220607125924805" style="zoom:80%;" />

### 获取文件后缀

```java
String fileName = "java.txt";
String suffix = fileName.substring(fileName.lastIndexOf("."));
System.out.println("文件后缀："+suffix); // .txt
```



## 字符串小技巧案例

### 获取所有字符出现次数

1）声明一个 [LinkedHashMap](https://mp.weixin.qq.com/s?__biz=MzIxNzQwNjM3NA==&mid=2247488527&idx=1&sn=10d26bfc41e82cc3ebd0b9d12ba97ea0&scene=21#wechat_redirect)，也可以用 HashMap，不过前者可以保持字符串拆分后的顺序，结果看起来更一目了然。

为什么要用 Map 呢？因为 Map 的 key 是不允许重复的，刚好可以对重复的字符进行数量的累加。

2）把字符串拆分成字符，进行遍历。

3）如果 key 为 null 的话，就表明它的数量要 +1；否则的话，就在之前的值上 +1，然后重新 put 到 Map 中，这样就覆盖了之前的字符数量。

Map 新增了一个很厉害的方法 `merge()`，一次性为多个键赋值

```java
public static void printDistinctCharsWithCountMerge(String input) {
    Map<Character, Integer> chars = new LinkedHashMap<>();
    // 统计字符出现次数
    for (char c : input.toCharArray()) {
        // 如果字符是第一次出现，就赋值为 1；否则，就把之前的值 sum+1
        chars.merge(c, 1, Integer::sum);
    }
    System.out.println(chars);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.6.30/202207091409141.png" alt="image-20220709140953042" style="zoom:80%;" />

### 如何反转字符串

如果同学们对 StringBuilder 和 StringBuffer 很熟悉的话，这道题就很简单，直接 `reverse()` 就完事，对不对？

```java
public  static void reverseInputString(String input) {
    StringBuilder sb = new StringBuilder(input);
    String result = sb.reverse().toString();
    System.out.println(result);
}
```

多说一句，StringBuffer 和 StringBuilder 很相似，前者是同步的，所有 public 方法都加了 `synchronized` 关键字，可以在多线程中使用；后者是不同步的，没有 `synchronized` 关键字，所以性能更佳，没有并发要求的话，就用 StringBuilder。

### 如何判断字符串是回文

什么意思呢？就好像一个字符串，前后一折，是对称的。就像你站在镜子前，看到了一个玉树临风、闭月羞花的自己。

```java
public  static void checkPalindromeString(String input) {
    StringBuilder sb = new StringBuilder(input);
    sb.reverse();
    if (sb.toString().equals(input)) {
        System.out.println("对称");
    } else {
        System.out.println("不对称");
    }
}
```

### 如何删除所有出现的指定字符

字符串类没有提供 `remove()` 方法，但提供了 `replaceAll()` 方法，通过将指定的字符替换成空白字符就可以办得到，对吧？

```java
public static void removeCharFromString(String input, char c) {
    String result = input.replaceAll(String.valueOf(c), "");
    System.out.println(result);
}
```

### 如何证明字符串是不可变的？

字符串不可变的这个事我曾写过两篇文章，写到最后我都要吐了。但是仍然会有一些同学弄不明白，隔段时间就有人私信我，我就不得不把之前的文章放到收藏夹，问的时候我就把链接发给他。

之所以造成这个混乱，有很多因素，比如说，Java 到底是值传递还是引用传递？字符串常量池是个什么玩意？

这次又不得不谈，虽然烦透了，但仍然要证明啊！

```java
public class StringImmutabilityTest {
    public static void main(String[] args) {
        String s1 = "沉默王二";
        String s2 = s1;
        System.out.println(s1 == s2);

        s1 = "沉默王三";
        System.out.println(s1 == s2);

        System.out.println(s2);
    }
}
```

输出结果如下所示：

```java
true
false
沉默王二
```

1）`String s1 = "沉默王二"`，Java 在字符串常量池中创建“沉默王二”这串字符的对象，并且把地址引用赋值给 s1

2）`String s2 = s1`，s2 和 s1 指向了同一个地址引用——常量池中的那个“沉默王二”。

所以，此时 s1 == s2 为 true。

3）`s1 = "沉默王三"`，Java 在字符串常量池中创建“沉默王三”这串字符的对象，并且把地址引用赋值给 s1，但 s2 仍然指向的是“沉默王二”那串字符对象的地址引用。

所以，此时 s1 == s2 为 false，s2 的输出结果为“沉默王二”就证明了字符串是不可变的。

### 如何统计字符串中的单词数

这道题呢？主要针对的是英文字符串的情况。虽然中文字符串中也可以有空白字符，但不存在单词这一说。

```java
public class CountNumberOfWordsInString {
    public static void main(String[] args) {
        countNumberOfWords("My name is Wanger");
        countNumberOfWords("I Love Java Programming");
        countNumberOfWords(" Java    is  very   important ");
    }

    private static void countNumberOfWords(String line) {
        String trimmedLine = line.trim();
        int count = trimmedLine.isEmpty() ? 0 : trimmedLine.split("\\s+").length;

        System.out.println(count);
    }
}
```

输出结果如下所示：

```java
4
4
4
```

`split()` 方法可以对字符串进行拆分，参数不仅可以是空格，也可以使正则表达式代替的空白字符（多个空格、制表符）；返回的是一个数组，通过 `length` 就可以获得单词的个数了。

如果对 `split()` 方法很感兴趣的话，可以查看我之前写的一篇文章，很饱满，很丰富。

[咦，拆分个字符串都这么讲究](https://mp.weixin.qq.com/s?__biz=MzIxNzQwNjM3NA==&mid=2247487271&idx=1&sn=91b546079a1826fa58a39137452da46e&scene=21#wechat_redirect)

### 如何检查两个字符串中的字符是相同的？

如何理解这道题呢？比如说，字符串“沉默王二”和“沉王二默”就用了同样的字符，对吧？比如说，字符串“沉默王二”和“沉默王三”用的字符就不同，理解了吧？

```java
public class CheckSameCharsInString {
    public static void main(String[] args) {
        sameCharsStrings("沉默王二", "沉王二默");
        sameCharsStrings("沉默王二", "沉默王三");
    }

    private static void sameCharsStrings(String s1, String s2) {
        Set<Character> set1 = s1.chars().mapToObj(c -> (char) c).collect(Collectors.toSet());
        System.out.println(set1);
        Set<Character> set2 = s2.chars().mapToObj(c -> (char) c).collect(Collectors.toSet());
        System.out.println(set2);
        System.out.println(set1.equals(set2));
    }
}
```

输出结果如下所示：

```java
[默, 沉, 王, 二]
[默, 沉, 王, 二]
true
[默, 沉, 王, 二]
[默, 沉, 三, 王]
false
```

上面的代码用到了 Stream 流，看起来很陌生，但很好理解，就是把字符串拆成字符，然后收集到 Set 中，Set 是一个不允许有重复元素的集合，所以就把字符串中的不同字符收集起来了。



### 如何判断一个字符串包含了另外一个字符串

这道题有点简单，对吧？上一道还用 Stream 流，这道题就直接送分了？不用怀疑自己，就用字符串类的 `contains()` 方法。

```java
public class StringContainsSubstring {
    public static void main(String[] args) {
        String s1 = "沉默王二";
        String s2 = "沉默";

        System.out.println(s1.contains(s2));
    }
}
```

输出结果如下所示：

```java
true
```

`contains()` 方法内部其实调用的是 `indexOf()` 方法：

```java
public boolean contains(CharSequence s) {
    return indexOf(s.toString()) >= 0;
}
```





### 如何在不用第三个变量的情况下交换两个字符串

这道题就有点意思了，对吧？尤其是前提条件，不使用第三个变量。

```java
public class SwapTwoStrings {
    public static void main(String[] args) {
        String s1 = "沉默";
        String s2 = "王二";

        s1 = s1.concat(s2);
        s2 = s1.substring(0,s1.length()-s2.length());
        s1 = s1.substring(s2.length());

        System.out.println(s1);
        System.out.println(s2);
    }
}
```

输出结果如下所示：

```java
王二
沉默
```

说一下我的思路：

1）通过 `concat()` 方法把两个字符串拼接到一块。

2）然后通过 `substring()` 方法分别取出第二个字符串和第一个字符串。



### 如何从字符串中找出第一个不重复的字符？

来，上个例子来理解一下这道题。比如说字符串“沉默王沉沉默二”，第一个不重复的字符是“王”，对吧？因为“沉”重复了，“默”重复了。

```java
public class FindNonRepeatingChar {
    public static void main(String[] args) {
        System.out.println(printFirstNonRepeatingChar("沉默王沉沉默二"));
        System.out.println(printFirstNonRepeatingChar("沉默王沉"));
        System.out.println(printFirstNonRepeatingChar("沉沉沉"));
    }

    private static Character printFirstNonRepeatingChar(String string) {
        char[] chars = string.toCharArray();

        List<Character> discardedChars = new ArrayList<>();

        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];

            if (discardedChars.contains(c))
                continue;

            for (int j = i + 1; j < chars.length; j++) {
                if (c == chars[j]) {
                    discardedChars.add(c);
                    break;
                } else if (j == chars.length - 1) {
                    return c;
                }
            }
        }
        return null;
    }
}
```

输出结果如下所示：

```java
王
默
null
```

说一下我的思路：

1）把字符串拆分成字符数组。

2）声明一个 List，把重复的字符放进去。

3）外层的 for 循环，从第一个字符开始，如果已经在 List 中，继续下一轮。

4）嵌套的 for 循环，从第一个字符的下一个字符（`j = i + 1`）开始遍历，如果找到和之前字符重复的，就加入到 List 中，跳出内层的循环；如果找到最后（`j == chars.length - 1`）也没有找到，就是第一个不重复的字符，对吧？



### 如何检查字符串中只包含数字

有一种很傻的解法，就是用 `Long.parseLong(string)` 对字符串强转，如果转不成整形，那肯定不是只包含数字，对吧？

但这种方法也太不可取了，所以还得换一种巧妙的，就是使用正则表达式。

```java
public class CheckIfStringContainsDigitsOnly {
    public static void main(String[] args) {
        digitsOnlyString("123 沉默王二");
        digitsOnlyString("123");

    }

    private static void digitsOnlyString(String string) {
        if (string.matches("\\d+")) {
            System.out.println("只包含数字的字符串：" + string);
        }
    }
}
```

输出结果如下所示：

```java
只包含数字：123
```



### 如何实现字符串的深度拷贝

由于字符串是不可变的，所以可以直接使用“=”操作符将一个字符串拷贝到另外一个字符串，并且互不影响。

```java
public class JavaStringCopy {
    public static void main(String args[]) {
        String str = "沉默王二";
        String strCopy = str;

        str = "沉默王三";
        System.out.println(strCopy);
    }
}
```

输出结果如下所示：

```java
沉默王二
```

这个例子和之前证明字符串是不可变的例子几乎没什么差别，对吧？这的确是因为字符串是不可变的，如果是可变对象的话，深度拷贝就要注意了，最好使用 new 关键字返回新的对象。

```java
public Book getBook() {
    Book clone = new Book();
    clone.setPrice(this.book.getPrice());
    clone.setName(this.book.getName());
    return clone;
}
```

# 异常处理最佳实践

> 在Java中处理异常并不是一个简单的事。不仅仅初学者难理解，即使一些有经验的开发者也需要花费很多时间来思考如何处理异常，包括需要处理哪些异常，怎样处理等等。这也是绝大多数开发团队都会制定一些规则来规范对异常的处理的原因。而团队之间的这些规范往往是截然不同的。本文给出几个被很多团队使用的异常处理最佳实践

## 1 Finally中处理

### 1 错误做法

> 在Finally块中清理资源或者使用try-with-resource语句，当使用类似InputStream这种需要使用后关闭的资源时，一个常见的错误就是在try块的最后关闭资源。

```java
public void doNotCloseResourceInTry() {    
   FileInputStream inputStream = null;    
   try {        
      File file = new File("./tmp.txt");        
      inputStream = new FileInputStream(file);        
      // use the inputStream to read a file        
      // do NOT do this        
      inputStream.close();    
   } catch (FileNotFoundException e) { 
      log.error(e);   
   } catch (IOException e) {  
      log.error(e);    
   }
}
```

### 2 finally 处理

> 上述代码在没有任何exception的时候运行是没有问题的。但是当try块中的语句抛出异常或者自己实现的代码抛出异常，那么就不会执行最后的关闭语句，从而资源也无法释放。或者使用try-with-resource语句。

> 合理的做法则是将所有清理的代码都放到finally块中

```java
public void closeResourceInFinally() {    
    FileInputStream inputStream = null;    
    try {        
        File file = new File("./tmp.txt");        
        inputStream = new FileInputStream(file);       
        // use the inputStream to read a file    
    } catch (FileNotFoundException e) {        
        log.error(e);    
    } finally {       
        if (inputStream != null) {            
          try {                
            inputStream.close();           
          } catch (IOException e) {               
              log.error(e);            
          }
       }    
    }
}
```

### 3 try-with-resource 处理

```java
public void automaticallyCloseResource() {
     File file = new File("./tmp.txt");    
     try (FileInputStream inputStream = new FileInputStream(file);) 
     {        
           // use the inputStream to read a file    
     } catch (FileNotFoundException e) {
          log.error(e);    
     } catch (IOException e) {
          log.error(e);    
     }
}
```



## 2.指定具体的异常

> 尽可能的使用最具体的异常来声明方法，这样才能使得代码更容易理解。

```java
public void doNotDoThis() throws Exception { 
   ...
}

public void doThis() throws NumberFormatException {
    ...
}
```

如上，NumberFormatException字面上即可以看出是数字格式化错误。



## 3.对异常进行文档说明

> 当在方法上声明抛出异常时，也需要进行文档说明。和前面的一点一样，都是为了给调用者提供尽可能多的信息，从而可以更好地避免/处理异常。异常处理的 10 个最佳实践，这篇也推荐看下。

在Javadoc中加入throws声明，并且描述抛出异常的场景。

```java
/** * This method does something extremely useful ... 
 *    @param input * @throws MyBusinessException if ... happens 
 */
public void doSomething(String input) throws MyBusinessException { 
   ...
}
```

## 4.抛出异常的时候包含描述信息

> 在抛出异常时，需要尽可能精确地描述问题和相关信息，这样无论是打印到日志中还是监控工具中，都能够更容易被人阅读，从而可以更好地定位具体错误信息、错误的严重程度等。

> 但这里并不是说要对错误信息长篇大论，因为本来Exception的类名就能够反映错误的原因，因此只需要用一到两句话描述即可。

```java
try {    
    new Long("xyz");
} catch (NumberFormatException e) { 
    log.error(e);
}
```

> NumberFormatException即告诉了这个异常是格式化错误，异常的额外信息只需要提供这个错误字符串即可。当异常的名称不够明显的时候，则需要提供尽可能具体的错误信息。



## 5.首先捕获最具体的异常

现在很多IDE都能智能提示这个最佳实践，当你试图首先捕获最笼统的异常时，会提示不能达到的代码。当有多个catch块中，按照捕获顺序只有第一个匹配到的catch块才能执行。因此，如果先捕获IllegalArgumentException，那么则无法运行到对NumberFormatException的捕获。

```java
public void catchMostSpecificExceptionFirst() {  
   try {       
        doSomething("A message");    
   } catch (NumberFormatException e) {  
        log.error(e);    
   } catch (IllegalArgumentException e) {  
        log.error(e)   
   }
}
```



## 6.不要捕获Throwable

Throwable是所有异常和错误的父类。你可以在catch语句中捕获，但是永远不要这么做。如果catch了throwable，那么不仅仅会捕获所有exception，还会捕获error。而error是表明无法恢复的jvm错误。因此除非绝对肯定能够处理或者被要求处理error，不要捕获throwable

```java
public void doNotCatchThrowable() {
     try { 
          // do something
     } catch (Throwable t) {  
         // don't do this!   
     }
}
```

## 7.不要忽略异常

很多时候，开发者很有自信不会抛出异常，因此写了一个catch块，但是没有做任何处理或者记录日志。

```java
public void doNotIgnoreExceptions() {
     try {
          // do something
     } catch (NumberFormatException e) {
          // this will never happen    
     }
}
```

但现实是经常会出现无法预料的异常或者无法确定这里的代码未来是不是会改动(删除了阻止异常抛出的代码)，而此时由于异常被捕获，使得无法拿到足够的错误信息来定位问题。合理的做法是至少要记录异常的信息。

```java
public void logAnException() {
     try {
          // do something    
     } catch (NumberFormatException e) {
         log.error("This should never happen: " + e);    
     }
}
```



## 8.不要记录并抛出异常

> 可以发现很多代码甚至类库中都会有捕获异常、记录日志并再次抛出的逻辑。如下：

```java
try {    
    new Long("xyz");
} catch (NumberFormatException e) {
    log.error(e);   
    throw e;
}
```

> 这个处理逻辑看着是合理的。但这经常会给同一个异常输出多条日志。如下：

```v
17:44:28,945 ERROR TestExceptionHandling:65 
java.lang.NumberFormatException: For input string: "xyz"Exception in thread "main" 
java.lang.NumberFormatException: For input string: "xyz"at 
java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)at 
java.lang.Long.parseLong(Long.java:589)at java.lang.Long.(Long.java:965)at 
com.stackify.example.TestExceptionHandling.logAndThrowException(TestExceptionHandling.java:63)at 
com.stackify.example.TestExceptionHandling.main(TestExceptionHandling.java:58)
```

如上所示，后面的日志也没有附加更有用的信息。如果想要提供更加有用的信息，那么可以将异常包装为自定义异常

```java
public void wrapException(String input) throws MyBusinessException {
      try {        
           // do something    
      } catch (NumberFormatException e) {
           throw new MyBusinessException("A message that describes the error.", e);    
      }
}
```

因此，仅仅当想要处理异常时才去捕获，否则只需要在方法签名中声明让调用者去处理。

## 9.包装异常时不要抛弃原始异常

捕获标准异常并包装为自定义异常是一个很常见的做法。这样可以添加更为具体的异常信息并能够做针对的异常处理。

需要注意的是，包装异常时，一定要把原始的异常设置为cause(Exception有构造方法可以传入cause)。否则，丢失了原始的异常信息会让错误的分析变得困难。

```java
public void wrapException(String input) throws MyBusinessException { 
   try { 
          // do something 
   } catch (NumberFormatException e) {
          throw new MyBusinessException("A message that describes the error.", e);
   }
}
```



# Optional 判空

## 前情分析

```java
// 以前对null的处理方式
@Test
public void test01() {
    String userName = "凤姐";
    if (userName != null) {
        System.out.println("姓名为: " + userName);
    } else {
        System.out.println("姓名不存在");
    }
}
```

> Optional是一个没有子类的工具类，Optional是一个可以为null的容器对象。**它的作用主要就是为了解决避免Null检查，防止NullPointerException。重点：避免空指针异常** 

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021618787.png" alt="image-20230102161858671" style="zoom:50%;" />

## 基本语法

Optional类的创建方式：

```
Optional.of(T t) : 创建一个 Optional 实例
Optional.empty() : 创建一个空的 Optional 实例
Optional.ofNullable(T t):若 t 不为 null,创建 Optional 实例,否则创建空实例
```

Optional类的常用方法：

```
isPresent() : 判断是否包含值,包含值返回true，不包含值返回false
get() : 如果Optional有值则将其返回，否则抛出NoSuchElementException
orElse(T t) : 如果调用对象包含值，返回该值，否则返回参数t
orElseGet(Supplier s) :如果调用对象包含值，返回该值，否则返回 s 获取的值
map(Function f): 如果有值对其处理，并返回处理后的Optional，否则返回 Optional.empty()
```

## 基本使用

### 对象创建

首先我们先打开Optional的内部,去一探究竟 先把几个创建Optional对象的方法提取出来

> 再做一个简单的实例展示 与上面对应

```java
// 1、创建一个包装对象值为空的Optional对象
Optional<String> optEmpty = Optional.empty();
// 2、创建包装对象值非空的Optional对象
Optional<String> optOf = Optional.of("optional");
// 3、创建包装对象值允许为空也可以不为空的Optional对象
Optional<String> optOfNullable1 = Optional.ofNullable(null);
Optional<String> optOfNullable2 = Optional.ofNullable("optional");
```

### 基本使用

```java
// Optional类的基本使用
@Test
public void test02() {
    // 1.创建Optional对象
    // of:只能传入一个具体值,不能传入null
    // ofNullable: 既可以传入具体值,也可以传入null
    // empty: 存入的是null
    Optional<String> op1 = Optional.of("凤姐");
    Optional<String> op3 = Optional.ofNullable("如花");
    Optional<String> op4 = Optional.ofNullable(null);
    Optional<Object> op5 = Optional.empty();

    // 2.isPresent: 判断Optional中是否有具体值, 有值返回true,没有值返回false
    boolean present = op1.isPresent();
    System.out.println("present = " + present);

    // 3.get: 获取Optional中的值,如果有值就返回值具体值,没有值就报错
    System.out.println(op3.get());
    // 获取值
    if (op1.isPresent()) {
        System.out.println(op1.get());
    } else {
        System.out.println("没有值");
    }
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021627528.png" alt="image-20230102162713431" style="zoom:67%;" />

## 高级用法

准备测试实体类

```java
public class Student {
    private String name;
    private Integer age;

    public Student() {

    }

    public Student(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
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

### orElse⭐

常用方法之一，这个方法意思是如果包装对象为空的话，就执行orElse方法里的value，如果非空，则返回写入对象

```java
@Test
public void test2(Student student) {
    //  orElse: 如果Optional中有值,就取出这个值,如果没有值就使用参数指定的值
    Student s = Optional.ofNullable(student).orElse(new Student("小明", 12));
    System.out.println(s);
}
```

### get：返回对象的值

get()方法是返回一个option的实例值，也就是如果value不为空则做返回，如果为空则抛出异常 `No value present`

```java
@Test
public void test2() {
    Student student = new Student();
    student.setName("张三");
    student.setAge(18);
    System.out.println(Optional.ofNullable(student).get());
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021732456.png" alt="image-20230102173253363" style="zoom:80%;" />

### isPresent：判读是否为空

> isPresent()方法就是会返回一个boolean类型值，如果对象不为空则为真，如果为空则false

```java
@Test
public void test2() {
    Student student = new Student();
    student.setAge(18);
    if (Optional.ofNullable(student).isPresent()){
        System.out.println("对象不为空");
    }else {
        System.out.println("对象为空");
    }
}
```

### ifPresent：判读是否为空并返回函数

这个意思是如果对象非空，则运行函数体

```java
@Test
public void test2() {
    Student student = new Student("张三",123);
    Optional.ofNullable(student).ifPresent(s -> {
        System.out.println("姓名：" + s.getName());
        System.out.println("年龄：" + s.getAge());
    });
}
```

如果对象不为空，则会打印这个年龄，因为内部已经做了NPE（非空判断），所以就不用担心空指针异常了

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021736761.png" alt="image-20230102173601655" style="zoom:80%;" />

### filter：过滤对象

> filter()方法大致意思是，接受一个对象，然后对他进行条件过滤，如果条件符合则返回Optional对象本身，如果不符合则返回空Optional
>

```java
@Test
public void test2() {
    Student student = new Student("张三",123);
    Optional.ofNullable(student).filter(s -> s.getAge()>10).ifPresent(s -> {
        System.out.println("s = " + s);
    });
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021737215.png" alt="image-20230102173737124" style="zoom:80%;" />

### flatMap：对象进行二次包装

map()方法将对应`Optional< Funcation >`函数式接口中的对象，进行二次运算，封装成新的对象然后返回在Optional中

```java
@Test
public void test2() {
    Student student = new Student("张三",123);
    student.setAge(18);
    Optional<Object> optName = Optional.ofNullable(student)
            .map(s -> Optional
            .ofNullable(s.getName()).orElse("name为空"));
    System.out.println("optName = " + optName);
}
```

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.1.30/202301021739174.png" alt="image-20230102173957083" style="zoom:80%;" />

### orElseGet：为空返回Supplier对象

这个与orElse很相似，入参不一样，入参为Supplier对象，为空返回传入对象的.get()方法，如果非空则返回当前对象

```java
Optional<Supplier<Student>> sup=Optional.ofNullable(Student::new);
//调用get()方法，此时才会调用对象的构造方法，即获得到真正对象
Optional.ofNullable(student).orElseGet(sup.get());
```

Suppiler是一个接口，是类似Spring的懒加载，声明之后并不会占用内存，只有执行了get()方法之后，才会调用构造方法创建出对象 创建对象的语法的话就是`Supplier supStudent= Student::new;` 需要使用时`supStudent.get()`即可

### orElseThrow：为空返回异常

> 方法作用的话就是如果为空，就抛出你定义的异常，如果不为空返回当前对象，在实战中所有异常肯定是要处理好的，为了代码的可读性
>

```java
//简单的一个查询
Member member = memberService.selectByPhone(request.getPhone());
Optional.ofNullable(member).orElseThrow(() -> new ServiceException("没有查询的相关数据"));
```



## 实战场景⭐

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
class Student {
    private String name;
    private Integer age;
}
```

### 创建Optional类

```java
public void test1() {
 // 声明一个空Optional
 Optional<Object> empty = Optional.empty();
 
 // 依据一个非空值创建Optional
 Student student = new Student();
 Optional<Student> os1 = Optional.of(student);
 
 // 可接受null的Optional
 Student student1 = null;
 Optional<Student> os2 = Optional.ofNullable(student1);
} 
```

### 判断Optional容器中是否包含对象

isPresent不带参数，判断是否为空，ifPresent可以选择带一个消费函数的实例。（isPresent和ifPresent一个是 is 一个是 if 注意一下哈）

```java
public void test1() {
    Student student = new Student();
    Optional<Student> os1 = Optional.ofNullable(student);
    boolean present = os1.isPresent();
    System.out.println(present);

    // 利用Optional的ifPresent方法做出如下：当student不为空的时候将name赋值为张三
    Optional.ofNullable(student).ifPresent(p -> p.setName("张三"));
}
```

### 获取Optional容器的对象

```java
public void test1() throws Exception {
    Student student = null;
    Optional<Student> os1 = Optional.ofNullable(student);
    // 使用get一定要注意，假如student对象为空，get是会报错的
    // java.util.NoSuchElementException: No value present
    Student student1 = os1.get();

    // 当student为空的时候,返回我们新建的这个对象,有点像三目运算的感觉
    Student student2 = os1.orElse(new Student("张三", 18));

    // orElseGet就是当student为空的时候，返回通过Supplier供应商函数创建的对象
    Student student3 = os1.orElseGet(() -> new Student("张三", 18));

    // orElseThrow就是当student为空的时候，可以抛出我们指定的异常
    os1.orElseThrow(() -> new Exception());
}
```

### 过滤

```java
public void test1() {
    Student student = new Student("李四", 3);
    Optional<Student> os1 = Optional.ofNullable(student);
    os1.filter(p -> p.getName().equals("张三")).ifPresent(x -> System.out.println("OK"));
}
```

### 映射

map代码示例：

```java
public void test1() {
     Student student = new Student("李四", 3);
     Optional<Student> os1 = Optional.ofNullable(student);
     // 如果student对象不为空，就加一岁
     Optional<Student> emp = os1.map(e ->
     {
         e.setAge(e.getAge() + 1);
         return e;
     });
 }
```

这块的map说实话对lambda不是很熟练的 理解起来是很绕脑子的。这里的map实际上就是用的Function函数，Function函数是有两个参数的，第一个是入参数据类型，第二个是返回数据类型。Function函数作用就是传入一个对象，然后返回一个对象，返回的对象类型可以自己设置。

- T 就是代表实例的泛型数据类型，就是谁调用的 入参 必须跟调用者泛型的数据类型一样。
- U 就是自己说了算，调用完map之后返回什么数据类型，那么U就设置什么

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudRrdUVG34BbiadSW98yFeFEOVFfhMpj885PyGqyXrQ9yoPqwudc5624N68GyDD439iaKuTDkOStQKQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

flatMap代码示例： flatMap跟map是一样的只不过他返回的是optional对象。

```java
public static Optional<Integer> stringToInt(String s) {
     try {
         return Optional.of(Integer.parseInt(s));
     } catch (NumberFormatException e) {
         e.printStackTrace();
         return Optional.empty();
     }
 }
Optional.ofNullable(props.getProperty(name))
        .flatMap(OptionalUtils::stringToInt)
        .filter(i -> i>0)
        .orElse(0);
```

## 什么场景用Optional

以前一直不懂Optional有啥用，感觉太无语了，Java8还把它当做一个噱头来宣传，最近终于发现它的用处了，当然不用函数式编程的话，是没感觉的；如下提供了几个应用场景，基本上都是开发当中经常遇到的。

### 1、场景一

```java
PatientInfo patientInfo = patientInfoDao.getPatientInfoById(consultOrder.getPatientId());
if (patientInfo != null) {
    consultInfoResp.setPatientHead(patientInfo.getHead());
}

// 使用Optional 和函数式编程，一行搞定，而且像说话一样
Optional.ofNullable(patientInfo).ifPresent(p -> consultInfoResp.setPatientHead(p.getHead()));
```

### 2、场景二

```java
public void test1() throws Exception {
    Student student = new Student(null, 3);
    if (student == null || isEmpty(student.getName())) {
        throw new Exception();
    }
    String name = student.getName();
    // 业务省略...

    // 使用Optional改造
    Optional.ofNullable(student).filter(s -> !isEmpty(s.getName())).orElseThrow(() -> new Exception());
}

public static boolean isEmpty(CharSequence str) {
    return str == null || str.length() == 0;
}
```

### 3、场景三

```java
public static String getChampionName(Competition comp) throws IllegalArgumentException {
    if (comp != null) {
        CompResult result = comp.getResult();
        if (result != null) {
            User champion = result.getChampion();
            if (champion != null) {
                return champion.getName();
            }
        }
    }
    throw new IllegalArgumentException("The value of param comp isn't available.");
}
```

这个在开发中是很常见的一种逻辑。去判读传进来的参数时候为空，或者是从数据库中获取的对象。由于某些原因，我们不能很流程的直接这样写。

```
comp.getResult().getChampion().getName()
```

上面的写法用Optional改写：

```java
public static String getChampionName(Competition comp) throws IllegalArgumentException {
    return Optional.ofNullable(comp)
            .map(Competition::getResult)  // 相当于c -> c.getResult()，下同
            .map(CompResult::getChampion)
            .map(User::getName)
            .orElseThrow(()->new IllegalArgumentException("The value of param comp isn't available."));
}
```

### 4、场景四

类型之间的转换，并且当没有值的时候返回一个默认值

```java
int timeout = Optional.ofNullable(redisProperties.getTimeout())
       .map(x -> Long.valueOf(x.toMillis()).intValue())
       .orElse(10000);
```



## 注意事项

> Optional真么好用，真的可以完全替代if判断吗？我想这肯定是大家使用完之后Optional之后可能会产生的想法，答案是否定的 举一个最简单的栗子：
>

> **例子：如果我只想判断对象的某一个变量是否为空并且做出判断呢？**

```java
Person person=new Person();
person.setName("");
persion.setAge(2);
//普通判断
if(StringUtils.isNotBlank(person.getName())){
   //名称不为空执行代码块
}
//使用Optional做判断
Optional.ofNullable(person).map(p -> p.getName()).orElse("name为空");
```

> 我觉得这个例子就能很好的说明这个问题，只是一个很简单判断，如果用了Optional我们还需要考虑包装值，考虑代码书写，考虑方法调用，虽然只有一行，但是可读性并不好，如果别的程序员去读，我觉得肯定没有if看的明显。
>





















