import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { name, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    if (name === 'admin' || name === 'xiaoxiao') {
      // 判断账号和密码是否对应
      if (name === 'admin' && password === 'admin') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'home/home'
              },
              {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'mall/mall'
              },
              {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'user/user'
              },
              {
                label: '其他',
                icon: 'location',
                children: [
                  {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Other/PageOne'
                  },
                  {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Other/PageTwo'
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (name === 'xiaoxiao' &&  password === 'xiaoxiao') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'home/home'
              },
              {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'mall/mall'
              },
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}