<template>
  <div id="app">
    <a-layout id="layout">
      <a-layout-sider>
        <div class="logo">算法模块</div>
        <algoMenu/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0; font-size: 20px;">基于模型的规则设计器</a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '450px' }">
          <router-view/>
        </a-layout-content>
        <a-layout-footer style="padding: 0">Powered By Veiasai@2020</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import algoMenu from "./components/algomenu"

export default {
  name: 'app',
  components: {
    algoMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#layout .logo {
    font-size: 20px;
    text-align: center;
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    margin: 16px;
  }
</style>
