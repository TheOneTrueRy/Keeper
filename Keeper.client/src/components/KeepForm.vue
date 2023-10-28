<template>
  <div class="container-fluid rounded bg-gradient" :class="[theme == 'light' ? 'bg-light' : 'bg-dark']">
    <div class="row p-2">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <span class="fs-1">Add Your Keep</span>
        <button class="btn p-0 text-dark" type="button" data-bs-dismiss="modal" data-bs-target="#keepForm"><i
            class="mdi mdi-close fs-2"></i></button>
      </div>
      <form @submit.prevent="createKeep()">
        <div class="row px-2 pb-2">
          <div class="col-12 py-1 g-0">
            <input required v-model="editable.name" type="text" placeholder="Title..." class="form-control"
              maxlength="16">
          </div>
          <div class="col-12 py-1 g-0">
            <input required v-model="editable.img" type="url" placeholder="Image URL..." class="form-control">
          </div>
          <div class="col-12 py-1 g-0">
            <textarea required v-model="editable.description" name="description" id="description" cols="20" rows="5"
              placeholder="Keep Description..." class="form-control" maxlength="500"></textarea>
          </div>
          <div class="col-12 d-flex align-items-center pt-2 justify-content-between g-0">
            <button class="btn btn-dark" type="button" data-bs-dismiss="modal" data-bs-target="#keepForm">
              <span>Cancel</span>
            </button>
            <button class="btn bg-info" type="submit" data-bs-dismiss="modal" data-bs-target="#keepForm">
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
import { keepsService } from "../services/KeepsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { router } from "../router.js";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createKeep() {
        try {
          const keepData = editable.value
          await keepsService.createKeep(keepData)
          editable.value = {}
          Pop.success('Keep successfully created!')
          router.push({ name: 'Home' })
        } catch (error) {
          Pop.error(error.message, '[Creating Keep]')
        }
      },
      theme: computed(() => AppState.theme)
    }
  }
}
</script>


<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>