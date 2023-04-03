<template>
  <div class="border border-dark border-1 rounded elevation-2">
    <img :src="keep.img" :alt="keep.name" :title="keep.name" class="rounded-top img-fluid"
      onerror="this.src='broken-image.png'">
    <div class="d-flex justify-content-between align-items-center p-1">
      <span class="fs-5">{{ keep.name }}</span>
      <img :src="keep.creator.picture" :alt="keep.creator.name" :title="keep.creator.name" class="creator-pfp"
        onerror="this.src='broken-image.png'">
    </div>
  </div>
</template>


<script>
export default {
  props: {
    keep: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.creator-pfp {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>