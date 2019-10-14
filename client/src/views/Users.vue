<template>
  <div class="users col-md">
    <h1>List of {{ users.length }} users</h1>
    <form action="/users">
      <label for="username">Username :</label>
      <input v-model="username" placeholder="Enter a username" id="usernameId" />
      <label  for="age">Age :</label>
      <input v-model="age" placeholder="Enter your age" id="ageId" />
      <b-button type="button" class="form-group" @click="createUser()">Create User</b-button>
      <b-button type="button" class="form-group" @click="getUser()">Get User</b-button>
    </form>
    <b-list-group>
      <user-item v-for="user in users" :key="user._id" :user="user" @delete-user="deleteUser"></user-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem'

export default {
  name: 'Users',
  data() {
    return {
      username: '',
      age: '',
      users: []
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      Api.get('users')
        .then(reponse => {
          this.users = reponse.data.users
        })
        .catch(error => {
          this.users = []

          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    getUser(username) {
      Api.get('users')
        .then(reponse => {
          this.users = reponse.data.users
          var i
          console.log(username)
          for (i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
              console.log(this.users[i].username)
              this.$router.go()
              // return this.users[i] no idea if we need this
            }
          }
        })
        .catch(error => {
          this.users = []

          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteUser(id) {
      Api.delete(`/users/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.users.findIndex(user => user._id === id)
          this.users.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createUser() {
      var newUser = {
        username: this.username,
        age: this.age
      }
      Api.post('/users', newUser)
        .then(response => {
          this.users.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }

  },
  components: {
    UserItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.users {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
