import Mock,{ mock }from 'mockjs';
import data from './getData'
import userApi from './userData'
import permission from './permission'
Mock.mock('/api/get',data.getStatisticalData);

// Mock.mock(/api\/user\/getUser/,'get',user.getUserList);
Mock.mock(/api\/user\/getUser/, 'get', userApi.getUserList)
// 新增用户的接口
Mock.mock(/api\/user\/add/,'post',userApi.createUser)
//编辑用户接口
Mock.mock(/api\/user\/edit/,'post',userApi.updateUser)
//删除接口
Mock.mock(/api\/user\/delete/,'get',userApi.deleteUser)
//权限相关的
Mock.mock(/api\/user\/permission/,'post',permission.getMenu)