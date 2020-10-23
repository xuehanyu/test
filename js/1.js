import axios from 'axios'
import Qs from 'qs'
import { isLocal, apiPre } from './env.js'
import { appid, getSign } from './sign.js'
import { Message } from 'element-ui'
import { downBlob } from '../utils'
// 可以打印process.env 看到 BASE_URL: "/"   NODE_ENV: "development
// console.log(process.env)
/* 同一个接口
 测试环境 'xytest.staff.xdf.cn/upocmanage/Apis/VideoStatistic/Index'
 仿真环境 'manager.i.xdf.cn/upocbeta/Apis/VideoStatistic/Index'
 正式环境 'upoc.manage.xdf.cn/Apis/VideoStatistic/Index'
*/
// 2分钟
axios.defaults.timeout = 2 * 60 * 1000
/*
function getApiPre () {
  // npm run local 同时执行 node server.js 就会开启本地的伪服务
  if (process.env.NODE_ENV === 'local') {
    return '//localhost:3000'
  }

  if (isProduction) {
    return '/Apis'
  }
  if (isFakeProduction) {
    return '/upocbeta/Apis'
  }
  if (isTest) {
    return '/upocmanage/Apis'
  } else {
    // 其他就是本地了
    // console.log('dist')
    return '//xytest.staff.xdf.cn/upocmanage/Apis'
  }
}
const apiPre = getApiPre() */

/**
 * params不能包含appid
 * 首先 params必须是按照接口规定的顺序
 * 然后 加密
 * 加密完之后加上 appid和sign参数
 */

let POSTWHITELIST = ['SaveGreetings', 'SaveStaffInfo', 'ConfigRuleAuth', 'SaveManagerUserInfo']

function getNewParams (params) {
  const sign = getSign(params)
  params = { appid: appid, ...params, sign }
  return params
}

function getNewUrl (url) {
  // http开头的直接用原url
  const isAbsolute = url.includes('//')
  if (isAbsolute) return url
  const hasSlash = url.startsWith('/')
  // 万一忘了带/ 这里补上
  url = (hasSlash ? '' : '/') + url
  // 加上前缀
  url = apiPre + url
  return url
}
// {a:1,b:2} => url?a=1&b=2
function getQueryUrl (url, query) {
  if (!query) {
    return url
  }
  const isObject = query.toString() === '[object Object]'
  if (!isObject) {
    throw Error('query必须是对象')
  }
  url = getNewUrl(url)
  const queryStr = Qs.stringify(query)
  const hasSearch = url.includes('?')
  const joinStr = hasSearch ? '&' : '?'
  url = url + joinStr + queryStr
  return url
}
function uppercaseFirstString (str) {
  if (!str) return str
  const firstStr = str.slice(0, 1).toUpperCase()
  const otherStr = str.slice(1)
  const res = firstStr + otherStr
  return res
}
function uppercaseObject (object) {
  let res = {}
  const keys = Object.keys(object)
  keys.forEach(key => {
    res[uppercaseFirstString(key)] = object[key]
  })
  return res
}
function lowercaseFirstString (str) {
  if (!str) return str
  const firstStr = str.slice(0, 1).toLowerCase()
  const otherStr = str.slice(1)
  const res = firstStr + otherStr
  return res
}
function lowercaseObject (object) {
  let res = {}
  const keys = Object.keys(object)
  keys.forEach(key => {
    res[lowercaseFirstString(key)] = object[key]
  })
  return res
}
// 有些方法 需要在data里的每一项key的第一个字母变成大写
function urlNeedReturnUppercase (url) {
  const urls = [
    'GetVideoTeacherStatisticList',
    'GetVideoTeacherDetailStatisticList',
    'GetVideoTeacherClassStatisticList',
    'GetSpocMokeVideoStatisticList'
  ]
  const res = urls.includes(url)
  return res
}

// 接口地址 https://www.showdoc.cc/shanggu?page_id=2231068023076782
// 1是成功信息 其他都是错误的
/* {
  "State": 1,
  "Data": [
      {
        "OrderNumber": 1,
        "ClassName": "班级名称",
        "ClassCode": "班级编码",
        "VideoCount": 2,
        "LessonNo": 2 ,
        "AllCount": 2,
        "ViewPercent": 86.66,//观看率
        "SigninPercent": 86.66,//打卡率
      }
  ],
  "DataCount": 1,
  "Error":"错误信息"
}
url  不需要带公共的部分
params 不需要带appid和sign
errorCb 如果传入这个的话就是单独处理错误情况，默认就是警告提示 浏览器最上面出现一行文字，2s后消失
headers是header的配置，传对象格式
*/
function post (url, params, errorCb, ops = {}) {
  params = getNewParams(params)
  url = getNewUrl(url)
  // 不传回调的话 传headers
  // typeof errorCb === 'object' && (errorCb = headers)
  // headers = headers || { 'Content-Type': 'application/x-www-form-urlencoded' }
  return axios({
    url,
    method: 'POST',
    data: params,
    // 依自己的需求对请求数据进行处理
    transformRequest: [
      function (data) {
        if (POSTWHITELIST.includes(data.method)) {
          let dataCopy = JSON.parse(JSON.stringify(data))
          Object.keys(dataCopy).forEach(key => {
            Array.isArray(dataCopy[key]) && (dataCopy[key] = JSON.stringify(dataCopy[key]))
          })
          return Qs.stringify(dataCopy)
        }
        if (data.method !== 'SaveLongEvent') { return Qs.stringify(data) }

        // 如果参数值是数组的话，传递方式会特别点
        // [{xx:11}] => '[{xx:11}]'
        let getJsonArrayStr = arr => /\[.{0,}\]/.exec(JSON.stringify({ arr }))[0]
        let dataCopy = JSON.parse(JSON.stringify(data))
        Object.keys(dataCopy).forEach(key => {
          const isValueArray = Array.isArray(dataCopy[key])
          isValueArray && (dataCopy[key] = getJsonArrayStr(dataCopy[key]))
        })
        return Qs.stringify(dataCopy)
      }
    ]
  })
    .then(res => {
      // 这才是接口的全部数据{}
      console.log(`接口${params.method} 参数是\n `, params, `返回数据是\n`, res)
      return res.data
    })
    .then(res => {
      if (ops.flag) return res
      // 这里有个特殊情况 如果接口直接返回blob文件，就不需要下面一坨了
      let downMethods = ['DownLoadFile']
      if (downMethods.includes(params.method)) {
        return
      }
      // 考虑到接口的字段 有时候大写有时候小写，这边除了urlNeedReturnUppercase，统一将所有字段小写。
      // 最外层的 state data error变成小写
      res = lowercaseObject(res)
      const isArray = Array.isArray(res.data)
      const isNeedUppercase = urlNeedReturnUppercase(params.method)
      const isSuccess = res.state === 1
      if (isSuccess) {
        // 有三个method需要将data或者totalData的值的key大驼峰式
        isArray && (res.data = res.data.map(item => isNeedUppercase ? uppercaseObject(item) : lowercaseObject(item)))
        res.totalData && (res.totalData = isNeedUppercase ? uppercaseObject(res.totalData) : lowercaseObject(res.totalData))
        // 突然data是对象的时候，大写了 加了这行
        // if (!isNeedUppercase && (Object.toString.call(res.data) === 'object Object')) {
        //   res.data = lowercaseObject(res.data)
        // }

        return res
      }
      // 不是成功状态就报错误信息
      const error = res.error

      if (!errorCb) {
        const info = isLocal ? `接口${params.method}${error}` : error
        Message.error(info || '操作出错了！')
      } else {
        errorCb(error)
      }
      return res.data
      // return Promise.reject(`接口${params.method}${error}`)
    })
    .catch(error => {
      console.log(errorCb, 5555)
      if (!errorCb) {
        Message.error(error)
      } else {
        errorCb(error)
      }
    })
}
function postDown (url, params, errorCb) {
  params = getNewParams(params)
  url = getNewUrl(url)
  return axios({
    url,
    method: 'POST',
    data: params,
    // 依自己的需求对请求数据进行处理
    transformRequest: [
      function (data) {
        return Qs.stringify(data)
      }
    ],
    responseType: 'blob'
  })
    .then(res => {
      // return res
      // console.log({ res })
      // downBlob(res.data, params.fileName)
      if (res.status === 200) {
        downBlob(res.data, params.fileName)
      }
    })
}
function upload (url, params, progressCb) {
  params = getNewParams(params)
  url = getNewUrl(url)
  // 不传回调的话 传headers
  let options = {
    url,
    method: 'POST',
    data: params,
    // 原生获取上传进度的事件
    // onUploadProgress (progressEvent) {
    //   progressCb && progressCb(progressEvent)
    //   // console.log(progressEvent)
    //   // let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
    //   // alert('上传 ' + complete)
    // },
    // 依自己的需求对请求数据进行处理
    transformRequest: [
      function (data) {
        let formData = new FormData()
        for (const key in data) {
          const value = data[key]
          formData.append(key, value)
        }
        return formData
      }
    ]
  };
  (!isLocal) && (options.onUploadProgress = (progressEvent) => { progressCb && progressCb(progressEvent) })
  return axios(options)
    .then(res => {
      // 这才是接口的全部数据{}
      console.log(`接口${params.method} 参数是\n `, params, `返回数据是\n`, res)
      return res.data
    })
    .then(res => {
      // 考虑到接口的字段 有时候大写有时候小写，这边除了urlNeedReturnUppercase，统一将所有字段小写。
      // 最外层的 state data error变成小写
      res = lowercaseObject(res)
      const isArray = Array.isArray(res.data)
      const isNeedUppercase = urlNeedReturnUppercase(params.method)
      const isSuccess = res.state === 1
      if (isSuccess) {
        // 有三个method需要将data或者totalData的值的key大驼峰式
        isArray && (res.data = res.data.map(item => isNeedUppercase ? uppercaseObject(item) : lowercaseObject(item)))
        res.totalData && (res.totalData = isNeedUppercase ? uppercaseObject(res.totalData) : lowercaseObject(res.totalData))
        return res
      }
      // 不是成功状态就报错误信息
      const error = res.error
      const info = isLocal ? `接口${params.method}${error}` : error
      Message.error(info)
      // if (!errorCb) {
      //   Message.error(info)
      // } else {
      //   errorCb(error)
      // }
      return false
      // return Promise.reject(`接口${params.method}${error}`)
    })
    .catch(error => {
      Message.error(error)
      // if (!errorCb) {
      // } else {
      //   errorCb(error)
      // }
    })
}

function get (url, params, errorCb) {
  params = getNewParams(params)
  url = getQueryUrl(url, params)
  return axios({
    url,
    method: 'GET',
    // 依自己的需求对请求数据进行处理
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => {
      // 这才是接口的全部数据{}
      // console.log(res.data)
      return res.data
    })
    .then(res => {
      const isSuccess = (res.State || res.state) === 1
      if (isSuccess) {
        return res.Data || res.data
      }
      Promise.reject(res.Error || res.error)
    })
    .catch(error => {
      if (!errorCb) {
        Message.error(error)
      } else {
        errorCb(error)
      }
    })
}

function down (url, params) {
  params = getNewParams(params)
  url = getQueryUrl(url, params)
  window.open(url, '_blank')
}

export { post, get, down, upload, postDown }
