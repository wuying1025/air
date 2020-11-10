<template>
  <div class="law-container">
    <el-container>
      <!-- 左侧侧栏 -->
      <el-aside width="17%">
        <div class="law-logo">
          <img src="@/assets/images/logo.png" alt />
          <div class="law-title">法规查询提醒系统</div>
        </div>
        <!-- 递归菜单 -->
        <ComMenu :menuList="menuList"></ComMenu>
      </el-aside>
      <el-container class="law-main">
        <!-- 右侧头部 -->
        <el-header height="108px">
          <com-header></com-header>
        </el-header>
        <!-- 右侧内容 -->
        <el-main>
          <div class="main-tabs">
            <ul class="main-tabs-right">
              <li class="export-btn">导出</li>
              <li>
                <el-select v-model="form.region" size="medium" placeholder="请选择类别">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </li>
              <li>
                <el-date-picker
                  type="date"
                  size="medium"
                  placeholder="请选择时间"
                  v-model="form.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </li>
              <li class="search-box">
                <el-input v-model="form.name" size="medium" placeholder="请输入搜索内容">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  <i slot="suffix" class="el-input__icon iconfont icon-Shape"></i>
                </el-input>
              </li>
            </ul>
            <el-tabs v-model="editableTabsValue" type="card">
              <el-tab-pane label="全部" name="全部">
                <div class="main-content">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    :header-cell-style="{background:'#fafafa'}"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="法规名称" width="120"></el-table-column>
                    <el-table-column prop="address" label="法规分类" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="完成时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="下载" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="条令内容" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="isdone" label="相关工作落实" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span v-if="scope.row.isdone == '未落实'" class="isdone unfinish">未落实</span>
                        <span v-else-if="scope.row.isdone == '已落实'" class="isdone finish">已落实</span>
                        <span v-else="scope.row.isdone == '超时'" class="isdone overtime">超时</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page-box">
                    <el-pagination
                      :page-size="100"
                      layout="total, prev, pager, next, jumper"
                      :total="1000"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已落实" name="已落实">
                <div class="main-content">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    :header-cell-style="{background:'#fafafa'}"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="法规名称" width="120"></el-table-column>
                    <el-table-column prop="address" label="法规分类" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="完成时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="下载" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="条令内容" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="isdone" label="相关工作落实" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span v-if="scope.row.isdone == '未落实'" class="isdone unfinish">未落实</span>
                        <span v-else-if="scope.row.isdone == '已落实'" class="isdone finish">已落实</span>
                        <span v-else="scope.row.isdone == '超时'" class="isdone overtime">超时</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page-box">
                    <el-pagination
                      :page-size="100"
                      layout="total, prev, pager, next, jumper"
                      :total="1000"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="未落实" name="未落实">
                <div class="main-content">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    :header-cell-style="{background:'#fafafa'}"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="法规名称" width="120"></el-table-column>
                    <el-table-column prop="address" label="法规分类" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="完成时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="下载" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="条令内容" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="isdone" label="相关工作落实" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span v-if="scope.row.isdone == '未落实'" class="isdone unfinish">未落实</span>
                        <span v-else-if="scope.row.isdone == '已落实'" class="isdone finish">已落实</span>
                        <span v-else="scope.row.isdone == '超时'" class="isdone overtime">超时</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page-box">
                    <el-pagination
                      :page-size="100"
                      layout="total, prev, pager, next, jumper"
                      :total="1000"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="超时" name="超时">
                <div class="main-content">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    :header-cell-style="{background:'#fafafa'}"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="法规名称" width="120"></el-table-column>
                    <el-table-column prop="address" label="法规分类" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="完成时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="下载" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="条令内容" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="isdone" label="相关工作落实" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span v-if="scope.row.isdone == '未落实'" class="isdone unfinish">未落实</span>
                        <span v-else-if="scope.row.isdone == '已落实'" class="isdone finish">已落实</span>
                        <span v-else="scope.row.isdone == '超时'" class="isdone overtime">超时</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page-box">
                    <el-pagination
                      :page-size="100"
                      layout="total, prev, pager, next, jumper"
                      :total="1000"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import Sidebar from "../../components/Sidebar"
import ComHeader from "../../components/ComHeader";
import ComMenu from "../../components/ComMenu";
import axios from 'axios';

export default {
  data() {
    return {
      editableTabsValue: "全部",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isdone: "未落实"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isdone: "已落实"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isdone: "超时"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isdone: "未落实"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isdone: "未落实"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isdone: "未落实"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isdone: "已落实"
        }
      ],
      form: {
        date1: "",
        region: "",
        name: ""
      },
      // 人员树型结构
      menuList: []
    };
  },
  components: {
    ComMenu,
    ComHeader
  },methods: {
    getData() {
      axios
        .get("http://192.168.8.124:8808/system/user/getUserByDept")
        .then(res => {
          this.menuList = res.data.data;
          console.log(this.menuList)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //请求左侧列表
    this.getData();
  }
};
</script>

<style lang="scss" scoped>

/* menu菜单样式重置 */
.icon-zuzhijiagou {
  color: #001d6f;
  font-size: 17px;
  margin-right: 10px;
}
.el-submenu__title {
  outline: 0px;
  border-left: 5px solid #fff;
  background-color: #fff;
}
.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0px;
  border-left: 5px solid #001d6f;
  background-color: #e9eafc;
}
.el-submenu__title {
  font-size: 17px;
}
.el-submenu__title i {
  color: #001d6f;
  font-size: 17px;
}
.el-menu-item {
  font-size: 17px;
}

/* menu菜单样式重置结束 */
.law-logo {
  text-align: center;
}
.law-logo img {
  margin-top: 2px;
}
.law-logo .law-title {
  color: #001d6f;
  font-size: 20px;
  margin-top: -3px;
  margin-bottom: 10px;
}
.law-main {
  background: #eaeff3 url(../../assets/images/bg.jpg) right 0 no-repeat;
  background-size: contain;
  min-height: 100vh;
}

/* 右侧筛选 */
.main-tabs {
  position: relative;
}
.main-tabs-right {
  position: absolute;
  right: -10px;
  z-index: 3;
  top: 5px;
}
.main-tabs-right li.export-btn {
  width: 85px;
  background: #fcc349;
  cursor: pointer;
  color: #001d6f;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
}
.main-tabs-right li {
  width: 150px;
  float: left;
  margin-right: 10px;
}
.main-tabs-right li.search-box {
  width: 280px;
}
.search-box .el-input__suffix {
  right: 10px;
}
/*表格内容区  */
.main-content {
  background: #fff;
  height: calc(100vh - 210px);
  padding: 20px;
  box-sizing: border-box;
  /* height:calc(100vh-200px); */
}
.main-content .isdone {
  border-radius: 40px;
  color: #fff;
  display: inline-block;
  padding: 0px 12px;
}
.unfinish {
  background: #f61717;
}
.finish {
  background: #8a8a8a;
}
.overtime {
  background: #f6ac1e;
}
.el-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 20px;
}
</style>