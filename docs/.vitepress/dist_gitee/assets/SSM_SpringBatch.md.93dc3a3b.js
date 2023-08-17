import{_ as s,o as n,c as a,S as p}from"./chunks/framework.b12503b9.js";const m=JSON.parse('{"title":"批处理框架 Spring Batch","description":"","frontmatter":{},"headers":[],"relativePath":"SSM/SpringBatch.md","filePath":"SSM/SpringBatch.md"}'),l={name:"SSM/SpringBatch.md"},o=p(`<h1 id="批处理框架-spring-batch" tabindex="-1">批处理框架 Spring Batch <a class="header-anchor" href="#批处理框架-spring-batch" aria-label="Permalink to &quot;批处理框架 Spring Batch&quot;">​</a></h1><p><a href="https://mp.weixin.qq.com/s?__biz=MzU4MDUyMDQyNQ==&amp;mid=2247512163&amp;idx=1&amp;sn=eea81c05aaab027f526ec0d4bf898f44&amp;chksm=fd5760e5ca20e9f33140a6cc0bfef24d4f897b2d300903f4be94dd29be955b4afa1bd1023db5&amp;mpshare=1&amp;scene=23&amp;srcid=1201jUkyd6HjS207Bx9hYt4S&amp;sharer_sharetime=1669869248015&amp;sharer_shareid=29b8a04db1dbd975e3bf4e9f47e7ac67#rd" target="_blank" rel="noreferrer">非常强，批处理框架 Spring Batch 就该这么用！（场景实战）</a></p><p>概念词就不多说了，我简单地介绍下 ， spring batch 是一个 方便使用的 较健全的 批处理 框架。</p><p>为什么说是方便使用的，因为这是 基于spring的一个框架，接入简单、易理解、流程分明。</p><p>为什么说是较健全的， 因为它提供了往常我们在对大批量数据进行处理时需要考虑到的 日志跟踪、事务粒度调配、可控执行、失败机制、重试机制、数据读写等。</p><h2 id="正文" tabindex="-1">正文 <a class="header-anchor" href="#正文" aria-label="Permalink to &quot;正文&quot;">​</a></h2><p>那么回到文章，我们该篇文章将会带来给大家的是什么？（结合实例讲解那是当然的）</p><p>从实现的业务场景来说，有以下两个：</p><blockquote><ol><li>从 csv文件 读取数据，进行业务处理再存储</li><li>从 数据库 读取数据，进行业务处理再存储</li></ol></blockquote><p>也就是平时经常遇到的数据清理或者数据过滤，又或者是数据迁移备份等等。大批量的数据，自己实现分批处理需要考虑的东西太多了，又不放心，那么使用 Spring Batch 框架 是一个很好的选择。</p><p>首先，在进入实例教程前，我们看看这次的实例里，我们使用springboot 整合spring batch 框架，要编码的东西有什么？</p><p>通过一张简单的图来了解：</p><img src="https://edu-8673.oss-cn-beijing.aliyuncs.com/img2022.12.30/202212062256441.png" alt="image-20221206225629336" style="zoom:67%;"><p>可能大家看到这个图，是不是多多少少想起来定时任务框架？确实有那么点像，但是我必须在这告诉大家，这是一个批处理框架，不是一个schuedling 框架。但是前面提到它提供了可执行控制，也就是说，啥时候执行是可控的，那么显然就是自己可以进行扩展结合定时任务框架，实现你心中所想。</p><p>ok，回到主题，相信大家能从图中简单明了地看到我们这次实例，需要实现的东西有什么了。所以我就不在对各个小组件进行大批量文字的描述了。</p><p>那么我们事不宜迟，开始我们的实例教程。</p><p>首先准备一个数据库，里面建一张简单的表，用于实例数据的写入存储或者说是读取等等。</p><p><strong>bloginfo表</strong></p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHlf3kk6icXUEpgicgt9hbdmAjRxO4njIEoGZCicibXRgJmn8uJGZo9tkzFA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>相关建表sql语句：</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">CREATE</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">TABLE</span><span style="color:#A6ACCD;"> \`</span><span style="color:#82AAFF;">bloginfo</span><span style="color:#A6ACCD;">\`  (</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">11</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">NOT NULL</span><span style="color:#A6ACCD;"> AUTO_INCREMENT COMMENT </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">主键</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">blogAuthor</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">varchar</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">) COMMENT </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">博客作者标识</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">blogUrl</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">varchar</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">) COMMENT </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">博客链接</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">blogTitle</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">varchar</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">) COMMENT </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">博客标题</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">blogItem</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">varchar</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">) COMMENT </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">博客栏目</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">PRIMARY KEY</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">USING</span><span style="color:#A6ACCD;"> BTREE</span></span>
<span class="line"><span style="color:#A6ACCD;">) ENGINE </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> InnoDB AUTO_INCREMENT </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">89031</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">CHARACTER</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">SET</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> utf8 </span><span style="color:#C792EA;">COLLATE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> utf8_general_ci ROW_FORMAT </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">Dynamic</span><span style="color:#A6ACCD;">;</span></span></code></pre></div><p>pom文件里的核心依赖：</p><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-boot-starter-web</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-boot-starter-test</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">test</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--  spring batch --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-boot-starter-batch</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- hibernate validator --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.hibernate</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">hibernate-validator</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">6.0.7.Final</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--  mybatis --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.mybatis.spring.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mybatis-spring-boot-starter</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">2.0.0</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--  mysql --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mysql</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mysql-connector-java</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">runtime</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- druid数据源驱动 1.1.10解决springboot从1.0——2.0版本问题--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.alibaba</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">druid-spring-boot-starter</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">1.1.18</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>yml文件：</p><div class="language-yml"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">spring</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">batch</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">job</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#设置为 false -需要jobLaucher.run执行</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">initialize-schema</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">always</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    table-prefix: my-batch</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">datasource</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">druid</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">password</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">jdbc:mysql://localhost:3306/hellodemo?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=GMT%2B8&amp;zeroDateTimeBehavior=convertToNull</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">driver-class-name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">initialSize</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">minIdle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">maxActive</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">maxWait</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60000</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">timeBetweenEvictionRunsMillis</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60000</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">minEvictableIdleTimeMillis</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">300000</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">validationQuery</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">SELECT 1 FROM DUAL</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">testWhileIdle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">testOnBorrow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">testOnReturn</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">poolPreparedStatements</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">maxPoolPreparedStatementPerConnectionSize</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">useGlobalDataSourceStat</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">connectionProperties</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000</span></span>
<span class="line"><span style="color:#F07178;">server</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8665</span></span></code></pre></div><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHOPwOFGyADTuUDn8W8cY782X6TNLq0HOlUKVvusZxPicaJOK6DnXNiaBA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><blockquote><p>ps：这里我们用到了druid数据库连接池，其实有个小坑，后面文章会讲到。</p></blockquote><p>因为我们这次的实例最终数据处理完之后，是写入数据库存储（当然你也可以输出到文件等等）。</p><p>所以我们前面也建了一张表，pom文件里面我们也整合的mybatis，那么我们在整合spring batch 主要编码前，我们先把这些关于数据库打通用到的简单过一下。</p><h5 id="pojo-层" tabindex="-1">pojo 层 <a class="header-anchor" href="#pojo-层" aria-label="Permalink to &quot;pojo 层&quot;">​</a></h5><p>BlogInfo.java ：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;">public class BlogInfo {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    private Integer id;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String blogAuthor;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String blogUrl;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String blogTitle;</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String blogItem;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String toString() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;BlogInfo{&quot; +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;id=&quot; + id +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;, blogAuthor=&#39;&quot; + blogAuthor + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;, blogUrl=&#39;&quot; + blogUrl + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;, blogTitle=&#39;&quot; + blogTitle + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;, blogItem=&#39;&quot; + blogItem + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &#39;}&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public Integer getId() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return id;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setId(Integer id) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.id = id;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public String getBlogAuthor() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return blogAuthor;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setBlogAuthor(String blogAuthor) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.blogAuthor = blogAuthor;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public String getBlogUrl() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return blogUrl;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setBlogUrl(String blogUrl) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.blogUrl = blogUrl;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public String getBlogTitle() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return blogTitle;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setBlogTitle(String blogTitle) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.blogTitle = blogTitle;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public String getBlogItem() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return blogItem;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setBlogItem(String blogItem) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.blogItem = blogItem;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="mapper层" tabindex="-1">mapper层 <a class="header-anchor" href="#mapper层" aria-label="Permalink to &quot;mapper层&quot;">​</a></h5><p>BlogMapper.java ：</p><blockquote><p>ps：可以看到这个实例我用的是注解的方式，哈哈为了省事，而且我还不写servcie层和impl层，也是为了省事，因为该篇文章重点不在这些，所以这些不好的大家不要学。</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import com.example.batchdemo.pojo.BlogInfo;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.apache.ibatis.annotations.*;</span></span>
<span class="line"><span style="color:#A6ACCD;">import java.util.List;</span></span>
<span class="line"><span style="color:#A6ACCD;">import java.util.Map;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;">@Mapper</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface BlogMapper {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Insert(&quot;INSERT INTO bloginfo ( blogAuthor, blogUrl, blogTitle, blogItem )   VALUES ( #{blogAuthor}, #{blogUrl},#{blogTitle},#{blogItem}) &quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Options(useGeneratedKeys = true, keyProperty = &quot;id&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    int insert(BlogInfo bloginfo);</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Select(&quot;select blogAuthor, blogUrl, blogTitle, blogItem from bloginfo where blogAuthor &lt; #{authorId}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">     List&lt;BlogInfo&gt; queryInfoById(Map&lt;String , Integer&gt; map);</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>接下来 ，重头戏，我们开始对前边那张图里涉及到的各个小组件进行编码。</p><p>首先创建一个 配置类， <code>MyBatchConfig.java</code>：</p><p>从我起名来看，可以知道这基本就是咱们整合spring batch 涉及到的一些配置组件都会写在这里了。</p><p>首先我们按照咱们上面的图来看，里面包含内容有：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">JobRepository job的注册/存储器</span></span>
<span class="line"><span style="color:#A6ACCD;">JobLauncher job的执行器 </span></span>
<span class="line"><span style="color:#A6ACCD;">Job job任务，包含一个或多个Step</span></span>
<span class="line"><span style="color:#A6ACCD;">Step 包含（ItemReader、ItemProcessor和ItemWriter) </span></span>
<span class="line"><span style="color:#A6ACCD;">ItemReader 数据读取器 </span></span>
<span class="line"><span style="color:#A6ACCD;">ItemProcessor 数据处理器</span></span>
<span class="line"><span style="color:#A6ACCD;">ItemWriter 数据输出器</span></span></code></pre></div><p>首先，在MyBatchConfig类前加入注解：</p><p><code>@Configuration</code> 用于告诉spring，咱们这个类是一个自定义配置类，里面很多bean都需要加载到spring容器里面</p><p><code>@EnableBatchProcessing</code> 开启批处理支持</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVH1d9DJkgfY0r13gDYvLVXvu23k5w2bZkooWJgoFkau2iabkPyp4zk5BQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>然后开始往MyBatchConfig类里，编写各个小组件。</p><h5 id="jobrepository" tabindex="-1">JobRepository <a class="header-anchor" href="#jobrepository" aria-label="Permalink to &quot;JobRepository&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * JobRepository定义：Job的注册容器以及和数据库打交道（事务管理等）</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param dataSource</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param transactionManager</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @throws Exception</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public JobRepository myJobRepository(DataSource dataSource, PlatformTransactionManager transactionManager) throws Exception{</span></span>
<span class="line"><span style="color:#A6ACCD;">    JobRepositoryFactoryBean jobRepositoryFactoryBean = new JobRepositoryFactoryBean();</span></span>
<span class="line"><span style="color:#A6ACCD;">    jobRepositoryFactoryBean.setDatabaseType(&quot;mysql&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    jobRepositoryFactoryBean.setTransactionManager(transactionManager);</span></span>
<span class="line"><span style="color:#A6ACCD;">    jobRepositoryFactoryBean.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return jobRepositoryFactoryBean.getObject();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="joblauncher" tabindex="-1">JobLauncher <a class="header-anchor" href="#joblauncher" aria-label="Permalink to &quot;JobLauncher&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * jobLauncher定义：job的启动器,绑定相关的jobRepository</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param dataSource</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param transactionManager</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @throws Exception</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public SimpleJobLauncher myJobLauncher(DataSource dataSource, PlatformTransactionManager transactionManager) throws Exception{</span></span>
<span class="line"><span style="color:#A6ACCD;">    SimpleJobLauncher jobLauncher = new SimpleJobLauncher();</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 设置jobRepository</span></span>
<span class="line"><span style="color:#A6ACCD;">    jobLauncher.setJobRepository(myJobRepository(dataSource, transactionManager));</span></span>
<span class="line"><span style="color:#A6ACCD;">    return jobLauncher;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="job" tabindex="-1">Job <a class="header-anchor" href="#job" aria-label="Permalink to &quot;Job&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 定义job</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param jobs</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param myStep</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public Job myJob(JobBuilderFactory jobs, Step myStep){</span></span>
<span class="line"><span style="color:#A6ACCD;">    return jobs.get(&quot;myJob&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .incrementer(new RunIdIncrementer())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .flow(myStep)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .end()</span></span>
<span class="line"><span style="color:#A6ACCD;">            .listener(myJobListener())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .build();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>对于Job的运行，是可以配置监听器的</p><h5 id="joblistener" tabindex="-1">JobListener <a class="header-anchor" href="#joblistener" aria-label="Permalink to &quot;JobListener&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 注册job监听器</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public MyJobListener myJobListener(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    return new MyJobListener();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>这是一个我们自己自定义的监听器，所以是单独创建的，<code>MyJobListener.java</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :监听Job执行情况，实现JobExecutorListener，且在batch配置类里，Job的Bean上绑定该监听器</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyJobListener implements JobExecutionListener {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    private Logger logger = LoggerFactory.getLogger(MyJobListener.class);</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void beforeJob(JobExecution jobExecution) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        logger.info(&quot;job 开始, id={}&quot;,jobExecution.getJobId());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void afterJob(JobExecution jobExecution) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        logger.info(&quot;job 结束, id={}&quot;,jobExecution.getJobId());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h6 id="step-itemreader-itemprocessor-itemwriter" tabindex="-1">Step（ItemReader ItemProcessor ItemWriter） <a class="header-anchor" href="#step-itemreader-itemprocessor-itemwriter" aria-label="Permalink to &quot;Step（ItemReader  ItemProcessor  ItemWriter）&quot;">​</a></h6><p>step里面包含数据读取器，数据处理器，数据输出器三个小组件的的实现。</p><p>我们也是一个个拆解来进行编写。</p><p>文章前边说到，该篇实现的场景包含两种，一种是从csv文件读入大量数据进行处理，另一种是从数据库表读入大量数据进行处理。</p><h5 id="从csv文件读取数据" tabindex="-1">从CSV文件读取数据 <a class="header-anchor" href="#从csv文件读取数据" aria-label="Permalink to &quot;从CSV文件读取数据&quot;">​</a></h5><h5 id="itemreader" tabindex="-1">ItemReader <a class="header-anchor" href="#itemreader" aria-label="Permalink to &quot;ItemReader&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * ItemReader定义：读取文件数据+entirty实体类映射</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public ItemReader&lt;BlogInfo&gt; reader(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 使用FlatFileItemReader去读cvs文件，一行即一条数据</span></span>
<span class="line"><span style="color:#A6ACCD;">    FlatFileItemReader&lt;BlogInfo&gt; reader = new FlatFileItemReader&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 设置文件处在路径</span></span>
<span class="line"><span style="color:#A6ACCD;">    reader.setResource(new ClassPathResource(&quot;static/bloginfo.csv&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">    // entity与csv数据做映射</span></span>
<span class="line"><span style="color:#A6ACCD;">    reader.setLineMapper(new DefaultLineMapper&lt;BlogInfo&gt;() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            setLineTokenizer(new DelimitedLineTokenizer() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    setNames(new String[]{&quot;blogAuthor&quot;,&quot;blogUrl&quot;,&quot;blogTitle&quot;,&quot;blogItem&quot;});</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            });</span></span>
<span class="line"><span style="color:#A6ACCD;">            setFieldSetMapper(new BeanWrapperFieldSetMapper&lt;BlogInfo&gt;() {</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    setTargetType(BlogInfo.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            });</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;">    return reader;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>简单代码解析：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHgVGv5CaY7at07YiaGLFVDOQHiciadHlfE2aCViaPTACuLiawuX63B8dqAoQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>对于数据读取器 ItemReader ，我们给它安排了一个读取监听器，创建 <code>MyReadListener.java</code> ：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyReadListener implements ItemReadListener&lt;BlogInfo&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    private Logger logger = LoggerFactory.getLogger(MyReadListener.class);</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void beforeRead() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void afterRead(BlogInfo item) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void onReadError(Exception ex) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        try {</span></span>
<span class="line"><span style="color:#A6ACCD;">            logger.info(format(&quot;%s%n&quot;, ex.getMessage()));</span></span>
<span class="line"><span style="color:#A6ACCD;">        } catch (Exception e) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            e.printStackTrace();</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="itemprocessor" tabindex="-1">ItemProcessor <a class="header-anchor" href="#itemprocessor" aria-label="Permalink to &quot;ItemProcessor&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 注册ItemProcessor: 处理数据+校验数据</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public ItemProcessor&lt;BlogInfo, BlogInfo&gt; processor(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    MyItemProcessor myItemProcessor = new MyItemProcessor();</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 设置校验器</span></span>
<span class="line"><span style="color:#A6ACCD;">    myItemProcessor.setValidator(myBeanValidator());</span></span>
<span class="line"><span style="color:#A6ACCD;">    return myItemProcessor;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>数据处理器，是我们自定义的，里面主要是包含我们对数据处理的业务逻辑，并且我们设置了一些数据校验器，我们这里使用 JSR-303的Validator来作为校验器。</p><h5 id="校验器" tabindex="-1">校验器 <a class="header-anchor" href="#校验器" aria-label="Permalink to &quot;校验器&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 注册校验器</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public MyBeanValidator myBeanValidator(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    return new MyBeanValidator&lt;BlogInfo&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>创建<code>MyItemProcessor.java</code> ：</p><blockquote><p>ps：里面我的数据处理逻辑是，获取出读取数据里面的每条数据的blogItem字段，如果是springboot，那就对title字段值进行替换。</p></blockquote><p>其实也就是模拟一个简单地数据处理场景。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import com.example.batchdemo.pojo.BlogInfo;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.springframework.batch.item.validator.ValidatingItemProcessor;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.springframework.batch.item.validator.ValidationException;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyItemProcessor extends ValidatingItemProcessor&lt;BlogInfo&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public BlogInfo process(BlogInfo item) throws ValidationException {</span></span>
<span class="line"><span style="color:#A6ACCD;">        /**</span></span>
<span class="line"><span style="color:#A6ACCD;">         * 需要执行super.process(item)才会调用自定义校验器</span></span>
<span class="line"><span style="color:#A6ACCD;">         */</span></span>
<span class="line"><span style="color:#A6ACCD;">        super.process(item);</span></span>
<span class="line"><span style="color:#A6ACCD;">        /**</span></span>
<span class="line"><span style="color:#A6ACCD;">         * 对数据进行简单的处理</span></span>
<span class="line"><span style="color:#A6ACCD;">         */</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (item.getBlogItem().equals(&quot;springboot&quot;)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            item.setBlogTitle(&quot;springboot 系列还请看看我Jc&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">            item.setBlogTitle(&quot;未知系列&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        return item;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>创建MyBeanValidator.java：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import org.springframework.batch.item.validator.ValidationException;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.springframework.batch.item.validator.Validator;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.springframework.beans.factory.InitializingBean;</span></span>
<span class="line"><span style="color:#A6ACCD;">import javax.validation.ConstraintViolation;</span></span>
<span class="line"><span style="color:#A6ACCD;">import javax.validation.Validation;</span></span>
<span class="line"><span style="color:#A6ACCD;">import javax.validation.ValidatorFactory;</span></span>
<span class="line"><span style="color:#A6ACCD;">import java.util.Set;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyBeanValidator&lt;T&gt; implements Validator&lt;T&gt;, InitializingBean {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    private javax.validation.Validator validator;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void validate(T value) throws ValidationException {</span></span>
<span class="line"><span style="color:#A6ACCD;">        /**</span></span>
<span class="line"><span style="color:#A6ACCD;">         * 使用Validator的validate方法校验数据</span></span>
<span class="line"><span style="color:#A6ACCD;">         */</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set&lt;ConstraintViolation&lt;T&gt;&gt; constraintViolations =</span></span>
<span class="line"><span style="color:#A6ACCD;">                validator.validate(value);</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (constraintViolations.size() &gt; 0) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            StringBuilder message = new StringBuilder();</span></span>
<span class="line"><span style="color:#A6ACCD;">            for (ConstraintViolation&lt;T&gt; constraintViolation : constraintViolations) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                message.append(constraintViolation.getMessage() + &quot;\\n&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">            throw new ValidationException(message.toString());</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * 使用JSR-303的Validator来校验我们的数据，在此进行JSR-303的Validator的初始化</span></span>
<span class="line"><span style="color:#A6ACCD;">     * @throws Exception</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void afterPropertiesSet() throws Exception {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ValidatorFactory validatorFactory =</span></span>
<span class="line"><span style="color:#A6ACCD;">                Validation.buildDefaultValidatorFactory();</span></span>
<span class="line"><span style="color:#A6ACCD;">        validator = validatorFactory.usingContext().getValidator();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><blockquote><p>ps：其实该篇文章没有使用这个数据校验器，大家想使用的话，可以在实体类上添加一些校验器的注解@NotNull @Max @Email等等。我偏向于直接在处理器里面进行处理，想把关于数据处理的代码都写在一块。</p></blockquote><h5 id="itemwriter" tabindex="-1">ItemWriter <a class="header-anchor" href="#itemwriter" aria-label="Permalink to &quot;ItemWriter&quot;">​</a></h5><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * ItemWriter定义：指定datasource，设置批量插入sql语句，写入数据库</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param dataSource</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public ItemWriter&lt;BlogInfo&gt; writer(DataSource dataSource){</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 使用jdbcBcatchItemWrite写数据到数据库中</span></span>
<span class="line"><span style="color:#A6ACCD;">    JdbcBatchItemWriter&lt;BlogInfo&gt; writer = new JdbcBatchItemWriter&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 设置有参数的sql语句</span></span>
<span class="line"><span style="color:#A6ACCD;">    writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider&lt;BlogInfo&gt;());</span></span>
<span class="line"><span style="color:#A6ACCD;">    String sql = &quot;insert into bloginfo &quot;+&quot; (blogAuthor,blogUrl,blogTitle,blogItem) &quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            +&quot; values(:blogAuthor,:blogUrl,:blogTitle,:blogItem)&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    writer.setSql(sql);</span></span>
<span class="line"><span style="color:#A6ACCD;">    writer.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return writer;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>简单代码解析：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHrRK3iax7JAZEic1NUylukWMCyVC7x23BvVkEIxxTlDZsCtA5IFf3xNqw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>同样 对于数据读取器 ItemWriter ，我们给它也安排了一个输出监听器，创建 <code>MyWriteListener.java</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import com.example.batchdemo.pojo.BlogInfo;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.slf4j.Logger;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.slf4j.LoggerFactory;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.springframework.batch.core.ItemWriteListener;</span></span>
<span class="line"><span style="color:#A6ACCD;">import java.util.List;</span></span>
<span class="line"><span style="color:#A6ACCD;">import static java.lang.String.format;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyWriteListener implements ItemWriteListener&lt;BlogInfo&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Logger logger = LoggerFactory.getLogger(MyWriteListener.class);</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void beforeWrite(List&lt;? extends BlogInfo&gt; items) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void afterWrite(List&lt;? extends BlogInfo&gt; items) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void onWriteError(Exception exception, List&lt;? extends BlogInfo&gt; items) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        try {</span></span>
<span class="line"><span style="color:#A6ACCD;">            logger.info(format(&quot;%s%n&quot;, exception.getMessage()));</span></span>
<span class="line"><span style="color:#A6ACCD;">            for (BlogInfo message : items) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                logger.info(format(&quot;Failed writing BlogInfo : %s&quot;, message.toString()));</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">        } catch (Exception e) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            e.printStackTrace();</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><code>ItemReader</code>、<code>ItemProcessor</code>、<code>ItemWriter</code>，这三个小组件到这里，我们都实现了，那么接下来就是把这三个小组件跟我们的step去绑定起来。</p><p>写在MyBatchConfig类里</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * step定义：</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 包括</span></span>
<span class="line"><span style="color:#A6ACCD;"> * ItemReader 读取</span></span>
<span class="line"><span style="color:#A6ACCD;"> * ItemProcessor  处理</span></span>
<span class="line"><span style="color:#A6ACCD;"> * ItemWriter 输出</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param stepBuilderFactory</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param reader</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param writer</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param processor</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public Step myStep(StepBuilderFactory stepBuilderFactory, ItemReader&lt;BlogInfo&gt; reader,</span></span>
<span class="line"><span style="color:#A6ACCD;">                 ItemWriter&lt;BlogInfo&gt; writer, ItemProcessor&lt;BlogInfo, BlogInfo&gt; processor){</span></span>
<span class="line"><span style="color:#A6ACCD;">    return stepBuilderFactory</span></span>
<span class="line"><span style="color:#A6ACCD;">            .get(&quot;myStep&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .&lt;BlogInfo, BlogInfo&gt;chunk(65000) // Chunk的机制(即每次读取一条数据，再处理一条数据，累积到一定数量后再一次性交给writer进行写入操作)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .reader(reader).faultTolerant().retryLimit(3).retry(Exception.class).skip(Exception.class).skipLimit(2)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .listener(new MyReadListener())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .processor(processor)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .writer(writer).faultTolerant().skip(Exception.class).skipLimit(2)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .listener(new MyWriteListener())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .build();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>这个Step，稍作讲解。</p><p>前边提到了，spring batch框架，提供了事务的控制，重启，检测跳过等等机制。</p><p>那么，这些东西的实现，很多都在于这个step环节的设置。</p><p>首先看到我们代码出现的第一个设置，<code>chunk( 6500 ) </code>，Chunk的机制(即每次读取一条数据，再处理一条数据，累积到一定数量后再一次性交给writer进行写入操作。</p><p>没错，对于整个step环节，就是数据的读取，处理最后到输出。</p><p>这个chunk机制里，我们传入的 6500，也就是是告诉它，读取处理数据，累计达到 6500条进行一次批次处理，去执行写入操作。</p><p>这个传值，是根据具体业务而定，可以是500条一次，1000条一次，也可以是20条一次，50条一次。</p><p>通过一张简单的小图来帮助理解：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVH54AY9xkGUhRLVngibhQRxAiarhSGZ7TZkzKMjsBaT3R6Sb1pD3GTlDpA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>在我们大量数据处理，不管是读取或者说是写入，都肯定会涉及到一些未知或者已知因素导致某条数据失败了。</p><p>那么如果说咱们啥也不设置，失败一条数据，那么我们就当作整个失败了？。显然这个太不人性，所以spring batch 提供了 retry 和 skip 两个设置（其实还有restart） ，通过这两个设置来人性化地解决一些数据操作失败场景。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">retryLimit(3).retry(Exception.class)</span></span></code></pre></div><p>没错，这个就是设置重试，当出现异常的时候，重试多少次。我们设置为3，也就是说当一条数据操作失败，那我们会对这条数据进行重试3次，还是失败就是 当做失败了， 那么我们如果有配置skip（推荐配置使用），那么这个数据失败记录就会留到给 skip 来处理。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">skip(Exception.class).skipLimit(2)</span></span></code></pre></div><p>skip，跳过，也就是说我们如果设置3， 那么就是可以容忍 3条数据的失败。只有达到失败数据达到3次，我们才中断这个step。</p><p>对于失败的数据，我们做了相关的监听器以及异常信息记录，供与后续手动补救。</p><p>那么记下来我们开始去调用这个批处理job，我们通过接口去触发这个批处理事件，新建一个Controller，<code>TestController.java</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;">@RestController</span></span>
<span class="line"><span style="color:#A6ACCD;">public class TestController {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    SimpleJobLauncher jobLauncher;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    Job myJob;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;testJob&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public  void testJob() throws JobParametersInvalidException, JobExecutionAlreadyRunningException, JobRestartException, JobInstanceAlreadyCompleteException {</span></span>
<span class="line"><span style="color:#A6ACCD;">     //    后置参数：使用JobParameters中绑定参数 addLong  addString 等方法</span></span>
<span class="line"><span style="color:#A6ACCD;">        JobParameters jobParameters = new JobParametersBuilder().toJobParameters();</span></span>
<span class="line"><span style="color:#A6ACCD;">        jobLauncher.run(myJob, jobParameters);</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>对了，我准备了一个csv文件 <code>bloginfo.csv</code>，里面大概8万多条数据，用来进行批处理测试：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHzY5IaFZWuicO3ia4uiaeNwsibAfIZx3ljjCrenfEUPicKAuZVIhLwqZAjAQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>这个文件的路径跟我们的数据读取器里面读取的路径要一直，</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHfibTlZVL6TUHyWWoZRUCAtmbaiclF8sTmjJCH732pAvdDxbm9wUMrETg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVH4MsAsVmiaQ2FjociapuHNvobDicpVC7FMgZtHZZiafMILl7sWgkoEKoCRQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>目前我们数据库是这个样子，</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHSoEvtcBFfFT4F2NE7hu2DsnveHiaN7Ec3oSUibTuHheGGVZgJ2D9vGxg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>接下来我们把我们的项目启动起来，再看一眼数据库，生成了一些batch用来跟踪记录job的一些数据表：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHPKlpojFuNWvxjYSnhIOb1ppjLgjsib4cuQTeKsF7Xbf0IfRPAuOsBNw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>我们来调用一下testJob接口，</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHX6AVUWJODxAicofcxPriauyugV5mblWG90Bq0f81BLZowiab3IOJ1jbkA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>然后看下数据库，可以看的数据全部都进行了相关的逻辑处理并插入到了数据库：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHE2g0poBtibwedOufBE8I0OnUia8QPgMnJEh2q2OP4MEXgPHia6TNVRg3w/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>到这里，我们对Springboot 整合 spring batch 其实已经操作完毕了，也实现了从csv文件读取数据处理存储的业务场景。</p><p>从数据库读取数据</p><blockquote><p>ps：前排提示使用druid有坑。后面会讲到。</p></blockquote><p>那么接下来实现场景，从数据库表内读取数据进行处理输出到新的表里面。</p><p>那么基于我们上边的整合，我们已经实现了</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">JobRepository job的注册/存储器</span></span>
<span class="line"><span style="color:#A6ACCD;">JobLauncher job的执行器 </span></span>
<span class="line"><span style="color:#A6ACCD;">Job job任务，包含一个或多个Step</span></span>
<span class="line"><span style="color:#A6ACCD;">Step 包含（ItemReader、ItemProcessor和ItemWriter) </span></span>
<span class="line"><span style="color:#A6ACCD;">ItemReader 数据读取器 </span></span>
<span class="line"><span style="color:#A6ACCD;">ItemProcessor 数据处理器</span></span>
<span class="line"><span style="color:#A6ACCD;">ItemWriter 数据输出器</span></span>
<span class="line"><span style="color:#A6ACCD;">job 监听器</span></span>
<span class="line"><span style="color:#A6ACCD;">reader 监听器</span></span>
<span class="line"><span style="color:#A6ACCD;">writer 监听器</span></span>
<span class="line"><span style="color:#A6ACCD;">process 数据校验器</span></span></code></pre></div><p>那么对于我们新写一个job完成 一个新的场景，我们需要全部重写么？</p><p>显然没必要，当然完全新写一套也是可以的。</p><p>那么该篇，对于一个新的也出场景，从csv文件读取数据转换到数据库表读取数据，我们重新新建的有：</p><ol><li><strong>数据读取器：</strong> 原先使用的是 <code>FlatFileItemReader</code> ，我们现在改为使用 <code>MyBatisCursorItemReader</code></li><li><strong>数据处理器：</strong> 新的场景，业务为了好扩展，所以我们处理器最好也新建一个</li><li><strong>数据输出器：</strong> 新的场景，业务为了好扩展，所以我们数据输出器最好也新建一个</li><li><strong>step的绑定设置：</strong> 新的场景，业务为了好扩展，所以我们step最好也新建一个</li><li><strong>Job：</strong> 当然是要重新写一个了</li></ol><p>其他我们照用原先的就行，JobRepository，JobLauncher以及各种监听器啥的，暂且不重新建了。</p><p>新建<code>MyItemProcessorNew.java</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import org.springframework.batch.item.validator.ValidatingItemProcessor;</span></span>
<span class="line"><span style="color:#A6ACCD;">import org.springframework.batch.item.validator.ValidationException;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Author : JCccc</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @Description :</span></span>
<span class="line"><span style="color:#A6ACCD;"> **/</span></span>
<span class="line"><span style="color:#A6ACCD;">public class MyItemProcessorNew extends ValidatingItemProcessor&lt;BlogInfo&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public BlogInfo process(BlogInfo item) throws ValidationException {</span></span>
<span class="line"><span style="color:#A6ACCD;">        /**</span></span>
<span class="line"><span style="color:#A6ACCD;">         * 需要执行super.process(item)才会调用自定义校验器</span></span>
<span class="line"><span style="color:#A6ACCD;">         */</span></span>
<span class="line"><span style="color:#A6ACCD;">        super.process(item);</span></span>
<span class="line"><span style="color:#A6ACCD;">        /**</span></span>
<span class="line"><span style="color:#A6ACCD;">         * 对数据进行简单的处理</span></span>
<span class="line"><span style="color:#A6ACCD;">         */</span></span>
<span class="line"><span style="color:#A6ACCD;">        Integer authorId= Integer.valueOf(item.getBlogAuthor());</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (authorId&lt;20000) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            item.setBlogTitle(&quot;这是都是小于20000的数据&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        } else if (authorId&gt;20000 &amp;&amp; authorId&lt;30000){</span></span>
<span class="line"><span style="color:#A6ACCD;">            item.setBlogTitle(&quot;这是都是小于30000但是大于20000的数据&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }else {</span></span>
<span class="line"><span style="color:#A6ACCD;">            item.setBlogTitle(&quot;旧书不厌百回读&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        return item;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>然后其他重新定义的小组件，写在MyBatchConfig类里：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 定义job</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param jobs</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param stepNew</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public Job myJobNew(JobBuilderFactory jobs, Step stepNew){</span></span>
<span class="line"><span style="color:#A6ACCD;">    return jobs.get(&quot;myJobNew&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .incrementer(new RunIdIncrementer())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .flow(stepNew)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .end()</span></span>
<span class="line"><span style="color:#A6ACCD;">            .listener(myJobListener())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .build();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public Step stepNew(StepBuilderFactory stepBuilderFactory, MyBatisCursorItemReader&lt;BlogInfo&gt; itemReaderNew,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ItemWriter&lt;BlogInfo&gt; writerNew, ItemProcessor&lt;BlogInfo, BlogInfo&gt; processorNew){</span></span>
<span class="line"><span style="color:#A6ACCD;">    return stepBuilderFactory</span></span>
<span class="line"><span style="color:#A6ACCD;">            .get(&quot;stepNew&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .&lt;BlogInfo, BlogInfo&gt;chunk(65000) // Chunk的机制(即每次读取一条数据，再处理一条数据，累积到一定数量后再一次性交给writer进行写入操作)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .reader(itemReaderNew).faultTolerant().retryLimit(3).retry(Exception.class).skip(Exception.class).skipLimit(10)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .listener(new MyReadListener())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .processor(processorNew)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .writer(writerNew).faultTolerant().skip(Exception.class).skipLimit(2)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .listener(new MyWriteListener())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .build();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public ItemProcessor&lt;BlogInfo, BlogInfo&gt; processorNew(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    MyItemProcessorNew csvItemProcessor = new MyItemProcessorNew();</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 设置校验器</span></span>
<span class="line"><span style="color:#A6ACCD;">    csvItemProcessor.setValidator(myBeanValidator());</span></span>
<span class="line"><span style="color:#A6ACCD;">    return csvItemProcessor;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">private SqlSessionFactory sqlSessionFactory;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">@StepScope</span></span>
<span class="line"><span style="color:#A6ACCD;">//Spring Batch提供了一个特殊的bean scope类（StepScope:作为一个自定义的Spring bean scope）。这个step scope的作用是连接batches的各个steps。这个机制允许配置在Spring的beans当steps开始时才实例化并且允许你为这个step指定配置和参数。</span></span>
<span class="line"><span style="color:#A6ACCD;">public MyBatisCursorItemReader&lt;BlogInfo&gt; itemReaderNew(@Value(&quot;#{jobParameters[authorId]}&quot;) String authorId) {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        System.out.println(&quot;开始查询数据库&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        MyBatisCursorItemReader&lt;BlogInfo&gt; reader = new MyBatisCursorItemReader&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        reader.setQueryId(&quot;com.example.batchdemo.mapper.BlogMapper.queryInfoById&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        reader.setSqlSessionFactory(sqlSessionFactory);</span></span>
<span class="line"><span style="color:#A6ACCD;">         Map&lt;String , Object&gt; map = new HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">          map.put(&quot;authorId&quot; , Integer.valueOf(authorId));</span></span>
<span class="line"><span style="color:#A6ACCD;">         reader.setParameterValues(map);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return reader;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * ItemWriter定义：指定datasource，设置批量插入sql语句，写入数据库</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param dataSource</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @return</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public ItemWriter&lt;BlogInfo&gt; writerNew(DataSource dataSource){</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 使用jdbcBcatchItemWrite写数据到数据库中</span></span>
<span class="line"><span style="color:#A6ACCD;">    JdbcBatchItemWriter&lt;BlogInfo&gt; writer = new JdbcBatchItemWriter&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 设置有参数的sql语句</span></span>
<span class="line"><span style="color:#A6ACCD;">    writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider&lt;BlogInfo&gt;());</span></span>
<span class="line"><span style="color:#A6ACCD;">    String sql = &quot;insert into bloginfonew &quot;+&quot; (blogAuthor,blogUrl,blogTitle,blogItem) &quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            +&quot; values(:blogAuthor,:blogUrl,:blogTitle,:blogItem)&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    writer.setSql(sql);</span></span>
<span class="line"><span style="color:#A6ACCD;">    writer.setDataSource(dataSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return writer;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="代码需要注意的点" tabindex="-1">代码需要注意的点 <a class="header-anchor" href="#代码需要注意的点" aria-label="Permalink to &quot;代码需要注意的点&quot;">​</a></h2><p>数据读取器 <code>MyBatisCursorItemReader</code></p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHzlNuxd6CcEdcicMJILb7AqLR6ggt2jic5ibP6lHbJJgCuADnmDBy7UqUQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>对应的mapper方法：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHhTsgiadlgawbYwQxHPDZbdelcf8HDYoXv8YN6OmFoDibJ3ESgNwWMcfA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>数据处理器 MyItemProcessorNew：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHAlUt9g151kkVbvJh3sLtlC0YIvm4FPR61EymFUo0lM922c6as8TFXg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>数据输出器，新插入到别的数据库表去，特意这样为了测试：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHz90LP7K8MMicGyO9LcgkR58uJNW5Xw7F5O1QtZDSkHBibDm3PliaiaqicCg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>当然我们的数据库为了测试这个场景，也是新建了一张表，bloginfonew 表。</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHccN0wpA3v2gZh0BB8mSfDAttbyy264ylr0ydTqrgMYvI5WwDt3anhQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>接下来，我们新写一个接口来执行新的这个job：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHTnx3QpG57nzlfk3mF53OL2ctYmyNXE0KLI25C7p7KIWKxk2K76zK6Q/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">SimpleJobLauncher jobLauncher;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">Job myJobNew;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@GetMapping(&quot;testJobNew&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public  void testJobNew(@RequestParam(&quot;authorId&quot;) String authorId) throws JobParametersInvalidException, JobExecutionAlreadyRunningException, JobRestartException, JobInstanceAlreadyCompleteException {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    JobParameters jobParametersNew = new JobParametersBuilder().addLong(&quot;timeNew&quot;, System.currentTimeMillis())</span></span>
<span class="line"><span style="color:#A6ACCD;">            .addString(&quot;authorId&quot;,authorId)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .toJobParameters();</span></span>
<span class="line"><span style="color:#A6ACCD;">    jobLauncher.run(myJobNew,jobParametersNew);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>ok，我们来调用一些这个接口：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHPhOibpugiaBCPicK77vjpBdyPI6D1CNsy3BMub77sRRvBsvI0aicXl5hrA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>看下控制台：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHEW2723Ph61RU45Gv8icDsJib1QzxESeoZMLHhjQYuJDiaI1AISBZwz0Pw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>没错，这就是失败的，原因是因为跟druid有关，报了一个数据库功能不支持。这是在数据读取的时候报的错。</p><p>我初步测试认为是<code>MyBatisCursorItemReader</code> ，druid 数据库连接池不支持。</p><p>那么，我们只需要：</p><ol><li>注释掉druid连接池 jar依赖</li></ol><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHJEw0liaezBHfegEgvCnEUy2VRhsp96elGD1SceIPZddgmRg1KAb0a9A/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><ol><li>yml里替换连接池配置</li></ol><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHKczMORGfQIvQQfNLr8mAvQpGLqWOIxSQPib7ATkFjytG78uHsN2UvCQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>其实我们不配置其他连接池，springboot 2.X 版本已经为我们整合了默认的连接池 HikariCP 。</p><blockquote><p>在Springboot2.X版本，数据库的连接池官方推荐使用HikariCP</p></blockquote><p>如果不是为了druid的那些后台监控数据，sql分析等等，完全是优先使用HikariCP的。</p><p>官方的原话：</p><blockquote><blockquote><p>We preferHikariCPfor its performance and concurrency. If HikariCP is available, we always choose it.</p></blockquote></blockquote><p>翻译：</p><blockquote><p>我们更喜欢hikaricpf的性能和并发性。如果有HikariCP，我们总是选择它。</p></blockquote><p>所以我们就啥连接池也不配了，使用默认的HikariCP 连接池。</p><p>当然你想配，也是可以的：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHbSkmxedh9B5JOg3x0HQLa3Rub8RYz8Cc4sR8UsFcjDSuAhQmlfaDibw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>所以我们剔除掉druid链接池后，我们再来调用一下新接口：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVH7gDQJicrp6pxzhuBX3RY1RtuegXrfahEexqxGbovVaBX3zoY1LibzjQQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>可以看到，从数据库获取数据并进行批次处理写入job是成功的：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHibb6fp4F9iaYDXf6iaj3JxibPLwLu5Id4p6qKcCuAWkWylNYApFvdt3XEw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>新的表里面插入的数据都进行了自己写的逻辑处理：</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_png/knmrNHnmCLEwxeL4yj7MRlRA6kCUQEVHTQqMQv19iaY0ce8RXQ8jNiaicbEicuuAxLokOOrTgmHYNVpCX9ZD7dcwuQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="图片"></p><p>图片</p><p>好了，springboot 整合 spring batch 批处理框架， 就到此吧。</p>`,212),e=[o];function t(c,r,i,C,A,y){return n(),a("div",null,e)}const g=s(l,[["render",t]]);export{m as __pageData,g as default};
