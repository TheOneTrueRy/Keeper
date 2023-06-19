<template>
  <header class="sticky-md-top fixed-bottom smooth bg-info">
    <div class="container-fluid elevation-3">
      <div class="row">
        <div class="col-md-2 col-3 d-flex align-items-center justify-content-center">
          <router-link :to="{ name: 'Home' }">
            <button class="btn btn-light">
              <span>Home <i class="mdi mdi-home d-none d-md-inline"></i></span>
            </button>
          </router-link>
        </div>
        <div class="col-md-3 col-3 d-flex align-items-center justify-content-center">
          <div class="dropdown" v-if="account.id">
            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
              aria-expanded="false">
              Create
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li class="selectable p-1" data-bs-toggle="modal" data-bs-target="#keepForm">New Keep</li>
              <li class="selectable p-1" data-bs-toggle="modal" data-bs-target="#vaultForm">New Vault</li>
            </ul>
          </div>
        </div>
        <div class="col-2 d-none d-md-flex align-items-center justify-content-center py-1 g-0">
          <router-link :to="{ name: 'Home' }" title="Go to the Homepage!">
            <img src="/KEEPER-full-logo.png" class="logo">
          </router-link>
        </div>
        <div class="col-2 col-md-3 offset-1 offset-md-0 d-flex align-items-center justify-content-center">
          <button v-if="theme == 'light'" class="btn p-0 text-light" @click="darkMode()"
            title="Toggle the color theme of the site to dark-mode."><i
              class="mdi mdi-moon-waning-crescent fs-1"></i></button>
          <button v-else class="btn p-0 text-light" @click="lightMode()"
            title="Toggle the color theme of the site to light-mode."><i
              class="mdi mdi-white-balance-sunny fs-1"></i></button>
        </div>
        <div class="col-md-2 col-3 d-flex align-items-center justify-content-center">
          <Login />
        </div>
      </div>
    </div>
  </header>
  <main class="smooth bg-gradient" :class="[theme == 'light' ? 'bg-white' : 'bg-dark']">
    <router-view />
  </main>

  <Modal id="keepForm">
    <KeepForm />
  </Modal>
  <Modal id="vaultForm">
    <VaultForm />
  </Modal>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from './AppState'
import Login from "./components/Login.vue"
import KeepForm from "./components/KeepForm.vue"
import VaultForm from "./components/VaultForm.vue"
import { vaultsService } from "./services/VaultsService.js"
import Pop from "./utils/Pop.js"

export default {
  setup() {

    async function getMyVaults() {
      try {
        await vaultsService.getMyVaults()
      } catch (error) {
        Pop.error(error.message, '[Getting My Vaults]')
      }
    }

    watchEffect(() => {
      if (AppState.account.id) {
        getMyVaults()
      }
    })

    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      theme: computed(() => AppState.theme),
      darkMode() {
        AppState.theme = 'dark'
      },
      lightMode() {
        AppState.theme = 'light'
      },
    }
  },
  components: { Login, KeepForm, VaultForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.logo {
  height: 50px;
  max-width: 100%;
}

.smooth {
  transition: 0.5s;
}
</style>
