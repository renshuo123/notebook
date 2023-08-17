---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://edu-8673.oss-cn-beijing.aliyuncs.com/img2023.11.17/image-20230816174157528.png',
    name: 'RenShuo',
    title: '天津理工大学',
    links: [
      { icon: 'github', link: 'https://github.com/renshuo123/renshuo123.github.io' },
      { icon: 'github', link: 'https://gitee.com/sure-s-renshuo' }
    ]
  },


]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Only Me
    </template>
    <template #lead>
      认真整理文档，好好学习
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>