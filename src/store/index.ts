import { defineStore } from 'pinia'

const useStore = defineStore('mainStore', {
  state: () => {
    return {
      counter: 0,
      lastName: 'Michael',
      firstName: 'Michael'
    }
  },
  getters: {
    fullName: state => `${state.firstName} ${state.lastName}`,
    getCounter: state => state.counter
  },
  actions: {
    increment () {
      this.counter++
    }
  }
})

export default useStore
