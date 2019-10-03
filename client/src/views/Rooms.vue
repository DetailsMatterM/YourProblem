<template>
  <div class="rooms col-md">
    <div class="jumbotron">
      <h1>Browse Rooms</h1>
    </div>
    <b-list-group>
      <room-item v-for="room in rooms" :key="room._id" :room="room" @delete-room="deleteRoom"></room-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from "@/Api";
import RoomItem from "@/components/RoomItem";

export default {
  name: "Rooms",
  data() {
    return {
      rooms: []
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      Api.get("rooms")
        .then(response => {
          this.rooms = response.data.rooms;
        })
        .catch(error => {
          this.rooms = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    deleteRoom(id) {
      Api.delete(`/rooms/${id}`)
        .then(response => {
          console.log(response.data.message);
          var index = this.rooms.findIndex(room => room._id === id);
          this.rooms.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createRoom() {
      var name = document.getElementById("nameId").value;
      var randomRoom = {
        name: name
      };
      Api.post("/rooms", randomRoom)
        .then(response => {
          this.rooms.push(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  components: {
    RoomItem
  }
};
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
</style>
