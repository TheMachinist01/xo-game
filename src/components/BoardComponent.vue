<script setup>

import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const board = computed(() => store.state.board);
const turn = computed(() => store.state.turn);
const playing = computed(() => store.state.gameStatus === 'playing')
const bgColor = computed(() => {
    return turn.value === 'X' ? '#F24236' : '#43AA8B';
})

const squareRipple = reactive(
    {
        bgColor: bgColor,
        duration: '450ms',
        expand: 2,
        opacity: 1,
        remain: true,
        disabled: computed(() => !playing.value)
    }
);


const move = (row, col) => {
    if (playing.value) {
        if (board.value[row][col] === '') {
            store.commit('setMove', { row, col });
        }
    }
}


</script>

<template>
    <div class="board" :class="{ disabled: !playing }">
        <div class="row" v-for="(row, i) in board">
            <div v-ripple="squareRipple" v-text="board[i][j]" v-for="(col, j) in row" @click="move(i, j)"
                class="square">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.board {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    width: 100%;
    aspect-ratio: 1/1;
    border: $table-border;
    border-radius: $border-radius;
    overflow: hidden;

    &.disabled{
        opacity: 0.8;
    }

    .row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 100%;
        border-bottom: $table-border;

        &:last-child {
            border-bottom: none;
        }

        .square {
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1/1;
            position: relative;
            overflow: hidden;
            font-size: 7rem;
            font-weight: bold;
            border-right: $table-border;
            $ripple-bg: $color-primary;
            cursor: pointer;

            &:last-child {
                border-right: none;
            }
        }
    }

    @media screen and (max-width:990px) {
        .row .square{
            font-size: 5rem;
        }
    }

    @media screen and (max-width:768px) {
        .row .square{
            font-size: 4rem;
        }
    }

    @media screen and (max-width:545px){
        .row .square{
            font-size: 4rem;
        }
    }

    @media screen and (max-width:480px){
        .row .square{
            font-size: 3.5rem;
        }
    }
}
</style>