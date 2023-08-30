<template>
  <el-container>
    <el-header style="font-size: 12px;">
      <img src="../../assets/img.png" alt="" style="height: 85%" @click="home">
      <h1 style="margin-left: 20px;">WebGIS</h1>
      <div class="page-header">
        <el-dropdown>
          <i style="color: white;font-size: 20px">{{username}}</i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="website">个人网站</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="blog">个人博客</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="background">系统后台</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="logout">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" :collapse="isCollapse">
          <!--Cesium-->
          <el-submenu :index="(index+1)+''" v-for="(item,index) in menus" :key="index">
            <template slot="title"><i :class="item.iconCls"></i> <span slot="title">{{ item.label }}</span></template>
            <el-submenu :index="childTwo.path" v-for="(childTwo,indexTwo) in item.children"
                        v-if="childTwo.enabled==='1'" :key="indexTwo">
              <template slot="title">{{ childTwo.label }}</template>
              <el-menu-item :index="child.path" v-for="(child,indexThree) in childTwo.children"
                            v-if="child.enabled==='1'"
                            :key="indexThree">
                <router-link :to="{name:child.path+''}">
                  {{ child.name }}
                </router-link>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main id="main">
        <router-view ref="helloWorld"></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import {login, logout, normalMenu} from "@/api/api";

export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      menus: null,
      user: null,
      userId: null,
      username: null
    }
  },
  mounted() {
    let that = this;
    that.user = JSON.parse(window.sessionStorage.getItem('communicationInfo'));
    that.userId = that.user.data.info.id;
    that.username = that.user.data.info.username;
    that.pageSize();
    that.getNoMenu();
  },
  methods: {
    website() {
      window.open('https://www.sunbt.ltd/', '_blank');
    },
    blog() {
      window.open('https://jackie-sun.blog.csdn.net/');
    },
    background() {
      this.$router.push({
        name: "backstageIndex"
      });
    },
    home() {
      let path = this.$route.path;
      //当前路由不是以下路径时重定向到index
      if (path !== "/index/helloWorld" && path !== "/" && path !== "index") {
        this.$router.push({
          name: "index"
        });
      }
    },
    pageSize() {  //监听页面大小变化
      let screenWidth, screenHeight;
      //初始化判断
      screenWidth = document.body.clientWidth;
      screenHeight = document.body.clientHeight;
      if (screenWidth < 1600) {
        this.isCollapse = true;
        let main = document.getElementById("main");
        main.style.left = "65px";
      } else {
        this.isCollapse = false;
        let main = document.getElementById("main");
        main.style.left = "300px";
      }
      //动态监听
      window.onresize = () => {
        let that = this;
        return (() => {
          screenWidth = document.body.clientWidth;
          screenHeight = document.body.clientHeight;
          if (screenWidth < 1600) {
            that.isCollapse = true;
            let main = document.getElementById("main");
            main.style.left = "65px";
          } else {
            that.isCollapse = false;
            let main = document.getElementById("main");
            main.style.left = "300px";
          }
        })();
      };
    },
    getNoMenu() {
      let that = this;
      //影像数据
      let params = {
        userId: that.userId
      }
      normalMenu(params).then(res => {
        that.menus = res.data.data;
      });
    },
    logout() {
      let that = this;
      //用户退出
      const user = JSON.parse(window.sessionStorage.getItem('communicationInfo'));
      let info = {
        "id": user.data.id
      }
      //向后台注销
      logout(info).then(res => {
      });
      window.sessionStorage.removeItem('communicationInfo');

      that.$router.push({
        name: "login"
      });
    },
  },

}
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.el-header {
  background-color: #0b80f6;
  color: #333333;
  display: flex;
  align-items: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  display: block;
  position: absolute;
  width: 300px;
  left: 0;
  top: 60px;
  bottom: 0;
}

.el-main {
  background-color: #E9EEF3;
  position: absolute;
  left: 300px;
  right: 0;
  top: 60px;
  bottom: 0;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}

.page-header {
  position: absolute;
  right: 2rem;
  cursor: pointer;
}

/*cesium图标*/
.icon-cesium {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../../assets/webgis/vue-cesium.png");
  background-position: center center;
  background-size: 25px 25px;
  background-repeat: no-repeat;
}

/*ol图标*/
.icon-openlayers {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../../assets/webgis/openlayers.png");
  background-position: center center;
  background-size: 25px 25px;
  background-repeat: no-repeat;
}

/*leaflet图标*/
.icon-lealfet {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../../assets/webgis/leaflet.png");
  background-position: center center;
  background-size: 25px 25px;
  background-repeat: no-repeat;
}

/*leaflet图标*/
.icon-mapbox {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../../assets/webgis/mapbox.png");
  background-position: center center;
  background-size: 25px 25px;
  background-repeat: no-repeat;
}
</style>