<template>
  <div class="border border-dark border-1 rounded elevation-2">
    <img :src="vault.img" :alt="vault.name" :title="vault.name" class="rounded-top img-fluid selectable"
      onerror="this.src='broken-image.png'" @click="setVault(vault.id)">
    <div class="d-flex justify-content-between align-items-center p-1">
      <span class="fs-5 hover" @click="setVault(vault.id)">{{ vault.name
      }}</span>
      <span v-if="vault.isPrivate"><i class="mdi mdi-lock"></i></span>
    </div>
  </div>
</template>


<script>
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
      }
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
  transform: scale(1.05);
}
</style>