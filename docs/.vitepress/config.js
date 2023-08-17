import {defineConfig} from "vite";


export default {
    ignoreDeadLinks: true,
    base: "/notebook/",
    // search: {
    //     provider: 'local'
    // },
    themeConfig: {
        algolia: {
            appId: 'DW7O63I9IR',
            apiKey: 'f8ed758cdb288a8b06542bc35923c1a1',
            indexName: 'notebook',
            placeholder: "请输入关键词",
            buttonText: "搜索"
        },
        sidebar: [
            {
                text: 'Java',
                collapsed: true,
                items: [
                    { text: 'Java基础', link: '/Java/Java基础' },
                    { text: 'Java新特性', link: '/Java/Java新特性' },
                    { text: 'Java进阶', link: '/Java/Java进阶' },
                    { text: 'Java集合', link: '/Java/Java集合' },
                    { text: 'Java高级', link: '/Java/Java高级' }
                ]
            },
            {
                text: 'Linux',
                collapsed: true,
                items: [
                    { text: 'Linux基础', link: '/Linux/Linux基础' },
                    { text: 'Linux新特性', link: '/Linux/Linux进阶' },
                    { text: 'Shell脚本', link: '/Linux/Shell' },
                    { text: '实用脚本', link: '/Linux/实用脚本' },
                    { text: '软件部署', link: '/Linux/软件部署' }
                ]
            },
            {
                text: 'Nginx',
                collapsed: true,
                items: [
                    { text: '基础篇', link: '/Nginx/基础篇' },
                    { text: '进阶篇', link: '/Nginx/进阶篇' },
                    { text: '实战篇', link: '/Nginx/实战篇' },
                    { text: '面试篇', link: '/Nginx/面试篇' }
                ]
            },
            {
                text: 'SSM',
                collapsed: true,
                items: [
                    { text: 'Maven', link: '/SSM/Maven' },
                    { text: 'Spring', link: '/SSM/Spring' },
                    { text: 'SpringMVC', link: '/SSM/SpringMVC' },
                    { text: 'SpringBatch', link: '/SSM/SpringBatch' }
                ]
            },
            {
                text: 'SpringBoot',
                collapsed: true,
                items: [
                    { text: '基础篇', link: '/3、SpringBoot/基础篇' },
                    { text: '应用篇', link: '/3、SpringBoot/应用篇' },
                    { text: '新特性', link: '/3、SpringBoot/新特性' },
                    { text: '运维&原理', link: '/3、SpringBoot/运维&原理' }
                ]
            },
            {
                text: 'SpringCloud',
                collapsed: true,
                items: [
                    { text: 'SpringCloud', link: '/4、微服务/进阶' },
                    { text: 'Sentinel', link: '/4、微服务/必备/Sentinel' }
                ]
            },
            {
                text: 'SpringSecurity',
                collapsed: true,
                items: [
                    { text: 'SpringSecurity基础篇', link: '/4、微服务/SpringSecurity/基础篇' },
                    { text: 'SpringSecurity进阶篇', link: '/4、微服务/SpringSecurity/进阶篇' },
                    { text: 'SpringSecurity高级篇', link: '/4、微服务/SpringSecurity/高级篇' },
                ]
            },
            {
                text: 'Mybatis & MybatisPlus',
                collapsed: true,
                items: [
                    { text: 'Mybatis', link: '/Mybatis&MybatisPlus/Mybatis' },
                    { text: 'MybatisPlus', link: '/Mybatis&MybatisPlus/MybatisPlus' },
                    { text: 'JPA', link: '/Mybatis&MybatisPlus/JPA' }
                ]
            },
            {
                text: 'Git & ChatGPT',
                collapsed: true,
                items: [
                    { text: 'Git', link: '/5、运维/Git' },
                    { text: 'Github', link: '/5、运维/Github' },
                    { text: 'ChatGPT', link: '/5、运维/ChatGPT' },
                    { text: 'Jenkins', link: '/5、运维/Jenkins' },
                    { text: 'Netty', link: '/5、运维/Netty' }
                ]
            },

            {
                text: '数据库',
                collapsed: true,
                items: [
                    {
                        text: 'MySQL',
                        collapsed: true,
                        items:[
                            { text: 'MySQL基础', link: '/2、数据库/MySQL/MySQL核心/基础'},
                            { text: 'MySQL进阶', link: '/2、数据库/MySQL/MySQL核心/进阶'},
                            { text: 'MySQL优化', link: '/2、数据库/MySQL/MySQL核心/优化'},
                            { text: 'MySQL设计', link: '/2、数据库/MySQL/MySQL核心/设计'},
                            { text: 'MySQL运维', link: '/2、数据库/MySQL/MySQL核心/运维'},
                            { text: '分库分表', link: '/2、数据库/MySQL/分库分表'},
                        ]
                    },
                    {
                        text: 'Redis',
                        collapsed: true,
                        items:[
                            { text: 'Redis基础', link: '/2、数据库/Redis/Redis基础'},
                            { text: 'Redis优化', link: '/2、数据库/Redis/Redis优化'},
                            { text: 'Redis原理', link: '/2、数据库/Redis/Redis原理'},
                            { text: 'Redis高级', link: '/2、数据库/Redis/Redis高级'},
                            { text: 'Redis实战', link: '/2、数据库/Redis/Redis实战'},
                            { text: '本地缓存', link: '/2、数据库/Redis/本地缓存'},
                        ]
                    },
                    {
                        text: 'MongoDB',
                        collapsed: true,
                        items:[
                            { text: 'MongoDB基础', link: '/2、数据库/MongoDB/基础'},
                            { text: 'MongoDB进阶', link: '/2、数据库/MongoDB/整合'}
                        ]
                    },
                    {
                        text: 'ElasticSearch',
                        collapsed: true,
                        items:[
                            { text: 'ES基础', link: '/2、数据库/ElasticSearch/1、ES基础'},
                            { text: 'ES高级', link: '/2、数据库/ElasticSearch/3、ES高级'}
                        ]
                    },
                    { text: 'InfluxDB', link: '/2、数据库/influxdb'},
                    { text: 'Neo4j', link: '/2、数据库/Neo4j'},
                ],
            },

            {
                text: '高并发 & 秒杀 & 分布式',
                collapsed: true,
                items: [
                    { text: '分布式理论', link: '/三高/分布式' },
                    { text: '分布式锁', link: '/4、微服务/必备/分布式锁' },
                    { text: '秒杀', link: '/三高/秒杀' },
                    { text: '高可用', link: '/三高/高可用' },
                    { text: '高并发', link: '/三高/高并发' }
                ]
            },

            {
                text: '云原生',
                collapsed: true,
                items: [
                    { text: 'Docker', link: '/云原生/Docker' },
                    { text: 'K8S', link: '/云原生/K8S' }
                ]
            },
            {
                text: '可视化 & 监控',
                collapsed: true,
                items: [
                    { text: '监控基础', link: '/可视化 & 监控/监控基础' },
                    { text: '监控进阶', link: '/可视化 & 监控/监控进阶' },
                    { text: '可视化大屏', link: '/可视化 & 监控/可视化大屏' },
                    { text: 'Zabbix', link: '/可视化 & 监控/Zabbix' }
                ]
            },

            {
                text: '学前端',
                collapsed: true,
                items: [
                    {
                        text: 'HTML+CSS',
                        collapsed: true,
                        items:[
                            { text: 'HTML基础', link: '/1、学前端/1、HTML+CSS/HTML基础'},
                            { text: 'CSS基础', link: '/1、学前端/1、HTML+CSS/CSS基础'},
                            { text: '网页进阶', link: '/1、学前端/1、HTML+CSS/网页进阶'},
                        ]
                    },
                    {
                        text: 'JS+TS',
                        collapsed: true,
                        items:[
                            { text: 'JS基础', link: '/1、学前端/2、JS+TS/JS 基础'},
                            { text: 'JS进阶', link: '/1、学前端/2、JS+TS/JS 进阶'},
                            { text: 'ES6基础', link: '/1、学前端/2、JS+TS/ES6 基础'},
                            { text: 'ES6进阶', link: '/1、学前端/2、JS+TS/ES6 进阶'},
                            { text: 'TS基础', link: '/1、学前端/2、JS+TS/TypeScript'},
                        ]
                    },
                    {
                        text: 'NodeJS',
                        collapsed: true,
                        items:[
                            { text: 'Node基础', link: '/1、学前端/4、Node/基础篇'},
                            { text: 'Node进阶', link: '/1、学前端/4、Node/进阶篇'},
                            { text: '项目实战', link: '/1、学前端/4、Node/项目实战'}
                        ]
                    },
                    {
                        text: 'Vue',
                        collapsed: true,
                        items:[
                                    // { text: 'Vue3基础', link: '/1、学前端/3、Vue/Vue3/Vue3基础'},
                                    { text: 'Vue3进阶', link: '/1、学前端/3、Vue/Vue3/Vue3进阶'},
                                    { text: 'Vue3高级', link: '/1、学前端/3、Vue/Vue3/Vue3高级'},
                                    { text: 'Vue3新语法', link: '/1、学前端/3、Vue/Vue3/Vue3新语法'},
                                    { text: '项目实战', link: '/1、学前端/3、Vue/Vue2/Vue2项目'}
                        ]
                    },
                    {
                        text: '小程序',
                        collapsed: true,
                        items:[
                            { text: '小程序基础', link: '/1、学前端/5、小程序/微信小程序'},
                            // { text: '小程序进阶', link: '/1、学前端/5、小程序/小程序进阶'},
                            { text: '小程序优化', link: '/1、学前端/5、小程序/小程序优化'},
                            { text: 'uniapp', link: '/1、学前端/5、小程序/uniapp'},
                            { text: '项目实战', link: '/1、学前端/5、小程序/小程序项目'}
                        ]
                    },
                ],
            },
            {
                text: '计算机基础',
                collapsed: true,
                items: [
                    { text: '数据结构', link: '/计算机基础/数据结构/基础篇'},
                    { text: '操作系统', link: '/计算机基础/计算机基础/操作系统'},
                    { text: '设计模式', link: '/计算机基础/设计模式/基础篇'},
                    { text: '计算机网络', link: '/计算机基础/计算机网络/网络基础'},
                    { text: 'UML', link: '/计算机基础/设计模式/UML'},
                    { text: 'LeetCode', link: '/计算机基础/算法/LeetCode'},

                ],
            },

            {
                text: '项目实战',
                collapsed: true,
                items: [
                    {
                        text: '云尚办公',
                        collapsed: true,
                        items:[
                            { text: '基础篇', link: '/项目实战/云尚办公/基础篇'},
                            // { text: '进阶篇', link: '/项目实战/云尚办公/进阶篇'},
                            // { text: '高级篇', link: '/项目实战/云尚办公/高级篇'},
                        ]
                    },
                    {
                        text: '小兔鲜',
                        collapsed: true,
                        items:[
                            { text: '基础篇', link: '/项目实战/小兔鲜/基础篇'},
                            { text: '进阶篇1', link: '/项目实战/小兔鲜/进阶篇1'},
                            { text: '进阶篇2', link: '/项目实战/小兔鲜/进阶篇2'},
                        ]
                    },
                    {
                        text: '地图',
                        collapsed: true,
                        items:[
                            { text: '基础篇', link: '/项目实战/百度地图/基础篇'},
                            { text: '进阶篇', link: '/项目实战/百度地图/进阶篇'},
                        ]
                    },
                    {
                        text: '苍穹外卖',
                        collapsed: true,
                        items:[
                            // { text: '基础篇', link: '/项目实战/苍穹外卖/基础篇'},
                            { text: '进阶篇', link: '/项目实战/苍穹外卖/进阶篇'},
                        ]
                    },
                    {
                        text: '黑马头条',
                        collapsed: true,
                        items:[
                            { text: '基础篇', link: '/项目实战/黑马头条/基础篇'},
                            { text: '进阶篇', link: '/项目实战/黑马头条/进阶篇'},
                            { text: '进阶篇2', link: '/项目实战/黑马头条/进阶篇2'},
                            { text: '高级篇', link: '/项目实战/黑马头条/高级篇'},
                        ]
                    },
                    { text: '支付', link: '/项目实战/支付'},
                    { text: '项目推荐', link: '/项目实战/项目推荐'}
                ],
            },


            {
                text: '团队成员', link: '/team'
            },
        ],
        siteTitle: "任硕的文档",
        logo: '/Vue.png', // 直接去iconfront下载图片即可
        nav: [
            // activeMatch只要对应路径包含该内容，则高亮显示
            {
                text: 'Java学前端',
                items: [
                    {
                        items: [
                            { text: 'HTML+JS', link: '/Java学前端/HTML+JS' },
                            { text: 'CSS', link: '/Java学前端/CSS' },
                            { text: 'Vue2+组件', link: '/Java学前端/Vue2+组件' },
                            { text: 'Vue3+组件', link: '/Java学前端/Vue3+组件' },
                            { text: 'React', link: '/Java学前端/React' },
                        ]
                    }
                ],
                activeMatch: '/Java/',
            },
            {
                text: '软件测试',
                items: [
                    {
                        items: [
                            { text: '测试基础', link: '/软件测试/测试基础' },
                            { text: '压力测试', link: '/软件测试/压力测试' }
                        ]
                    }
                ],
                // activeMatch: '/IDEA/',
            },
            {
                text: '多线程',
                items: [
                    {
                        items: [
                            { text: '基础篇', link: '/并发 & 多线程/基础篇' },
                            { text: '进阶篇', link: '/并发 & 多线程/并发完善' }
                        ]
                    }
                ],
                // activeMatch: '/IDEA/',
            },
            {
                text: '开发工具',
                items: [
                    {
                        items: [
                            { text: 'Chrome', link: '/IDEA/Chrome' },
                            { text: 'IDEA基础', link: '/IDEA/IDEA基础' },
                            { text: 'IDEA插件', link: '/IDEA/IDEA插件' },
                            { text: 'VS Code', link: '/IDEA/VS Code' }
                        ]
                    }
                ],
                // activeMatch: '/IDEA/',
            },
            {
                text: '消息中间件',
                items: [
                    {
                        items: [
                            { text: 'RabbitMQ', link: '/消息中间件/RabbitMQ' },
                            { text: 'RocketMQ', link: '/消息中间件/RocketMQ' },
                            { text: 'Kafka', link: '/消息中间件/Kafka' },
                            { text: 'Canal', link: '/消息中间件/Canal' },
                        ]
                    }
                ],
                // activeMatch: '/IDEA/',
            }
        ],

        // 网页链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/renshuo123/renshuo123.github.io' },
            { icon: 'twitter', link: '#' },
            // You can also add custom icons by passing SVG as string:
            {
                icon: {
                    svg: '<svg t="1676028692954" class="icon" ...</path></svg>'
                },
                link: 'https://github.com/'
            }
        ],
    }
}

