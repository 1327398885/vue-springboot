<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
import {logInterview} from "@/api/api";

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {},
  created() {
    this.disabled();
  },
  mounted() {

  },
  destroyed() {

  },
  methods: {
    /**
     * 禁止查看控制台，部署时启用
     */
    disabled: function () {
      this.$nextTick(() => {
        // 禁止右键
        document.oncontextmenu = new Function("event.returnValue=false");
        // 禁止F12
        // document.onkeydown = new Function("event.returnValue=false");
      });
    },

  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
