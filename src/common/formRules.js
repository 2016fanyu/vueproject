export const userRules = {
  name: [
    { required: true, message: '请输入员工名称', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入员工手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '长度为11位', trigger: 'blur' }
  ],
  idcard: [
    { required: true, message: '请输入员工身份证号', trigger: 'blur' },
    { min: 15, max: 18, message: '长度为 15 或 18 个字符', trigger: 'blur' }
  ]
}
