<template>
  <div class="container-fluid" :class="[theme == 'light' ? 'bg-light' : 'bg-dark']">
    <div class="row p-2">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <span class="fs-1">Edit Your Account</span>
        <button class="btn p-0 text-dark" type="button" data-bs-dismiss="modal" data-bs-target="#keepForm"><i
            class="mdi mdi-close fs-2"></i></button>
      </div>
      <form @submit.prevent="createKeep()">
        <div class="row px-2 pb-2">
          <div class="col-12 py-1 g-0">
            <input required v-model="editable.name" type="text" placeholder="Name..." class="form-control"
              maxlength="255">
          </div>
          <div class="col-12 py-1 g-0">
            <input required v-model="editable.picture" type="url" placeholder="Profile Picture URL..."
              class="form-control" maxlength="255">
          </div>
          <div class="col-12 py-1 g-0">
            <input required v-model="editable.coverImg" type="url" placeholder="Cover Image URL..." class="form-control"
              maxlength="255">
          </div>
          <div class="col-12 d-flex align-items-center pt-2 justify-content-between g-0">
            <button class="btn btn-dark" type="button" data-bs-dismiss="modal" data-bs-target="#accountForm">
              <span>Cancel</span>
            </button>
            <button class="btn btn-success" type="submit" data-bs-dismiss="modal" data-bs-target="#accountForm">
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

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      theme: computed(() => AppState.theme)
    }
  }
}
</script>


<style lang="scss" scoped></style>