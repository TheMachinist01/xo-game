<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const ended = computed(() => store.state.gameStatus !== 'playing')

</script>

<template>
    <div class="menu">
        <template v-if="!store.state.play">
            <button @click="store.commit('startGame')" v-ripple type="button" class="btn"
                :class="{ pointer: !ended }">Play</button>
            <a href="https://github.com/TheMachinist01/xo-game" target="_blank" v-ripple="{ bgColor: '#E4F1EB' }" type="button"
                class="btn quit">Built by TheMachinist01</a>
        </template>
        <template v-else>
            <button v-ripple @click="store.commit('resetBoard')" type="button" class="btn again"
                :class="{ pointer: ended }">Again</button>
            <button v-ripple="{ bgColor: '#F45D52' }" @click="store.dispatch('resetGame')" type="button"
                class="btn reset">Reset</button>
            <button v-ripple="{ bgColor: '#E4F1EB' }" @click="store.dispatch('quit')" type="button"
                class="btn quit">Quit</button>
        </template>
    </div>
</template>

<style scoped lang="scss">
.menu {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    @media screen and (max-width:990px) {
        gap: 10px;
    }

    @media screen and (max-width:768px) {
        gap: 5px;
    }

    @media screen and (max-width:545px) {
        flex-direction: row;
        gap: 10px;
    }
}

.btn {
    text-align: center;
    outline: none;
    border: none;
    background-color: $color-primary;
    color: $color-text;
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px 0;
    border-radius: $border-radius;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    &.pointer {
        animation: pointing 600ms alternate infinite;

        @keyframes pointing {
            from {
                box-shadow: 0 0 0 4px rgba($color-primary, 0.4);
            }

            to {
                box-shadow: 0 0 0 8px rgba($color-primary, 0.4);
            }
        }
    }

    &.reset {
        background-color: $color-secondary;
    }

    &.quit {
        background-color: $color-text;
        color: $color-background;
    }

    @media screen and (max-width:990px) {
        font-size: 20px;
        padding: 16px 0;

        &.pointer {

            @keyframes pointing {
                from {
                    box-shadow: 0 0 0 2px rgba($color-primary, 0.4);
                }

                to {
                    box-shadow: 0 0 0 6px rgba($color-primary, 0.4);
                }
            }
        }
    }

    @media screen and (max-width:768px) {
        font-size: 18px;
        padding: 15px 0;

        &.pointer {

            @keyframes pointing {
                from {
                    box-shadow: 0 0 0 1px rgba($color-primary, 0.4);
                }

                to {
                    box-shadow: 0 0 0 4px rgba($color-primary, 0.4);
                }
            }
        }
    }

    @media screen and (max-width:545px) {
        font-size: 16px;
    }
}
</style>