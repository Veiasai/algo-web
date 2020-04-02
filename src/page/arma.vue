<template>
    <a-spin id="arma_spin" :spinning="spinning">
        <a-row>
            <div style="float: left; font-weight: bold; font-size: 20px;">ARMA模型预测</div>
        </a-row>
        <a-row>
            <a-col :span="10">
                <div style="float: left">上传历史数据（格式为csv，列名为data）</div>
                <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
                    <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                </a-upload>
            </a-col>
            <a-col :span="2" />
            <a-col :span="10">
                <div style="float: left">预测长度</div>
                <a-input-number id="inputNumber" :min="1" :max="100" v-model="length" />
            </a-col>
            <a-col :span="2">
                <a-button @click="onSubmit" sytle="float: down; border-radius:5px;">预测</a-button>
            </a-col>
        </a-row>
        <a-divider />
        <a-row>
            <div style="float: left">预测结果</div> <a v-if="predictionBlob !== null" download="prediction.csv" :href="predictionBlob">保存到文件</a>
            <a-textarea style="font-weight: bold"  :rows="6" disabled :value="prediction" />
        </a-row>
        <a-row>
            <div style="float: left">对应图像</div>
            <img :src="'data:image/png;base64,' + imgData"/>
        </a-row>
    </a-spin>
</template>

<script>
    import {message} from 'ant-design-vue'
    export default {
        data() {
            return {
                spinning: false,
                length: 1,
                prediction: "",
                imgData: "",
                fileList: [],
            }
        },
        computed: {
            predictionBlob() {
                if (this.prediction == '')
                    return null
                return window.URL.createObjectURL(new Blob([this.prediction], {type: "text/plain"}));
            }
        },
        methods: {
            handleRemove(file) {
                const index = this.fileList.indexOf(file);
                const newFileList = this.fileList.slice();
                newFileList.splice(index, 1);
                this.fileList = newFileList;
            },
            beforeUpload(file) {
                if (this.fileList.length === 0)
                    this.fileList = [file];
                else 
                    message.info('只能上传一个数据文件')
                console.log(file)
                return false;
            },
            onSubmit(e) {
                void e
                if (this.fileList.length === 0){
                    message.info('请选择数据文件')
                    return
                }
                this.spinning = true;
                const reader = new FileReader();
                reader.onload = e => this.onFileRead(e)
                reader.readAsText(this.fileList[0]);
            },
            async onFileRead(e) {
                try {
                    var data = {
                        'data': btoa(e.target.result),
                        'length': this.length
                    }
                    const res = await fetch("http://101.200.89.30:9990/apiy/arma", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify(data),
                    })
                    if (res.ok) {
                        var ret = await res.json()
                        this.prediction = ret['prediction']
                        this.imgData = ret['img']
                    } else {
                        message.info(res.statusText)
                    }
                } catch (error) {
                    console.log(error)
                    message.info(String(error));
                } finally {
                    this.spinning = false;
                }
            },
        },
    };
</script>