<template>
  <div class="col-md">
    <div id="post">
      <h1>list of {{users.length}} users</h1>

      <h1>Create new post</h1>
      <b-container>
        <form class="postform" action="/posts">
          <b-form-input name="title" placeholder="Enter a title" id="titleId"></b-form-input>
          <b-textarea name="text" placeholder="Write your text" id="textId"></b-textarea>

          <input
            type="submit"
            id="postbtn"
            class="form-group btn-success btn-lg"
            @click="createPost()"
          />
        </form>
      </b-container>
    </div>
  </div>
</template>

<script>
import { Api } from "@/Api";
import UserItem from "@/components/UserItem";

export default {
  props: "users",
  name: "Posts",
  data() {
    return {
      posts: [],
      users: []
    };
  },
  mounted() {
    this.getPosts();
    this.getUsers();
  },
  methods: {
    getPosts() {
      Api.get("posts")
        .then(response => {
          this.posts = response.data.posts;
        })
        .catch(error => {
          this.posts = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    getUsers() {
      Api.get("users")
        .then(response => {
          this.users = response.data.users;
        })
        .catch(error => {
          this.users = [];
          console.log(error);
        })
        .then(() => {
          // This code is always executed (after success or error).
        });
    },
    getUser(id) {
      Api.get(`/users/${id}`)
        .then(response => {
          console.log(response.data.message);
          var index = this.users.findIndex(users => users._id === id);
          this.users = response.data.users;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletePost(id) {
      Api.delete(`/posts/${id}`)
        .then(response => {
          console.log(response.data.message);
          var index = this.posts.findIndex(post => post._id === id);
          this.posts.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createPost() {
      var title = document.getElementById("titleId").value;
      var text = document.getElementById("textId").value;
      var randomPost = {
        title: title,
        text: text
      };

      Api.post("/posts", randomPost)
        .then(response => {
          this.posts.push(response.data);
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    UserItem
  }
};
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
</style>
