import { defineStore } from "pinia";
import { ref } from 'vue';

export const useTableStore = defineStore('tableStore', () => {
    const search = ref('');
    const pagination = ref({
        rowsPerPage: 5
    });



    return {
        search, pagination
    }
});