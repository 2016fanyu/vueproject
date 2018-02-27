<template>
  <div class="userList">
    <el-row>
      <el-col :span="24">
        <el-button icon="plus" type="info" @click="adduser()">新增员工</el-button>
      </el-col>
    </el-row>
    <el-table
      class="list-table"
      :data="currentList"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label-class-name="table-header-bold"
        header-align="center"
        label="人员名称">
      </el-table-column>
      <el-table-column
        prop="phone"
        label-class-name="table-header-bold"
        header-align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label-class-name="table-header-bold"
        header-align="center"
        label="身份证号">
      </el-table-column>
      <el-table-column
        label-class-name="table-header-bold"
        header-align="center"
        label="操作"
        align="center">
        <template scope="scope">
          <el-button type="success" size="mini" @click="edituser( scope.row.userId, scope.row.name, scope.row.phone, scope.row.idcard)">修改信息</el-button>
          <el-button type="danger" size="mini" @click="delSubmit( scope.row.userId )">注销员工</el-button>
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
    <el-dialog size="small" :close-on-click-modal="true" v-if="addShow" :modal-append-to-body="true" :title="title" :visible.sync="addShow">
      <el-form
        :model="userForm"
        :rules="formRules"
        ref="userForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="name" label="员工名称:">
              <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="phone" label="员工手机号:">
              <el-input placeholder="请输入手机号" v-model="userForm.phone" :maxlength=11></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="idcard" label="员工身份证号:">
              <el-input placeholder="请输入身份证号" :disabled="disabled" v-model="userForm.idcard" :maxlength=18></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-button type="info" @click="cancelAdd()">取消</el-button>
            <el-button icon="check" type="success" @click="submitForm()">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { userRules } from '@/common/formRules'
  import { splitArray } from '@/common/util.js'
  import { getChannelUserInfo, userEdit, userAdd, userDelete } from '@/api/api'
  export default {
    data () {
      return {
        currentList: [],
        currentData: [],
        listTotalNumber: 0,
        nowPage: 1,
        addShow: false,
        title: '',
        userForm: {
          name: '',
          phone: '',
          idcard: ''
        },
        disabled: true,
        id: '',
        formRules: userRules
      }
    },
    methods: {
      getList () {
        getChannelUserInfo({}).then((res) => {
          this.listTotalNumber = res.data.channelUserInfoVos.length
          this.currentData = splitArray(res.data.channelUserInfoVos, 10)
          this.currentList = this.currentData[0]
        })
      },
      edituser (id, name, phone, idcard) {
        this.addShow = true
        this.title = '修改信息'
        this.disabled = true
        this.id = id
        this.userForm.name = name
        this.userForm.phone = phone
        this.userForm.idcard = idcard
      },
      adduser () {
        this.addShow = true
        this.title = '新增员工'
        this.disabled = false
        this.userForm.name = ''
        this.userForm.phone = ''
        this.userForm.idcard = ''
      },
      cancelAdd(){
        this.addShow = false
        this.userForm.name = ''
        this.userForm.phone = ''
        this.userForm.idcard = ''
      },
      delSubmit (id){
        this.$confirm('确定注销员工', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDelete({
            userId: id
          }).then((res) => {
            this.$message.success('注销成功')
            this.getList()
          })
        }).catch(() => {})
      },//分页
      handlePageChange(pageNum){
        this.currentList = this.currentData[pageNum-1]
      },
      submitForm(){
        console.log(this.disabled)
        this.$refs.userForm.validate((valid) => {
          if(valid){
            if (this.disabled) {
              userEdit({
                name: this.userForm.name,
                phone: this.userForm.phone,
                userId: this.id
              }).then((res) => {
                console.log(res)
                this.getList()
                this.addShow = false
              })
            } else {
              userAdd({
                name: this.userForm.name,
                phone: this.userForm.phone,
                idcard: this.userForm.idcard
              }).then((res) => {
                console.log(res)
                this.getList()
                this.addShow = false
              })
            }
          }
        })
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