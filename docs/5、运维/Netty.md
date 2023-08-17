



# 高可用的 TCP 数据传输服务器

[实现一款高可用的 TCP 数据传输服务器（Java版） (qq.com)](https://mp.weixin.qq.com/s?__biz=MzI4Njc5NjM1NQ==&mid=2247530518&idx=2&sn=9ef03514050f141d118277458c5e9b7f&chksm=ebd5473adca2ce2c0bc857e67fe8d702cd33f5f2f5505013b9ea662d4c555972eeaff9139490&mpshare=1&scene=23&srcid=1113lpa0jpMzb6Y4z8UTq7BO&sharer_sharetime=1668269827908&sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd)

## 1.netty能做什么

首先netty是一款高性能、封装性良好且灵活、基于NIO(真·非阻塞IO)的开源框架。可以用来手写web服务器、TCP服务器等，支持的协议丰富，如：常用的HTTP/HTTPS/WEBSOCKET，并且提供的大量的方法，十分灵活，可以根据自己的需求量身DIV一款服务器。

用netty编写TCP的服务器/客户端

1.可以自己设计数据传输协议如下面这样：

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211131127850.png" alt="image-20221113112758800" style="zoom:67%;" />

2.可以自定义编码规则和解码规则

3.可以自定义客户端与服务端的数据交互细节，处理socket流攻击、TCP的粘包和拆包问题

## 2.Quick Start

创建一个普通的maven项目，不依赖任何的三方web服务器，用main方法执行即可。

<img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202211131128981.png" alt="image-20221113112809936" style="zoom:80%;" />

加入POM依赖

```xml
<!--netty的依赖集合，都整合在一个依赖里面了-->
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.1.6.Final</version>
</dependency>
<!--这里使用jackson反序列字节码-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.7</version>
</dependency>
<!--加入log4j 便于深入学习整合运行过程的一些细节-->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

设计一套基于TCP的数据传输协议

```java
public class TcpProtocol {
    private byte header=0x58;
    private int len;
    private byte [] data;
    private byte tail=0x63;

    public byte getTail() {
        return tail;
    }

    public void setTail(byte tail) {
        this.tail = tail;
    }

    public TcpProtocol(int len, byte[] data) {
        this.len = len;
        this.data = data;
    }

    public TcpProtocol() {
    }

    public byte getHeader() {
        return header;
    }

    public void setHeader(byte header) {
        this.header = header;
    }

    public int getLen() {
        return len;
    }

    public void setLen(int len) {
        this.len = len;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
```

这里使用16进制表示协议的开始位和结束位，其中0x58代表开始，0x63代表结束，均用一个字节来进行表示。

TCP服务器的启动类

```java
public class TcpServer {
    private  int port;
    private Logger logger = Logger.getLogger(this.getClass());
    public  void init(){
        logger.info("正在启动tcp服务器……");
        NioEventLoopGroup boss = new NioEventLoopGroup();//主线程组
        NioEventLoopGroup work = new NioEventLoopGroup();//工作线程组
        try {
            ServerBootstrap bootstrap = new ServerBootstrap();//引导对象
            bootstrap.group(boss,work);//配置工作线程组
            bootstrap.channel(NioServerSocketChannel.class);//配置为NIO的socket通道
            bootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
                protected void initChannel(SocketChannel ch) throws Exception {//绑定通道参数
                    ch.pipeline().addLast("logging",new LoggingHandler("DEBUG"));//设置log监听器，并且日志级别为debug，方便观察运行流程
                    ch.pipeline().addLast("encode",new EncoderHandler());//编码器。发送消息时候用过
                    ch.pipeline().addLast("decode",new DecoderHandler());//解码器，接收消息时候用
                    ch.pipeline().addLast("handler",new BusinessHandler());//业务处理类，最终的消息会在这个handler中进行业务处理
                }
            });
            bootstrap.option(ChannelOption.SO_BACKLOG,1024);//缓冲区
            bootstrap.childOption(ChannelOption.SO_KEEPALIVE,true);//ChannelOption对象设置TCP套接字的参数，非必须步骤
            ChannelFuture future = bootstrap.bind(port).sync();//使用了Future来启动线程，并绑定了端口
            logger.info("启动tcp服务器启动成功，正在监听端口:"+port);
            future.channel().closeFuture().sync();//以异步的方式关闭端口

        }catch (InterruptedException e) {
            logger.info("启动出现异常："+e);
        }finally {
            work.shutdownGracefully();
            boss.shutdownGracefully();//出现异常后，关闭线程组
            logger.info("tcp服务器已经关闭");
        }

    }

    public static void main(String[] args) {
        new TcpServer(8777).init();
    }
    public TcpServer(int port) {
        this.port = port;
    }
}
```

只要是基于netty的服务器，都会用到bootstrap 并用这个对象绑定工作线程组，channel的Class，以及用户DIV的各种pipeline的handler类，注意在添加自定义handler的时候，数据的流动顺序和pipeline中添加hanlder的顺序是一致的。也就是说，从上往下应该为：底层字节流的解码/编码handler、业务处理handler。

##### 编码器

编码器是服务器按照协议格式返回数据给客户端时候调用的，继承`MessageToByteEncoder`代码：

```java
public class EncoderHandler extends MessageToByteEncoder {
    private  Logger logger = Logger.getLogger(this.getClass());
    protected void encode(ChannelHandlerContext ctx, Object msg, ByteBuf out) throws Exception {
        if (msg instanceof TcpProtocol){
            TcpProtocol protocol = (TcpProtocol) msg;
            out.writeByte(protocol.getHeader());
            out.writeInt(protocol.getLen());
            out.writeBytes(protocol.getData());
            out.writeByte(protocol.getTail());
            logger.debug("数据编码成功："+out);
        }else {
            logger.info("不支持的数据协议："+msg.getClass()+"\t期待的数据协议类是："+TcpProtocol.class);
        }
    }
}
```

##### 解码器

解码器属于比较核心的部分，自定义解码协议、粘包、拆包等都在里面实现，继承自`ByteToMessageDecoder`，其实`ByteToMessageDecoder`的内部已经帮我们处理好了拆包/粘包的问题，只需要按照它的设计原则去实现decode方法即可：

```java
public class DecoderHandler extends ByteToMessageDecoder {
    //最小的数据长度：开头标准位1字节
    private static int MIN_DATA_LEN=6;
    //数据解码协议的开始标志
    private static byte PROTOCOL_HEADER=0x58;
    //数据解码协议的结束标志
    private static byte PROTOCOL_TAIL=0x63;
    private Logger logger = Logger.getLogger(this.getClass());
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {

        if (in.readableBytes()>MIN_DATA_LEN){
            logger.debug("开始解码数据……");
            //标记读操作的指针
            in.markReaderIndex();
            byte header=in.readByte();
            if (header==PROTOCOL_HEADER){
                logger.debug("数据开头格式正确");
                //读取字节数据的长度
                int len=in.readInt();
                //数据可读长度必须要大于len，因为结尾还有一字节的解释标志位
                if (len>=in.readableBytes()){
                    logger.debug(String.format("数据长度不够，数据协议len长度为：%1$d,数据包实际可读内容为：%2$d正在等待处理拆包……",len,in.readableBytes()));
                    in.resetReaderIndex();
                    /*
                    **结束解码，这种情况说明数据没有到齐，在父类ByteToMessageDecoder的callDecode中会对out和in进行判断
                    * 如果in里面还有可读内容即in.isReadable为true,cumulation中的内容会进行保留，，直到下一次数据到来，将两帧的数据合并起来，再解码。
                    * 以此解决拆包问题
                     */
                    return;
                }
                byte [] data=new byte[len];
                in.readBytes(data);//读取核心的数据
                byte tail=in.readByte();
                if (tail==PROTOCOL_TAIL){
                    logger.debug("数据解码成功");
                    out.add(data);
                    //如果out有值，且in仍然可读，将继续调用decode方法再次解码in中的内容，以此解决粘包问题
                }else {
                    logger.debug(String.format("数据解码协议结束标志位:%1$d [错误!]，期待的结束标志位是：%2$d",tail,PROTOCOL_TAIL));
                    return;
                }
            }else {
                logger.debug("开头不对，可能不是期待的客服端发送的数，将自动略过这一个字节");
            }
        }else {
            logger.debug("数据长度不符合要求，期待最小长度是："+MIN_DATA_LEN+" 字节");
            return;
        }

    }
}
```

首先是黏包问题：

如图，正常的数据传输应该是像数据A那样，一包就是一个完整的数据，但也有不正常的情况，比如一包数据包含多个数据。而在`ByteToMessageDecoder`会默认把二进制的字节码放在byteBuf中，因此我们在code的时候要知道会有这样的场景。

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudRJmHvGnvWpwCRgblURETRPCrhvZVh8ymydtgvvaibGOj1CyicCklHibvQCPMlTmIUzFeBFvqWFU6Dg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

而粘包问题实际上不需要我们去解决，下面是`ByteToMessageDecoder`的源码，`callDecode`中回调我们手写解码器的decode方法。

```java
protected void callDecode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) {
    try {
        while (in.isReadable()) {//buf中是否还有数据
            int outSize = out.size();//标记out的size，解析成功的数据会添加的out中
            if (outSize > 0) {
                fireChannelRead(ctx, out, outSize);//这个是回调业务handler的channelRead方法
                out.clear();
                if (ctx.isRemoved()) {
                    break;
                }
                outSize = 0;//清空了out，将标记size清零
            }
            int oldInputLength = in.readableBytes();//这里开始准备调用decode方法，标记了解码前的可读内容
            decode(ctx, in, out);//对应DecoderHandler中的decode方法
            if (ctx.isRemoved()) {
                break;
            }

            if (outSize == out.size()) {//相等说明，并没有解析出来新的object到out中
                if (oldInputLength == in.readableBytes()) {//这里很重要，若相等说明decode中没有读取任何内容出来，这里一般是发生拆包后，将ByteBuf的指针手动重置。重置后从这个方法break出来。让ByteToMessageDecoder去处理拆包问题。这里就体现了要按照netty的设计原则来写代码                       
                break;
                } else {
                    continue;//这里直接continue，是考虑让开发者去跳过某些字节，比如收到了socket攻击时，数据不按照协议体来的时候，就直接跳过这些字节
                }
            }

            if (oldInputLength == in.readableBytes()) {//这种情况属于，没有按照netty的设计原则来。要么是decode中没有任何逻辑代码，要么是在out中添加了内容后，调用了byteBuf的resetReaderIndex重置的读操作的指针
                throw new DecoderException(
                        StringUtil.simpleClassName(getClass()) +
                        ".decode() did not read anything but decoded a message.");
            }

            if (isSingleDecode()) {//默认为false，用来设置只解析一条数据
                break;
            }
            //这里结束后，继续wile循环，因为bytebuf仍然有可读的内容，将会继续调用decode方法解析bytebuf中的字节码，以此解决了粘包问题
        }
    } catch (DecoderException e) {
        throw e;
    } catch (Throwable cause) {
        throw new DecoderException(cause);
    }
}
```

综合上面的源码分析后，我们发现：decode方法在while循环中，也就是bytebuf只要有内容就会一直调用decode方法进行解码操作，因此在解决粘包问题时，只需要按照正常流程来就行了，解析协议开头、数据字节、结束标志后将数据放入到out这个list中即可。后面将会有数据进行粘包测试。

**拆包问题**

有时候，我们接收到的数据是不完整的，一个包的数据被拆成了很多份被后再发送出去。这种情况有可能是数据太大，被分割成很多份发送出去。比如数据包B被拆成两份进行发送：

![图片](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbudRJmHvGnvWpwCRgblURETROk82JpxJ2jrFkQAVnbUBWo6UU9O0KvDNROdoG35Z2JF3ibw7HN7kJHQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

拆包问题，同样在`ByteToMessageDecoder` 给我们解决了，我们只需要按照netty的设计原则去写decode代码即可。

首先，假设需要我们自己去解决拆包问题应该怎么实现？

先从问题开始分析，需要的是数据B，但是却只收到了数据B_1，这个时候应该等待剩余的数据B_2的到来，收到的数据B_1应该用一个累加器存起来，等到B_2到来的时候将两包数据合并起来再进行解码。

那么问题是，如何让`ByteToMessageDecoder`这个知道数据不完整呢，在`DecoderHandler.decode`中有这样一段代码：

```java
if (len>=in.readableBytes()){
    logger.debug(String.format("数据长度不够，数据协议len长度为：%1$d,数据包实际可读内容为：%2$d正在等待处理拆包……",len,in.readableBytes()));
    in.resetReaderIndex();
    /*
    **结束解码，这种情况说明数据没有到齐，在父类ByteToMessageDecoder的callDecode中会对out和in进行判断
    * 如果in里面还有可读内容即in.isReadable为true,cumulation中的内容会进行保留，，直到下一次数据到来，将两帧的数据合并起来，再解码。
    * 以此解决拆包问题
     */
    return;
}
```

当读到协议中的len大于bytebuf的可读内容时候说明数据不完整，发生了拆包，调用`resetReaderIndex`将读操作指针复位，并结束方法。再看看父类中的`CallDecode`方法的一段代码：

```java
if (outSize == out.size()) {//相等说明，并没有解析出来新的object到out中
    if (oldInputLength == in.readableBytes()) {//这里很重要，若相等说明decode中没有读取任何内容出来，这里一般是发生拆包后，将ByteBuf的指针手动重置。重置后从这个方法break出来。让ByteToMessageDecoder去处理拆包问题。这里就体现了要按照netty的设计原则来写代码                       
    break;//退出该方法
    } else {
        continue;//这里直接continue，是考虑让开发者去跳过某些字节，比如收到了socket攻击时，数据不按照协议体来的时候，就直接跳过这些字节
    }
}
```

退出`callDecode`后，返回到`channelRead`中：

```java
public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
    if (msg instanceof ByteBuf) {
        CodecOutputList out = CodecOutputList.newInstance();
        try {
            ByteBuf data = (ByteBuf) msg;
            first = cumulation == null;
            if (first) {
                cumulation = data;
            } else {
                cumulation = cumulator.cumulate(ctx.alloc(), cumulation, data);
            }
            callDecode(ctx, cumulation, out);//注意这里传入的不是data，而是cumulator，这个对象相当于一个累加器，也就是说每次调用callDecode的时候传入的byteBuf实际上是经过累加后的cumulation
        } catch (DecoderException e) {
            throw e;
        } catch (Throwable t) {
            throw new DecoderException(t);
        } finally {
            if (cumulation != null && !cumulation.isReadable()) {//这里若是数据被读取完，会清空累加器cumulation
                numReads = 0;
                cumulation.release();
                cumulation = null;
            } else if (++ numReads >= discardAfterReads) {
                // We did enough reads already try to discard some bytes so we not risk to see a OOME.
                // See https://github.com/netty/netty/issues/4275
                numReads = 0;
                discardSomeReadBytes();
            }

            int size = out.size();
            decodeWasNull = !out.insertSinceRecycled();
            fireChannelRead(ctx, out, size);
            out.recycle();
        }
    } else {
        ctx.fireChannelRead(msg);
    }
}
```

而`channelRead`方法是，收到一包数据后就会调用一次。至此，netty帮我们完美解决了拆包问题。我们只需要按着他的设计原则：`len>byteBuf.readableBytes`时候，重置读指针，结束decode即可。

##### 业务处理handler类

这一层中数据已经被完整的解析出来了，可以直接使用了：

```java
public class BusinessHandler extends ChannelInboundHandlerAdapter {
    private ObjectMapper objectMapper= ByteUtils.InstanceObjectMapper();
    private Logger logger = Logger.getLogger(this.getClass());
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof byte []){
            logger.debug("解码后的字节码："+new String((byte[]) msg,"UTF-8"));
            try {
                Object objectContainer = objectMapper.readValue((byte[]) msg, DTObject.class);
                if (objectContainer instanceof DTObject){
                    DTObject data = (DTObject) objectContainer;
                    if (data.getClassName()!=null&&data.getObject().length>0){
                        Object object = objectMapper.readValue(data.getObject(), Class.forName(data.getClassName()));
                        logger.info("收到实体对象："+object);
                    }
                }
            }catch (Exception e){
                logger.info("对象反序列化出现问题："+e);
            }

        }
    }
}
```

由于在decode中并没有将字节码反序列成对象，因此需要进一步反序列化。在传输数据的时候，可能传递的对象不只是一种，因此在反序列化也要考虑到这一问题。解决办法是将传输的对象进行二次包装，将全名类信息包含进去：

```
public class DTObject {
    private String className;
    private byte[] object;
}
```

这样在反序列化的时候使用`Class.forName()`获取Class，避免了要写很多if循环判断反序列化的对象的Class。前提是要类名和包路径要完全匹配！

##### 接下来编写一个TCP客户端进行测试

启动类的init方法:

```java
public  void init() throws InterruptedException {
    NioEventLoopGroup group = new NioEventLoopGroup();
    try {
    Bootstrap bootstrap = new Bootstrap();
    bootstrap.group(group);
    bootstrap.channel(NioSocketChannel.class);
    bootstrap.option(ChannelOption.SO_KEEPALIVE,true);
    bootstrap.handler(new ChannelInitializer() {
        @Override
        protected void initChannel(Channel ch) throws Exception {
            ch.pipeline().addLast("logging",new LoggingHandler("DEBUG"));
            ch.pipeline().addLast(new EncoderHandler());
            ch.pipeline().addLast(new EchoHandler());
        }
    });
    bootstrap.remoteAddress(ip,port);
    ChannelFuture future = bootstrap.connect().sync();

        future.channel().closeFuture().sync();
    } catch (InterruptedException e) {
        e.printStackTrace();
    }finally {
        group.shutdownGracefully().sync();
    }
}
```

客户端的handler：

```java
public class EchoHandler extends ChannelInboundHandlerAdapter {

    //连接成功后发送消息测试
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        User user = new User();
        user.setBirthday(new Date());
        user.setUID(UUID.randomUUID().toString());
        user.setName("冉鹏峰");
        user.setAge(22);
        DTObject dtObject = new DTObject();
        dtObject.setClassName(user.getClass().getName());
        dtObject.setObject(ByteUtils.InstanceObjectMapper().writeValueAsBytes(user));
        TcpProtocol tcpProtocol = new TcpProtocol();
        byte [] objectBytes=ByteUtils.InstanceObjectMapper().writeValueAsBytes(dtObject);
        tcpProtocol.setLen(objectBytes.length);
        tcpProtocol.setData(objectBytes);
        ctx.write(tcpProtocol);
        ctx.flush();
    }
}
```

这个handler是为了模拟在TCP连接建立好之后发送一包的数据到服务端经行测试，通过channel的write去发送数据，只要在启动类TcpClient配置了编码器的`EncoderHandler`，就可以直接将对象`tcpProtocol`传进去，它将在`EncoderHandler`的encode方法中被自动转换成字节码放入bytebuf中。

正常数据传输测试：

结果：

```java
2019-01-14 16:30:34 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 16:30:34 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 16:30:34 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 16:30:34 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA0OjMwOjE0IiwidWlkIjoiOGY0OTM0OGEtMWNmMy00ZTEyLWEzZTAtY2M1ZTJjZTkzMDdlIn0="}
2019-01-14 16:30:34 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='8f49348a-1cf3-4e12-a3e0-cc5e2ce9307e', birthday=Mon Jan 14 04:30:00 CST 2019}
```

可以看到最终的实体对象User被成功的解析出来。

在debug模式下还会看到这样的一个表格在控制台输出：

```java
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 58 00 00 00 b5 7b 22 63 6c 61 73 73 4e 61 6d 65 |X....{"className|
|00000010| 22 3a 22 70 6f 6a 6f 2e 55 73 65 72 22 2c 22 6f |":"pojo.User","o|
|00000020| 62 6a 65 63 74 22 3a 22 65 79 4a 75 59 57 31 6c |bject":"eyJuYW1l|
|00000030| 49 6a 6f 69 35 59 61 4a 36 62 6d 50 35 62 4f 77 |Ijoi5YaJ6bmP5bOw|
|00000040| 49 69 77 69 59 57 64 6c 49 6a 6f 79 4e 43 77 69 |IiwiYWdlIjoyNCwi|
|00000050| 59 6d 6c 79 64 47 68 6b 59 58 6b 69 4f 69 49 79 |YmlydGhkYXkiOiIy|
|00000060| 4d 44 45 35 4c 7a 41 78 4c 7a 45 30 49 44 41 30 |MDE5LzAxLzE0IDA0|
|00000070| 4f 6a 4d 77 4f 6a 45 30 49 69 77 69 64 57 6c 6b |OjMwOjE0IiwidWlk|
|00000080| 49 6a 6f 69 4f 47 59 30 4f 54 4d 30 4f 47 45 74 |IjoiOGY0OTM0OGEt|
|00000090| 4d 57 4e 6d 4d 79 30 30 5a 54 45 79 4c 57 45 7a |MWNmMy00ZTEyLWEz|
|000000a0| 5a 54 41 74 59 32 4d 31 5a 54 4a 6a 5a 54 6b 7a |ZTAtY2M1ZTJjZTkz|
|000000b0| 4d 44 64 6c 49 6e 30 3d 22 7d 63                |MDdlIn0="}c     |
+--------+-------------------------------------------------+----------------+
```

这个是相当于真实的数据抓包展示，数据被转换成字节码后是以二进制的形式在TCP缓存区冲传输过来。但是二进制太长了，所以一般都是转换成16进制显示的，一个表格显示一个字节的数据，数据由地位到高位由左到右，由上到下进行排列。

其中0x58为`TcpProtocol`中设置的开始标志，00 00 00 b5为数据的长度，因为是int类型所以占用了四个字节从7b--7d内容为要传输的数据内容，结尾的0x63为`TcpProtocol`设置的结束标志位。

##### 粘包测试

为了模拟粘包，首先将启动类`TcpClient`中配置的编码器的`EncoderHandler`注释掉：

```java
bootstrap.handler(new ChannelInitializer() {
    @Override
    protected void initChannel(Channel ch) throws Exception {
        ch.pipeline().addLast("logging",new LoggingHandler("DEBUG"));
        //ch.pipeline().addLast(new EncoderHandler()); 因为需要在byteBuf中手动模拟粘包的场景
        ch.pipeline().addLast(new EchoHandler());
    }
});
```

然后在发送的时候故意将三帧的数据，放在一个包中就行发送，在`EchoHanlder`做如下修改：

```java
 public void channelActive(ChannelHandlerContext ctx) throws Exception {
        User user = new User();
        user.setBirthday(new Date());
        user.setUID(UUID.randomUUID().toString());
        user.setName("冉鹏峰");
        user.setAge(24);
        DTObject dtObject = new DTObject();
        dtObject.setClassName(user.getClass().getName());
        dtObject.setObject(ByteUtils.InstanceObjectMapper().writeValueAsBytes(user));
        TcpProtocol tcpProtocol = new TcpProtocol();
        byte [] objectBytes=ByteUtils.InstanceObjectMapper().writeValueAsBytes(dtObject);
        tcpProtocol.setLen(objectBytes.length);
        tcpProtocol.setData(objectBytes);
        ByteBuf buffer = ctx.alloc().buffer();
        buffer.writeByte(tcpProtocol.getHeader());
        buffer.writeInt(tcpProtocol.getLen());
        buffer.writeBytes(tcpProtocol.getData());
        buffer.writeByte(tcpProtocol.getTail());
        //模拟粘包的第二帧数据
        buffer.writeByte(tcpProtocol.getHeader());
        buffer.writeInt(tcpProtocol.getLen());
        buffer.writeBytes(tcpProtocol.getData());
        buffer.writeByte(tcpProtocol.getTail());
        //模拟粘包的第三帧数据
        buffer.writeByte(tcpProtocol.getHeader());
        buffer.writeInt(tcpProtocol.getLen());
        buffer.writeBytes(tcpProtocol.getData());
        buffer.writeByte(tcpProtocol.getTail());
        ctx.write(buffer);
        ctx.flush();
    }
```

运行结果：

```java
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 16:44:51 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA0OjQ0OjE0IiwidWlkIjoiODFkZTU5YWUtMzQ4Mi00ZDFhLWJjNDMtN2NjMTJmOTI1ZTUxIn0="}
2019-01-14 16:44:51 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='81de59ae-3482-4d1a-bc43-7cc12f925e51', birthday=Mon Jan 14 04:44:00 CST 2019}
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 16:44:51 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA0OjQ0OjE0IiwidWlkIjoiODFkZTU5YWUtMzQ4Mi00ZDFhLWJjNDMtN2NjMTJmOTI1ZTUxIn0="}
2019-01-14 16:44:51 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='81de59ae-3482-4d1a-bc43-7cc12f925e51', birthday=Mon Jan 14 04:44:00 CST 2019}
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 16:44:51 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 16:44:51 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA0OjQ0OjE0IiwidWlkIjoiODFkZTU5YWUtMzQ4Mi00ZDFhLWJjNDMtN2NjMTJmOTI1ZTUxIn0="}
2019-01-14 16:44:51 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='81de59ae-3482-4d1a-bc43-7cc12f925e51', birthday=Mon Jan 14 04:44:00 CST 2019}
```

服务器成功解析出来了三帧的数据，`BusinessHandler`的`channelRead`方法被调用了三次。

而抓到的数据包也确实是模拟的三帧数据黏在一个包中：

```java
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 58 00 00 00 b5 7b 22 63 6c 61 73 73 4e 61 6d 65 |X....{"className|
|00000010| 22 3a 22 70 6f 6a 6f 2e 55 73 65 72 22 2c 22 6f |":"pojo.User","o|
|00000020| 62 6a 65 63 74 22 3a 22 65 79 4a 75 59 57 31 6c |bject":"eyJuYW1l|
|00000030| 49 6a 6f 69 35 59 61 4a 36 62 6d 50 35 62 4f 77 |Ijoi5YaJ6bmP5bOw|
|00000040| 49 69 77 69 59 57 64 6c 49 6a 6f 79 4e 43 77 69 |IiwiYWdlIjoyNCwi|
|00000050| 59 6d 6c 79 64 47 68 6b 59 58 6b 69 4f 69 49 79 |YmlydGhkYXkiOiIy|
|00000060| 4d 44 45 35 4c 7a 41 78 4c 7a 45 30 49 44 41 30 |MDE5LzAxLzE0IDA0|
|00000070| 4f 6a 51 30 4f 6a 45 30 49 69 77 69 64 57 6c 6b |OjQ0OjE0IiwidWlk|
|00000080| 49 6a 6f 69 4f 44 46 6b 5a 54 55 35 59 57 55 74 |IjoiODFkZTU5YWUt|
|00000090| 4d 7a 51 34 4d 69 30 30 5a 44 46 68 4c 57 4a 6a |MzQ4Mi00ZDFhLWJj|
|000000a0| 4e 44 4d 74 4e 32 4e 6a 4d 54 4a 6d 4f 54 49 31 |NDMtN2NjMTJmOTI1|
|000000b0| 5a 54 55 78 49 6e 30 3d 22 7d 【63】 58 00 00 00 b5 |ZTUxIn0="}cX....|
|000000c0| 7b 22 63 6c 61 73 73 4e 61 6d 65 22 3a 22 70 6f |{"className":"po|
|000000d0| 6a 6f 2e 55 73 65 72 22 2c 22 6f 62 6a 65 63 74 |jo.User","object|
|000000e0| 22 3a 22 65 79 4a 75 59 57 31 6c 49 6a 6f 69 35 |":"eyJuYW1lIjoi5|
|000000f0| 59 61 4a 36 62 6d 50 35 62 4f 77 49 69 77 69 59 |YaJ6bmP5bOwIiwiY|
|00000100| 57 64 6c 49 6a 6f 79 4e 43 77 69 59 6d 6c 79 64 |WdlIjoyNCwiYmlyd|
|00000110| 47 68 6b 59 58 6b 69 4f 69 49 79 4d 44 45 35 4c |GhkYXkiOiIyMDE5L|
|00000120| 7a 41 78 4c 7a 45 30 49 44 41 30 4f 6a 51 30 4f |zAxLzE0IDA0OjQ0O|
|00000130| 6a 45 30 49 69 77 69 64 57 6c 6b 49 6a 6f 69 4f |jE0IiwidWlkIjoiO|
|00000140| 44 46 6b 5a 54 55 35 59 57 55 74 4d 7a 51 34 4d |DFkZTU5YWUtMzQ4M|
|00000150| 69 30 30 5a 44 46 68 4c 57 4a 6a 4e 44 4d 74 4e |i00ZDFhLWJjNDMtN|
|00000160| 32 4e 6a 4d 54 4a 6d 4f 54 49 31 5a 54 55 78 49 |2NjMTJmOTI1ZTUxI|
|00000170| 6e 30 3d 22 7d 【63】 58 00 00 00 b5 7b 22 63 6c 61 |n0="}cX....{"cla|
|00000180| 73 73 4e 61 6d 65 22 3a 22 70 6f 6a 6f 2e 55 73 |ssName":"pojo.Us|
|00000190| 65 72 22 2c 22 6f 62 6a 65 63 74 22 3a 22 65 79 |er","object":"ey|
|000001a0| 4a 75 59 57 31 6c 49 6a 6f 69 35 59 61 4a 36 62 |JuYW1lIjoi5YaJ6b|
|000001b0| 6d 50 35 62 4f 77 49 69 77 69 59 57 64 6c 49 6a |mP5bOwIiwiYWdlIj|
|000001c0| 6f 79 4e 43 77 69 59 6d 6c 79 64 47 68 6b 59 58 |oyNCwiYmlydGhkYX|
|000001d0| 6b 69 4f 69 49 79 4d 44 45 35 4c 7a 41 78 4c 7a |kiOiIyMDE5LzAxLz|
|000001e0| 45 30 49 44 41 30 4f 6a 51 30 4f 6a 45 30 49 69 |E0IDA0OjQ0OjE0Ii|
|000001f0| 77 69 64 57 6c 6b 49 6a 6f 69 4f 44 46 6b 5a 54 |widWlkIjoiODFkZT|
|00000200| 55 35 59 57 55 74 4d 7a 51 34 4d 69 30 30 5a 44 |U5YWUtMzQ4Mi00ZD|
|00000210| 46 68 4c 57 4a 6a 4e 44 4d 74 4e 32 4e 6a 4d 54 |FhLWJjNDMtN2NjMT|
|00000220| 4a 6d 4f 54 49 31 5a 54 55 78 49 6e 30 3d 22 7d |JmOTI1ZTUxIn0="}|
|00000230|【63】                                              |c               |
+--------+-------------------------------------------------+----------------+
```

可以看到确实存在三个尾巴【63】

在netty4.x版本中，粘包问题确实被netty的`ByteToMessageDecoder`中的C`allDecode`方法中给处理掉了。

##### 拆包问题

这次还是将TcpClient中的编码器`EncoderHandler`注释掉，然后在`EchoHandler`的`channelActive`中模拟数据的拆包问题：

```
public void channelActive(ChannelHandlerContext ctx) throws Exception {
    User user = new User();
    user.setBirthday(new Date());
    user.setUID(UUID.randomUUID().toString());
    user.setName("冉鹏峰");
    user.setAge(24);
    DTObject dtObject = new DTObject();
    dtObject.setClassName(user.getClass().getName());
    dtObject.setObject(ByteUtils.InstanceObjectMapper().writeValueAsBytes(user));
    TcpProtocol tcpProtocol = new TcpProtocol();
    byte [] objectBytes=ByteUtils.InstanceObjectMapper().writeValueAsBytes(dtObject);
    tcpProtocol.setLen(objectBytes.length);
    tcpProtocol.setData(objectBytes);
    ByteBuf buffer = ctx.alloc().buffer();
    buffer.writeByte(tcpProtocol.getHeader());
    buffer.writeInt(tcpProtocol.getLen());
    buffer.writeBytes(Arrays.copyOfRange(tcpProtocol.getData(),0,tcpProtocol.getLen()/2));//只发送二分之一的数据包
    //模拟拆包
    ctx.write(buffer);
    ctx.flush();
    Thread.sleep(3000);//模拟网络延时
    buffer = ctx.alloc().buffer();        
    buffer.writeBytes(Arrays.copyOfRange(tcpProtocol.getData(),tcpProtocol.getLen()/2,tcpProtocol.getLen()));//将剩下的二分之和尾巴发送过去
    buffer.writeByte(tcpProtocol.getTail());
    ctx.write(buffer);
    ctx.flush();

}
```

运行结果：

首先是客户端这边：

```
2019-01-14 17:08:33 DEBUG [DEBUG] [id: 0x3b8cbbbb, L:/127.0.0.1:51138 - R:/127.0.0.1:8777] WRITE: 95B
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 58 00 00 00 b5 7b 22 63 6c 61 73 73 4e 61 6d 65 |X....{"className|
|00000010| 22 3a 22 70 6f 6a 6f 2e 55 73 65 72 22 2c 22 6f |":"pojo.User","o|
|00000020| 62 6a 65 63 74 22 3a 22 65 79 4a 75 59 57 31 6c |bject":"eyJuYW1l|
|00000030| 49 6a 6f 69 35 59 61 4a 36 62 6d 50 35 62 4f 77 |Ijoi5YaJ6bmP5bOw|
|00000040| 49 69 77 69 59 57 64 6c 49 6a 6f 79 4e 43 77 69 |IiwiYWdlIjoyNCwi|
|00000050| 59 6d 6c 79 64 47 68 6b 59 58 6b 69 4f 69 49    |YmlydGhkYXkiOiI |
+--------+-------------------------------------------------+----------------+
2019-01-14 17:08:33 DEBUG [DEBUG] [id: 0x3b8cbbbb, L:/127.0.0.1:51138 - R:/127.0.0.1:8777] FLUSH
2019-01-14 17:08:36 DEBUG [DEBUG] [id: 0x3b8cbbbb, L:/127.0.0.1:51138 - R:/127.0.0.1:8777] WRITE: 92B
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 79 4d 44 45 35 4c 7a 41 78 4c 7a 45 30 49 44 41 |yMDE5LzAxLzE0IDA|
|00000010| 31 4f 6a 41 34 4f 6a 45 30 49 69 77 69 64 57 6c |1OjA4OjE0IiwidWl|
|00000020| 6b 49 6a 6f 69 4f 57 45 79 5a 6a 49 35 4d 6d 4d |kIjoiOWEyZjI5MmM|
|00000030| 74 4d 6a 4d 35 4f 43 30 30 5a 6a 6b 77 4c 57 46 |tMjM5OC00ZjkwLWF|
|00000040| 6b 5a 57 59 74 5a 6d 46 6c 4e 44 45 7a 5a 6a 55 |kZWYtZmFlNDEzZjU|
|00000050| 35 4e 32 45 33 49 6e 30 3d 22 7d 63             |5N2E3In0="}c    |
+--------+-------------------------------------------------+----------------+
2019-01-14 17:08:36 DEBUG [DEBUG] [id: 0x3b8cbbbb, L:/127.0.0.1:51138 - R:/127.0.0.1:8777] FLUSH
```

确实是将数据分成两包发送出去了

再看看服务端的输出日志：

```
2019-01-14 17:08:33 DEBUG [DEBUG] [id: 0x8e5811b3, L:/127.0.0.1:8777 - R:/127.0.0.1:51138] RECEIVED: 95B
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 58 00 00 00 b5 7b 22 63 6c 61 73 73 4e 61 6d 65 |X....{"className|
|00000010| 22 3a 22 70 6f 6a 6f 2e 55 73 65 72 22 2c 22 6f |":"pojo.User","o|
|00000020| 62 6a 65 63 74 22 3a 22 65 79 4a 75 59 57 31 6c |bject":"eyJuYW1l|
|00000030| 49 6a 6f 69 35 59 61 4a 36 62 6d 50 35 62 4f 77 |Ijoi5YaJ6bmP5bOw|
|00000040| 49 69 77 69 59 57 64 6c 49 6a 6f 79 4e 43 77 69 |IiwiYWdlIjoyNCwi|
|00000050| 59 6d 6c 79 64 47 68 6b 59 58 6b 69 4f 69 49    |YmlydGhkYXkiOiI |
+--------+-------------------------------------------------+----------------+
2019-01-14 17:08:33 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 17:08:33 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 17:08:33 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据长度不够，数据协议len长度为：181,数据包实际可读内容为：90正在等待处理拆包……
2019-01-14 17:08:36 DEBUG [DEBUG] [id: 0x8e5811b3, L:/127.0.0.1:8777 - R:/127.0.0.1:51138] RECEIVED: 92B
         +-------------------------------------------------+
         |  0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f |
+--------+-------------------------------------------------+----------------+
|00000000| 79 4d 44 45 35 4c 7a 41 78 4c 7a 45 30 49 44 41 |yMDE5LzAxLzE0IDA|
|00000010| 31 4f 6a 41 34 4f 6a 45 30 49 69 77 69 64 57 6c |1OjA4OjE0IiwidWl|
|00000020| 6b 49 6a 6f 69 4f 57 45 79 5a 6a 49 35 4d 6d 4d |kIjoiOWEyZjI5MmM|
|00000030| 74 4d 6a 4d 35 4f 43 30 30 5a 6a 6b 77 4c 57 46 |tMjM5OC00ZjkwLWF|
|00000040| 6b 5a 57 59 74 5a 6d 46 6c 4e 44 45 7a 5a 6a 55 |kZWYtZmFlNDEzZjU|
|00000050| 35 4e 32 45 33 49 6e 30 3d 22 7d 63             |5N2E3In0="}c    |
+--------+-------------------------------------------------+----------------+
2019-01-14 17:08:36 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 17:08:36 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 17:08:36 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 17:08:36 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA1OjA4OjE0IiwidWlkIjoiOWEyZjI5MmMtMjM5OC00ZjkwLWFkZWYtZmFlNDEzZjU5N2E3In0="}
2019-01-14 17:08:36 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='9a2f292c-2398-4f90-adef-fae413f597a7', birthday=Mon Jan 14 05:08:00 CST 2019}
```

在第一包数据，判断到bytebuf中的可读内容不够的时候，终止解码，并且从父类的`callDecode`中的while循环break出去，在父类的`channelRead`中等待下一包数据到来的时候将两包数据合并起来再次decode解码。

##### 最后测试下同时出现拆包、粘包的场景

还是将TcpClient中的编码器`EncoderHandler`注释掉，然后在`EchoHandler`的`ChannelActive`方法：

```
public void channelActive(ChannelHandlerContext ctx) throws Exception {
    User user = new User();
    user.setBirthday(new Date());
    user.setUID(UUID.randomUUID().toString());
    user.setName("冉鹏峰");
    user.setAge(24);
    DTObject dtObject = new DTObject();
    dtObject.setClassName(user.getClass().getName());
    dtObject.setObject(ByteUtils.InstanceObjectMapper().writeValueAsBytes(user));
    TcpProtocol tcpProtocol = new TcpProtocol();
    byte [] objectBytes=ByteUtils.InstanceObjectMapper().writeValueAsBytes(dtObject);
    tcpProtocol.setLen(objectBytes.length);
    tcpProtocol.setData(objectBytes);
    ByteBuf buffer = ctx.alloc().buffer();
    buffer.writeByte(tcpProtocol.getHeader());
    buffer.writeInt(tcpProtocol.getLen());
    buffer.writeBytes(Arrays.copyOfRange(tcpProtocol.getData(),0,tcpProtocol.getLen()/2));//拆包，只发送一半的数据

    ctx.write(buffer);
    ctx.flush();
    Thread.sleep(3000);
    buffer = ctx.alloc().buffer();
    buffer.writeBytes(Arrays.copyOfRange(tcpProtocol.getData(),tcpProtocol.getLen()/2,tcpProtocol.getLen())); //拆包发送剩余的一半数据   
    buffer.writeByte(tcpProtocol.getTail());
    //模拟粘包的第二帧数据
    buffer.writeByte(tcpProtocol.getHeader());
    buffer.writeInt(tcpProtocol.getLen());
    buffer.writeBytes(tcpProtocol.getData());
    buffer.writeByte(tcpProtocol.getTail());
    //模拟粘包的第三帧数据
    buffer.writeByte(tcpProtocol.getHeader());
    buffer.writeInt(tcpProtocol.getLen());
    buffer.writeBytes(tcpProtocol.getData());
    buffer.writeByte(tcpProtocol.getTail());
    ctx.write(buffer);
    ctx.flush();

}
```

最后直接查看服务端的输出结果：

```
2019-01-14 17:19:25 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 17:19:25 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 17:19:25 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据长度不够，数据协议len长度为：181,数据包实际可读内容为：90正在等待处理拆包……
2019-01-14 17:19:28 DEBUG [DEBUG] [id: 0xc46234aa, L:/127.0.0.1:8777 - R:/127.0.0.1:51466] RECEIVED: 466B
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 17:19:28 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA1OjE5OjE0IiwidWlkIjoiODE2Zjg2ZDItNDBhMS00MDRkLTgwMWItZmY1NzgxMTJhNjFmIn0="}
2019-01-14 17:19:28 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='816f86d2-40a1-404d-801b-ff578112a61f', birthday=Mon Jan 14 05:19:00 CST 2019}
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 17:19:28 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA1OjE5OjE0IiwidWlkIjoiODE2Zjg2ZDItNDBhMS00MDRkLTgwMWItZmY1NzgxMTJhNjFmIn0="}
2019-01-14 17:19:28 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='816f86d2-40a1-404d-801b-ff578112a61f', birthday=Mon Jan 14 05:19:00 CST 2019}
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 开始解码数据……
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据开头格式正确
2019-01-14 17:19:28 DEBUG [org.wisdom.server.decoder.DecoderHandler] 数据解码成功
2019-01-14 17:19:28 DEBUG [org.wisdom.server.business.BusinessHandler] 解码后的字节码：{"className":"pojo.User","object":"eyJuYW1lIjoi5YaJ6bmP5bOwIiwiYWdlIjoyNCwiYmlydGhkYXkiOiIyMDE5LzAxLzE0IDA1OjE5OjE0IiwidWlkIjoiODE2Zjg2ZDItNDBhMS00MDRkLTgwMWItZmY1NzgxMTJhNjFmIn0="}
2019-01-14 17:19:28 INFO [org.wisdom.server.business.BusinessHandler] 收到实体对象：User{name='冉鹏峰', age=24, UID='816f86d2-40a1-404d-801b-ff578112a61f', birthday=Mon Jan 14 05:19:00 CST 2019}
```

## 总结

对于拆包、粘包只要配合netty的设计原则去实现代码，就能愉快且轻松的解决了。本例虽然通过DTObject包装了数据，避免解码时每增加一种对象类型，就要新增一个if判断的尴尬。但是仍然无法处理传输List、Map时候的场景。