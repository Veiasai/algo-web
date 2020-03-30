<template>
    <a-spin id="solve_spin" :spinning="spinning">
        <a-row>
            <div style="float: left; font-weight: bold; font-size: 20px;">多元方程组求解</div>
        </a-row>
        <a-row>
            <a-col :span="10">
                <div style="float: left">请输入多元方程组</div>
                <a-textarea id="function" placeholder="" allowClear v-model="func" :autosize="{ minRows: 5, maxRows: 10}" />
            </a-col>
            <a-col :span="2" />
            <a-col :span="10">
                <div style="float: left">请输入初始值</div>
                <a-textarea id="initial" placeholder="" allowClear v-model="initial" :autosize="{ minRows: 5, maxRows: 10}" />
            </a-col>
            <a-col :span="2">
                <a-button @click="onSubmit" sytle="float: down; border-radius:5px;">求解</a-button>
            </a-col>
        </a-row>
        <a-divider />
        <a-row>
            <a-col :span="10">
                <div style="float: left">计算结果</div>
                <a-textarea style="font-weight: bold"  :rows="6" disabled :value="x" />
            </a-col>
            <a-col :span="2" />
            <a-col :span="10">
                <a-row>
                    <div style="float: left">真实值与拟合值偏差</div>
                    <a-textarea style="font-weight: bold" :rows="4" disabled :value="fval" />
                </a-row>
                <a-row>
                    <div style="float: left">出口条件</div>
                    <a-textarea style="font-weight: bold" :rows="1" disabled :value="status" />
                </a-row>
                <a-row>
                    <div style="float: left">调试信息</div>
                    <a-textarea style="font-weight: bold" :rows="2" disabled :value="msg" />
                </a-row>
            </a-col>
        </a-row>
    </a-spin>
</template>

<script>
    import {message} from 'ant-design-vue'
    export default {
        data() {
            return {
                spinning: false,
                x: "",
                status: "",
                func: "",
                initial: "",
                fval: "",
                msg: "",
                errorInfo: "",
            }
        },
        methods: {
            async onSubmit(e) {
                void e
                this.spinning = true;
                try {
                    var data = {
                        'function': '[' + this.func + ']',
                        'solution': JSON.parse('[' + this.initial + ']')
                    }
                    const res = await fetch("apiy/usersolve", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify(data),
                    })
                    if (res.ok) {
                        var ret = await res.json()
                        this.x = String(ret['x'])
                        this.status = String(ret['status'])
                        this.fval = String(ret['info']['fvec'])
                        this.msg = String(ret['msg'])
                    } else {
                        message.info(res.statusText)
                    }
                } catch (error) {
                    console.log(error)
                    message.info(String(error));
                } finally {
                    this.spinning = false;
                }
            }
        },
    };
</script>