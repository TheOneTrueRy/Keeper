<template>
  <div v-if="profile" class="container-fluid">
    <div class="row">
      <div class="col-8 offset-2 p-2">
        <img v-if="profile.coverImg" :src="profile.coverImg" :alt="`${profile.name}'s cover image.'`"
          :title="`${profile.name}'s cover image.'`" class="cover-image rounded border border-dark">
        <img v-else src="Public\broken-image.png" alt="" class="cover-image rounded border border-dark">
      </div>
      <div class="col-12 d-flex align-items-center justify-content-center translate-up">
        <img :src="profile.picture" :alt="profile.name" :title="`${profile.name}'s profile picture.'`"
          class="profile-picture border border-dark elevation-1">
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";

export default {
  setup() {
    const route = useRoute()

    async function getProfile(profileId) {
      try {
        await profilesService.getProfile(profileId)
      } catch (error) {
        Pop.error(error.message, '[Getting Profile]')
      }
    }

    onMounted(() => {
      getProfile(route.params.profileId)
    })

    return {
      profile: computed(() => AppState.profile)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-image {
  height: 30vh;
  width: 100%;
  object-fit: cover;
}

.profile-picture {
  border-radius: 50%;
  height: 15vh;
  width: 15vh;
}

.translate-up {
  transform: translateY(-9vh);
}
</style>