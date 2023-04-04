<template>
  <div v-if="keep" class="container-fluid keep-modal">
    <div class="row h-100">
      <div class="col-6 g-0 bg-cover h-100 p-1 d-flex justify-content-end align-items-end"
        :style="{ backgroundImage: `url(${keep.img})` }">
        <button v-if="keep.creator.id == account.id" class="btn btn-danger" title="Delete This Keep"
          @click="deleteKeep(keep.id)">
          <span>Delete Keep <i class="mdi mdi-delete"></i></span>
        </button>
      </div>
      <div class="col-6 h-100 d-flex">
        <div class="row h-100">
          <div class="col-12 d-flex justify-content-center align-items-center py-2">
            <span><i class="mdi mdi-eye"></i> {{ keep.views }}</span>
            <span class="ms-3"><i class="mdi mdi-chess-rook"></i> {{ keep.kept }}</span>
          </div>
          <div class="col-12 d-flex flex-column keep-body">
            <span class="fs-2 text-center">{{ keep.name }}</span>
            <span class="pt-3">{{ keep.description }}</span>
          </div>
          <div class="col-6 d-flex justify-content-start align-items-center">
            <div class="btn-group ps-2" v-if="account.id">
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
          <div class="col-6 d-flex align-items-center justify-content-around">
            <router-link :to="{ name: 'Profile', params: { profileId: keep.creator.id } }" data-bs-dismiss="modal">
              <img :src="keep.creator.picture" :alt="keep.creator.name"
                class="creator-pfp elevation-1 border border-dark">
            </router-link>
            <span class="clip-text">{{ keep.creator.name }}</span>
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
import { keepsService } from "../services/KeepsService.js";

export default {
  setup() {
    return {
      keep: computed(() => AppState.keep),
      myVaults: computed(() => AppState.myVaults),
      account: computed(() => AppState.account),
      async vaultAKeep(vaultId, keepId) {
        try {
          await vaultKeepsService.vaultAKeep(vaultId, keepId)
          Pop.success('Keep successfully added to your vault!')
        } catch (error) {
          Pop.error(error.message, '[Vaulting A Keep]')
        }
      },
      async deleteKeep(keepId) {
        try {
          if (await Pop.confirm('Are you sure you want to PERMANENTLY delete your keep?')) {
            await keepsService.deleteKeep(keepId)
            Pop.success('Your keep was successfully deleted.')
          }
        } catch (error) {
          Pop.error(error.message, '[Deleting Keep]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
#column-row-switcher {
  flex-direction: column;
}

.keep-modal {
  height: 100vh;
  width: 100vw;
}

@media screen and (min-width: 768px) {
  .keep-modal {
    height: 70vh;
    width: 100%;
  }

  #column-row-switcher {
    flex-direction: row;
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

.creator-pfp {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>