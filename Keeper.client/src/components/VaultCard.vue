<template>
  <div class="border border-1 rounded elevation-2" :class="[theme == 'light' ? 'border-dark' : 'border-light']">
    <router-link :to="{ name: 'Vault', params: { vaultId: vault.id } }">
      <img :src="vault.img" :alt="vault.name" :title="vault.name" class="rounded img-fluid selectable bing"
        onerror="this.src='broken-image.png'" @click="setVault(vault.id)">
    </router-link>
    <div class="d-flex justify-content-start align-items-center p-1 bong">
      <router-link :to="{ name: 'Vault', params: { vaultId: vault.id } }" class="hover text-light">
        <span class="fs-4 text-shadow clip-text" @click="setVault(vault.id)">{{ vault.name
        }}</span>
      </router-link>
      <span v-if="vault.isPrivate" class="text-danger pt-1 ps-2"><i class="mdi mdi-lock"></i></span>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { vaultsService } from "../services/VaultsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    vault: { type: Object, required: true }
  },
  setup() {
    return {
      async setVault(vaultId) {
        try {
          await vaultsService.setVault(vaultId)
        } catch (error) {
          Pop.error(error.message, '[Setting Vault]')
        }
      },
      theme: computed(() => AppState.theme)
    }
  }
}
</script>


<style lang="scss" scoped>
.hover {
  transition: 0.4s;
  cursor: pointer;
}

.hover:hover {
  transform: scale(1.02);
}

.bing {
  position: relative;
}

.bong {
  position: absolute;
  transform: translateY(-40px);
  width: 23vw;
}

.text-shadow {
  text-shadow: 1px 1px 0 black;
  color: white;
}
</style>