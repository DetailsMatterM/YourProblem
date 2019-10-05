<template>
  <div class="users col-md">
    <h1>List of {{ users.length }} users</h1>
    <form action="/users">
      <label for="username">Username :</label>
      <input class="form-group" type="text" name="username" id="usernameId" />
      <label for="age">Age :</label>
      <input type="age" name="age" id="ageId" />
      <b-button type="button" class="form-group" @click="createUser()">Create User</b-button>
      <b-button type="button" class="form-group" @click="getUser('fredrik')">Get User</b-button>
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
          for (i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
              console.log(this.users[i].username)
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
      var username = document.getElementById('usernameId').value
      var age = document.getElementById('ageId').value
      var randomUser = {
        username: username,
        age: age
      }
      Api.post('/users', randomUser)
        .then(response => {
          this.users.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    },
    getRandomName() {
      var names = ['Mike', 'Fredrik', 'Moritz', 'Pete']
      var index = this.getRandomInt(names.length)
      return names[index]
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
