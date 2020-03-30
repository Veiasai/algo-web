<template>
<a-spin id="weibull_spin" :spinning="spinning">
  <a-row>
    <div style="float: left; font-weight: bold; font-size: 20px;">故障分布函数拟合</div>
  </a-row>
    <div style="float: left">请输入历史故障数据，从小到大排列，用英文逗号分隔</div>
    <a-input-search placeholder="input data" @search="onSearch" size="large">
    <a-button slot="enterButton" sytle="border-radius:5px;">参数拟合</a-button>
    </a-input-search>
    <div style="height: 16px;background: rgba(255, 255, 255, 0.2);margin: 16px;">
    </div>
    <a-divider />
    <div width='560' height='420' v-html="webfigure"></div>
  </a-spin>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'weibull' }),
      spinning: false,
      webfigure: '',
    };
  },
  methods: {
    async onSearch(value) {
      this.spinning = true;
      try {
        var data = {
            'data': JSON.parse('[' + value + ']')
        }
        const res = await fetch("api/weibull",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
                },
                body:JSON.stringify(data),
                        })
        if (!res.ok) {
            this.webfigure = 'error request'
        }else {
            this.webfigure = await res.text();
            console.log(this.webfigure)
        }
      } catch (error) {
          void error
      } finally {
          this.spinning = false;
      }
    },
  },
};
</script>