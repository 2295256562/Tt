import axios from 'axios'


class AjaxRequest {
  constructor() {
    console.log(1)
    // 构造函数
    // 设置baseurl
    // this.baseURL = process.env.NODE_ENV === "producttion" ? "/" : "http://localhost:8090"
    this.baseURL = "http://127.0.0.1:8000/api/v1/";
    // 设置超时时间,5s
    this.timeout = 5000;
  }

  merge(options) {
    return {...options, baseURL: this.baseURL, timeout: this.timeout}
  }

  // setInterceptor(instance) {
  //   // 请求拦截器
  //   instance.interceptors.request.use((config) => {
  //     config.headers.Authorization = "abc";
  //     return config;
  //   });
  //   // 响应拦截器
  //   instance.interceptors.response.use((res) => {
  //     return res.data;
  //   });
  // }

  request(options) {
    let config = this.merge(options);
    let instance = axios.create(config);
    this.setInterceptor(instance);
    return instance; //返回一个promise
  }
}

export default new AjaxRequest
