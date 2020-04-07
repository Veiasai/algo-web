<template>
    <a-spin :spinning="spinning">
        <a-row>
            <div style="float: left; font-weight: bold; font-size: 20px;">常微分方程数值解</div>
        </a-row>
        <a-row>
            <a-col :span="10">
                <div style="float: left">请输入微分方程组函数</div>
                <a-textarea id="function" placeholder="" allowClear v-model="func" :rows="10" />
            </a-col>
            <a-col :span="2" />
            <a-col :span="10">
                <a-form-model :label-col="{span: 5}" :wrapper-col="{span: 5}">
                    <a-form-model-item label="初始值向量" prop="data">
                        <a-input v-model="data" />
                    </a-form-model-item>
                    <a-form-model-item label="步长" prop="h">
                        <a-input v-model="h" />
                    </a-form-model-item>
                    <a-form-model-item label="时间起点" prop="a">
                        <a-input v-model="a" />
                    </a-form-model-item>
                    <a-form-model-item label="时间终点" prop="b">
                        <a-input v-model="b" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                        求解
                        </a-button>
                    </a-form-model-item>
                    </a-form-model>
            </a-col>
        </a-row>
        <a-divider />
        <a-row>
            <a-col :span="10">
                <div style="float: left">计算结果 x</div> <a v-if="dataBlob !== null" download="rungeData.txt" :href="dataBlob">保存到文件</a>
                <a-textarea style="font-weight: bold"  :rows="6" disabled :value="x" />
                <div style="float: left">计算结果 y</div>
                <a-textarea style="font-weight: bold"  :rows="6" disabled :value="y" />
            </a-col>
            <a-col :span="2" />
            <a-col :span="10">
                <div style="float: left">对应图像</div> <a v-if="imgBlob !== null" download="runge.png" :href="imgBlob">保存到文件</a>
                <img :src="'data:image/png;base64,' + img"/>
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
                y: "",
                func: "",
                data: "",
                h: 0,
                a: 0,
                b: 0,
                img: "",
            }
        },
        computed: {
            imgBlob() {
                if (this.img === '')
                    return null
                return window.URL.createObjectURL(new Blob([atob(this.img)], {type: "text/plain"}));
            },
            dataBlob() {
                if (this.x === '')
                    return null
                return window.URL.createObjectURL(new Blob([this.x, this.y], {type: "text/plain"})); 
            }
        },
        methods: {
            async onSubmit(e) {
                void e
                this.spinning = true;
                try {
                    var data = {
                        'f': this.func,
                        'data': JSON.parse('[' + this.data + ']'),
                        'h': this.h,
                        'a': this.a,
                        'b': this.b
                    }
                    const res = await fetch("http://101.200.89.30:9990/apiy/rungekutta", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify(data),
                    })
                    if (res.ok) {
                        var ret = await res.json()
                        this.x = String(ret['x'])
                        this.y = String(ret['y'])
                        this.img = String(ret['img'])
                    } else {
                        message.info(res.body)
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