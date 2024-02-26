import {computed, reactive, ref} from 'vue'
import { defineStore } from 'pinia'
import {child, get, getDatabase} from "firebase/database";
import {getCurrentInstance} from "vue";
import {ref as dbRef} from "@firebase/database";


export const useDetailInfoStore = defineStore('detail', () => {
  const products = ref([])

  const setProducts = (products) => {
    products.value = products
  }


  return { products, setProducts }
})
