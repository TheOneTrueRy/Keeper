<template>
  <div class="border border-dark border-1 rounded elevation-2">
    <img :src="keep.img" :alt="keep.name" :title="keep.name" class="rounded-top img-fluid selectable bing"
      onerror="this.src='broken-image.png'" data-bs-toggle="modal" data-bs-target="#keepDetails"
      @click="setKeep(keep.id)">
    <div class="d-flex justify-content-between align-items-center p-1 bong text-light">
      <span class="fs-4 text-shadow hover" data-bs-toggle="modal" data-bs-target="#keepdetails"
        @click="setKeep(keep.id)">{{ keep.name
        }}</span>
      <slot></slot>
    </div>
  </div>

  <Modal id="keepDetails">
    <KeepDetails />
  </Modal>
</template>


<script>
import { keepsService } from "../services/KeepsService.js";
import Pop from "../utils/Pop.js";
import KeepDetails from "./KeepDetails.vue";

export default {
  props: {
    keep: { type: Object, required: true }
  },
  setup() {
    return {
      async setKeep(keepId) {
        try {
          await keepsService.setKeep(keepId)
        } catch (error) {
          Pop.error(error.message, '[Setting Keep]')
        }
      }
    };
  },
  components: { KeepDetails }
}
</script>


<style lang="scss" scoped>
.hover {
  transition: 0.4s;
  cursor: pointer;
}

.hover:hover {
  transform: scale(1.05);
}

.text-shadow {
  text-shadow: 1px 1px 0 black;
}

.bing {
  position: relative;
}

.bong {
  position: absolute;
  transform: translateY(-50px);
  width: 23vw;
}
</style>