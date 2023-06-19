<template>
  <div class="container-fluid mb-5 mt-2">
    <div class="bricks pb-5">
      <div v-for="k in keeps" class="hover-card rounded">
        <KeepCard :keep="k">
          <router-link :to="{ name: 'Profile', params: { profileId: k.creator.id } }" v-if="k.creator">
            <div :style="{ backgroundImage: `url(${k.creator.picture})` }" :alt="k.creator.name" :title="k.creator.name"
              class="creator-pfp border border-dark elevation-1 cover-center"
              onerror="this.backgroundImage='broken-image.png'"
              :class="[theme == 'light' ? 'border-dark' : 'border-light']">
            </div>
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
.hover-card {
  transition: 0.5s;
}

.hover-card:hover {
  box-shadow: 0px 0px 10px rgb(157, 9, 226);
}

.bricks {
  columns: 40vw;

  &>div {
    margin-bottom: 2em;
  }
}

@media screen and (min-width: 768px) {
  .bricks {
    columns: 20vw;

    &>div {
      margin-bottom: 1em;
    }
  }
}

.creator-pfp {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
