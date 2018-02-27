<template>
  <div class="orgDetail">
    <h5 v-if="showDetail">机构详情</h5>
    <h5 v-if="!showDetail">暂无详情</h5>
    <el-form label-position="left" inline class="demo-table-expand" v-if="showDetail">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构简称">
            <span>{{ currentData.shortName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机构全称">
            <span>{{ currentData.orgName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机构地址">
            <span>{{ currentData.address }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机构联系人">
            <span>{{ currentData.linkman }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人手机号">
            <span>{{ currentData.linkmanPhone }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { queryOrgInfoById } from '@/api/api'
  export default {
    props: ['dataToChild'],
    data () {
      return {
        currentData: {},
        showDetail: false
      }
    },
    methods: {
      getDetail(){
        this.currentId = this.dataToChild
        console.log(this.dataToChild)
        queryOrgInfoById({
          orgId: this.currentId
        }).then((res) => {
          console.log(res)
          if (res.data.data) {
            this.showDetail = true
            this.currentData = res.data.data
          }
        })
      }
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style lang="scss" scoped>
  .orgDetail {
    .el-form-item__label {
      color: #858c8a;
    }
  }
</style>