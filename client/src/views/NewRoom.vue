<template>
  <div class="col-md">
    <div id="room">
      <h1>Create new room</h1>

      <b-container>
        <form class="postform" action="/rooms">
          <b-form-input name="name" placeholder="Enter a room name" id="nameId"></b-form-input>

          <input
            type="submit"
            id="roombtn"
            class="form-group btn-success btn-lg"
            @click="createRoom()"
          />
        </form>
      </b-container>
    </div>
  </div>
</template>

<script>
import { Api } from "@/Api";

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
  }
};
</script>

<style >
h1 {
  margin-bottom: 2em;
}
#room {
  margin-top: 10em;
}
#roombtn {
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
</style>
