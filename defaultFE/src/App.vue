<template>
  <div class="main bg">
    <div class="bg__bg-cont">
      <img class="bg__img" src="../public/static/img/big-alt.png" alt="bg">
    </div>
    <file-input class="input-comp" v-bind:url="url"></file-input>

    <file-gallery class="container" :filesData="files"></file-gallery>
  </div>
</template>

<script>
import axios from "axios";
import FileGallery from "./components/FileGallery.vue";
import FileInput from "./components/fileInput.vue";

export default {
  name: "App",
  components: {
    FileInput,
    FileGallery,
  },
  data() {
    return {
      url: process.env.VUE_APP_API_URL,
      files: [],
      data: {},
    };
  },
  methods: {},
  mounted() {
    axios.get(this.url + "/files").then((res) => {
      this.data = res.data;
      this.files = this.data.data;
      console.log(this.data.data);
    });
  },
};
</script>

<style lang="scss">
@import '../src/scss/styles.scss';

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}
ul{
  list-style-type: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

    .container {
        max-width: 100%;
        padding: 3em;
    }


.btn {
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
  outline: none;
  border: none;
  padding: 1em 1.5em;
  border-radius: 0.5em;
  transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
