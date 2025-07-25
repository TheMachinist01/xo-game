<script setup>

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const turn = computed(() => store.state.turn);
const scores = computed(() => store.state.scores);

</script>

<template>
    <div class="scoreboard">
        <ul :class="{ turn: turn === 'X' }">
            <li>X</li>
            <li>{{ scores.X }}</li>
        </ul>
        <ul :class="{ turn: turn === 'O' }">
            <li>O</li>
            <li>{{ scores.O }}</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.scoreboard {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 15px;
    width: 100%;

    ul {
        background-color: $color-accent;
        border-radius: $border-radius;
        list-style-type: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 20px;
        position: relative;

        &::before {
            content: "";
            width: 4px;
            height: 0;
            background-color: $color-text;
            border-radius: $border-radius;
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
        }

        &.turn::before {
            height: 40px;
        }

        li {
            font-size: 3.8rem;
            font-weight: bold;
        }

        &:first-child li:first-child {
            color: $color-secondary;
        }

        &:last-child li:first-child {
            color: $color-primary;
        }
    }

    @media screen and (max-width:990px) {
        gap: 10px;

        ul {
            padding: 5px 20px;

            &.turn::before {
                height: 30px;
            }

            li {
                font-size: 3rem;
            }
        }
    }

    @media screen and (max-width:768px) {
        gap: 5px;

        ul {
            padding: 10px 20px;

            &.turn::before {
                height: 25px;
            }

            li {
                font-size: 36px;
            }
        }
    }

    @media screen and (max-width:545px) {
        grid-template-rows: 1fr;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;

        ul {
            &::before {
                width: 0px;
                height: 4px;
                left: 50%;
                top: auto;
                bottom: 5px;
                transform: translateX(-50%);
            }

            &.turn::before {
                width: 30px;
                height: 4px;
            }

            &:last-child{
                flex-direction: row-reverse;
            }
        }
    }
}
</style>