<template>
  <b-list-group-item :style="{ color: user.username }">
    {{ user.username }}, {{ user.age }} years old
    <b-button type="button" class="close" @click="$emit('delete-user', user._id)">&times;</b-button>
    <b-button type="button" @click="$emit('create-post', user._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>
import UserItem from '@/components/UserItem'

export default {
  name: 'user-item',
  props: ['user']
}

components: {
  UserItem
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
