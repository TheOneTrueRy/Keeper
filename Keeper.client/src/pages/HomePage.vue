<template>
  <div class="container-fluid">
    <div class="bricks">
      <div v-for="k in keeps">
        <KeepCard :keep="k" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import KeepCard from "../components/KeepCard.vue";

export default {
  setup() {
    return {
      keeps: computed(() => AppState.keeps)
    };
  },
  components: { KeepCard }
}
</script>

<style scoped lang="scss">
.bricks {
  columns: 2;

  &>div {
    margin-top: 2em;
  }
}

@media screen and (min-width: 768px) {
  .bricks {
    columns: 4;

    &>div {
      margin-top: 2em;
    }
  }
}
</style>
