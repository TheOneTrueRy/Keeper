<template>
  <div class="container-fluid">
    <div class="row p-2">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <span class="fs-1">Add Your Keep</span>
        <button class="btn p-0 text-dark" type="button" data-bs-dismiss="modal" data-bs-target="#keepForm"><i
            class="mdi mdi-close"></i></button>
      </div>
      <form @submit.prevent="createKeep()">
        <div class="row px-2 pb-2">
          <div class="col-12">
            <input type="text" placeholder="Title..." class="">
          </div>
          <div class="col-12">
            <input type="url" placeholder="Image URL..." class="">
          </div>
          <div class="col-12">
            <textarea name="description" id="description" cols="30" rows="10" placeholder="Keep Description..."
              class=""></textarea>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>