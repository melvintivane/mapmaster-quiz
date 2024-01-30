import { defineStore } from "pinia";
import axios from "axios";

interface CountryType {
	countries: []
}

export const useCountriesStore = defineStore('countries', {
	state: () => {
		return {
			countries: [] as CountryType[]
		}
	},
	getters: {
		getCountries: (state) => state.countries,
	},
	actions: {
		async fetchCountries() {
			try {
				const res = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,flag')
				this.countries = res.data
			} catch (error) {
				return window.alert('Erro ao buscar países.')
			}
		}
	}
})