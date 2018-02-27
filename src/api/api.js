import axios from 'axios'
import VUE from '@/main.js'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Access-Control-Allow-Headers'] = '*'
  config.headers['Access-Control-Allow-Methods'] = '*'
  config.headers['X-Powered-By'] = '3.2.1'
  if (config.headers['Content-Type'] === 'undefined') {
    // console.log(config.headers['Content-Type'])
    config.headers.delete('Content-Type')
  } else {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  if (localStorage.getItem('authorization')) {
    config.headers.Authorization = localStorage.getItem('authorization')
  }
  console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  console.log(error.response)
  if(error.response.data.code === '700005') {
    VUE.$message.error('登陆状态超时或者未获得权限,返回登陆。');
    VUE.$router.push('/login');
  }
  VUE.$message.error(error.response.data.message);
  return Promise.reject(error);
});

const RESTfulApi = (data, url, method, {urlMethods = true, designId = 'id'} = {}) => {
  if(method === 'GET') {
    return axios({
      method,
      url: urlMethods ? url : `${url}/${data[designId]}`,
      params: data
    })
  } else if(method === 'PUT' || method === 'POST'){
    return axios({
      method,
      url,
      data
    })
  } else if(method === 'DELETE'){
    return VUE.$confirm('是否确认删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      return axios({
        method,
        url: `${url}/${data[designId]}`
      })
    }).catch(() => {
      return VUE.$message.info('已取消')
    })
  }
}

export const userLogin = (data) => {
  let instance = axios.create()
  localStorage.removeItem('authorization')
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.headers.authorization){
      localStorage.setItem('authorization', response.headers.authorization)
    }
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    VUE.$alert(error.response.data.message);
    return Promise.reject(error);
  });
  return instance({
    method: 'POST',
    url: '/offlinechannel/user/login',
    data
  })
}
// 用户新增
export const userAdd = (data) => {
  return axios({
    method: 'POST',
    url: '/offlinechannel/user/add',
    data
  })
}
// 个人信息查询
export const userQuery = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/user/query',
    params: data
  })
}
// 个人信息修改
export const userEdit = (data) => {
  return axios({
    method: 'POST',
    url: '/offlinechannel/user/modify',
    data
  })
}
// 修改密码
export const modifyPassword = (data) => {
  return axios({
    method: 'POST',
    url: '/offlinechannel/user/modifyPassword',
    data
  })
}
// 注销员工
export const userDelete = (data) => {
  return axios({
    method: 'DELETE',
    url: '/offlinechannel/user/del',
    params: data
  })
}
// 生成授权码
export const referrerAdd = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/referrer/add',
    data
  })
}
// 渠道信息
export const getPresentChannelInfo = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/channel/getPresentChannelInfo',
    data
  })
}
// 渠道信息修改
export const getChannelInfomodify = (data) => {
  return axios({
    method: 'POST',
    url: '/offlinechannel/channel/modify',
    data
  })
}
// 渠道下的员工信息
export const getChannelUserInfo = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/channel/getChannelUserInfo',
    params: data
  })
}
// 查询用户推荐的机构信息
export const queryUserRecommendOrg = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/referrer/queryUserRecommendOrg',
    params: data
  })
}
// 根据机构id查询机构信息
export const queryOrgInfoById = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/referrer/queryOrgInfoById',
    params: data
  })
}
// 修改机构信息
// export const modifyOrgInfo = (data) => {
//   return axios({
//     method: 'POST',
//     url: '/offlinechannel/referrer/modifyOrgInfo',
//     data
//   })
// }
// 机构注销
export const delOrgInfo = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/referrer/delOrgInfo',
    params: data
  })
}
// 生成二维码
export const produceQRCode = (data) => {
  return axios({
    method: 'GET',
    url: '/offlinechannel/wechat/produceQRCode',
    params: data
  })
}
