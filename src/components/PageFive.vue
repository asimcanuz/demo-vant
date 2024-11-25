<template>
  <div class="page-five">
    <h1>Welcome to Page Five</h1>
    <p>This is a sample page component.</p>
  </div>
</template>

<script>
export default {
  name: "PageFive",
  data() {
    return {
      message: "Hello from Page Five!",
    };
  },
};
</script>

<style scoped>
.page-five {
  text-align: center;
}

.page-five h1 {
  color: #42b983;
}

.page-five p {
  font-size: 18px;
}
</style>
