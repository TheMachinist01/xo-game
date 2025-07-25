<script setup>
import BoardComponent from '@/components/BoardComponent.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import GameControl from '@/components/GameControl.vue'

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const play = computed(() => store.state.play);

</script>

<template>
  <h1>XO Game <a href="https://github.com/TheMachinist01/xo-game" target="_blank">
      <img src="https://img.shields.io/github/stars/TheMachinist01/xo-game?style=social" alt="GitHub stars" />
    </a></h1>
  <div class="content" :class="{ 'full-width': !play }">
    <BoardComponent v-if="play" />
    <div class="control">
      <ScoreBoard v-if="play" />
      <GameControl />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  gap: 20px;

  @media screen and (min-width:545px) {
    &.full-width {
      grid-template-columns: 1fr;

      .control .menu {
        flex-direction: row;
      }
    }
  }

  @media screen and (max-width:990px) {
    gap: 10px;
  }

  @media screen and (max-width:545px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);

    &.full-width {
      .control .menu {
        flex-direction: column;
      }
    }
  }
}

.control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width:768px) {
    gap: 5px;
  }

  @media screen and (max-width:545px) {
    justify-content: flex-start;
    gap: 10px;
  }
}
</style>
