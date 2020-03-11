<template>
<a-spin :spinning="spinning">
  <a-form :form="form" @submit="handleSubmit">
      <div>input data: 1, 2, 3</div>
    <a-form-item label="Data" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input
        v-decorator="['data', { rules: [{ required: true, message: 'Please input your data!' }] }]"
      />
    </a-form-item>
    
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>

    <div v-html="webfigure"></div>
  </a-form>
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
    async handleSubmit(e) {
      e.preventDefault();
      this.spinning = true;
      try {
        var data = {
            'data': '[' + this.form.getFieldValue('data') + ']'
        }
        const res = await fetch("api/weibull",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:JSON.stringify(data),
                        })
        if (!res.ok) {
            this.webfigure = 'error request'
        }else {
            this.webfigure = await res.body.text();
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