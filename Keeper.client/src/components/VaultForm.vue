<template>
  <div class="container-fluid" :class="[theme == 'light' ? 'bg-light' : 'bg-dark']">
    <div class="row p-2">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <span class="fs-1">Add Your Vault</span>
        <button class="btn p-0 text-dark" type="button" data-bs-dismiss="modal" data-bs-target="#vaultForm"><i
            class="mdi mdi-close fs-2"></i></button>
      </div>
      <form @submit.prevent="createVault()">
        <div class="row px-2 pb-2">
          <div class="col-12 py-1 g-0">
            <input required v-model="editable.name" type="text" placeholder="Title..." class="form-control"
              maxlength="50">
          </div>
          <div class="col-12 py-1 g-0">
            <input required v-model="editable.img" type="url" placeholder="Image URL..." class="form-control"
              maxlength="700">
          </div>
          <div class="col-12 py-1 g-0">
            <textarea required v-model="editable.description" name="description" id="description" cols="20" rows="5"
              placeholder="Vault Description..." class="form-control" maxlength="1000"></textarea>
          </div>
          <div class="col-12 py-1 g-0 d-flex justify-content-center">
            <input v-model="editable.isPrivate" type="checkbox">
            <span class="ms-1">Make Vault Private?</span>
          </div>
          <div class="col-12 d-flex align-items-center pt-2 justify-content-between g-0">
            <button class="btn btn-dark" type="button" data-bs-dismiss="modal" data-bs-target="#vaultForm">
              <span>Cancel</span>
            </button>
            <button class="btn btn-success" type="submit" data-bs-dismiss="modal" data-bs-target="#vaultForm">
              <span>Submit</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { vaultsService } from "../services/VaultsService.js";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      theme: computed(() => AppState.theme),
      async createVault() {
        try {
          const vaultData = editable.value
          await vaultsService.createVault(vaultData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message, '[Creating Vault]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>