<template>
  <div>
    <a-menu theme="dark" mode="inline" :defaultOpenKeys="['sub1']" @click="clickAlgo" :defaultSelectedKeys="['1']">
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>基础运算算法</span></span>
        <a-menu-item key="runge">常微分方程数值求解</a-menu-item>
        <a-menu-item key="solve">多元方程组求解</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>时序算法</span></span>
        <a-menu-item key="arma">ARMA模型</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="setting" /><span>优化算法</span></span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="setting" /><span>决策算法</span></span>
        <a-menu-item key="weibull">故障分布函数拟合</a-menu-item>
        <a-menu-item key="12">最优维护时序确定</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      clickAlgo(e) {
        this.$router.push(e.key)
      }
    },
  };
</script>