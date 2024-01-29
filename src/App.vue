<script setup lang="ts">
import Card from './components/CardComponent.vue'
</script>

<template>
  <div class="container">
    <Transition>
      <Card msg="MAPSTER QUIZ" question="What is the capital of United States Virgin Islands?" />
    </Transition>
    <p class="copyright">
      Created by <a href="https://github.com/melvintivane/" target="_blank">Melvin Tivane</a> -
      DevChallenges.io
    </p>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  justify-content: center;
}

p {
  font-size: 10px;
}

a {
  color: var(--color-white);
}
.copyright {
  font-weight: 300;
  position: absolute;
  bottom: 1rem;
}

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
