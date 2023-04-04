<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 offset-3 p-2">
        <div class="rounded vault-bg d-flex align-items-center justify-content-end flex-column pb-2 text-light"
          :style="{ backgroundImage: `url(${vault.img})` }">
          <span class="vault-title text-shadow fw-bold">{{ vault.name }}</span>
          <span class="text-shadow">by {{ vault.creator.name }}</span>
        </div>
      </div>
    </div>
    <div v-if="account.id == vault.creator.id" class="row">
      <div class="col-6 offset-3 px-2">
        <div class="w-100 d-flex align-items-center justify-content-end">
          <button class="btn btn-danger">
            <span>Delete <i class="mdi mdi-delete"></i></span>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 px-2 mt-1 d-flex justify-content-center align-items-center">
        <span class="bg-primary px-2 py-1 rounded-pill fs-5">{{ keeps.length }} Keeps</span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-8 offset-2">
        <div class="bricks">
          <div v-for="k in keeps">
            <KeepCard :keep="k" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, onUnmounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { useRoute, useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { vaultsService } from "../services/VaultsService.js";
import KeepCard from "../components/KeepCard.vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    async function getVault(vaultId) {
      try {
        await vaultsService.getVault(vaultId);
      }
      catch (error) {
        Pop.error(error.message, "[Get Vault]");
        router.push({ name: "Home" });
      }
    }
    async function getKeepsInVault(vaultId) {
      try {
        await vaultsService.getKeepsInVault(vaultId);
      }
      catch (error) {
        Pop.error(error.message, "[Getting Keeps In Vault]");
      }
    }
    watchEffect(() => {
      if (route.params.vaultId) {
        getVault(route.params.vaultId);
        getKeepsInVault(route.params.vaultId);
      }
    });
    onUnmounted(() => {
      AppState.keeps = []
    })
    return {
      vault: computed(() => AppState.vault),
      account: computed(() => AppState.account),
      keeps: computed(() => AppState.keeps)
    };
  },
  components: { KeepCard }
}
</script>


<style lang="scss" scoped>
.vault-bg {
  height: 25vh;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.vault-title {
  font-family: 'Times New Roman', Times, serif;
  font-size: 3em;
}

.text-shadow {
  text-shadow: 1px 1px 0 black;
}

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
</style>