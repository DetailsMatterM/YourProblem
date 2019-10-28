<template>
  <div class="col-md">
    <div id="post">

      <h1>Create new post</h1>
      <b-container>
        <form class="postform" action="/posts">
          <b-form-input v-model="title" placeholder="Enter a title" id="titleId"></b-form-input>

          <b-form-select v-model="selectedUserId" :options="userOptions" id="userSelectId">
            <template>
              <option :value="null" disabled>
                -- please select a user --
              </option>
            </template>
          </b-form-select>

              <b-form-select v-model="selectedRoomId" :options="options" id="roomSelectId">
            <template>
              <option :value="null" disabled>
                -- please select a room to post in --
              </option>
            </template>
          </b-form-select>

          <b-textarea v-model="text" placeholder="Write your text" id="textId"></b-textarea>

          <input
            type="submit"
            id="postbtn"
            class="form-group btn-success btn-lg"
            @click.stop.prevent="createPost()"
          />
        </form>
      </b-container>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  props: ['users'],
  name: 'Posts',
  data() {
    return {
      title: '',
      text: '',
      selectedRoomId: null,
      selectedUserId: null,
      options: [],
      userOptions: [],
      posts: []
    }
  },
  mounted() {
    this.getUsers()
    this.getRooms()
  },
  methods: {
    getUsers() {
      Api.get('users')
        .then(response => {
          response.data.users.forEach(user => {
            this.userOptions.push({
              value: user._id,
              text: user.username
            })
          })
        })
        .catch(error => console.log(error))
    },
    getRooms() {
      Api.get('rooms')
        .then(response => {
          response.data.rooms.forEach(room => {
            this.options.push({
              value: room._id,
              text: room.name
            })
          })
        })
        .catch(error => console.log(error))
    },
    getUser(id) {
      Api.get(`/users/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.users.findIndex(user => user._id === id)
          this.users = response.data.users
        })
        .catch(error => {
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
    createPost() {
      var newPost = {
        title: this.title,
        text: this.text,
        roomId: this.selectedRoomId,
        userId: this.selectedUserId
      }
      Api.post(`/rooms/${this.selectedRoomId}`, newPost)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style >
h1 {
  margin-bottom: 2em;
}
#post {
  margin-top: 10em;
}
#postbtn {
  margin-top: 2em;
}
.postform {
  display: block;
}
#textId {
  margin: auto;
  margin-top: 10px;
  /* width: 30em;
  height: 10em; */
}
#titleId {
  width: 30em;
  margin: auto;
}
#usernameId {
  width: 30em;
  margin: auto;
}
#userSelectId{
  display: block;
  width: 30em;
 margin: auto;
 margin-top: 0.2em;
}
#roomSelectId {
  width: 30em;
  margin: auto;
  margin-top: 0.2em;
}
</style>
