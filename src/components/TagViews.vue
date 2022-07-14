<template>
  <div class="chip">
    {{ tag.name }}
      <i @click="$emit('on-delete-tag', tag.id)" class="close material-icons">close</i>
  </div>
</template>
<script>
export default {
  props: ["tag"]
};
</script>
<style scoped>
button {
  font-family: inherit;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>