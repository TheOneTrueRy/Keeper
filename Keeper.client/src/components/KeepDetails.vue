<template>
  <div v-if="keep" class="container-fluid keep-modal">
    <div class="row h-100">
      <div class="col-12 col-md-6 g-0 d-flex flex-column justify-content-center align-items-center"
        :style="{ backgroundImage: `url(${keep.img})` }">
        <div class="w-100 h-100 d-flex justify-content-center blur">
          <img :src="keep.img" alt="" class="fill" onerror="this.src='broken-image.png'">
        </div>
        <div class="d-flex d-md-none justify-content-end w-100">
          <button class="btn btn-dark w-100 stop-rounding" type="button" data-bs-dismiss="modal"
            data-bs-target="#keepDetails">
            <span>Close Details</span>
          </button>
        </div>
      </div>
      <div class="col-12 col-md-6 h-100 d-flex bg-gradient" :class="[theme == 'light' ? 'bg-white' : 'bg-dark']">
        <div class="row h-100">
          <div class="col-12 d-flex justify-content-center align-items-center py-2">
            <span class=""><i class="mdi text-info mdi-eye"></i> {{ keep.views }}</span>
            <span class="ms-3 "><i class="mdi text-info mdi-chess-rook"></i> {{ keep.kept }}</span>
          </div>
          <div class="col-12 d-flex flex-column justify-content-center keep-body">
            <span class="fs-2 text-center">{{ keep.name }}</span>
            <span class="pt-3">{{ keep.description }}</span>
          </div>
          <div class="col-6 d-flex justify-content-between align-items-center">
            <div class="btn-group" v-if="account.id">
              <button v-if="myVaults.length > 0" class="btn btn-sm dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-expanded="false" :class="[theme == 'light' ? 'btn-dark' : 'btn-light']">
                VAULTS
              </button>
              <ul v-if="myVaults.length > 0" class="dropdown-menu py-0">
                <li v-for="v in myVaults" class="selectable px-1" @click="vaultAKeep(v.id, keep.id)"
                  :title="`Add this keep to your ${v.name} vault!`">
                  <span>
                    {{ v.name }}
                  </span>
                </li>
              </ul>
              <ul v-else class="mb-0">
                <li><span>No Vaults Created!</span></li>
              </ul>
            </div>
            <div>
              <button v-if="account.id == keep.creator.id" class="btn btn-danger py-1 px-2" title="Delete this keep."
                @click="deleteKeep(keep.id)">Delete</button>
            </div>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-around">
            <router-link :to="{ name: 'Profile', params: { profileId: keep.creator.id } }" data-bs-dismiss="modal"
              data-bs-target="#keepDetails" :title="`Go to ${keep.creator.name}'s profile page!`">
              <div :style="{ backgroundImage: `url(${keep.creator.picture})` }" :alt="keep.creator.name"
                class="creator-pfp elevation-1 border border-dark cover-center">
              </div>
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
import { Modal } from "bootstrap";

export default {
  setup() {
    return {
      keep: computed(() => AppState.keep),
      myVaults: computed(() => AppState.myVaults),
      account: computed(() => AppState.account),
      theme: computed(() => AppState.theme),
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
            await keepsService.deleteKeep(keepId);
            Modal.getOrCreateInstance('#keepDetails').hide();
            Pop.success('Your keep was successfully deleted.');
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
.blur {
  backdrop-filter: blur(10px);
}

.stop-rounding {
  border-radius: 0% !important;
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

.fill {
  min-height: 90%;
  max-height: 70vh;
  max-width: 100%;
}

@media screen and (min-width: 768px) {
  .keep-modal {
    height: 70vh;
    width: 100%;
  }


  .fill {
    object-fit: contain;
  }
}
</style>