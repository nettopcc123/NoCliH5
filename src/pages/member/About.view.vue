<template>
  <f7-page>
    <ff-header-goback titProp='关于我们' rUrlProp='/member'></ff-header-goback>
    <ff-about-conent class="scroll-con"></ff-about-conent>
  </f7-page>
</template>
<script>
import HeaderGoBack from "@p/comm/headerFoot/HeaderGoBack.view"; // 头部logo
import AboutContent from '@p/comm/home/AboutContent.view'; // 关于我们内容
export default {
  name: 'Member', // 主页
  components: {
    "ff-header-goback": HeaderGoBack,
    'ff-about-conent': AboutContent,
  }
};
</script>