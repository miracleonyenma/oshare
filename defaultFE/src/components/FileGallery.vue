<template>
    <section>
        <ul class="file-gallery">
            <li class="file-gallery__item file glass glass--bg" v-for="file in filesData" v-bind:key="file.id">
                <header class="file__header">
                    <figure class="file__media">
                        <img :src="file.thumb" alt="file" class="file__thumb">
                    </figure>
                    <h1 class="file__caption">
                        {{ file.name }}
                    </h1>
                </header>

                <ul class="file__options">
                    <li class="file__option">
                        <a :href="file.url" target="_blank" download>
                            <button class="btn btn--min glass glass--bg pad--y-1-em pad--x-2-em">
                                <span>
                                    Download
                                </span>
                            </button>
                        </a>
                    </li>
                    <li class="file__option">
                        <button class="btn btn--min glass glass--bg pad--y-1-em pad--x-2-em">
                            <span>
                                Delete
                            </span>
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        props: {
            filesData: Array,
        },

        data() {
            return {};
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../src/scss/styles.scss";

    .file-gallery {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        gap: 1em;

        &__item {
            padding: 0.5em;
            // background: var(--main);
            // color: var(--bg);
            border-radius: $bRadius;
            // box-shadow: 6px 6px 12px var(--main-trans);
        }
    }

    ;

    .file {
        max-width: 350px;
        position: relative;

        &__header {
            display: flex;
            align-items: center;
            gap: .5em;
        }

        &__media {
            height: 50px;
            width: 50px;
            min-width: 50px;
            border-radius: $bRadius / 2;
            overflow: hidden;

            img {
                width: 100%;
            }
        }

        &__caption {
            @include p(1)
        }

        &__options {
            display: flex;
            gap: .5em;
            padding-top: .5em;
        }


    }
</style>