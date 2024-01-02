<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

defineProps<{
  msg: string
  question: string
}>()

const isGameEnded = ref(false)
const showNextButton = ref(false)
const currentQuestionIndex = ref(0)
const currentQuestion: any = computed(() => questions.value[currentQuestionIndex.value])
const countStore = useCounterStore()
const selectedAnswer = ref(null)

const questions = ref([{}])

const fetchData = async () => {
  try {
    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,flag'
    const response = await axios.get(apiUrl)
    const countries = response.data

    questions.value = countries.map((country: any) => {
      const correctAnswer = { text: country.capital[0], correct: true }
      const randomAnswers = getRandomAnswers(countries, country.capital[0], 3)

      const answers = [correctAnswer, ...randomAnswers]

      shuffleArray(answers)

      return {
        question: `What is the capital of ${country.name.common}?`,
        answers: answers
      }
    })

    shuffleArray(questions.value)
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

const getRandomAnswers = (countries: any[], correctCapital: string, count: number) => {
  const randomAnswers: any[] = []

  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * countries.length)
    while (
      countries[randomIndex].capital[0] === correctCapital ||
      randomAnswers.some((answer) => answer.text === countries[randomIndex].capital[0])
    ) {
      randomIndex = Math.floor(Math.random() * countries.length)
    }

    randomAnswers.push({ text: countries[randomIndex].capital[0], correct: false })
  }

  return randomAnswers
}

const selectAnswer = (answer: any) => {
  const correct = answer.correct

  if (!correct) {
    isGameEnded.value = !isGameEnded.value
    return
  }

  selectedAnswer.value = answer

  if (questions.value.length > currentQuestionIndex.value + 1) {
    countStore.increment()
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
  countStore.reset()
  isGameEnded.value = false
  showNextButton.value = false
  currentQuestionIndex.value = 0
  shuffleArray(questions.value)
}

onMounted(async () => {
  await fetchData()
  shuffleArray(questions.value)
})
</script>

<template>
  <div v-show="!isGameEnded" class="card__container">
    <img src="@/assets/adventure-icon.svg" alt="Adventure Icon" class="top__img" />
    <h1 class="card__title">{{ msg }}</h1>

    <div class="card__wrapper">
      <h3 class="card__question">{{ currentQuestion.question }}</h3>
      <button
        type="button"
        value=""
        class="card__button variant"
        :class="{ answer__correct: answer === selectedAnswer }"
        v-for="(answer, index) in currentQuestion.answers"
        @click="selectAnswer(answer)"
        :key="index"
      >
        <span class="answer__option">{{ String.fromCharCode(65 + index) }}</span>
        {{ answer.text }}
      </button>
      <button v-if="showNextButton" @click="nextQuestion" class="btn-next">Next</button>
    </div>
  </div>
  <div v-show="isGameEnded" class="card__container">
    <div class="endgame__wrapper">
      <img src="@/assets/congrats-icon.svg" alt="Congrats Icon" class="congrats__img" />
      <div>
        <h1 class="results">Results</h1>
        <p>
          You got <span>{{ countStore.count }}</span> correct answers.
        </p>
      </div>
      <button class="btn-try__again" @click="restartGame">Try Again</button>
    </div>
  </div>
</template>

<style scoped>
.card__container {
  position: relative;
}

.top__img {
  width: 110px;
  position: absolute;
  top: -20px;
  right: 0;
}

.congrats__img {
  width: 200px;
}

.card__title {
  font-weight: 700;
  margin-bottom: 6px;
}

.card__wrapper {
  display: flex;
  flex-direction: column;
  width: 22rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 18px 25px;
}

.endgame__wrapper {
  width: 22rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 70px;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
}

.results {
  font-size: 34px;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
  color: var(--color-primary);
}

p {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: var(--color-primary);
}

p > span {
  color: var(--color-answer-right);
  font-weight: 700;
  font-size: 24px;
}

.card__question {
  font-size: 18px;
  color: var(--color-title-question);
  font-weight: 700;
  margin: 1.5rem 0rem;
}

.card__button {
  width: 100%;
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  color: var(--color-answer-text);
  border: 1px solid var(--color-answer-border);
  border-radius: 10px;
  padding: 0.7rem;
  font-size: 14px;
  font-weight: 500;
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

.answer__correct:hover {
  background-color: #60bf88;
}

.answer__wrong {
  color: var(--color-white);
  background-color: #ea8282;
  border-color: transparent;
}

.btn-next {
  background-color: var(--color-button);
  color: var(--color-white);
  font-weight: 700;
  width: 9rem;
  padding: 13px 30px;
  border-radius: 10px;
  align-items: flex-end;
  border-color: transparent;
  cursor: pointer;
}

.btn-try__again {
  width: 11.6rem;
  padding: 13px 30px;
  border-radius: 10px;
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  width: 9rem;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.answer__option {
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 4rem;
}
</style>
