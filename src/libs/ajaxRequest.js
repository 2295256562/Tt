import axios from 'axios'


class AjaxRequest {
  constructor() {
    // 构造函数
    // 设置baseurl
    // this.baseURL = process.env.NODE_ENV === "producttion" ? "/" : "http://localhost:8090"
    this.baseURL = "http://localhost:8090"
    // 设置超时时间,5s
    this.timeout = 5000;
  }

  merge(options) {
    return {...options, baseURL: this.baseURL, timeout: this.timeout}
  }

  setInterceptor(instance) {
    // 请求拦截器
    instance.Interceptors.request.use((config) => {
      config.headers.Authorization = "abc";
      return config;
    });
    // 响应拦截器
    instance.Interceptors.response.use((res) => {
      return res.data;
    });
  }

  request(options) {
    let instance = axios.create();
    let config = this.merge(options);
    console.log(config)
    this.setInterceptor(instance);
    return instance(config); //返回一个promise
  }
}

export default new AjaxRequest
