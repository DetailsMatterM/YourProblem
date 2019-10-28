<template>
  <b-list-group-item :style="{ title: room.name }">
    <b-button type="button" class="close" @click="$emit('delete-room', room._id)">&times;</b-button>
    <h3>{{ room.name}}</h3>
    <b-button type="button" @click="resetRoom()">Reset</b-button>    
    <div class = "postsInRoom">
      <b-list-group>
        <post-item v-for="post in posts" :key="post._id" :post="post" @delete-post="deletePost"></post-item>
      </b-list-group>
    </div>
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
      this.posts = this.room.posts;    
    },
    deletePost(id) {
      Api.delete(`/posts/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.posts.findIndex(post => post._id === id)
          this.posts.splice(index, 1)
          Api.patch(`/rooms/${this.room._id}`, this.posts);
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetRoom() {
      Api.put(`/rooms/${this.room._id}`, {
        name: this.room.name,
        users: [],
        posts: []
      }).then(response => {
        this.$router.go();
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
