import{_ as s,o as n,c as a,S as l}from"./chunks/framework.b12503b9.js";const F=JSON.parse('{"title":"常用基础配置-前端","description":"","frontmatter":{},"headers":[],"relativePath":"Nginx/实战篇.md","filePath":"Nginx/实战篇.md"}'),p={name:"Nginx/实战篇.md"},o=l(`<h1 id="常用基础配置-前端" tabindex="-1">常用基础配置-前端 <a class="header-anchor" href="#常用基础配置-前端" aria-label="Permalink to &quot;常用基础配置-前端&quot;">​</a></h1><h2 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">user </span><span style="color:#A6ACCD;">                           root</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">worker_processes </span><span style="color:#A6ACCD;">               </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">events</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> worker_connections </span><span style="color:#A6ACCD;">           </span><span style="color:#F78C6C;">10240</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">http</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> log_format </span><span style="color:#A6ACCD;">                   </span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#C3E88D;"> - </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_user</span><span style="color:#C3E88D;"> [</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">time_local</span><span style="color:#C3E88D;">] &#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&#39;&quot;</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">request</span><span style="color:#C3E88D;">&quot; </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">status</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">body_bytes_sent</span><span style="color:#C3E88D;"> &#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&#39;&quot;</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">http_referer</span><span style="color:#C3E88D;">&quot; &quot;</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">http_user_agent</span><span style="color:#C3E88D;">&quot;&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> include </span><span style="color:#A6ACCD;">                      mime.types</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> default_type </span><span style="color:#A6ACCD;">                 application/octet-stream</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> sendfile </span><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;"> on;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">#autoindex                    on;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">#autoindex_exact_size         off;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> autoindex_localtime </span><span style="color:#A6ACCD;">         </span><span style="color:#89DDFF;"> on;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> keepalive_timeout </span><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">65</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip </span><span style="color:#A6ACCD;">                        </span><span style="color:#89DDFF;"> on;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip_disable </span><span style="color:#A6ACCD;">                 </span><span style="color:#C3E88D;">&quot;msie6&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip_min_length </span><span style="color:#A6ACCD;">              </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip_buffers </span><span style="color:#A6ACCD;">                 </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">16k</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip_comp_level </span><span style="color:#A6ACCD;">              </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip_types </span><span style="color:#A6ACCD;">                 text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip_types </span><span style="color:#A6ACCD;">                   </span><span style="color:#C3E88D;">&quot;*&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> gzip_vary </span><span style="color:#A6ACCD;">                   </span><span style="color:#89DDFF;"> off;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_tokens </span><span style="color:#A6ACCD;">               </span><span style="color:#89DDFF;"> off;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> client_max_body_size </span><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">200m</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">                     </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;"> default_server;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">                _</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;">                      </span><span style="color:#F78C6C;">403</span><span style="color:#A6ACCD;"> /www/403/index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> include </span><span style="color:#A6ACCD;">                      ../serve/*.conf</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="隐藏-nginx-版本信息" tabindex="-1">隐藏 Nginx 版本信息 <a class="header-anchor" href="#隐藏-nginx-版本信息" aria-label="Permalink to &quot;隐藏 Nginx 版本信息&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">http</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_tokens </span><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;"> off;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="禁止ip直接访问80端口" tabindex="-1">禁止ip直接访问80端口 <a class="header-anchor" href="#禁止ip直接访问80端口" aria-label="Permalink to &quot;禁止ip直接访问80端口&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">               </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;"> default;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">          _</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;">                </span><span style="color:#F78C6C;">500</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="启动-web-服务-vue-项目为例" tabindex="-1">启动 web 服务 (vue 项目为例) <a class="header-anchor" href="#启动-web-服务-vue-项目为例" aria-label="Permalink to &quot;启动 web 服务 (vue 项目为例)&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 项目启动端口</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">           </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 域名（localhost）</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">      _</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 禁止 iframe 嵌套</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> add_header </span><span style="color:#A6ACCD;">       X-Frame-Options SAMEORIGIN</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 访问地址 根路径配置</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 项目目录</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">	    html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 默认读取文件</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">          index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 配置 history 模式的刷新空白</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> try_files </span><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri/ /index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 后缀匹配，解决静态资源找不到问题</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~*</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\\.(gif|jpg|jpeg|png|css|js|ico)$ </span><span style="color:#A6ACCD;">{ </span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">          html/static/</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 图片防盗链</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">~/static/.*\\.(jpg|jpeg|png|gif|webp)$ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">             html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> valid_referers </span><span style="color:#A6ACCD;">   *.deeruby.com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">invalid_referer) </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;">          </span><span style="color:#F78C6C;">403</span><span style="color:#F07178;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 访问限制</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/static </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">              html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># allow 允许</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> allow </span><span style="color:#A6ACCD;">             39.xxx.xxx.xxx</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># deny  拒绝</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> deny </span><span style="color:#A6ACCD;">             </span><span style="color:#89DDFF;"> all;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="pc端和移动端使用不同的项目文件映射" tabindex="-1">PC端和移动端使用不同的项目文件映射 <a class="header-anchor" href="#pc端和移动端使用不同的项目文件映射" aria-label="Permalink to &quot;PC端和移动端使用不同的项目文件映射&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">  ......</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">/home/static/pc</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">http_user_agent </span><span style="color:#89DDFF;">~* </span><span style="color:#C3E88D;">&#39;(mobile|android|iphone|ipad|phone)&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> root </span><span style="color:#F07178;">/home/static/mobile</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="配置多个项目-location-匹配路由区别" tabindex="-1">配置多个项目 (location 匹配路由区别) <a class="header-anchor" href="#配置多个项目-location-匹配路由区别" aria-label="Permalink to &quot;配置多个项目 (location 匹配路由区别)&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">               </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">          _</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 主应用</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">         html/main</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">              index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> try_files </span><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri/ /index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 子应用一</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">^~</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/store/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#A6ACCD;">         :8001</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_redirect </span><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;"> off;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   Host </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   X-Real-IP </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   X-Forwarded-For</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_set_header    X-Forwarded-For </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">proxy_add_x_forwarded_for</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 子应用二</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">^~</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/school/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#A6ACCD;">         :8002</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_redirect </span><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;"> off;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   Host </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   X-Real-IP </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   X-Forwarded-For </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">proxy_add_x_forwarded_for</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 静态资源读取不到问题处理</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">rewrite</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">^/api/profile/(.*)$</span><span style="color:#A6ACCD;"> /(替换成正确路径的文件的上一层目录)/</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">1</span><span style="color:#89DDFF;"> last;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 子应用一服务</span></span>
<span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">               </span><span style="color:#F78C6C;">8001</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">          _</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">         html/store</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">              index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> try_files </span><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri/ /index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">^~</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/store/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> alias </span><span style="color:#A6ACCD;">              html/store/</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">              index.html index.htm</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> try_files </span><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri /store/index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 接口代理</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">/api </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#A6ACCD;">         :8089</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 子应用二服务</span></span>
<span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">               </span><span style="color:#F78C6C;">8002</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">          _</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">         html/school</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">              index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> try_files </span><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri/ /index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">^~</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/school/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> alias </span><span style="color:#A6ACCD;">              html/school/</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">              index.html index.htm</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> try_files </span><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri /school/index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 接口代理</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">/api </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#A6ACCD;">         :10010</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="配置负载均衡" tabindex="-1">配置负载均衡 <a class="header-anchor" href="#配置负载均衡" aria-label="Permalink to &quot;配置负载均衡&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">upstream</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">my_upstream </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">server</span><span style="color:#A6ACCD;">                :9001;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">server</span><span style="color:#A6ACCD;">                :9002;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">server</span><span style="color:#A6ACCD;">                :9003;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">               </span><span style="color:#F78C6C;">9000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">          test.com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#A6ACCD;">         my_upstream</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   Host </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">proxy_host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   X-Real-IP </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#A6ACCD;">   X-Forwarded-For </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">proxy_add_x_forwarded_for</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="ssl-配置-https" tabindex="-1">SSL 配置 HTTPS <a class="header-anchor" href="#ssl-配置-https" aria-label="Permalink to &quot;SSL 配置 HTTPS&quot;">​</a></h2><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">                     </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">                www.xxx.com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 将 http 重定向转移到 https</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">301</span><span style="color:#A6ACCD;"> https://</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">server_name</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">request_uri;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">                     </span><span style="color:#F78C6C;">443</span><span style="color:#A6ACCD;"> ssl</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">                www.xxx.com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> ssl_certificate </span><span style="color:#A6ACCD;">            /etc/nginx/ssl/www.xxx.com.pem</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> ssl_certificate_key </span><span style="color:#A6ACCD;">        /etc/nginx/ssl/www.xxx.com.key</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> ssl_session_timeout </span><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">10m</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> ssl_ciphers </span><span style="color:#A6ACCD;">                ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> ssl_protocols </span><span style="color:#A6ACCD;">              TLSv1 TLSv1.1 TLSv1.2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> ssl_prefer_server_ciphers </span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;"> on;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> root </span><span style="color:#A6ACCD;">                   /project/xxx</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> index </span><span style="color:#A6ACCD;">                  index.html index.htm index.md</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> try_files </span><span style="color:#A6ACCD;">              </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri/ /index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,17),e=[o];function t(c,r,C,D,y,A){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{F as __pageData,d as default};
