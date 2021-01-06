<template>
  <div class="main">
    <file-input class="input-comp"></file-input>

    <file-gallery></file-gallery>
  </div>
</template>

<script>
import FileGallery from './components/FileGallery.vue';
import FileInput from "./components/fileInput.vue";

export default {
  name: "App",
  components: {
    FileInput,
    FileGallery
  }
};
</script>

<style>
button{
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


.btn{
  outline: none;
  border: none;
  padding: 1em 1.5em;
  border-radius: .5em;
  transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn:hover{
  transform: scale(1.1);
}

.btn:active{
  transform: scale(0.9);
}
</style>
