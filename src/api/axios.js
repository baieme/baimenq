import axios from 'axios';
const baseUrl = '/api/'
class httpRequest{
  constructor(baseUrl){
    this.baseUrl = baseUrl;
  }
  createOption(){
    const config = {
      baseURL:this.baseUrl,
      header:{

      }
    }
    return config;
  }
  interceptors(axios){
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      console.log('发送成功')
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
  
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {

      // 对响应数据做点什么
      console.log('拦截成功')
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
  request(option){
    const instance = axios.create();
    this.interceptors(instance);
    option = {...(this.createOption()),...option}
    return instance(option)
  }
}
export default new httpRequest(baseUrl)


