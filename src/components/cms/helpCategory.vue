<template>
    <div>
        <el-form :model="entity" label-width="120px">

            <el-form-item label="专题数量">
                <el-input v-model="entity.helpCount" type="textarea" :rows="3"/>
            </el-form-item>

            <el-form-item label="图标">
                <el-input v-model="entity.icon" />
            </el-form-item>

            <el-form-item label="名称" :rules="forms"  prop="name">
                <el-input v-model="entity.name"/>
            </el-form-item>

            <el-form-item label="排序">
                <el-input v-model="entity.sort" />
            </el-form-item>

            <el-form-item label="展示情况">
                <el-select v-model="entity.showStatus" placeholder="请选择">
                    <el-option v-for="item in enableArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { page,one, add, edit } from "@/http/cms/helpCategoryApi/helpCategoryApi"
import Msg from "@/utils/msg/msg"

export default {
    props: { id: Number },
    mounted() {
        console.log('mounted' + this.id)
        this.get()
    },
    data() {
        return {
            forms:[
                {required:true,message:"请输入名称"}
            ],
            entity: {
                id: 0,
                helpCount: '',
                icon: '',
                name: '',
                sort	: '',
                showStatus: '',
            },
            enableArr: [
                { value: 0, label: '不展示' },
                { value: 1, label: '展示' }
            ],
            categoryArr:[],

            page: {
                total: 0,
                current: 1,
                size: 5
            },
        }
    },
    methods: {
        all(current) {
            let pageDto = {
                current: current,
                size: 5
            }
            page(pageDto).then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                const pages = resp.data.page;
                this.data = pages.records
                this.page = pages
            })
            
            allCategory().then(resp => {
                this.categoryArr = resp.data.page.records
                console.log('分类：' + JSON.stringify(this.categoryArr[0]))
            })
        },

        sure() {
            this.id == 0 ? this.add() : this.edit()
            this.all(this.page.current)
        },
        add() {
            console.log('添加的:' + JSON.stringify(this.entity))
            add(this.entity).then(resp => {
                Msg.success('新建成功')
                this.doCancel()
            })
        },
        edit() {
            edit(this.entity).then(resp => {
                Msg.success('已保存')
                this.doCancel()
            })
        },
        doCancel() {
            this.$emit('doCancel')
        },
        get() {
            console.log('触发了get方法')
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('编辑收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.help
                })
            }
        },
    },
}
</script>
<style  scoped>
.btnDiv {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
