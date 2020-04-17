import $axios from '../api/ajaxRequest'
import qs from 'qs'


//登陆
// export const login = params => { return axios({ method:'post', url:'/login/', data: params }) };
export const login = params => {
  return $axios({method: 'post', url: '/login/', data: params})
};

// 注册
export const register = params => {
  return $axios.post('reg/', params)
};

// 数据表
export const Datareport = params => {
  return $axios.get('count/')
};

// 添加项目
export const addProject = params => {
  return $axios({method: 'post', url: 'add_project/', data: params})
};

// 项目列表
export const projectList = params => {
  return $axios({method: 'get', url: '/project_list?page=' + params})
};

// 项目详情
export const projectInfo = params => {
  return $axios({method: 'get', url: '/project_info/' + params})
};

// 项目删除
export const Delproject = params => {
  return $axios({method: 'delete', url: '/del/' + params})
};

// 项目搜索
export const seachProject = params => {
  return $axios({method: 'get', url: '/project_list/?search=' + params})
};


// 项目列表
export const sourceprojectList = params => {
  return $axios({method: 'get', url: '/ListProject'})
};


// 添加模块
export const addModel = params => {
  return $axios({method: 'post', url: 'AddModel', data: params})
};

// 模块列表
export const modelList = params => {
  return $axios.get('modelList?page=' + params)
};

// 删除模块
export const delModel = params => {
  return $axios.delete('delMod/' + params)
};

// 模块详情
export const modelInfo = params => {
  return $axios.get('modelInfo/' + params)
};


// 调试接口用例
export const sendInterfaces = params => {
  return $axios.post('send/', params)
};

// 通过项目id查询所有模块
export const allModel = params => {
  return $axios.get('allModel/' + params)
};


// 接口测试用例保存
export const addApiCase = params => {
  return $axios.post('addApiCase', params)
};

// 接口列表
export const ListApicase = params => {
  return $axios.get('ListApicase?page=' + params)
};

// 接口用例搜索
export const searchCase = params => {
  return $axios.get('ListApicase/', {params})
};

// 接口用例详情 apicase_info/{id}/
export const apicase_info = params => {
  return $axios.get('apicase_info/' + params)
};

// 接口用例多选
export const listAPiInter = params => {
  return $axios.get('caselist/', {
    params: {id: params}, paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
};

// 搜索请求头
export const filterHeader = params => { return $axios.get('Filterheader/?project_name='+params) };

// 执行测试任务接口
export const testTask = params => { return $axios.post('testTask/', params) };

// 用例搜索接口
export const search = params => { return $axios.get('ListApicase/?search='+ params)  };

// 接口用例修改
export const updateCase = params => { return $axios.put('updateCase/' + id, params,) };


// 请求头列表
export const headerslist = params => { return $axios.get('headerslist/page=' + params) };

// 请求头详情
export const headersinfo = params => { return $axios.get('headersinfo/'+ params) };


// 报告列表
export const reportlist = params => { return $axios.get('ReportList?page='+params) };

// 报告详情
export const reportinfo = params => { return $axios.get('Reportinfo/'+ params) };

//报告case详情
export const caseReport = params => { return $axios.get('caseReport/?case_report=' + params ) };


// 添加定时任务
export const addTimeTask = params => { return $axios.post('addTimeTask/', params) };

// 定时任务列表
export const TimeTaskList = params => { return $axios.get('TimeTaskList?page='+params) };

// 任务详情
export const TaskInfo = params => { return $axios.get('TaskInfo/'+ params) };
