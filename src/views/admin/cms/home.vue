<template>
    <div class="big">
        <div class="up">
            
            <div>
                <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" mode="vertical" :router="true">
                    <el-menu-item index="/home/helpManage">帮助信息管理</el-menu-item>
                    <el-menu-item index="/home/helpCategoryManage">帮助信息分类管理</el-menu-item>
                </el-menu>
            </div>
        </div>

        <div class="down">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/home/helpManage'
        }
    },
    methods: {
    },
}
</script>
<style  scoped>
.up {
    width: 15%;
    height: 100%;
    position: absolute;
    border: 1px solid rebeccapurple;
    background-color: rgb(112,128,144);
    /* direction: rtl; */
}
.el-menu{
    background-color: rgb(112,128,144);
}
.el-menu-item{
    font-size: 20px;   
}
.down {
    width: 85%;
    height: 100%;
    position: absolute;
    left: 15%;
    overflow-y: auto;
    overflow: auto;
}

.big {
    width: 100%;
    height: 100%;
    padding: 0px;
}
</style>
