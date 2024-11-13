import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { LocalStorage } from 'quasar'

export const useBlurMode = defineStore('blurMode', () => {
	const blurMode = ref(LocalStorage.getItem('blurMode'))
	const isKanban = ref(false)

	watch(blurMode, () => {
		LocalStorage.set('blurMode', blurMode.value)
		toggleClassBody()
	})

	watch(isKanban, () => toggleClassBody())

	function toggleClassBody() {
		blurMode.value && isKanban.value
			? document.body.classList.add('blur--mode')
			: document.body.classList.remove('blur--mode')
	}

	return { blurMode, isKanban }
})
