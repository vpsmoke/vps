import { defineStore } from "pinia";
import { ref } from 'vue';

export const useMenuStore = defineStore('menuStore', () => {
    const state = ref({
        open: false,
        hover: false,
        passive: true,
    })

    function handleUpdateState(param) {

        state.value = {
            ...state.value,
            ...param
        }

    }

    return {
        state, handleUpdateState
    }
});