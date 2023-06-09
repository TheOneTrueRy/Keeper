<template>
  <div v-if="profile" class="container-fluid mb-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2 p-3">
        <img v-if="profile.coverImage" :src="profile.coverImage" :alt="`${profile.name}'s cover image.'`"
          :title="`${profile.name}'s cover image.`" class="cover-image rounded border border-dark"
          onerror="this.src='broken-image.png'">
      </div>
      <div class="col-4 offset-4 d-flex flex-column align-items-center justify-content-center"
        :class="profile.coverImage ? 'translate-up' : ''">
        <div :style="{ backgroundImage: `url(${profile.picture})` }" :alt="profile.name"
          :title="`${profile.name}'s profile picture.'`"
          class="profile-picture border border-dark elevation-1 cover-center">
        </div>
        <span class="fs-2 pacifico">{{ profile.name }}</span>
        <div>
          <span>{{ vaults.length }} Vaults | {{ keeps.length }} Keeps</span>
        </div>
      </div>
      <div class="col-2">
        <button class="btn" title="Edit Your Account Details" data-bs-toggle="modal" data-bs-target="#accountForm"
          :class="[theme == 'light' ? 'btn-dark' : 'btn-light']">
          <span><i class="mdi mdi-pencil"></i></span>
        </button>
      </div>
      <div class="col-12 col-md-8 offset-md-2">
        <span class="fs-2 fw-bold">Vaults</span>
      </div>
      <div v-if="vaults.length == 0" class="col-12 col-md-8 offset-md-2 text-center mb-5">
        <span class="fs-3">
          No Vaults Yet
        </span>
      </div>
      <div class="col-12 col-md-8 offset-md-2">
        <div class="bricks">
          <div v-for="v in vaults" class="rounded hover-card">
            <VaultCard :vault="v" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 offset-md-2">
        <span class="fs-2 fw-bold">Keeps</span>
      </div>
      <div v-if="keeps.length == 0" class="col-12 col-md-8 offset-md-2 text-center">
        <span class="fs-3">
          No Keeps Yet
        </span>
      </div>
      <div class="col-12 col-md-8 offset-md-2 mb-5">
        <div class="bricks">
          <div v-for="k in keeps" class="rounded hover-card">
            <KeepCard :keep="k" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="accountForm">
    <AccountForm />
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { watchEffect } from "vue";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";
import KeepCard from "../components/KeepCard.vue";
import VaultCard from "../components/VaultCard.vue";
import Modal from "../components/Modal.vue";
import { vaultsService } from "../services/VaultsService.js";

export default {
  setup() {
    async function getUsersKeeps(profileId) {
      try {
        await profilesService.getUsersKeeps(profileId);
      }
      catch (error) {
        Pop.error(error.message, "[Getting Users Keeps]");
      }
    }
    async function getMyVaults() {
      try {
        await vaultsService.getMyVaults()
      } catch (error) {
        Pop.error(error.message, '[Getting My Vaults]')
      }
    }
    watchEffect(() => {
      if (AppState.account.id) {
        getUsersKeeps(AppState.account.id)
        getMyVaults()
      }
    });
    return {
      profile: computed(() => AppState.account),
      keeps: computed(() => AppState.keeps),
      vaults: computed(() => AppState.myVaults),
      theme: computed(() => AppState.theme)
    };
  },
  components: { KeepCard, VaultCard, Modal }
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
  height: 35vh;
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