import $axios from '../api/ajaxRequest'
// import axios from 'axios'

// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

// let host = "http://127.0.0.1:8000/api/v1";

//登陆
// export const login = params => { return axios({ method:'post', url:'/login/', data: params }) };
export const login = params => {
  return $axios({method: 'post', url: '/login/', data: params})
};

// 添加项目
export const addProject = params => {
  return axios({method: 'post', url: `${host}/add_project/`, data: params})
};

// 项目列表
export const projectList = params => {
  return axios({ method: 'get', url: `${host}/project_list?page=` + params })
};

// 项目详情
export const projectInfo = params => {
  return axios({ method: 'get', url: `${host}/project_info/` + params })
};

// 项目删除
export const  Delproject = params => {
  return axios({ method: 'delete', url: `${host}/del/` + params })
};

// 项目搜索
export const seachProject = params => { return axios({ method: 'get', url: `${host}/project_list/?project_name=` + params}) };


// 项目列表
export const sourceprojectList = params => {
  return axios({ method: 'get', url: `${host}/project_list`})
};