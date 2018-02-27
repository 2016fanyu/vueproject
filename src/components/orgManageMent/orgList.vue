<template>
  <div>
    <el-table
      class="list-table"
      :data="currentList"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <orgDetail :dataToChild="props.row.id"></orgDetail>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="shortName"
        label-class-name="table-header-bold"
        header-align="center"
        label="机构简称">
      </el-table-column>
      <el-table-column
        prop="address"
        label-class-name="table-header-bold"
        header-align="center"
        label="机构地址">
      </el-table-column>
      <el-table-column
        label="试用状态"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span>{{transform(scope.row.type)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label-class-name="table-header-bold"
        header-align="center"
        label="操作"
        align="center">
        <template scope="scope">
          <el-button v-if="showbtn(scope.row.type)" type="danger" size="mini" @click="delSubmit( scope.row.id )">注销机构</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="nowPage"
        :page-size="10"
        :total="listTotalNumber"
        layout="prev, pager, next">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import orgDetail from './orgDetail'
  import { splitArray } from '@/common/util.js'
  import { queryUserRecommendOrg } from '@/api/api'
  export default {
    components: {
      orgDetail
    },
    data () {
      return {
        currentList: [],
        currentData: [],
        listTotalNumber: 0,
        nowPage: 1
      }
    },
    methods: {
      getList () {
        queryUserRecommendOrg({
          flag: localStorage.getItem('permission')
        }).then((res) => {
          // console.log(res.data.data.orginfo)
          this.listTotalNumber = res.data.data.orginfo.length
          this.currentData = splitArray(res.data.data.orginfo, 10)
          this.currentList = this.currentData[0]
        })
      },
      showbtn (type) {
        if (type === '1' || type === '2') {
          return true
        } else {
          return false
        }
      },
      transform (type) {
        if (type === '0') {
          return '关闭(无效)'
        } else if (type === '1') {
          return '正式'
        } else if (type === '2') {
          return '试用'
        } else if (type === '3') {
          return '待审核'
        } else if (type === '4') {
          return '审核不通过'
        }
      },
      delSubmit (id){
        this.$confirm('确定注销机构', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delOrgInfo({
            orgId: id
          }).then((res) => {
            this.$message.success('注销成功')
            this.getList()
          })
        }).catch(() => {})
      },//分页
      handlePageChange(pageNum){
        this.currentList = this.currentData[pageNum-1]
      }
    },
    activated () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getList()
    }
  }
</script>

<style scoped>

</style>