<template>
  <b-list-group-item :style="{ title: room.name }">
    <h3>{{ room.name}}</h3>
    <div class = "postsInRoom">
      <b-list-group>
        <post-item v-for="post in posts" :key="post._id" :post="post" @delete-post="deletePost"></post-item>
      </b-list-group>
    </div>
    <b-button type="button" class="close" @click="$emit('delete-room', room._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>
import { Api } from '@/Api'
import PostItem from '@/components/PostItem'

export default {
  name: 'room-item',
  props: ['room'],
  postName: 'Posts',
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      Api.get('posts')
        .then(response => {
          this.posts = response.data.posts
        })
        .catch(error => {
          this.posts = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deletePost(id) {
      Api.delete(`/posts/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.posts.findIndex(post => post._id === id)
          this.posts.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createPost() {
      var title = document.getElementById('titleId').value
      var text = document.getElementById('textId').value
      var randomPost = {
        title: title,
        text: text
      }
      Api.post('/posts', randomPost)
        .then(response => {
          this.posts.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  components: {
    PostItem
  }
}
</script>
