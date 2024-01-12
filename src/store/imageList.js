import {defineStore} from "pinia";
import {computed, ref, watch} from 'vue'

export const useImageStore = defineStore('image', () => {
    let activeId = ref(0)

    return { activeId }
})
