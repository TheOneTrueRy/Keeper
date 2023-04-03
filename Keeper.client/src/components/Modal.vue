<template>
  <div class="modal fade" tabindex="-1" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
      <div class="modal-content YES-overflow">
        <slot>You need to put stuff here for it to show up in the slot</slot>
      </div>
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


<style lang="scss" scoped>
.YES-overflow {
  overflow: visible;
}
</style>