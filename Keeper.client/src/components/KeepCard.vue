<template>
  <div class="border border-dark border-1 rounded elevation-2">
    <img :src="keep.img" :alt="keep.name" :title="keep.name" class="rounded-top img-fluid selectable"
      onerror="this.src='broken-image.png'" data-bs-toggle="modal" data-bs-target="#keepDetails"
      @click="setKeep(keep.id)">
    <div class="d-flex justify-content-between align-items-center p-1">
      <span class="fs-5 hover" data-bs-toggle="modal" data-bs-target="#keepdetails" @click="setKeep(keep.id)">{{ keep.name
      }}</span>
      <img :src="keep.creator.picture" :alt="keep.creator.name" :title="keep.creator.name" class="creator-pfp"
        onerror="this.src='broken-image.png'">
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
.creator-pfp {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.text-shadow {
  text-shadow: 1px 1px 0 black;
}

.hover {
  transition: 0.4s;
  cursor: pointer;
}

.hover:hover {
  transform: scale(1.05);
}
</style>