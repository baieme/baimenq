import Cookie from "js-cookie";
export default {
    state: {
        isCollapse: false,
        currentMenu: null,
        menu: [],
        toolList: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home/home.vue')
            }
        ]
    },
    mutations: {
        //进行menu的设置,
        setMenu(state, val) {
            //给cookie设置menu
            Cookie.set('menu', JSON.stringify(val));
            //给vuex设置menu
            state.menu = val
            console.log(1)
        },
        //对menu进行删除
        removeMenu(state) {
            //给cookie删除menu
            Cookie.remove('menu')
            //给vuexs删除menu
            state.menu.length = 0;
        },
        addMenu(state, val) {
            if (!Cookie.get('menu')) {
                return
            }
            let menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu;
            console.log(menu)
            let currentMenu = [
                {
                    path: '/',
                    component: () => import(`@/views/Main.vue`),
                    children: []
                }
            ]
            
                menu.forEach(item => {
                    if (item.children) {
                        item.children = item.children.map(item => {
                            item.component = () => import(`@/views/${item.url}`)
                            return item
                        })
                        currentMenu[0].children.push(...item.children)
                    } else {
                        item.component = () => import(`@/views/${item.url}`)
                        currentMenu[0].children.push(item)
                    }
                })
            
            console.log(currentMenu)
            val.addRoutes(currentMenu)
        },
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },

        setTooList(state, val) {
            val.name === 'home' ? state.currentMenu = null : state.currentMenu = val;
            //进行判断toolList中是否含有val
            if (state.toolList.findIndex(el => el.name === val.name) === -1) {
                state.toolList.push(val)
            }
        },
        //将准备删除的tag从toolList中删除
        closeTag(state, val) {
            let index = state.toolList.findIndex(el => el.name === val.name);
            state.toolList.splice(index, 1)
        },
        //获取menu
        getMenu (state) {
            if (Cookie.get('tagList')) {
              let tagList = JSON.parse(Cookie.get('tagList'))
              state.tabsList = tagList
            }
          },

    },
    actions: {
    },
    modules: {
    }
}