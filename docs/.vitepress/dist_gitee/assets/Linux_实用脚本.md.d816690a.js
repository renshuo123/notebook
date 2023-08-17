import{_ as s,o as n,c as a,S as l}from"./chunks/framework.b12503b9.js";const u=JSON.parse('{"title":"常用 Shell 脚本","description":"","frontmatter":{},"headers":[],"relativePath":"Linux/实用脚本.md","filePath":"Linux/实用脚本.md"}'),p={name:"Linux/实用脚本.md"},e=l(`<h1 id="常用-shell-脚本" tabindex="-1">常用 Shell 脚本 <a class="header-anchor" href="#常用-shell-脚本" aria-label="Permalink to &quot;常用 Shell 脚本&quot;">​</a></h1><h2 id="检测两台服务器指定目录下的文件一致性" tabindex="-1">检测两台服务器指定目录下的文件一致性 <a class="header-anchor" href="#检测两台服务器指定目录下的文件一致性" aria-label="Permalink to &quot;检测两台服务器指定目录下的文件一致性&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">######################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">检测两台服务器指定目录下的文件一致性  </span></span>
<span class="line"><span style="color:#A6ACCD;">#####################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#通过对比两台服务器上文件的md5值，达到检测一致性的目的  </span></span>
<span class="line"><span style="color:#A6ACCD;">dir=/data/web  </span></span>
<span class="line"><span style="color:#A6ACCD;">b_ip=192.168.88.10  </span></span>
<span class="line"><span style="color:#A6ACCD;">#将指定目录下的文件全部遍历出来并作为md5sum命令的参数，进而得到所有文件的md5值，并写入到指定文件中  </span></span>
<span class="line"><span style="color:#A6ACCD;">find $dir -type f|xargs md5sum &gt; /tmp/md5_a.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">ssh $b_ip &quot;find $dir -type f|xargs md5sum &gt; /tmp/md5_b.txt&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">scp $b_ip:/tmp/md5_b.txt /tmp  </span></span>
<span class="line"><span style="color:#A6ACCD;">#将文件名作为遍历对象进行一一比对  </span></span>
<span class="line"><span style="color:#A6ACCD;">for f in \`awk &#39;{print 2} /tmp/md5_a.txt&#39;\`do  </span></span>
<span class="line"><span style="color:#A6ACCD;">#以a机器为标准，当b机器不存在遍历对象中的文件时直接输出不存在的结果  </span></span>
<span class="line"><span style="color:#A6ACCD;">if grep -qw &quot;$f&quot; /tmp/md5_b.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">then  </span></span>
<span class="line"><span style="color:#A6ACCD;">md5_a=\`grep -w &quot;$f&quot; /tmp/md5_a.txt|awk &#39;{print 1}&#39;\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">md5_b=\`grep -w &quot;$f&quot; /tmp/md5_b.txt|awk &#39;{print 1}&#39;\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">#当文件存在时，如果md5值不一致则输出文件改变的结果  </span></span>
<span class="line"><span style="color:#A6ACCD;">if [ $md5_a != $md5_b ]then  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;$f changed.&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">else  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;$f deleted.&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div><h2 id="定时清空文件内容-定时记录文件大小" tabindex="-1">定时清空文件内容，定时记录文件大小 <a class="header-anchor" href="#定时清空文件内容-定时记录文件大小" aria-label="Permalink to &quot;定时清空文件内容，定时记录文件大小&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">#################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">每小时执行一次脚本（任务计划），当时间为0点或12点时，将目标目录下的所有文件内#容清空，但不删除文件，其他时间则只统计各个文件的大小，一个文件一行，输出到以时#间和日期命名的文件中，需要考虑目标目录下二级、三级等子目录的文件  </span></span>
<span class="line"><span style="color:#A6ACCD;">################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">logfile=/tmp/\`date +%H-%F\`.log  </span></span>
<span class="line"><span style="color:#A6ACCD;">n=\`date +%H\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">if [ $n -eq 00 ] || [ $n -eq 12 ]  </span></span>
<span class="line"><span style="color:#A6ACCD;">then  </span></span>
<span class="line"><span style="color:#A6ACCD;">#通过for循环，以find命令作为遍历条件，将目标目录下的所有文件进行遍历并做相应操作  </span></span>
<span class="line"><span style="color:#A6ACCD;">for i in \`find /data/log/ -type f\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">do  </span></span>
<span class="line"><span style="color:#A6ACCD;">true &gt; $i  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">else  </span></span>
<span class="line"><span style="color:#A6ACCD;">for i in \`find /data/log/ -type f\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">do  </span></span>
<span class="line"><span style="color:#A6ACCD;">du -sh $i &gt;&gt; $logfile  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span></code></pre></div><h2 id="检测网卡流量-并按规定格式记录在日志中" tabindex="-1">检测网卡流量，并按规定格式记录在日志中 <a class="header-anchor" href="#检测网卡流量-并按规定格式记录在日志中" aria-label="Permalink to &quot;检测网卡流量，并按规定格式记录在日志中&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">#######################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#检测网卡流量，并按规定格式记录在日志中#规定一分钟记录一次  </span></span>
<span class="line"><span style="color:#A6ACCD;">#日志格式如下所示:  </span></span>
<span class="line"><span style="color:#A6ACCD;">#2019-08-12 20:40  </span></span>
<span class="line"><span style="color:#A6ACCD;">#ens33 input: 1234bps  </span></span>
<span class="line"><span style="color:#A6ACCD;">#ens33 output: 1235bps  </span></span>
<span class="line"><span style="color:#A6ACCD;">######################################################3  </span></span>
<span class="line"><span style="color:#A6ACCD;">while :  </span></span>
<span class="line"><span style="color:#A6ACCD;">do  </span></span>
<span class="line"><span style="color:#A6ACCD;">#设置语言为英文，保障输出结果是英文，否则会出现bug  </span></span>
<span class="line"><span style="color:#A6ACCD;">LANG=en  </span></span>
<span class="line"><span style="color:#A6ACCD;">logfile=/tmp/\`date +%d\`.log  </span></span>
<span class="line"><span style="color:#A6ACCD;">#将下面执行的命令结果输出重定向到logfile日志中  </span></span>
<span class="line"><span style="color:#A6ACCD;">exec &gt;&gt; $logfile  </span></span>
<span class="line"><span style="color:#A6ACCD;">date +&quot;%F %H:%M&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">#sar命令统计的流量单位为kb/s，日志格式为bps，因此要*1000*8  </span></span>
<span class="line"><span style="color:#A6ACCD;">sar -n DEV 1 59|grep Average|grep ens33|awk &#39;{print $2,&quot;\\t&quot;,&quot;input:&quot;,&quot;\\t&quot;,$5*1000*8,&quot;bps&quot;,&quot;\\n&quot;,$2,&quot;\\t&quot;,&quot;output:&quot;,&quot;\\t&quot;,$6*1000*8,&quot;bps&quot;}&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;####################&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">#因为执行sar命令需要59秒，因此不需要sleep  </span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div><h2 id="计算文档每行出现的数字个数-并计算文档数字数" tabindex="-1">计算文档每行出现的数字个数，并计算文档数字数 <a class="header-anchor" href="#计算文档每行出现的数字个数-并计算文档数字数" aria-label="Permalink to &quot;计算文档每行出现的数字个数，并计算文档数字数&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">#########################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#计算文档每行出现的数字个数，并计算整个文档的数字总数  </span></span>
<span class="line"><span style="color:#A6ACCD;">########################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#使用awk只输出文档行数（截取第一段）  </span></span>
<span class="line"><span style="color:#A6ACCD;">n=\`wc -l a.txt|awk &#39;{print $1}&#39;\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">sum=0  </span></span>
<span class="line"><span style="color:#A6ACCD;">#文档中每一行可能存在空格，因此不能直接用文档内容进行遍历  </span></span>
<span class="line"><span style="color:#A6ACCD;">for i in \`seq 1 $n\`do  </span></span>
<span class="line"><span style="color:#A6ACCD;">#输出的行用变量表示时，需要用双引号  </span></span>
<span class="line"><span style="color:#A6ACCD;">line=\`sed -n &quot;$i&quot;p a.txt\`#wc -L选项，统计最长行的长度  </span></span>
<span class="line"><span style="color:#A6ACCD;">n_n=\`echo $line|sed s&#39;/[^0-9]//&#39;g|wc -L\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo $n_nsum=$[$sum+$n_n]  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;sum:$sum&quot;</span></span></code></pre></div><p>杀死所有脚本</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#有一些脚本加入到了cron之中，存在脚本尚未运行完毕又有新任务需要执行的情况，  </span></span>
<span class="line"><span style="color:#A6ACCD;">#导致系统负载升高，因此可通过编写脚本，筛选出影响负载的进程一次性全部杀死。  </span></span>
<span class="line"><span style="color:#A6ACCD;">################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">ps aux|grep 指定进程名|grep -v grep|awk &#39;{print $2}&#39;|xargs kill -9</span></span></code></pre></div><h2 id="从-ftp-服务器下载文件" tabindex="-1">从 FTP 服务器下载文件 <a class="header-anchor" href="#从-ftp-服务器下载文件" aria-label="Permalink to &quot;从 FTP 服务器下载文件&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">if [ $# -ne 1 ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">    echo &quot;Usage: $0 filename&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">dir=$(dirname $1)  </span></span>
<span class="line"><span style="color:#A6ACCD;">file=$(basename $1)  </span></span>
<span class="line"><span style="color:#A6ACCD;">ftp -n -v &lt;&lt; EOF   # -n 自动登录  </span></span>
<span class="line"><span style="color:#A6ACCD;">open 192.168.1.10  # ftp服务器  </span></span>
<span class="line"><span style="color:#A6ACCD;">user admin password  </span></span>
<span class="line"><span style="color:#A6ACCD;">binary   # 设置ftp传输模式为二进制，避免MD5值不同或.tar.gz压缩包格式错误  </span></span>
<span class="line"><span style="color:#A6ACCD;">cd $dir  </span></span>
<span class="line"><span style="color:#A6ACCD;">get &quot;$file&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span></code></pre></div><h2 id="连续输入5个100以内的数字-统计和、最小和最大" tabindex="-1">连续输入5个100以内的数字，统计和、最小和最大 <a class="header-anchor" href="#连续输入5个100以内的数字-统计和、最小和最大" aria-label="Permalink to &quot;连续输入5个100以内的数字，统计和、最小和最大&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">COUNT=1  </span></span>
<span class="line"><span style="color:#A6ACCD;">SUM=0  </span></span>
<span class="line"><span style="color:#A6ACCD;">MIN=0  </span></span>
<span class="line"><span style="color:#A6ACCD;">MAX=100  </span></span>
<span class="line"><span style="color:#A6ACCD;">while [ $COUNT -le 5 ]; do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    read -p &quot;请输入1-10个整数：&quot; INT      </span></span>
<span class="line"><span style="color:#A6ACCD;">    if [[ ! $INT =~ ^[0-9]+$ ]]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;输入必须是整数！&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 1  </span></span>
<span class="line"><span style="color:#A6ACCD;">    elif [[ $INT -gt 100 ]]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;输入必须是100以内！&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 1  </span></span>
<span class="line"><span style="color:#A6ACCD;">    fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">    SUM=$(($SUM+$INT))  </span></span>
<span class="line"><span style="color:#A6ACCD;">    [ $MIN -lt $INT ] &amp;&amp; MIN=$INT  </span></span>
<span class="line"><span style="color:#A6ACCD;">    [ $MAX -gt $INT ] &amp;&amp; MAX=$INT  </span></span>
<span class="line"><span style="color:#A6ACCD;">    let COUNT++  </span></span>
<span class="line"><span style="color:#A6ACCD;">    done  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;SUM: $SUM&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;MIN: $MIN&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;MAX: $MAX</span></span></code></pre></div><p>用户猜数字</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  # 脚本生成一个 100 以内的随机数,提示用户猜数字,根据用户的输入,提示用户猜对了,  </span></span>
<span class="line"><span style="color:#A6ACCD;"># 猜小了或猜大了,直至用户猜对脚本结束。  </span></span>
<span class="line"><span style="color:#A6ACCD;"># RANDOM 为系统自带的系统变量,值为 0‐32767的随机数  </span></span>
<span class="line"><span style="color:#A6ACCD;"># 使用取余算法将随机数变为 1‐100 的随机数num=$[RANDOM%100+1]echo &quot;$num&quot;   </span></span>
<span class="line"><span style="color:#A6ACCD;"># 使用 read 提示用户猜数字  </span></span>
<span class="line"><span style="color:#A6ACCD;"># 使用 if 判断用户猜数字的大小关系:‐eq(等于),‐ne(不等于),‐gt(大于),‐ge(大于等于),  </span></span>
<span class="line"><span style="color:#A6ACCD;"># ‐lt(小于),‐le(小于等于)  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">while :  </span></span>
<span class="line"><span style="color:#A6ACCD;">  do       </span></span>
<span class="line"><span style="color:#A6ACCD;">    read -p &quot;计算机生成了一个 1‐100 的随机数,你猜: &quot; cai      </span></span>
<span class="line"><span style="color:#A6ACCD;">    if [ $cai -eq $num ]      </span></span>
<span class="line"><span style="color:#A6ACCD;">    then          </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;恭喜,猜对了&quot;             </span></span>
<span class="line"><span style="color:#A6ACCD;">        exit          </span></span>
<span class="line"><span style="color:#A6ACCD;">    elif [ $cai -gt $num ]         </span></span>
<span class="line"><span style="color:#A6ACCD;">    then              </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;Oops,猜大了&quot;           </span></span>
<span class="line"><span style="color:#A6ACCD;">    else              </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;Oops,猜小了&quot;       </span></span>
<span class="line"><span style="color:#A6ACCD;">    fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">  done</span></span></code></pre></div><h2 id="监测-nginx-访问日志-502-情况-并做相应动作" tabindex="-1">监测 Nginx 访问日志 502 情况，并做相应动作 <a class="header-anchor" href="#监测-nginx-访问日志-502-情况-并做相应动作" aria-label="Permalink to &quot;监测 Nginx 访问日志 502 情况，并做相应动作&quot;">​</a></h2><p>假设服务器环境为 lnmp，近期访问经常出现 502 现象，且 502 错误在重启 php-fpm 服务后消失，因此需要编写监控脚本，一旦出现 502，则自动重启 php-fpm 服务。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#场景：  </span></span>
<span class="line"><span style="color:#A6ACCD;">#1.访问日志文件的路径：/data/log/access.log  </span></span>
<span class="line"><span style="color:#A6ACCD;">#2.脚本死循环，每10秒检测一次，10秒的日志条数为300条，出现502的比例不低于10%（30条）则需要重启php-fpm服务  </span></span>
<span class="line"><span style="color:#A6ACCD;">#3.重启命令为：/etc/init.d/php-fpm restart  </span></span>
<span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">###########################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#监测Nginx访问日志502情况，并做相应动作  </span></span>
<span class="line"><span style="color:#A6ACCD;">###########################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">log=/data/log/access.log  </span></span>
<span class="line"><span style="color:#A6ACCD;">N=30 #设定阈值  </span></span>
<span class="line"><span style="color:#A6ACCD;">while :do  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #查看访问日志的最新300条，并统计502的次数  </span></span>
<span class="line"><span style="color:#A6ACCD;">    err=\`tail -n 300 $log |grep -c &#39;502&quot; &#39;\`   </span></span>
<span class="line"><span style="color:#A6ACCD;">if [ $err -ge $N ]   </span></span>
<span class="line"><span style="color:#A6ACCD;">then  </span></span>
<span class="line"><span style="color:#A6ACCD;">/etc/init.d/php-fpm restart 2&gt; /dev/null   </span></span>
<span class="line"><span style="color:#A6ACCD;">#设定60s延迟防止脚本bug导致无限重启php-fpm服务  </span></span>
<span class="line"><span style="color:#A6ACCD;">     sleep 60  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;"> sleep 10  </span></span>
<span class="line"><span style="color:#A6ACCD;"> done</span></span></code></pre></div><h2 id="将结果分别赋值给变量" tabindex="-1">将结果分别赋值给变量 <a class="header-anchor" href="#将结果分别赋值给变量" aria-label="Permalink to &quot;将结果分别赋值给变量&quot;">​</a></h2><p>应用场景：希望将执行结果或者位置参数赋值给变量，以便后续使用。</p><p>方法1：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">for i in $(echo &quot;4 5 6&quot;); do  </span></span>
<span class="line"><span style="color:#A6ACCD;">   eval a$i=$idone  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo $a4 $a5 $a6</span></span></code></pre></div><p>方法2：将位置参数<code>192.168.1.1{1,2}</code>拆分为到每个变量</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">num=0  </span></span>
<span class="line"><span style="color:#A6ACCD;">for i in $(eval echo $*);do   #eval将{1,2}分解为1 2  </span></span>
<span class="line"><span style="color:#A6ACCD;">   let num+=1  </span></span>
<span class="line"><span style="color:#A6ACCD;">   eval node\${num}=&quot;$i&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo $node1 $node2 $node3  </span></span>
<span class="line"><span style="color:#A6ACCD;"># bash a.sh 192.168.1.1{1,2}  </span></span>
<span class="line"><span style="color:#A6ACCD;">192.168.1.11 192.168.1.12  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">方法3：arr=(4 5 6)  </span></span>
<span class="line"><span style="color:#A6ACCD;">INDEX1=$(echo \${arr[0]})  </span></span>
<span class="line"><span style="color:#A6ACCD;">INDEX2=$(echo \${arr[1]})  </span></span>
<span class="line"><span style="color:#A6ACCD;">INDEX3=$(echo \${arr[2]})</span></span></code></pre></div><h2 id="批量修改文件名" tabindex="-1">批量修改文件名 <a class="header-anchor" href="#批量修改文件名" aria-label="Permalink to &quot;批量修改文件名&quot;">​</a></h2><p>示例：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># touch article_{1..3}.html  </span></span>
<span class="line"><span style="color:#A6ACCD;"># lsarticle_1.html  article_2.html  article_3.html  </span></span>
<span class="line"><span style="color:#A6ACCD;">目的：把article改为bbs</span></span></code></pre></div><p>方法1：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">for file in $(ls *html); do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    mv $file bbs_\${file#*_}  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # mv $file $(echo $file |sed -r &#39;s/.*(_.*)/bbs\\1/&#39;)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # mv $file $(echo $file |echo bbs_$(cut -d_ -f2)</span></span></code></pre></div><p>方法2：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">for file in $(find . -maxdepth 1 -name &quot;*html&quot;); do  </span></span>
<span class="line"><span style="color:#A6ACCD;">     mv $file bbs_\${file#*_}done</span></span></code></pre></div><p>方法3：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># rename article bbs *.html  </span></span>
<span class="line"><span style="color:#A6ACCD;">把一个文档前五行中包含字母的行删掉，同时删除6到10行包含的所有字母  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">1）准备测试文件，文件名为2.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">第1行1234567不包含字母  </span></span>
<span class="line"><span style="color:#A6ACCD;">第2行56789BBBBBB  </span></span>
<span class="line"><span style="color:#A6ACCD;">第3行67890CCCCCCCC  </span></span>
<span class="line"><span style="color:#A6ACCD;">第4行78asdfDDDDDDDDD  </span></span>
<span class="line"><span style="color:#A6ACCD;">第5行123456EEEEEEEE  </span></span>
<span class="line"><span style="color:#A6ACCD;">第6行1234567ASDF  </span></span>
<span class="line"><span style="color:#A6ACCD;">第7行56789ASDF  </span></span>
<span class="line"><span style="color:#A6ACCD;">第8行67890ASDF  </span></span>
<span class="line"><span style="color:#A6ACCD;">第9行78asdfADSF  </span></span>
<span class="line"><span style="color:#A6ACCD;">第10行123456AAAA  </span></span>
<span class="line"><span style="color:#A6ACCD;">第11行67890ASDF  </span></span>
<span class="line"><span style="color:#A6ACCD;">第12行78asdfADSF  </span></span>
<span class="line"><span style="color:#A6ACCD;">第13行123456AAAA</span></span></code></pre></div><p>2）脚本如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">###############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">把一个文档前五行中包含字母的行删掉，同时删除6到10行包含的所有字母  </span></span>
<span class="line"><span style="color:#A6ACCD;">##############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">sed -n &#39;1,5&#39;p 2.txt |sed &#39;/[a-zA-Z]/&#39;d  </span></span>
<span class="line"><span style="color:#A6ACCD;">sed -n &#39;6,10&#39;p 2.txt |sed s&#39;/[a-zA-Z]//&#39;g  </span></span>
<span class="line"><span style="color:#A6ACCD;">sed -n &#39;11,$&#39;p 2.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">#最终结果只是在屏幕上打印结果，如果想直接更改文件，可将输出结果写入临时文件中，再替换2.txt或者使用-i选项</span></span></code></pre></div><h2 id="统计当前目录中以-html结尾的文件总大小" tabindex="-1">统计当前目录中以.html结尾的文件总大小 <a class="header-anchor" href="#统计当前目录中以-html结尾的文件总大小" aria-label="Permalink to &quot;统计当前目录中以.html结尾的文件总大小&quot;">​</a></h2><p>方法1：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># find . -name &quot;*.html&quot; -exec du -k {} \\; |awk &#39;{sum+=$1}END{print sum}&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">方法2：  </span></span>
<span class="line"><span style="color:#A6ACCD;">\`\`\`bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">for size in $(ls -l *.html |awk &#39;{print $5}&#39;); do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    sum=$(($sum+$size))  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo $sum</span></span></code></pre></div><h2 id="扫描主机端口状态" tabindex="-1">扫描主机端口状态 <a class="header-anchor" href="#扫描主机端口状态" aria-label="Permalink to &quot;扫描主机端口状态&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">HOST=$1  </span></span>
<span class="line"><span style="color:#A6ACCD;">PORT=&quot;22 25 80 8080&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">for PORT in $PORT; do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if echo &amp;&gt;/dev/null &gt; /dev/tcp/$HOST/$PORT; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;$PORT open&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    else  </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;$PORT close&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">用 shell 打印示例语句中字母数小于6的单词  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">#示例语句：  </span></span>
<span class="line"><span style="color:#A6ACCD;">#Bash also interprets a number of multi-character options.  </span></span>
<span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">##############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#shell打印示例语句中字母数小于6的单词  </span></span>
<span class="line"><span style="color:#A6ACCD;">##############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">for s in Bash also interprets a number of multi-character options.  </span></span>
<span class="line"><span style="color:#A6ACCD;">do  </span></span>
<span class="line"><span style="color:#A6ACCD;"> n=\`echo $s|wc -c\`   </span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ $n -lt 6 ]   </span></span>
<span class="line"><span style="color:#A6ACCD;"> then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> echo $s  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div><h2 id="输入数字运行相应命令" tabindex="-1">输入数字运行相应命令 <a class="header-anchor" href="#输入数字运行相应命令" aria-label="Permalink to &quot;输入数字运行相应命令&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">##############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#输入数字运行相应命令  </span></span>
<span class="line"><span style="color:#A6ACCD;">##############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;*cmd menu* 1-date 2-ls 3-who 4-pwd 0-exit &quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">while :  </span></span>
<span class="line"><span style="color:#A6ACCD;">do  </span></span>
<span class="line"><span style="color:#A6ACCD;">#捕获用户键入值  </span></span>
<span class="line"><span style="color:#A6ACCD;"> read -p &quot;please input number :&quot; n  </span></span>
<span class="line"><span style="color:#A6ACCD;"> n1=\`echo $n|sed s&#39;/[0-9]//&#39;g\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">#空输入检测   </span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ -z &quot;$n&quot; ]  </span></span>
<span class="line"><span style="color:#A6ACCD;"> then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> continue  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">#非数字输入检测   </span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ -n &quot;$n1&quot; ]  </span></span>
<span class="line"><span style="color:#A6ACCD;"> then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> exit 0  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;"> break  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">case $n in  </span></span>
<span class="line"><span style="color:#A6ACCD;"> 1)  </span></span>
<span class="line"><span style="color:#A6ACCD;"> date  </span></span>
<span class="line"><span style="color:#A6ACCD;"> ;;  </span></span>
<span class="line"><span style="color:#A6ACCD;"> 2)  </span></span>
<span class="line"><span style="color:#A6ACCD;"> ls  </span></span>
<span class="line"><span style="color:#A6ACCD;"> ;;  </span></span>
<span class="line"><span style="color:#A6ACCD;"> 3)  </span></span>
<span class="line"><span style="color:#A6ACCD;"> who  </span></span>
<span class="line"><span style="color:#A6ACCD;"> ;;  </span></span>
<span class="line"><span style="color:#A6ACCD;"> 4)  </span></span>
<span class="line"><span style="color:#A6ACCD;"> pwd  </span></span>
<span class="line"><span style="color:#A6ACCD;"> ;;  </span></span>
<span class="line"><span style="color:#A6ACCD;"> 0)  </span></span>
<span class="line"><span style="color:#A6ACCD;"> break  </span></span>
<span class="line"><span style="color:#A6ACCD;"> ;;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    #输入数字非1-4的提示  </span></span>
<span class="line"><span style="color:#A6ACCD;"> *)  </span></span>
<span class="line"><span style="color:#A6ACCD;"> echo &quot;please input number is [1-4]&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">esac</span></span></code></pre></div><h2 id="expect-实现-ssh-免交互执行命令" tabindex="-1">Expect 实现 SSH 免交互执行命令 <a class="header-anchor" href="#expect-实现-ssh-免交互执行命令" aria-label="Permalink to &quot;Expect 实现 SSH 免交互执行命令&quot;">​</a></h2><p>Expect是一个自动交互式应用程序的工具，如telnet，ftp，passwd等。</p><p>需先安装expect软件包。</p><p>方法1：EOF标准输出作为expect标准输入</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">USER=root  </span></span>
<span class="line"><span style="color:#A6ACCD;">PASS=123.com  </span></span>
<span class="line"><span style="color:#A6ACCD;">IP=192.168.1.120  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect &lt;&lt; EOFset timeout 30spawn ssh $USER@$IP   expect {    &quot;(yes/no)&quot; {send &quot;yes\\r&quot;; exp_continue}    &quot;password:&quot; {send &quot;$PASS\\r&quot;}  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect &quot;$USER@*&quot;  {send &quot;$1\\r&quot;}  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect &quot;$USER@*&quot;  {send &quot;exit\\r&quot;}  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect eof  </span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span></code></pre></div><p>方法2：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">USER=root  </span></span>
<span class="line"><span style="color:#A6ACCD;">PASS=123.com  </span></span>
<span class="line"><span style="color:#A6ACCD;">IP=192.168.1.120  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect -c &quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    spawn ssh $USER@$IP  </span></span>
<span class="line"><span style="color:#A6ACCD;">    expect {  </span></span>
<span class="line"><span style="color:#A6ACCD;">        \\&quot;(yes/no)\\&quot; {send \\&quot;yes\\r\\&quot;; exp_continue}  </span></span>
<span class="line"><span style="color:#A6ACCD;">        \\&quot;password:\\&quot; {send \\&quot;$PASS\\r\\&quot;; exp_continue}  </span></span>
<span class="line"><span style="color:#A6ACCD;">        \\&quot;$USER@*\\&quot; {send \\&quot;df -h\\r exit\\r\\&quot;; exp_continue}  </span></span>
<span class="line"><span style="color:#A6ACCD;">    }&quot;</span></span></code></pre></div><p>方法3：将expect脚本独立出来</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">登录脚本：  </span></span>
<span class="line"><span style="color:#A6ACCD;"># cat login.exp  </span></span>
<span class="line"><span style="color:#A6ACCD;">#!/usr/bin/expect  </span></span>
<span class="line"><span style="color:#A6ACCD;">set ip [lindex $argv 0]  </span></span>
<span class="line"><span style="color:#A6ACCD;">set user [lindex $argv 1]  </span></span>
<span class="line"><span style="color:#A6ACCD;">set passwd [lindex $argv 2]  </span></span>
<span class="line"><span style="color:#A6ACCD;">set cmd [lindex $argv 3]  </span></span>
<span class="line"><span style="color:#A6ACCD;">if { $argc != 4 } {  </span></span>
<span class="line"><span style="color:#A6ACCD;">puts &quot;Usage: expect login.exp ip user passwd&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">exit 1  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">set timeout 30  </span></span>
<span class="line"><span style="color:#A6ACCD;">spawn ssh $user@$ip  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect {      </span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;(yes/no)&quot; {send &quot;yes\\r&quot;; exp_continue}  </span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;password:&quot; {send &quot;$passwd\\r&quot;}  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect &quot;$user@*&quot;  {send &quot;$cmd\\r&quot;}  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect &quot;$user@*&quot;  {send &quot;exit\\r&quot;}  </span></span>
<span class="line"><span style="color:#A6ACCD;">expect eof</span></span></code></pre></div><p>执行命令脚本：写个循环可以批量操作多台服务器</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">HOST_INFO=user_info.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">for ip in $(awk &#39;{print $1}&#39; $HOST_INFO)  </span></span>
<span class="line"><span style="color:#A6ACCD;">do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    user=$(awk -v I=&quot;$ip&quot; &#39;I==$1{print $2}&#39; $HOST_INFO)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    pass=$(awk -v I=&quot;$ip&quot; &#39;I==$1{print $3}&#39; $HOST_INFO)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    expect login.exp $ip $user $pass $1  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">Linux主机SSH连接信息：  </span></span>
<span class="line"><span style="color:#A6ACCD;"># cat user_info.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">192.168.1.120 root 123456  </span></span>
<span class="line"><span style="color:#A6ACCD;">创建10个用户，并分别设置密码，密码要求10位且包含大小写字母以及数字，最后需要把每个用户的密码存在指定文件中  </span></span>
<span class="line"><span style="color:#A6ACCD;">\`\`\`bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">##############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#创建10个用户，并分别设置密码，密码要求10位且包含大小写字母以及数字  </span></span>
<span class="line"><span style="color:#A6ACCD;">#最后需要把每个用户的密码存在指定文件中#前提条件：安装mkpasswd命令  </span></span>
<span class="line"><span style="color:#A6ACCD;">##############################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#生成10个用户的序列（00-09）  </span></span>
<span class="line"><span style="color:#A6ACCD;">for u in \`seq -w 0 09\`do  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #创建用户  </span></span>
<span class="line"><span style="color:#A6ACCD;"> useradd user_$u  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #生成密码  </span></span>
<span class="line"><span style="color:#A6ACCD;"> p=\`mkpasswd -s 0 -l 10\`   </span></span>
<span class="line"><span style="color:#A6ACCD;"> #从标准输入中读取密码进行修改（不安全）  </span></span>
<span class="line"><span style="color:#A6ACCD;"> echo $p|passwd --stdin user_$u  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #常规修改密码  </span></span>
<span class="line"><span style="color:#A6ACCD;"> echo -e &quot;$p\\n$p&quot;|passwd user_$u  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #将创建的用户及对应的密码记录到日志文件中  </span></span>
<span class="line"><span style="color:#A6ACCD;"> echo &quot;user_$u $p&quot; &gt;&gt; /tmp/userpassworddone</span></span></code></pre></div><h2 id="监控-httpd-的进程数-根据监控情况做相应处理" tabindex="-1">监控 httpd 的进程数，根据监控情况做相应处理 <a class="header-anchor" href="#监控-httpd-的进程数-根据监控情况做相应处理" aria-label="Permalink to &quot;监控 httpd 的进程数，根据监控情况做相应处理&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">###############################################################################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#需求：  </span></span>
<span class="line"><span style="color:#A6ACCD;">#1.每隔10s监控httpd的进程数，若进程数大于等于500，则自动重启Apache服务，并检测服务是否重启成功  </span></span>
<span class="line"><span style="color:#A6ACCD;">#2.若未成功则需要再次启动，若重启5次依旧没有成功，则向管理员发送告警邮件，并退出检测  </span></span>
<span class="line"><span style="color:#A6ACCD;">#3.如果启动成功，则等待1分钟后再次检测httpd进程数，若进程数正常，则恢复正常检测（10s一次），否则放弃重启并向管理员发送告警邮件，并退出检测  </span></span>
<span class="line"><span style="color:#A6ACCD;">###############################################################################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#计数器函数  </span></span>
<span class="line"><span style="color:#A6ACCD;">check_service()  </span></span>
<span class="line"><span style="color:#A6ACCD;">{  </span></span>
<span class="line"><span style="color:#A6ACCD;"> j=0  </span></span>
<span class="line"><span style="color:#A6ACCD;"> for i in \`seq 1 5\`   </span></span>
<span class="line"><span style="color:#A6ACCD;"> do  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #重启Apache的命令  </span></span>
<span class="line"><span style="color:#A6ACCD;"> /usr/local/apache2/bin/apachectl restart 2&gt; /var/log/httpderr.log      </span></span>
<span class="line"><span style="color:#A6ACCD;">    #判断服务是否重启成功  </span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ $? -eq 0 ] then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> break  </span></span>
<span class="line"><span style="color:#A6ACCD;"> else  </span></span>
<span class="line"><span style="color:#A6ACCD;"> j=$[$j+1] fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">    #判断服务是否已尝试重启5次  </span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ $j -eq 5 ] then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> mail.py exit  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;"> done }while :do  </span></span>
<span class="line"><span style="color:#A6ACCD;"> n=\`pgrep -l httpd|wc -l\`   </span></span>
<span class="line"><span style="color:#A6ACCD;"> #判断httpd服务进程数是否超过500  </span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ $n -gt 500 ] then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> /usr/local/apache2/bin/apachectl restart   </span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ $? -ne 0 ]   </span></span>
<span class="line"><span style="color:#A6ACCD;"> then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> check_service   </span></span>
<span class="line"><span style="color:#A6ACCD;"> else  </span></span>
<span class="line"><span style="color:#A6ACCD;"> sleep 60  </span></span>
<span class="line"><span style="color:#A6ACCD;"> n2=\`pgrep -l httpd|wc -l\`   </span></span>
<span class="line"><span style="color:#A6ACCD;"> #判断重启后是否依旧超过500  </span></span>
<span class="line"><span style="color:#A6ACCD;">             if [ $n2 -gt 500 ]   </span></span>
<span class="line"><span style="color:#A6ACCD;"> then   </span></span>
<span class="line"><span style="color:#A6ACCD;"> mail.py exit  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;"> fi  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #每隔10s检测一次  </span></span>
<span class="line"><span style="color:#A6ACCD;"> sleep 10done</span></span></code></pre></div><h2 id="批量修改服务器用户密码" tabindex="-1">批量修改服务器用户密码 <a class="header-anchor" href="#批量修改服务器用户密码" aria-label="Permalink to &quot;批量修改服务器用户密码&quot;">​</a></h2><p>Linux主机SSH连接信息：旧密码</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># cat old_pass.txt   </span></span>
<span class="line"><span style="color:#A6ACCD;">192.168.18.217  root    123456     22  </span></span>
<span class="line"><span style="color:#A6ACCD;">192.168.18.218  root    123456     22  </span></span>
<span class="line"><span style="color:#A6ACCD;">内容格式：IP User Password Port  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">SSH远程修改密码脚本：新密码随机生成  </span></span>
<span class="line"><span style="color:#A6ACCD;">https://www.linuxprobe.com/books  </span></span>
<span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">OLD_INFO=old_pass.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">NEW_INFO=new_pass.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">for IP in $(awk &#39;/^[^#]/{print $1}&#39; $OLD_INFO); do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    USER=$(awk -v I=$IP &#39;I==$1{print $2}&#39; $OLD_INFO)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    PASS=$(awk -v I=$IP &#39;I==$1{print $3}&#39; $OLD_INFO)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    PORT=$(awk -v I=$IP &#39;I==$1{print $4}&#39; $OLD_INFO)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    NEW_PASS=$(mkpasswd -l 8)  # 随机密码  </span></span>
<span class="line"><span style="color:#A6ACCD;">    echo &quot;$IP   $USER   $NEW_PASS   $PORT&quot; &gt;&gt; $NEW_INFO  </span></span>
<span class="line"><span style="color:#A6ACCD;">    expect -c &quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    spawn ssh -p$PORT $USER@$IP  </span></span>
<span class="line"><span style="color:#A6ACCD;">    set timeout 2  </span></span>
<span class="line"><span style="color:#A6ACCD;">    expect {  </span></span>
<span class="line"><span style="color:#A6ACCD;">        \\&quot;(yes/no)\\&quot; {send \\&quot;yes\\r\\&quot;;exp_continue}  </span></span>
<span class="line"><span style="color:#A6ACCD;">        \\&quot;password:\\&quot; {send \\&quot;$PASS\\r\\&quot;;exp_continue}  </span></span>
<span class="line"><span style="color:#A6ACCD;">        \\&quot;$USER@*\\&quot; {send \\&quot;echo \\&#39;$NEW_PASS\\&#39; |passwd --stdin $USER\\r exit\\r\\&quot;;exp_continue}  </span></span>
<span class="line"><span style="color:#A6ACCD;">    }&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">done  </span></span>
<span class="line"><span style="color:#A6ACCD;">生成新密码文件：  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;"># cat new_pass.txt   </span></span>
<span class="line"><span style="color:#A6ACCD;">192.168.18.217  root    n8wX3mU%      22  </span></span>
<span class="line"><span style="color:#A6ACCD;">192.168.18.218  root    c87;ZnnL      22</span></span></code></pre></div><h2 id="iptables-自动屏蔽访问网站频繁的ip" tabindex="-1">iptables 自动屏蔽访问网站频繁的IP <a class="header-anchor" href="#iptables-自动屏蔽访问网站频繁的ip" aria-label="Permalink to &quot;iptables 自动屏蔽访问网站频繁的IP&quot;">​</a></h2><p>场景：恶意访问,安全防范</p><p>1）屏蔽每分钟访问超过200的IP</p><p>方法1：根据访问日志（Nginx为例）</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">DATE=$(date +%d/%b/%Y:%H:%M)  </span></span>
<span class="line"><span style="color:#A6ACCD;">ABNORMAL_IP=$(tail -n5000 access.log |grep $DATE |awk &#39;{a[$1]++}END{for(i in a)if(a[i]&gt;100)print i}&#39;)  </span></span>
<span class="line"><span style="color:#A6ACCD;">#先tail防止文件过大，读取慢，数字可调整每分钟最大的访问量。awk不能直接过滤日志，因为包含特殊字符。  </span></span>
<span class="line"><span style="color:#A6ACCD;">for IP in $ABNORMAL_IP; do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if [ $(iptables -vnL |grep -c &quot;$IP&quot;) -eq 0 ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        iptables -I INPUT -s $IP -j DROP    fidone</span></span></code></pre></div><p>方法2：通过TCP建立的连接</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">ABNORMAL_IP=$(netstat -an |awk &#39;$4~/:80$/ &amp;&amp; $6~/ESTABLISHED/{gsub(/:[0-9]+/,&quot;&quot;,$5);{a[$5]++}}END{for(i in a)if(a[i]&gt;100)print i}&#39;)  </span></span>
<span class="line"><span style="color:#A6ACCD;">#gsub是将第五列（客户端IP）的冒号和端口去掉  </span></span>
<span class="line"><span style="color:#A6ACCD;">for IP in $ABNORMAL_IP; do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if [ $(iptables -vnL |grep -c &quot;$IP&quot;) -eq 0 ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        iptables -I INPUT -s $IP -j DROP      </span></span>
<span class="line"><span style="color:#A6ACCD;">        fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div><p>2）屏蔽每分钟SSH尝试登录超过10次的IP</p><p>方法1：通过lastb获取登录状态:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">DATE=$(date +&quot;%a %b %e %H:%M&quot;) #星期月天时分  %e单数字时显示7，而%d显示07  </span></span>
<span class="line"><span style="color:#A6ACCD;">ABNORMAL_IP=$(lastb |grep &quot;$DATE&quot; |awk &#39;{a[$3]++}END{for(i in a)if(a[i]&gt;10)print i}&#39;)for IP in $ABNORMAL_IP; do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if [ $(iptables -vnL |grep -c &quot;$IP&quot;) -eq 0 ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        iptables -I INPUT -s $IP -j DROP    fidone</span></span></code></pre></div><p>方法2：通过日志获取登录状态</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">DATE=$(date +&quot;%b %d %H&quot;)  </span></span>
<span class="line"><span style="color:#A6ACCD;">ABNORMAL_IP=&quot;$(tail -n10000 /var/log/auth.log |grep &quot;$DATE&quot; |awk &#39;/Failed/{a[$(NF-3)]++}END{for(i in a)if(a[i]&gt;5)print i}&#39;)&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">for IP in $ABNORMAL_IP; do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if [ $(iptables -vnL |grep -c &quot;$IP&quot;) -eq 0 ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        iptables -A INPUT -s $IP -j DROP          </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;$(date +&quot;%F %T&quot;) - iptables -A INPUT -s $IP -j DROP&quot; &gt;&gt;~/ssh-login-limit.log      </span></span>
<span class="line"><span style="color:#A6ACCD;">    fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div><h2 id="根据web访问日志-封禁请求量异常的ip" tabindex="-1">根据web访问日志，封禁请求量异常的IP <a class="header-anchor" href="#根据web访问日志-封禁请求量异常的ip" aria-label="Permalink to &quot;根据web访问日志，封禁请求量异常的IP&quot;">​</a></h2><h2 id="如ip在半小时后恢复正常-则解除封禁" tabindex="-1">如IP在半小时后恢复正常，则解除封禁 <a class="header-anchor" href="#如ip在半小时后恢复正常-则解除封禁" aria-label="Permalink to &quot;如IP在半小时后恢复正常，则解除封禁&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">####################################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">#根据web访问日志，封禁请求量异常的IP，如IP在半小时后恢复正常，则解除封禁  </span></span>
<span class="line"><span style="color:#A6ACCD;">####################################################################################  </span></span>
<span class="line"><span style="color:#A6ACCD;">logfile=/data/log/access.log  </span></span>
<span class="line"><span style="color:#A6ACCD;">#显示一分钟前的小时和分钟  </span></span>
<span class="line"><span style="color:#A6ACCD;">d1=\`date -d &quot;-1 minute&quot; +%H%M\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">d2=\`date +%M\`  </span></span>
<span class="line"><span style="color:#A6ACCD;">ipt=/sbin/iptables  </span></span>
<span class="line"><span style="color:#A6ACCD;">ips=/tmp/ips.txt  </span></span>
<span class="line"><span style="color:#A6ACCD;">block()  </span></span>
<span class="line"><span style="color:#A6ACCD;">{   </span></span>
<span class="line"><span style="color:#A6ACCD;">#将一分钟前的日志全部过滤出来并提取IP以及统计访问次数  </span></span>
<span class="line"><span style="color:#A6ACCD;"> grep &#39;$d1:&#39; $logfile|awk &#39;{print $1}&#39;|sort -n|uniq -c|sort -n &gt; $ips  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #利用for循环将次数超过100的IP依次遍历出来并予以封禁  </span></span>
<span class="line"><span style="color:#A6ACCD;"> for i in \`awk &#39;$1&gt;100 {print $2}&#39; $ips\`   </span></span>
<span class="line"><span style="color:#A6ACCD;"> do  </span></span>
<span class="line"><span style="color:#A6ACCD;"> $ipt -I INPUT -p tcp --dport 80 -s $i -j REJECT   </span></span>
<span class="line"><span style="color:#A6ACCD;"> echo &quot;\`date +%F-%T\` $i&quot; &gt;&gt; /tmp/badip.log   </span></span>
<span class="line"><span style="color:#A6ACCD;"> done  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">unblock()  </span></span>
<span class="line"><span style="color:#A6ACCD;">{   </span></span>
<span class="line"><span style="color:#A6ACCD;">#将封禁后所产生的pkts数量小于10的IP依次遍历予以解封  </span></span>
<span class="line"><span style="color:#A6ACCD;"> for a in \`$ipt -nvL INPUT --line-numbers |grep &#39;0.0.0.0/0&#39;|awk &#39;$2&lt;10 {print $1}&#39;|sort -nr\`   </span></span>
<span class="line"><span style="color:#A6ACCD;"> do   </span></span>
<span class="line"><span style="color:#A6ACCD;"> $ipt -D INPUT $a  </span></span>
<span class="line"><span style="color:#A6ACCD;"> done  </span></span>
<span class="line"><span style="color:#A6ACCD;"> $ipt -Z  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">#当时间在00分以及30分时执行解封函数  </span></span>
<span class="line"><span style="color:#A6ACCD;">if [ $d2 -eq &quot;00&quot; ] || [ $d2 -eq &quot;30&quot; ]   </span></span>
<span class="line"><span style="color:#A6ACCD;"> then  </span></span>
<span class="line"><span style="color:#A6ACCD;"> #要先解再封，因为刚刚封禁时产生的pkts数量很少  </span></span>
<span class="line"><span style="color:#A6ACCD;"> unblock  </span></span>
<span class="line"><span style="color:#A6ACCD;"> block   </span></span>
<span class="line"><span style="color:#A6ACCD;"> else  </span></span>
<span class="line"><span style="color:#A6ACCD;"> block  </span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span></code></pre></div><h2 id="判断用户输入的是否为ip地址" tabindex="-1">判断用户输入的是否为IP地址 <a class="header-anchor" href="#判断用户输入的是否为ip地址" aria-label="Permalink to &quot;判断用户输入的是否为IP地址&quot;">​</a></h2><p>方法1:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">function check_ip(){  </span></span>
<span class="line"><span style="color:#A6ACCD;">    IP=$1  </span></span>
<span class="line"><span style="color:#A6ACCD;">    VALID_CHECK=$(echo $IP|awk -F. &#39;$1&lt; =255&amp;&amp;$2&lt;=255&amp;&amp;$3&lt;=255&amp;&amp;$4&lt;=255{print &quot;yes&quot;}&#39;)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if echo $IP|grep -E &quot;^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$&quot;&gt;/dev/null; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $VALID_CHECK == &quot;yes&quot; ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;$IP available.&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">        else  </span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;$IP not available!&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">        fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">    else  </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;Format error!&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">check_ip 192.168.1.1  </span></span>
<span class="line"><span style="color:#A6ACCD;">check_ip 256.1.1.1</span></span></code></pre></div><p>方法2：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">function check_ip(){  </span></span>
<span class="line"><span style="color:#A6ACCD;">    IP=$1  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if [[ $IP =~ ^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$ ]]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        FIELD1=$(echo $IP|cut -d. -f1)  </span></span>
<span class="line"><span style="color:#A6ACCD;">        FIELD2=$(echo $IP|cut -d. -f2)  </span></span>
<span class="line"><span style="color:#A6ACCD;">        FIELD3=$(echo $IP|cut -d. -f3)  </span></span>
<span class="line"><span style="color:#A6ACCD;">        FIELD4=$(echo $IP|cut -d. -f4)  </span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $FIELD1 -le 255 -a $FIELD2 -le 255 -a $FIELD3 -le 255 -a $FIELD4 -le 255 ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;$IP available.&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">        else  </span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;$IP not available!&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">        fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">    else  </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;Format error!&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">check_ip 192.168.1.1  </span></span>
<span class="line"><span style="color:#A6ACCD;">check_ip 256.1.1.1</span></span></code></pre></div><p>增加版：</p><p>加个死循环，如果IP可用就退出，不可用提示继续输入，并使用awk判断。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash  </span></span>
<span class="line"><span style="color:#A6ACCD;">function check_ip(){  </span></span>
<span class="line"><span style="color:#A6ACCD;">    local IP=$1  </span></span>
<span class="line"><span style="color:#A6ACCD;">    VALID_CHECK=$(echo $IP|awk -F. &#39;$1&lt; =255&amp;&amp;$2&lt;=255&amp;&amp;$3&lt;=255&amp;&amp;$4&lt;=255{print &quot;yes&quot;}&#39;)  </span></span>
<span class="line"><span style="color:#A6ACCD;">    if echo $IP|grep -E &quot;^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$&quot; &gt;/dev/null; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $VALID_CHECK == &quot;yes&quot; ]; then  </span></span>
<span class="line"><span style="color:#A6ACCD;">            return 0  </span></span>
<span class="line"><span style="color:#A6ACCD;">        else  </span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;$IP not available!&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">            return 1  </span></span>
<span class="line"><span style="color:#A6ACCD;">        fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">    else  </span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;Format error! Please input again.&quot;  </span></span>
<span class="line"><span style="color:#A6ACCD;">        return 1  </span></span>
<span class="line"><span style="color:#A6ACCD;">    fi  </span></span>
<span class="line"><span style="color:#A6ACCD;">}  </span></span>
<span class="line"><span style="color:#A6ACCD;">while true; do  </span></span>
<span class="line"><span style="color:#A6ACCD;">    read -p &quot;Please enter IP: &quot; IP  </span></span>
<span class="line"><span style="color:#A6ACCD;">    check_ip $IP  </span></span>
<span class="line"><span style="color:#A6ACCD;">    [ $? -eq 0 ] &amp;&amp; break || continue  </span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div>`,83),o=[e];function c(t,i,C,A,r,y){return n(),a("div",null,o)}const d=s(p,[["render",c]]);export{u as __pageData,d as default};
