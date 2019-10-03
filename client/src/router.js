import Vue from 'vue'
import Router from 'vue-router'
import Users from './views/Users.vue'
import Posts from './views/Posts.vue'
import NewPost from './views/NewPost.vue'
import Rooms from './views/Rooms.vue'
import NewRoom from './views/NewRoom.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/NewPost',
      name: 'newPost',
      component: NewPost
    },
    {
      path: '/rooms',
      name: 'room',
      component: Rooms
    },
    {
      path: '/NewRoom',
      name: 'newRoom',
      component: NewRoom
    }
  ]
})
