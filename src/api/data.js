import axios from './axios';

export const get = () =>{
    return axios.request({
        url:'/get',
        method:'get'
    })
}
// export const getUser = (params) => {
//     return axios.request({
//         url:'user/getUser/',
//         method:'get',
//         params,
//     })
// }
export const getUser = (params) => {
    return axios.request({
      url: '/user/getUser',
      method: 'get',
      params
    })
  }


  export const getMenu = (params) =>{
    return axios.request({
      url:"/user/permission",
      method:'post',
      data:params
    })
  }
