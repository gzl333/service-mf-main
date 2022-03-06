import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useStore = defineStore('main', {
  state: () => {
    return {
      counter: 0,
      lastName: 'Michael',
      firstName: 'Michael'
    }
  },
  getters: {
    fullName: state => `${state.firstName} ${state.lastName}`,
    totalCount: state => state.counter
  },
  actions: {
    increment () {
      this.counter++
    }
  }
})

export default useStore
