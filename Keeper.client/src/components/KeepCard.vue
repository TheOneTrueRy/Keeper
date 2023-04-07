<template>
  <div class="border border-1 rounded elevation-2" :class="[theme == 'light' ? 'border-dark' : 'border-light']">
    <img id="keep-img" :src="keep.img" :alt="keep.name" :title="`Look at ${keep.name}'s details!`"
      class="rounded img-fluid selectable bing" onerror="this.src='broken-image.png'" data-bs-toggle="modal"
      data-bs-target="#keepDetails" @click="setKeep(keep.id)">
    <div class="d-flex justify-content-between align-items-center p-1 bong text-light clip-text">
      <span class="fs-4 text-shadow hover" data-bs-toggle="modal" data-bs-target="#keepDetails" @click="setKeep(keep.id)"
        :title="`Look at ${keep.name}'s details!`">{{ keep.name
        }}</span>
      <slot></slot>
    </div>
  </div>

  <Modal id="keepDetails">
    <KeepDetails />
  </Modal>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
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
      },
      theme: computed(() => AppState.theme)
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
  transform: scale(1.02);
}

#keep-img {
  min-width: 100%;
}

.text-shadow {
  text-shadow: 1px 1px 0 black;
  color: white;
}

.bing {
  position: relative;
}

.bong {
  position: absolute;
  transform: translateY(-46px);
  width: 40vw;
}

@media screen and (min-width: 768px) {
  .bong {
    width: 18vw;
  }
}
</style>