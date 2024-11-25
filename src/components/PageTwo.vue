<template>
  <div class="page2">
    <h1>Welcome to Page 2</h1>
    <p>This is a sample Vue component.</p>
  </div>
</template>

<script>
export default {
  name: "PageTwo",
  data() {
    return {
      message: "Hello from Page 2!",
    };
  },
};
</script>

<style scoped>
.page2 {
  text-align: center;
}
</style>
