<template>
  <div v-if="keep" class="container-fluid keep-modal">
    <div class="row h-100">
      <div class="col-6 g-0 bg-cover h-100" :style="{ backgroundImage: `url(${keep.img})` }">

      </div>
      <div class="col-6 h-100">
        <div class="row h-100">
          <div class="col-12 d-flex justify-content-center align-items-center py-2">
            <span><i class="mdi mdi-eye"></i> {{ keep.views }}</span>
            <span class="ms-3"><i class="mdi mdi-chess-rook"></i> {{ keep.kept }}</span>
          </div>
          <div class="col-12 d-flex flex-column keep-body">
            <span class="fs-2 text-center">{{ keep.name }}</span>
            <span class="pt-3">{{ keep.description }}</span>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center">
            <div class="btn-group" v-if="account.id">
              <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                VAULTS
              </button>
              <ul v-if="myVaults.length > 0" class="dropdown-menu">
                <li v-for="v in myVaults" class="selectable" @click="vaultAKeep(v.id, keep.id)">
                  <span>
                    {{ v.name }}
                  </span>
                </li>
              </ul>
              <ul v-else>
                <li><span>No Vaults Created!</span></li>
              </ul>
            </div>
          </div>
          <div class="col-6">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { vaultKeepsService } from "../services/VaultKeepsService.js";

export default {
  setup() {
    return {
      keep: computed(() => AppState.keep),
      myVaults: computed(() => AppState.myVaults),
      account: computed(() => AppState.account),
      async vaultAKeep(vaultId, keepId) {
        try {
          await vaultKeepsService.vaultAKeep(vaultId, keepId)
        } catch (error) {
          Pop.error(error.message, '[Vaulting A Keep]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.keep-modal {
  height: 100vh;
  width: 100vw;
}

@media screen and (min-width: 768px) {
  .keep-modal {
    height: 70vh;
    width: 100%;
  }
}

.bg-cover {
  background-size: cover;
}

.keep-body {
  height: 70%;
  overflow-y: scroll;
}

.keep-body::-webkit-scrollbar {
  display: none;
}
</style>