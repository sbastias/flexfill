import { defineStore } from 'pinia'

// auth is the name of the store. It is unique across your application
// and will appear in devtools
export const useAuthStore = defineStore('auth', {
  // a function that returns a fresh state
  state: () => ({
    FirstName: 'John',
    LastName: 'Doe',
    Email: 'john.doe@example.com',
    companyName: 'Example Inc.',
    siteName: 'Some Site Name',
    titleName: 'Supervisor',
    departmentName: 'Mobile Maintenance',
    logoPath: '/img/client/logos/coeur-mining.png'
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    firstName: (state) => state.FirstName,
    lastName: (state) => state.LastName,
    fullName: (state) => `${state.FirstName} ${state.LastName}`,
    company: (state) => state.companyName,
    title: (state) => state.titleName,
    department: (state) => state.departmentName,
    logo: (state) => state.logoPath,
    site: (state) => state.siteName,
  },
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
      this.FirstName = ''
      this.LastName = ''
      this.Email = ''
    },
  },
})