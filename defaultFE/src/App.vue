<template>
  <div class="main bg">
    <div class="bg__bg-cont">
      <img class="bg__img" src="../public/static/img/big-alt.png" alt="bg">
    </div>
    <file-input class="input-comp" v-bind:url="url" :logs="logs" v-on:update-log="logUpdate" v-on:update-files="files = getFiles($event)"></file-input>

    <file-gallery class="container" :filesData="files"></file-gallery>

    <notif-bubble :logs="logs" v-on:remove-notif="removeNotif"></notif-bubble>
  </div>
</template>

<script>
import axios from "axios";
import FileGallery from "./components/FileGallery.vue";
import FileInput from "./components/fileInput.vue";
import NotifBubble from "./components/notifBubble";

export default {
  name: "App",
  components: {
    FileInput,
    FileGallery,
    NotifBubble
  },
  data() {
    return {
      url: process.env.VUE_APP_API_URL,
      files: [],
      data: {},
      logs: [
        {
          id : Math.floor(Math.random() * 9999999) + Math.floor(Math.random() * 99),
          status: "success",
          message: "app mounted successfully"
        }
      ]
    };
  },
  methods: {
    randomInt(){
      return Math.floor(Math.random() * 9999999) + Math.floor(Math.random() * 99);
    },

    logUpdate(data){
      data.id = this.randomInt();
      this.logs.push(data);
    },

    removeNotif(id){
      // splice(array position, number of elements to remove)
      this.logs.splice(id, 1);

    },

    getFiles(data){
      let {files, thumbs} = data;
      let filesData = [];

      console.log(data);

      files.forEach(file => {
        let filethumb = thumbs.find((thumb)=>{
          return thumb == file
        });

        filesData.push({
          id: this.randomInt(),
          name: file,
          url: `${this.url}/static/${file}`,
          thumb: `${this.url}/static/thumb/${filethumb}`
        });
      });
      console.log(filesData);
      return filesData
    }
  },
  watch : {
    logs(){
      console.log(this.logs);
    }
  },
  mounted() {
    axios.get(this.url + "/files").then((res) => {
      this.data = res.data;
      // console.log(res.data)
      // this.files = this.data.data;
      // console.log(this.data.data);

      this.logUpdate(this.data);

      this.files = this.getFiles(res.data.data);
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
  color: var(--dark);
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

  &--min{
    padding: unset;
  }

  outline: none;
  border: none;
  padding: 1em 1.5em;
  border-radius: $bRadius / 2;
  transition: all 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
