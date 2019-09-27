<template>
  <div class>
    <h1>Create new post</h1>

    <div>
      <b-container>
        <form class="postform" action="/posts">
          <b-form-input name="title" placeholder="Enter a title" id="titleId"></b-form-input>
          <b-form-input name="text" placeholder="Write your text" id="textId"></b-form-input>

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
import PostItem from "@/components/PostItem";

export default {
  name: "Posts",
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getPosts();
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
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  components: {
    PostItem
  }
};
</script>

<style >
.posts {
  align-content: center;
  padding: 0em 20em 0em 20em;
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
  width: 30em;
  height: 10em;
}
#titleId {
  width: 30em;
  margin: auto;
}
</style>
