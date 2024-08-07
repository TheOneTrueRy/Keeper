<template>
  <div v-if="profile" class="container-fluid mb-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2 p-3">
        <img v-if="profile.coverImage" :src="profile.coverImage" :alt="`${profile.name}'s cover image.'`"
          :title="`${profile.name}'s cover image.'`" class="cover-image rounded border border-dark">
        <img v-else src="/broken-image.png" alt="" class="cover-image rounded border border-dark">
      </div>
      <div class="col-12 d-flex flex-column align-items-center justify-content-center translate-up">
        <div :style="{ backgroundImage: `url(${profile.picture})` }" :alt="profile.name"
          :title="`${profile.name}'s profile picture.'`"
          class="profile-picture border border-dark elevation-1 cover-center">
        </div>
        <span class="fs-2 pacifico">{{ profile.name }}</span>
        <div>
          <span>{{ vaults.length }} Vaults | {{ keeps.length }} Keeps</span>
        </div>
      </div>
      <div class="col-12 col-md-8 offset-md-2 mb-1">
        <span class="fs-1 fw-bold">Vaults</span>
      </div>
      <div class="col-12 col-md-8 offset-md-2">
        <i v-if="vaults.length == 0" class="fs-4">
          {{ profile.name }} currently has no vaults.
        </i>
        <div class="bricks">
          <div v-for="v in vaults" class="rounded hover-card">
            <VaultCard :vault="v" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 offset-md-2 mb-1 mt-4">
        <span class="fs-1 fw-bold">Keeps</span>
      </div>
      <div class="col-12 col-md-8 offset-md-2 mb-5">
        <i v-if="keeps.length == 0" class="fs-5">
          {{ profile.name }} currently has no keeps.
        </i>
        <div class="bricks">
          <div v-for="k in keeps" class="rounded hover-card">
            <KeepCard :keep="k" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";
import KeepCard from "../components/KeepCard.vue";
import VaultCard from "../components/VaultCard.vue";

export default {
  setup() {
    const route = useRoute();
    async function getUsersVaults(profileId) {
      try {
        await profilesService.getUsersVaults(profileId);
      }
      catch (error) {
        Pop.error(error.message, "[Getting Users Vaults]");
      }
    }
    async function getUsersKeeps(profileId) {
      try {
        await profilesService.getUsersKeeps(profileId);
      }
      catch (error) {
        Pop.error(error.message, "[Getting Users Keeps]");
      }
    }
    async function getProfile(profileId) {
      try {
        await profilesService.getProfile(profileId);
      }
      catch (error) {
        Pop.error(error.message, "[Getting Profile]");
      }
    }
    onMounted(() => {
      getProfile(route.params.profileId),
        getUsersKeeps(route.params.profileId),
        getUsersVaults(route.params.profileId);
    });
    onUnmounted(() => {
      AppState.profile = null
      AppState.keeps = []
    })
    return {
      profile: computed(() => AppState.profile),
      keeps: computed(() => AppState.keeps),
      vaults: computed(() => AppState.vaults)
    };
  },
  components: { KeepCard, VaultCard }
}
</script>


<style lang="scss" scoped>
.hover-card {
  transition: 0.5s;
}

.hover-card:hover {
  box-shadow: 0px 0px 10px rgb(157, 9, 226);
}

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

.pacifico {
  font-family: 'Pacifico', cursive;
}
</style>