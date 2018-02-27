//删除费率财务科目编号数据中空的children属性
const deleteNullAttr = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].children.length !== 0) {
      deleteNullAttr(arr[i].children)
    } else {
      delete arr[i].children;
    }
  }
  return arr;
}

const dateFormat = function(obj, fmt)
{
  if (obj && obj.constructor === Date) {
    let o = {
      "M+" : obj.getMonth()+1,                 //月份
      "d+" : obj.getDate(),                    //日
      "h+" : obj.getHours(),                   //小时
      "m+" : obj.getMinutes(),                 //分
      "s+" : obj.getSeconds(),                 //秒
      "q+" : Math.floor((obj.getMonth()+3)/3), //季度
      "S"  : obj.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (obj.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(let k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  }
}

//分割数组
const splitArray = (arr, num) => {
  let newArr = [];
  let arrNum = Math.ceil(arr.length / num);
  let n = 0;
  for(let i = 1; i <= arrNum; i++) {
    let flag = (i - 1) * num;
    newArr[n++] = arr.slice(flag, flag + num);
  }
  let last = arr.length - arrNum * num;
  if(last > 0) {
    newArr[n++] = arr.slice(last * num);
  }
  return newArr;
}

const deleteRepeat = (arr)=>{
  let res = [];
  let json = {};
  for(let i = 0; i < arr.length; i++){
    if(json[arr[i]] !== 1){
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
}

const checkPermission = (code) => {
  let permissionList = JSON.parse(localStorage.getItem('permission'));
  if(!permissionList) {
    return true;
  }
  for(let i = 0; i < permissionList.length; i++) {
    if(permissionList[i] === code) {
      return true;
    }
    if(i === permissionList.length - 1) {
      return false;
    }
  }
}

export {
  deleteNullAttr,
  dateFormat,
  splitArray,
  deleteRepeat,
  checkPermission
}
