<template>
  <b-list-group-item :style="{ title: post.title }">
    <div class="useravatar">
      <img alt="Avatar" src="../assets/duckie.jpeg" />
    </div>
    <h3>{{ post.title}}</h3>
    {{ post.text }}
    <b-button type="button" class="close" @click="$emit('delete-post', post._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>
export default {
  name: "post-item",
  props: ["post"]
};
</script>

<style >
img {
  width: 40px;
}
.useravatar {
  float: left;
}
</style>
