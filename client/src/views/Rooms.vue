<template>
  <div class="rooms col-md">
    <div class="jumbotron">
      <h1>Browse Rooms</h1>
    </div>
    <form action="/rooms" id="findRoom">
      <input v-model="roomName" placeholder="Enter a room's name" id="roomNameId" />
      <b-button class="form-group" @click="getRoom()">Search Room</b-button>
    </form>
    <b-button class="deleteButton" @click="deleteAll()">Delete All</b-button>
    <b-list-group>
      <room-item v-for="room in rooms" :key="room._id" :room="room" @delete-room="deleteRoom"></room-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import RoomItem from '@/components/RoomItem'

export default {
  name: 'Rooms',
  data() {
    return {
      roomName: '',
      rooms: []
    }
  },
  mounted() {
    this.getRooms()
  },
  methods: {
    getRooms() {
      Api.get('rooms')
        .then(response => {
          this.rooms = response.data.rooms
        })
        .catch(error => {
          this.rooms = []
          console.log(error)
        })
    },
    getRoom() {
      this.$router.push('FoundRoom')
    },
    // getRoom() {
    //   Api.get('rooms')
    //     .then(response => {
    //       this.rooms = response.data.rooms
    //     })
    //     .catch(error => {
    //       this.rooms = []
    //       console.log(error)
    //     })
    //   var foundRoomId
    //   for (var i = 0; i < this.rooms.length; i++) {
    //     if (this.rooms[i].name === this.roomName) {
    //       console.log(this.rooms[i]._id)
    //       foundRoomId = this.rooms[i]._id
    //     }
    //   }
    //   Api.get(`/rooms/${foundRoomId}`)
    //     .then(response => {
    //       console.log('success' + response.data.name)
    //       this.roomName = response
    //       console.log('success2' + this.rooms)
    //     })
    // },
    deleteRoom(id) {
      Api.delete(`/rooms/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.rooms.findIndex(room => room._id === id)
          this.rooms.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteAll() {
      Api.delete('/rooms').then(() => {
        this.$router.go()
      })
    },
    createRoom() {
      var name = document.getElementById('nameId').value
      var randomRoom = {
        name: name
      }
      Api.post('/rooms', randomRoom)
        .then(response => {
          this.rooms.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  components: {
    RoomItem
  }
}
</script>

<style >
.rooms {
  align-content: center;
  padding: 0em 20em 0em 20em;
}
#roombtn {
  margin-left: 2em;
}
.postform {
  display: block;
}
#textId {
  width: 30em;
  height: 10em;
}
#findRoom {
  display: block
}
</style>
