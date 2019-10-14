<template>
  <div class="posts col-md">
    <div class="jumbotron">
      <h1>What's New ?</h1>
    </div>
    <b-button type="button" @click="deleteAll()">Delete All</b-button>
    <b-list-group>
      <post-item
        v-for="post in posts"
        :key="post._id"
        :post="post"
        @edit-post="editPost"
        @delete-post="deletePost"
      ></post-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api';
import PostItem from '@/components/PostItem';

export default {
  name: 'Posts',
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
    deleteAll() {
      Api.delete('/posts').then(() => {
        this.$router.go()
      })
    },
    editPost(id) {
      Api.patch(`/posts/${id}`)
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

<style >
.posts {
  align-content: center;
  padding: 0em 20em 0em 20em;
}
#postbtn {
  margin-left: 2em;
}
.postform {
  display: block;
}
#textId {
  width: 30em;
  height: 10em;
}
</style>
