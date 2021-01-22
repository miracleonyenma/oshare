<template>
    <transition-group class="bubble__cont" name="bubble-group" tag="aside">
        <article data-status="success" v-for="log in logs" v-bind:key="log.id" class="bubble bubble-group-item">
            <div class="bubble__content">
                <p>{{ log.message }}</p>
            </div>

            <button class="btn bubble__action" @click="removeNotif(log.id)" title="Remove this notification">
                <span>
                    &times;
                </span>
            </button>
        </article>
    </transition-group>
</template>

<script>
    export default {
        props: ["logs"],
        methods: {
            removeNotif(id) {
                console.log(id);
                let notifIndex = this.logs.findIndex(obj => {
                    return obj.id == id
                })
                console.log(notifIndex);

                this.$emit("remove-notif", notifIndex);
            }
        },
        mounted() {
            // console.log(logs)
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../src/scss/styles.scss";

    * {
        color: inherit;
    }

    .bubble {
        border-radius: $bRadius;
        position: relative;
        color: var(--bg);
        padding: 1em;
        margin: 0.5em 0;
        color: var(--bg);
        width: 100%;

        display: flex;
        align-items: center;
        gap: 1em;
        justify-content: space-between;

        max-width: calc(400px - (3em * 2));


        &[data-status="success"] {
            @include glass($main);
        }

        &-group {
            position: relative;

            &-item {
                transition: all 0.32s ease-out;
            }

            &-enter-to,
            &-leave-to {
                opacity: 0;
                transform: translateX(-70px);
            }

            &-leave-active {
                position: absolute !important;
            }

            &-enter-active,
            &-leave-active {
                transform: translateX(70px);
                opacity: 0;
            }
        }

        &__cont {
            position: fixed;
            bottom: 0;
            right: 0;
            padding: 3em;
            width: 400px;
            // display: flex;
            // flex-direction: column-reverse;
        }

        &__action {
            padding: 0.2rem 0.5rem;
            border-radius: $bRadius / 2;
            color: var(--dark);
            @include p(2);
        }
    }

    .list-complete {
        &-item {
            transition: all 0.32s ease-out;
        }

        &-enter,
        &-leave-to {
            opacity: 0;
            transform: translate(10px);
        }

        .list-complete-leave-active {
            position: absolute !important;
        }
    }
</style>