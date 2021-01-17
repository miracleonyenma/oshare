<template>
  <section>
      <ul class="file-gallery">
          <li class="file-gallery__item glass glass--main-2" v-for="(file, i) in filesData" v-bind:key="file[i]">
              {{ file }}
          </li>
      </ul>
  </section>
</template>

<script>
export default {
    props: {
        filesData : Array
    },

    data(){
        return {

        }
    }

}
</script>

<style lang="scss" scoped>
    .file-gallery{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        gap: 1em;


        &__item{
            padding: 1em;
            // background: var(--main);
            color: var(--bg);
            border-radius: 5px;
            // box-shadow: 6px 6px 12px var(--main-trans);
        }
    }
</style>