<template>
  <transition mode="out-in">
    <div v-if="!isGameEnded" class="relative">
      <img
        src="@/assets/adventure-icon.svg"
        alt="Adventure Icon"
        class="absolute w-28 -top-3 right-0"
      />
      <h1 class="text-2xl font-bold mb-2">{{ msg }}</h1>

      <div class="flex flex-col w-96 bg-white rounded-xl py-5 px-6">
        <h3 class="text-question-default text-lg font-bold my-6">{{ currentQuestion.question }}</h3>
        <button
          type="button"
          value=""
          class="hover:text-white hover:bg-button-default hover:border-transparent w-full flex items-center mb-5 text-sm font-medium text-text-default border border-border-default bg-white p-3 rounded-xl cursor-pointer"
          :class="{
            'text-white border border-right-default !bg-right-default': answer === selectedAnswer
          }"
          v-for="(answer, index) in currentQuestion.answers"
          @click="selectAnswer(answer)"
          :key="index"
        >
          <span class="text-2xl font-medium ml-3 mr-11">{{ String.fromCharCode(65 + index) }}</span>
          {{ answer.text }}
        </button>
        <button
          v-if="showNextButton"
          class="w-36 py-4 px-8 font-bold text-white bg-button-default rounded-lg border-transparent cursor-pointer"
          @click="nextQuestion"
        >
          Next
        </button>
      </div>
    </div>
    <div v-else class="relative">
      <div class="flex flex-col items-center gap-16 w-96 bg-white rounded-xl py-10 px-6">
        <img src="@/assets/congrats-icon.svg" alt="Congrats Icon" class="w-52" />
        <div class="text-primary-default">
          <h1 class="text-4xl font-bold text-center mb-3">Results</h1>
          <p class="text-sm text-center font-normal">
            You got
            <span class="font-bold text-2xl text-right-default">{{ countStore.count }}</span>
            correct answers.
          </p>
        </div>
        <button
          class="w-44 py-4 px-8 rounded-lg text-sm font-bold bg-white text-primary-default border border-primary-default cursor-pointer"
          @click="restartGame"
        >
          Try Again
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useCountriesStore } from '@/stores/countries'
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
const countriesStore = useCountriesStore()
const selectedAnswer = ref(null)

const questions = ref([{}])

const loadData = async () => {
  const countries = countriesStore.$state.countries

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
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const getRandomAnswers = (countries: any[], capital: string, count: number) => {
  const randomAnswers: any[] = []

  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * countries.length)
    while (
      countries[randomIndex].capital[0] === capital ||
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

const fetchData = async () => {
  await countriesStore.fetchCountries()
  await loadData()
}

onMounted(async () => {
  fetchData()
  shuffleArray(questions.value)
})
</script>

<style scoped>
.answer__wrong {
  color: var(--color-white);
  background-color: var(--color-answer-wrong);
  border-color: transparent;
}
</style>
