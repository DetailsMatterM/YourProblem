<template>
  <div class="rooms col-md">
    <div class="jumbotron">
      <h1>Search for a Rooms</h1>
    </div>
    <room-item {{foundRoom.name}}></room-item>
{{foundRoom.name}}
    <form action="/rooms" id="findRoom">
      <input v-model="roomName" placeholder="Enter a room's name" id="roomNameId" />
      <b-button class="form-group" @click="getRoom()">Search Room</b-button>
    </form>
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
      rooms: [],
      foundRoom: ''
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
      var foundRoomId
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].name === this.roomName) {
          console.log(this.rooms[i]._id)
          foundRoomId = this.rooms[i]._id
        }
      }
      console.log(foundRoomId)
      Api.get(`/rooms/${foundRoomId}`)
        .then(response => {
          this.foundRoom = response.data
        })
    }
  },

  components: {
    RoomItem
  }
}
</script>

<style >
#findRoom {
  display: block
}
</style>
