<template>
  <div>
    <div v-if="!isGameEnded">
      <div class="card__container">
        <img src="@/assets/adventure-icon.svg" alt="Adventure Icon" class="img" />
        <h1 class="card__title">{{ msg }}</h1>
        <div class="card__wrapper">
          <h3 class="card__question">{{ currentQuestion.question }}</h3>
          <button
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            @click="selectAnswer(answer)"
            :class="{
              card__button: true,
              variant: index !== correctAnswerIndex,
              answer__correct: index === correctAnswerIndex,
              answer__wrong: selectedAnswerIndex === index
            }"
          >
            <span class="answer__option">{{ String.fromCharCode(65 + index) }}</span>
            {{ answer.text }}
          </button>
          <button v-if="showNextButton" @click="nextQuestion" class="btn-next">Next</button>
        </div>
      </div>
    </div>
    <div v-if="isGameEnded">
      <h3 class="game-over">Game Over!</h3>
      <button @click="restartGame" class="btn-try__again">Try Again</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const questions = ref([
  {
    question: 'What is the capital of Brazil?',
    answers: [
      { text: 'Brasília', correct: true },
      { text: 'Rio de Janeiro', correct: false },
      { text: 'Buenos Aires', correct: false },
      { text: 'Lima', correct: false }
    ]
  },
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'Berlin', correct: false },
      { text: 'London', correct: false },
      { text: 'Madrid', correct: false }
    ]
  },
  {
    question: 'What is the capital of Japan?',
    answers: [
      { text: 'Tokyo', correct: true },
      { text: 'Beijing', correct: false },
      { text: 'Seoul', correct: false },
      { text: 'Bangkok', correct: false }
    ]
  },
  {
    question: 'What is the capital of Australia?',
    answers: [
      { text: 'Canberra', correct: true },
      { text: 'Sydney', correct: false },
      { text: 'Melbourne', correct: false },
      { text: 'Wellington', correct: false }
    ]
  }
])

const isGameStarted = ref(false)
const isGameEnded = ref(false)
const showNextButton = ref(false)
const currentQuestionIndex = ref(0)
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isGameOver = ref(false)

const startGame = () => {
  isGameStarted.value = true
  isGameEnded.value = false
  showNextButton.value = false
  currentQuestionIndex.value = 0
}

const restartGame = () => {
  isGameStarted.value = false
  isGameEnded.value = false
  showNextButton.value = false
  currentQuestionIndex.value = 0
}

const setNextQuestion = () => {
  resetState()
  if (currentQuestionIndex.value < questions.value.length) {
    showQuestion()
  } else {
    isGameEnded.value = true
  }
}

const showQuestion = () => {
  showNextButton.value = false
}

const resetState = () => {
  clearStatusClass(document.body)
  showNextButton.value = false
}

const selectAnswer = (answer: any) => {
  const correct = answer.correct
  setStatusClass(document.body, correct)
  if (!correct) {
    isGameOver.value = true
    return
  }

  if (questions.value.length > currentQuestionIndex.value + 1) {
    showNextButton.value = true
  } else {
    isGameEnded.value = true
  }
}

const setStatusClass = (element: any, correct: any) => {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

const clearStatusClass = (element: any) => {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const nextQuestion = () => {
  currentQuestionIndex.value++
  setNextQuestion()
}
</script>

<style scoped>
.card__container[style*='display: none'] {
  display: none;
}

.card__container {
  position: relative;
}

.img {
  position: absolute;
  right: 0;
  top: -70px;
}

.card__title {
  font-weight: 700;
  margin-bottom: 10px;
}

.card__wrapper {
  display: flex;
  flex-direction: column;
  width: 31rem;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px 35px;
}

.h1 {
  font-size: 4.8rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-primary);
}

p {
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  color: var(--color-primary);
}

.card__question {
  font-size: 24px;
  color: var(--color-title-question);
  font-weight: 700;
  margin: 2.2rem 0rem;
}

.card__button {
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
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

.answer__correct {
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
  background-color: var(--color-button);
  color: var(--color-white);
  font-weight: 700;
  width: 11.6rem;
  padding: 22px 30px;
  border-radius: 15px;
  align-items: flex-end;
  border-color: transparent;
  cursor: pointer;
}

.btn-try__again {
  width: 11.6rem;
  padding: 22px 30px;
  border-radius: 15px;
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  width: 20rem;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}

.answer__option {
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 4rem;
}

.game-over {
  font-size: 2rem;
  color: #ff0000;
  text-align: center;
  margin-bottom: 20px;
}
</style>
