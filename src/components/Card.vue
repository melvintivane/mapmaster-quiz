<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

defineProps<{
  msg: string
  question: string
}>()

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
    question: 'What is the currency of Japan?',
    answers: [
      { text: 'Yen', correct: true },
      { text: 'Dollar', correct: false },
      { text: 'Euro', correct: false },
      { text: 'Pound', correct: false }
    ]
  },
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'London', correct: false }
    ]
  },
  {
    question: 'What is the currency of Australia?',
    answers: [
      { text: 'Australian Dollar', correct: true },
      { text: 'Peso', correct: false },
      { text: 'Rupee', correct: false },
      { text: 'Franc', correct: false }
    ]
  },
  {
    question: 'What is the capital of South Africa?',
    answers: [
      { text: 'Pretoria', correct: false },
      { text: 'Johannesburg', correct: false },
      { text: 'Cape Town', correct: false },
      { text: 'Bloemfontein', correct: true }
    ]
  },
  {
    question: 'What is the currency of Canada?',
    answers: [
      { text: 'Canadian Dollar', correct: true },
      { text: 'Pound', correct: false },
      { text: 'Krone', correct: false },
      { text: 'Baht', correct: false }
    ]
  },
  {
    question: 'What is the capital of India?',
    answers: [
      { text: 'New Delhi', correct: true },
      { text: 'Mumbai', correct: false },
      { text: 'Kolkata', correct: false },
      { text: 'Bangalore', correct: false }
    ]
  },
  {
    question: 'What is the currency of Sweden?',
    answers: [
      { text: 'Swedish Krona', correct: true },
      { text: 'Yen', correct: false },
      { text: 'Dollar', correct: false },
      { text: 'Euro', correct: false }
    ]
  },
  {
    question: 'What is the capital of Mexico?',
    answers: [
      { text: 'Mexico City', correct: true },
      { text: 'Cancun', correct: false },
      { text: 'Guadalajara', correct: false },
      { text: 'Monterrey', correct: false }
    ]
  },
  {
    question: 'What is the currency of Russia?',
    answers: [
      { text: 'Russian Ruble', correct: true },
      { text: 'Won', correct: false },
      { text: 'Zloty', correct: false },
      { text: 'Shekel', correct: false }
    ]
  },
  {
    question: 'What is the capital of China?',
    answers: [
      { text: 'Beijing', correct: true },
      { text: 'Shanghai', correct: false },
      { text: 'Hong Kong', correct: false },
      { text: 'Guangzhou', correct: false }
    ]
  },
  {
    question: 'What is the currency of Argentina?',
    answers: [
      { text: 'Argentine Peso', correct: true },
      { text: 'Real', correct: false },
      { text: 'Pound', correct: false },
      { text: 'Dollar', correct: false }
    ]
  },
  {
    question: 'What is the capital of Germany?',
    answers: [
      { text: 'Berlin', correct: true },
      { text: 'Munich', correct: false },
      { text: 'Hamburg', correct: false },
      { text: 'Frankfurt', correct: false }
    ]
  },
  {
    question: 'What is the currency of Italy?',
    answers: [
      { text: 'Euro', correct: true },
      { text: 'Krona', correct: false },
      { text: 'Lira', correct: false },
      { text: 'Zloty', correct: false }
    ]
  },
  {
    question: 'What is the capital of Brazil?',
    answers: [
      { text: 'Brasília', correct: true },
      { text: 'Rio de Janeiro', correct: false },
      { text: 'Buenos Aires', correct: false },
      { text: 'Lima', correct: false }
    ]
  }
])

const isGameEnded = ref(false)
const showNextButton = ref(false)
const currentQuestionIndex = ref(0)
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isGameOver = ref(false)

const countriesData = ref(null)

const fetchData = async () => {
  try {
    const apiUrl = 'https://restcountries.com/v3.1/independent?status=true&fields=languages,capital'
    const response = await axios.get(apiUrl)
    countriesData.value = response.data
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error)
  }
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const selectAnswer = (answer: any) => {
  const correct = answer.correct

  if (!correct) {
    isGameEnded.value = !isGameEnded.value
    return
  }

  if (questions.value.length > currentQuestionIndex.value + 1) {
    showNextButton.value = true
  } else {
    isGameEnded.value = true
  }
}

const showQuestion = () => {
  showNextButton.value = false
}

const resetState = () => {
  showNextButton.value = false
}

const setNextQuestion = () => {
  resetState()
  if (currentQuestionIndex.value < questions.value.length) {
    showQuestion()
  } else {
    isGameEnded.value = true
  }
}

const nextQuestion = () => {
  currentQuestionIndex.value++
  setNextQuestion()
}

const restartGame = () => {
  isGameEnded.value = false
  showNextButton.value = false
  currentQuestionIndex.value = 0
  shuffleArray(questions.value)
}

onMounted(() => {
  fetchData()
  shuffleArray(questions.value)
  console.log(countriesData)
})
</script>

<template>
  <div class="card__container">
    <img src="@/assets/adventure-icon.svg" alt="Adventure Icon" class="img" />
    <h1 class="card__title">{{ msg }}</h1>

    <div v-show="!isGameEnded" class="card__wrapper">
      <h3 class="card__question">{{ currentQuestion.question }}</h3>
      <button
        type="button"
        value=""
        class="card__button variant"
        v-for="(answer, index) in currentQuestion.answers"
        @click="selectAnswer(answer)"
        :key="index"
      >
        <span class="answer__option">{{ String.fromCharCode(65 + index) }}</span>
        {{ answer.text }}
      </button>
      <button v-if="showNextButton" @click="nextQuestion" class="btn-next">Next</button>
    </div>

    <div v-show="isGameEnded" class="endgame__wrapper">
      <img src="@/assets/congrats-icon.svg" alt="Congrats Icon" class="congrats" />
      <h1 class="temp">Results</h1>
      <p>You got 0 correct answers.</p>
      <button class="btn-try__again" @click="restartGame">Try Again</button>
    </div>
  </div>
</template>

<style scoped>
.card__container {
  position: relative;
}

.img {
  position: absolute;
  right: 0;
  top: -1.3rem;
}

.card__title {
  font-weight: 700;
  margin-bottom: 10px;
}

.card__wrapper {
  display: flex;
  flex-direction: column;
  width: 28rem;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px 35px;
}

.endgame__wrapper {
  display: flex;
  flex-direction: column;
  width: 31rem;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px 35px;
}

.temp {
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
</style>
