<template>
  <div class="container-fluid">
    <div class="bricks">
      <div v-for="k in keeps" class="">
        <KeepCard :keep="k">
          <router-link :to="{ name: 'Profile', params: { profileId: k.creator.id } }" v-if="k.creator">
            <img :src="k.creator.picture" :alt="k.creator.name" :title="k.creator.name"
              class="creator-pfp border elevation-1" onerror="this.src='broken-image.png'"
              :class="[theme == 'light' ? 'border-dark' : 'border-light']">
          </router-link>
        </KeepCard>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import KeepCard from "../components/KeepCard.vue";
import { onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { keepsService } from "../services/KeepsService.js";

export default {
  setup() {

    async function getAllKeeps() {
      try {
        await keepsService.getAllKeeps()
      } catch (error) {
        Pop.error(error.message, '[Getting All Keeps]')
      }
    }

    onMounted(() => {
      getAllKeeps()
    })

    return {
      keeps: computed(() => AppState.keeps),
      theme: computed(() => AppState.theme)
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
      margin-top: 1em;
    }
  }
}

.creator-pfp {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
