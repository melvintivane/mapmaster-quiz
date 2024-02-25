<script setup lang="ts">
import Card from "./components/CardComponent.vue";
</script>

<template>
  <div class="flex justify-center">
    <Transition>
      <Card
        msg="MAPSTER QUIZ"
        question="What is the capital of United States Virgin Islands?"
      />
    </Transition>
    <p class="absolute font-light bottom-4 text-[10px]">
      Created by
      <a
        href="https://github.com/melvintivane/"
        target="_blank"
        class="underline text-white"
        >Melvin Tivane</a
      >
      - DevChallenges.io
    </p>
  </div>
</template>

<style lang="css">
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
