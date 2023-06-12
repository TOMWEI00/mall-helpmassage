<template>
    <div class>
        <div class="up">
            <div class="item">
                <span>分类id:</span>
                <el-input v-model="queryEntitys.categoryId" placeholder="请输入分类id" />

                <span>标题:</span>
                <el-select v-model="queryEntity.categoryId" placeholder="请选择">
                    <el-option v-for="item in categoryArr" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>

                <el-button icon="Search" circle @click="doQuery" style="margin-left: 10px;" />
                <!-- <el-button type="primary" plain size="mini" @click="doQuery">查询</el-button> -->
            </div>
            <el-button icon="Refresh" circle @click="all(1)" style="margin-left: 10px;"></el-button>
            <!-- <el-button type="primary" plain size="mini" @click="all" style="margin-left: 10px;">重置</el-button> -->
            <el-button @click="doAdd()"><el-icon>
                    <Plus />
                </el-icon></el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="帮助列表">
                    <slot>
                        <el-table-column label="展示状态" width="120">
                            <template #default="scope">
                                <span>{{ scope.row.showStatus == 0 ? '不展示' : '展示' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="图标" width="200">
                            <template #default="scope">
                                <img :src="scope.row.icon" class="img"
                                    v-if="!!scope.row.icon && scope.row.icon != '' && isNaN(parseInt(scope.row.icon))"
                                    @click="doLook(scope.row.icon)" />
                                <img src="@/assets/1.jpg" class="img" v-else @click="doLook(one)" />
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <!-- <el-button type="primary" @click="doEdit(scope.row.id)">编辑</el-button>
                                <el-button type="danger" @click="doDelete(scope.row.id)">删除</el-button> -->
                                <el-button type="primary" @click="doEdit(scope.row.id)">编辑</el-button>
                                <el-button type="danger" @click="doDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>

                    </slot>
                </ListView>
                <div class="example-pagination-block">
                    <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total" 
                    @current-change="currentchange"/>
                </div>
                
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="30%" title="帮助信息">
            <Help :id="choiceId" @doCancel="doCancel"></Help>
        </el-dialog>
        <el-dialog v-model="imgVisible" v-if="imgVisible" width="840px" title="图片详情">
            <img :src="img" style="width: 800px;height: 600px;" />
        </el-dialog>
    </div>
</template>

<script>
import ListView from '@/components/list-view/list-view.vue';
import { page, del, query, allCategory } from "@/http/cms/helpApi/helpApi";
import Msg from "@/utils/msg/msg"

import Help from '../../../components/cms/help.vue';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all(1)
    },
    data() {
        return {
            data: [],
            column: [],
            visible: false,
            choiceId: 0,

            page: {
                total: 0,
                current: 1,
                size: 5
            },

            categoryArr: [],
            queryEntity: {
                title: '',
                categoryId: '',
            },
            queryEntitys: {
                title: '',
                categoryId: '',
            },
            one: 'src/assets/1.jpg',
            imgVisible: false,
            img: ''
        };
    },
    methods: {
        doLook(a) {
            this.img = a
            this.imgVisible = true
        },
        doQuery() {
            console.log('查询的：' + JSON.stringify(this.queryEntity))
            query(this.queryEntity).then(resp => {
                console.log('query:' + JSON.stringify(resp))
                this.data = resp.msg == '成功' ? resp.data.helps : []
                this.page.total = resp.data.helps.length
            })
            query(this.queryEntitys).then(resp => {
                console.log('query:' + JSON.stringify(resp))
                this.data = resp.msg == '成功' ? resp.data.helps : []
                this.page.total = resp.data.helps.length
            })
        },
        //编辑
        doEdit(id) {
            this.choiceId = id
            this.visible = true
            console.log('编辑的id:' + this.choiceId + '  visible:' + this.visible)
            
        },
        //新建
        doAdd() {
            console.log('触发了添加方法')
            this.choiceId = 0
            this.visible = true
            
        },
        //关闭弹窗
        doCancel() {
            this.visible = false
            this.all(this.page.current)
        },
        //删除
        doDelete(id) {
            console.log('删除的id:' + id)
            del({ id: id }).then(resp => {
                Msg.success('删除成功')
                this.all(this.page.current);
            })
            
        },
        //查询所有
        all(current) {
            let pageDto = {
                current: current,
                size: 5,
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
            this.queryEntity = {
                title: '',
                categoryId: '',
            }
            this.queryEntitys = {
                title: '',
                categoryId: '',
            }
        },
        currentchange(current) {
            this.all(current);
            this.page.current = current;//数据更新到目前显示的页面
            
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 100 },
                { prop: "categoryId", label: "分类id", width: 100 },
                { prop: "content", label: "内容", width: 300 },
                // { prop: "icon", label: "图标", width: 200 },
                { prop: "createTime", label: "创建时间", width: 150 },
                { prop: "readCount", label: "阅读数量", width: 100 },
                { prop: "title", label: "标题", width: 150 },
            ];
        }
    },
    components: { ListView, Help }
}
</script>
<style  scoped>
.img {
    width: 180px;
    height: 130px;
    margin-left: -5px;

}

.el-input {
    width: 130px;
}

.item {
    /* width: 250px; */
    display: flex;
}

span {
    margin-top: 5px;
}

.up {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.down {
    zoom: 0.78;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
}</style>
