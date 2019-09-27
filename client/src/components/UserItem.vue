<template>
  <b-list-group-item :style="{ color: user.username }">
    {{ user.username }}, {{ user.age }} years old
    <b-button type="button" class="close" @click="$emit('delete-user', user._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'user-item',
  props: ['user']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
