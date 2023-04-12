<template>
  <div v-if="vault" class="container-fluid pb-5">
    <div class="row">
      <div class="col-10 offset-1 col-md-6 offset-md-3 p-2">
        <div class="rounded vault-bg d-flex align-items-center justify-content-end flex-column pb-2 text-light"
          :style="{ backgroundImage: `url(${vault.img})` }">
          <span class="vault-title text-shadow fw-bold">{{ vault.name }}</span>
          <span class="text-shadow fs-5">by {{ vault.creator.name }}</span>
        </div>
      </div>
    </div>
    <div v-if="account.id == vault.creator.id" class="row">
      <div class="col-8 offset-2 col-md-6 offset-md-3 px-2">
        <div class="w-100 d-flex align-items-center justify-content-between">
          <button v-if="vault.isPrivate" class="btn btn-dark" @click="changePrivacy()">
            <span>Make Public <i class="mdi mdi-lock-open"></i></span>
          </button>
          <button v-else class="btn btn-dark" @click="changePrivacy()">
            <span>Make Private <i class="mdi mdi-lock"></i></span>
          </button>
          <button class="btn btn-danger" @click="deleteVault(vault.id)">
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
    <div class="row mt-3 mb-5">
      <div class="col-12 col-md-8 offset-md-2">
        <div class="bricks">
          <div v-for="k in keeps" class="rounded hover-card">
            <KeepCard :keep="k">
              <button v-if="vault.creator.id == account.id" class="btn btn-danger move-over py-1 px-1"
                title="Remove this keep from this vault." @click="removeKeep(k.vaultKeepId)">
                <span><i class="mdi mdi-delete"></i></span>
              </button>
            </KeepCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onUnmounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { useRoute, useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { vaultsService } from "../services/VaultsService.js";
import KeepCard from "../components/KeepCard.vue";
import { vaultKeepsService } from "../services/VaultKeepsService.js";

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
      keeps: computed(() => AppState.keeps),
      async deleteVault(vaultId) {
        try {
          if (await Pop.confirm('Are you sure you want to PERMANENTLY delete this vault?')) {
            await vaultsService.deleteVault(vaultId)
            Pop.success('Successfully deleted your vault!')
            router.push({ name: 'Home' })
          }
        } catch (error) {
          Pop.error(error.message, '[Deleting Vault]')
        }
      },
      async changePrivacy() {
        try {
          const vault = AppState.vault
          vault.isPrivate = !vault.isPrivate
          await vaultsService.updateVault(vault)
        } catch (error) {
          Pop.error(error.message, '[Changing Vault Privacy]')
        }
      },
      async removeKeep(vaultKeepId) {
        try {
          if (await Pop.confirm('Are you sure you want to remove this keep from this vault?')) {
            await vaultKeepsService.removeKeep(vaultKeepId)
          }
        } catch (error) {
          Pop.error(error.message, '[Removing Keep]')
        }
      }
    };
  },
  components: { KeepCard }
}
</script>


<style lang="scss" scoped>
.hover-card {
  transition: 0.5s;
}

.hover-card:hover {
  box-shadow: 0px 0px 10px rgb(157, 9, 226);
}

.vault-bg {
  height: 30vh;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.vault-title {
  font-family: 'Times New Roman', Times, serif;
  font-size: 3em;
}

.text-shadow {
  text-shadow: 2px 2px 1px black;
  color: white;
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
</style>