<template>
  <div>
    <el-menu class="el-menu-vertical-demo" text-color="#001d6f">
      <template v-for="(item) in menuList">
        <el-submenu
          v-if="item.children&&item.children.length>0"
          :key="item.id"
          :index="parseInt(item.id)"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.label}}</span>
          </template>
          <com-menu :menuList="item.children" />
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="parseInt(item.id)">{{item.label}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import ComMenu from "@/components/ComMenu.vue";
export default {
  name: "ComMenu", //必须要 递归组件的关键，并且要与引入组件的变量名称一致
  components: {
    ComMenu
  },
  props: {
    menuList: {}
  }
};
</script>