<template>
    <div>
        <div class="up">
            <div class="item">
                <span>名称:</span>
                <el-input v-model="queryEntity.name" placeholder="请输入名称"/>
                <!-- <el-button type="primary" plain size="mini" @click="doQuery">查询</el-button> -->
                <el-button icon="Search" circle @click="doQuery" style="margin-left: 10px;"/>
            </div>
            <!-- <el-button type="primary" plain size="mini" @click="all">全部</el-button> -->
            <el-button icon="Refresh" circle @click="all(1)" style="margin-left: 10px;"></el-button>
            <!-- <el-button type="success" @click="doAdd()">新建</el-button> -->
            <el-button @click="doAdd()"><el-icon><Plus /></el-icon></el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="帮助分类列表">
                    <slot>
                        <el-table-column label="展示状态" width="120">
                            <template #default="scope">
                                <span>{{ scope.row.showStatus == 0 ? '不展示' : '展示' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="图标" width="200" >
                            <template #default="scope">
                                <img :src="scope.row.icon" class="img"
                                    v-if="!!scope.row.icon && scope.row.icon != '' && isNaN(parseInt(scope.row.icon))"
                                    @click="doLook(scope.row.icon)" />
                                <img src="@/assets/1.jpg" class="img" v-else @click="doLook(one)" />
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button type="primary" @click="doEdit(scope.row.id)">编辑</el-button>
                                <el-button type="danger" @click="doDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                        
                    </slot>
                </ListView>
                <div class="example-pagination-block">
                    <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total" @current-change="currentchange"/>
                </div>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="30%" title="帮助分类信息">
            <HelpCategory :id="choiceId" @doCancel="doCancel"></HelpCategory>
        </el-dialog>

        <el-dialog v-model="imgVisible" v-if="imgVisible" width="840px" title="图片详情">
            <img :src="img" style="width: 800px;height: 600px;" />
        </el-dialog>
    </div>
    
</template>
<script>
import ListView from '@/components/list-view/list-view.vue';
import { page, del, queryName } from "@/http/cms/helpCategoryApi/helpCategoryApi";
import Msg from "@/utils/msg/msg"
import HelpCategory from '../../../components/cms/helpCategory.vue';
import { TiltShiftPass } from 'troisjs';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all(1)
    },
    data() {
        return {
            data: [],

            page: {
                total: 0,
                current: 1,
                size: 5
            },

            column: [],
            visible: false,
            choiceId: 0,


            categoryArr: [],
            queryEntity: {
                name: '',
            },
            imgVisible: false,
            img: '',
            one: 'src/assets/1.jpg'
        };
    },
    methods: {
        doLook(a) {
            this.img = a
            this.imgVisible = true
        },
        doQuery() {
            console.log('查询的：' + JSON.stringify(this.queryEntity))
            queryName(this.queryEntity).then(resp => {
                console.log('query:' + JSON.stringify(resp.data))
                this.data = resp.msg == '成功' ? resp.data.cmsHelpCategoryList : []
                this.page.total=resp.data.cmsHelpCategoryList.length
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
                size: 5
            }
            page(pageDto).then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                const pages = resp.data.page;
                this.data = pages.records
                this.page = pages
            })
            this.queryEntity={'name':''}
        },
        currentchange(current) {
            this.all(current);
            this.page.current = current;//数据更新到目前显示的页面
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 100 },
                { prop: "helpCount", label: "专题数量", width: 100 },
                { prop: "name", label: "名称", width: 300 },
                // { prop: "icon", label: "图标", width: 200 },
                { prop: "sort", label: "排序", width: 150 },
            ];
        }
    },
    components: { ListView, HelpCategory }
}
</script>
<style  scoped>
.img {
    width: 180px;
    height: 130px;
    margin-left: -5px;
}
span{
    margin-top: 5px;
}
.el-input {
    width: 130px;
}

.item {
    /* width: 250px; */
    display: flex;

}

.up {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
    zoom: 0.78;
    
}
</style>
