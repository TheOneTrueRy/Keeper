<template>
  <header>
    <div class="container-fluid sticky-md-top fixed-bottom elevation-3">
      <div class="row">
        <div class="col-md-2 col-4 d-flex align-items-center justify-content-center">
          <button class="btn btn-dark">
            <span>Home <i class="mdi mdi-home d-none d-md-inline"></i></span>
          </button>
        </div>
        <div class="col-md-3 col-4 d-flex align-items-center justify-content-center">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false">
              Create
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">New Keep</a></li>
              <li><a class="dropdown-item" href="#">New Vault</a></li>
            </ul>
          </div>
        </div>
        <div class="col-2 d-none d-md-flex align-items-center justify-content-center py-1">
          <img src="keep-icon.png" alt="Keeper Logo" title="Keeper Logo" class="logo">
        </div>
        <div class="col-md-2 col-4 offset-md-3 d-flex align-items-center justify-content-center">
          <Login />
        </div>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Login from "./components/Login.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.logo {
  height: 50px;
  width: 50px;
}
</style>
