import $axios from '../api/ajaxRequest'


//登陆
// export const login = params => { return axios({ method:'post', url:'/login/', data: params }) };
export const login = params => {
  return $axios({method: 'post', url: '/login/', data: params})
};

// 添加项目
export const addProject = params => {
  return $axios({method: 'post', url: 'add_project/', data: params})
};

// 项目列表
export const projectList = params => {
  return $axios({ method: 'get', url: '/project_list?page=' + params })
};

// 项目详情
export const projectInfo = params => {
  return $axios({ method: 'get', url: '/project_info/' + params })
};

// 项目删除
export const  Delproject = params => {
  return $axios({ method: 'delete', url: '/del/' + params })
};

// 项目搜索
export const seachProject = params => { return $axios({ method: 'get', url: '/project_list/?project_name=' + params}) };


// 项目列表
export const sourceprojectList = params => {return $axios({ method: 'get', url: '/ListProject'})};


// 添加模块
export const addModel = params => { return $axios({ method: 'post', url: 'AddModel', data: params }) };

// 模块列表
export const modelList = params => { return $axios.get('modelList?page=' + params) };

// 删除模块
export const delModel = params => { return $axios.delete('delMod/' + params) };

// 模块详情
export const modelInfo = params => { return $axios.get('modelInfo/' + params) };


// 调试接口用例
export const sendInterfaces = params => { return $axios.post( 'send/', params) };

// 通过项目id查询所有模块
export const allModel = params => { return $axios.get('allModel/' + params ) };


// 接口测试用例保存
export const addApiCase = params => { return $axios.post('addApiCase', params) };

// 接口列表
export const ListApicase = params => { return $axios.get('ListApicase?page=' + params) };

// 接口搜索
export const searchCase = params => {  return $axios.get('ListApicase/', { params }) };

// 接口详情 apicase_info/{id}/
export const apicase_info = params => { return $axios.get('apicase_info/' + params) };
