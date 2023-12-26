<script setup lang="ts">
import Card from './components/Card.vue'
</script>

<template>
  <div class="container">
    <Card msg="MAPSTER QUIZ" question="What is the capital of United States Virgin Islands?" />
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

a {
  color: var(--color-white);
}
.copyright {
  font-weight: 300;
  position: absolute;
  bottom: 1rem;
}
</style>
