<script setup lang="ts">
defineProps<{
  msg: string
  question: string
}>()
</script>

<template>
  <div class="card__container">
    <h1 class="card__title">{{ msg }}</h1>
    <div class="card__wrapper">
      <button type="button" value="" class="card__button variant">
        <span class="answer__option">A</span>
        Button
      </button>
      <button type="button" value="" class="card__button answer__correct">
        <span class="answer__option">A</span>
        Button
      </button>
      <button type="button" value="" class="card__button answer__wrong">
        <span class="answer__option">A</span>
        Button
      </button>
      <button type="button" value="" class="card__button">
        <span class="answer__option">A</span>
        Button
      </button>
      <button type="button" value="" class="card__button btn-next">Next</button>
    </div>
  </div>
</template>

<style scoped>
.card__title {
  font-weight: 700;
}

.card__wrapper {
  width: 29rem;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px 40px;
}

.card__question {
  font-size: 24px;
  color: var(--color-title-question);
  font-weight: 700;
  margin-bottom: 3.2rem;
}

.card__button {
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-white);
  color: var(--color-answer-text);
  border: 2px solid var(--color-answer-border);
  border-radius: 18px;
  padding: 1.2rem;
  font-size: 16px;
  cursor: pointer;
}

.variant:hover {
  color: var(--color-white);
  background-color: var(--color-button);
  border-color: transparent;
}

.answer__correct:hover {
  color: var(--color-white);
  background-color: #60bf88;
  border-color: transparent;
}

.answer__wrong:hover {
  color: var(--color-white);
  background-color: #ea8282;
  border-color: transparent;
}

.btn-next {
  display: flex;
  background-color: var(--color-button);
  color: var(--color-white);
  font-weight: 700;
  width: 11.6rem;
  justify-content: center;
  border-color: transparent;
}

.answer__option {
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 4rem;
}
</style>
