// import tree from "element-ui/packages/table/src/store/tree";
//
// const arr = [{
//   "id": 1,
//   "create_user": "",
//   "create_time": "2020-04-27T17:14:22.781045",
//   "is_deleted": false,
//   "api": "/app/ec/address/add",
//   "method": "post",
//   "api_name": "创建地址",
//   "tag": "['fe-app-address-地址管理']",
//   "params_type": "data",
//   "parameters": "{\"address\": {\"type\": \"string\"}, \"area_address\": {\"type\": \"string\"}, \"areacode\": {\"type\": \"integer\"}, \"id\": {\"type\": \"integer\"}, \"isup\": {\"type\": \"integer\"}, \"postcode\": {\"type\": \"string\"}, \"realname\": {\"type\": \"string\"}, \"tag\": {\"type\": \"integer\"}, \"tel\": {\"type\": \"string\"}, \"user_id\": {\"type\": \"integer\"}}",
//   "product": 3
// },
//   {
//     "id": 2,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.788912",
//     "is_deleted": false,
//     "api": "/app/ec/address/delete",
//     "method": "delete",
//     "api_name": "获取单个地址详情",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "data",
//     "parameters": "[{\"type\": \"model.ReqParam\", \"description\": \"ret\", \"name\": \"p\", \"in\": \"path\", \"required\": true}]",
//     "product": 3
//   },
//   {
//     "id": 3,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.798343",
//     "is_deleted": false,
//     "api": "/app/ec/address/detail",
//     "method": "get",
//     "api_name": "获取单个地址详情",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "params",
//     "parameters": "[{\"type\": \"model.ReqParam\", \"description\": \"ret\", \"name\": \"p\", \"in\": \"query\", \"required\": true}]",
//     "product": 3
//   },
//   {
//     "id": 4,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.850607",
//     "is_deleted": false,
//     "api": "/app/ec/address/edit",
//     "method": "post",
//     "api_name": "编辑地址",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "data",
//     "parameters": "{\"address\": {\"type\": \"string\"}, \"area_address\": {\"type\": \"string\"}, \"areacode\": {\"type\": \"integer\"}, \"id\": {\"type\": \"integer\"}, \"isup\": {\"type\": \"integer\"}, \"postcode\": {\"type\": \"string\"}, \"realname\": {\"type\": \"string\"}, \"tag\": {\"type\": \"integer\"}, \"tel\": {\"type\": \"string\"}, \"user_id\": {\"type\": \"integer\"}}",
//     "product": 3
//   },
//   {
//     "id": 5,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.858955",
//     "is_deleted": false,
//     "api": "/app/ec/address/list",
//     "method": "get",
//     "api_name": "获取地址列表",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "params",
//     "parameters": "[{\"type\": \"model.ReqParam\", \"description\": \"ret\", \"name\": \"p\", \"in\": \"query\", \"required\": true}]",
//     "product": 3
//   },
//   {
//     "id": 6,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.861629",
//     "is_deleted": false,
//     "api": "/app/ec/address/test",
//     "method": "get",
//     "api_name": "test",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "params",
//     "parameters": "null",
//     "product": 3
//   },
//   {
//     "id": 7,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.872676",
//     "is_deleted": false,
//     "api": "/app/ec/evaluation/evaluate/add",
//     "method": "post",
//     "api_name": "添加评价",
//     "tag": "['fe-app-evaluation-商品评价模块']",
//     "params_type": "data",
//     "parameters": "{\"logistics_evaluate\": {\"description\": \"\物\流\评\价\", \"type\": \"object\", \"additionalProperties\": {\"$ref\": \"#/definitions/model.LogisticsEvaluateReq\"}}, \"order_comment\": {\"description\": \"\订\单\评\价\", \"type\": \"object\", \"additionalProperties\": {\"$ref\": \"#/definitions/model.OrderCommentReq\"}}, \"product_evaluate\": {\"description\": \"\商\品\评\价\", \"type\": \"array\", \"items\": {\"$ref\": \"#/definitions/model.ProductEvaluateReq\"}}}",
//     "product": 3
//   },
//   {
//     "id": 8,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.935051",
//     "is_deleted": false,
//     "api": "/app/ec/evaluation/evaluate/last",
//     "method": "get",
//     "api_name": "获取最后一条高分评价",
//     "tag": "['fe-app-evaluation-商品评价模块']",
//     "params_type": "params",
//     "parameters": "[{\"type\": \"integer\", \"description\": \"\商\品id\", \"name\": \"sid\", \"in\": \"query\", \"required\": true}]",
//     "product": 3
//   }];
//
// // 处理树状结构数据
// export function handleList(arr) {
//   const obj = {}
//   const arrT = []
//   arr.forEach(item => {
//     if (!Object.keys(obj).includes(item.product)) {
//       obj[item.product] = [item]
//     } else {
//       obj[item.product] = [...obj[item.product], item]
//     }
//   })
//
//   for (const item in obj) {
//     arrT.push({
//       label: item,
//       children: []
//     })
//   }
//
//   arrT.forEach(item => {
//     arr.forEach(it => {
//       if (it.product == item.label && !item.children.map(_v => {(_v.label)}).includes(it.tag)) {
//         item.children.push({
//           label: it.tag,
//           children: []
//         })
//       }
//     })
//   })
//
//   arrT.forEach(item => {
//     item.children.forEach(it => {
//       arr.forEach(_v => {
//         if (item.label == _v.product && it.label == _v.tag) {
//           it.children.push({
//             label: _v.tag
//           })
//         }
//       })
//     })
//   })
//   return arrT
// }
//
//
// var data = [{
//   "id": 1,
//   "create_user": "",
//   "create_time": "2020-04-27T17:14:22.781045",
//   "is_deleted": false,
//   "api": "/app/ec/address/add",
//   "method": "post",
//   "api_name": "创建地址",
//   "tag": "['fe-app-address-地址管理']",
//   "params_type": "data",
//   "parameters": "{\"address\": {\"type\": \"string\"}, \"area_address\": {\"type\": \"string\"}, \"areacode\": {\"type\": \"integer\"}, \"id\": {\"type\": \"integer\"}, \"isup\": {\"type\": \"integer\"}, \"postcode\": {\"type\": \"string\"}, \"realname\": {\"type\": \"string\"}, \"tag\": {\"type\": \"integer\"}, \"tel\": {\"type\": \"string\"}, \"user_id\": {\"type\": \"integer\"}}",
//   "product": 3
// },
//   {
//     "id": 2,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.788912",
//     "is_deleted": false,
//     "api": "/app/ec/address/delete",
//     "method": "delete",
//     "api_name": "获取单个地址详情",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "data",
//     "parameters": "[{\"type\": \"model.ReqParam\", \"description\": \"ret\", \"name\": \"p\", \"in\": \"path\", \"required\": true}]",
//     "product": 3
//   },
//   {
//     "id": 3,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.798343",
//     "is_deleted": false,
//     "api": "/app/ec/address/detail",
//     "method": "get",
//     "api_name": "获取单个地址详情",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "params",
//     "parameters": "[{\"type\": \"model.ReqParam\", \"description\": \"ret\", \"name\": \"p\", \"in\": \"query\", \"required\": true}]",
//     "product": 3
//   },
//   {
//     "id": 4,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.850607",
//     "is_deleted": false,
//     "api": "/app/ec/address/edit",
//     "method": "post",
//     "api_name": "编辑地址",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "data",
//     "parameters": "{\"address\": {\"type\": \"string\"}, \"area_address\": {\"type\": \"string\"}, \"areacode\": {\"type\": \"integer\"}, \"id\": {\"type\": \"integer\"}, \"isup\": {\"type\": \"integer\"}, \"postcode\": {\"type\": \"string\"}, \"realname\": {\"type\": \"string\"}, \"tag\": {\"type\": \"integer\"}, \"tel\": {\"type\": \"string\"}, \"user_id\": {\"type\": \"integer\"}}",
//     "product": 3
//   },
//   {
//     "id": 5,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.858955",
//     "is_deleted": false,
//     "api": "/app/ec/address/list",
//     "method": "get",
//     "api_name": "获取地址列表",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "params",
//     "parameters": "[{\"type\": \"model.ReqParam\", \"description\": \"ret\", \"name\": \"p\", \"in\": \"query\", \"required\": true}]",
//     "product": 3
//   },
//   {
//     "id": 6,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.861629",
//     "is_deleted": false,
//     "api": "/app/ec/address/test",
//     "method": "get",
//     "api_name": "test",
//     "tag": "['fe-app-address-地址管理']",
//     "params_type": "params",
//     "parameters": "null",
//     "product": 3
//   },
//   {
//     "id": 7,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.872676",
//     "is_deleted": false,
//     "api": "/app/ec/evaluation/evaluate/add",
//     "method": "post",
//     "api_name": "添加评价",
//     "tag": "['fe-app-evaluation-商品评价模块']",
//     "params_type": "data",
//     "parameters": "{\"logistics_evaluate\": {\"description\": \"\物\流\评\价\", \"type\": \"object\", \"additionalProperties\": {\"$ref\": \"#/definitions/model.LogisticsEvaluateReq\"}}, \"order_comment\": {\"description\": \"\订\单\评\价\", \"type\": \"object\", \"additionalProperties\": {\"$ref\": \"#/definitions/model.OrderCommentReq\"}}, \"product_evaluate\": {\"description\": \"\商\品\评\价\", \"type\": \"array\", \"items\": {\"$ref\": \"#/definitions/model.ProductEvaluateReq\"}}}",
//     "product": 3
//   },
//   {
//     "id": 8,
//     "create_user": "",
//     "create_time": "2020-04-27T17:14:22.935051",
//     "is_deleted": false,
//     "api": "/app/ec/evaluation/evaluate/last",
//     "method": "get",
//     "api_name": "获取最后一条高分评价",
//     "tag": "['fe-app-evaluation-商品评价模块']",
//     "params_type": "params",
//     "parameters": "[{\"type\": \"integer\", \"description\": \"\商\品id\", \"name\": \"sid\", \"in\": \"query\", \"required\": true}]",
//     "product": 3
//   }]
// function toTreeData(data,pid){
//      function tree(id){
//        let arr = []
//        data.filter(item =>{
//           return item.product ==id
//        }).forEach(item => {
//           arr.push({
//             tag: item.tag,
//             label:item.api_name,
//             children: tree(item.tag)
//           })
//        })
//        return arr
//      }
//      return tree(pid)// 第一级节点的父id，是null或者0，视情况传入
//    }
// // toTreeData(data,0)
