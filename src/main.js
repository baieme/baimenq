import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'//引入样式
import http from 'axios'
import './api/mock'
import { Container,Aside,Header,Main,Menu,Submenu,MenuItemGroup,MenuItem,Button,Dropdown,DropdownMenu,DropdownItem,Col,Row,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Dialog,Form,FormItem,Input,Select,DatePicker,Option,Pagination,Message,MessageBox} from 'element-ui'
Vue.config.productionTip = false
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col);
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input)
Vue.use(Select);
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Pagination)
// Vue.use(Message)
// Vue.use(MessageBox)


//使用axios
Vue.prototype.$http = http;
// 引入message,meddageBox.confim才能在后面使用 $message $confirm
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')
  let token = store.state.user.token
  console.log(1,token)
  // 过滤登录页，因为去登陆页不需要token(防止死循环)
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  created () {
    store.commit('addMenu', router)
  },
  render: h => h(App)
}).$mount('#app')
