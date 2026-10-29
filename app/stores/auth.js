import { defineStore } from 'pinia'

// auth is the name of the store. It is unique across your application
// and will appear in devtools
export const useAuthStore = defineStore('auth', {
  // a function that returns a fresh state
  state: () => ({
    Id: '',
    FirstName: 'John',
    LastName: 'Doe',
    Email: 'john.doe@example.com',
    companyName: 'Example Inc.',
    siteName: 'Some Site Name',
    title: '',
    depts: [],
    logoPath: '/img/client/logos/coeur-mining.png',
    authToken: ''
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    user: (state) => ({
      id: state.Id,
      firstName: state.FirstName,
      lastName: state.LastName,
      email: state.Email,
      company: state.companyName,
      title: state.title,
      logo: state.logoPath,
      site: state.siteName,
    }),
    departments: (state) => state.depts,
    accessToken: (state) => state.authToken
  },

  // Enable persistence - pinia-plugin-persistedstate
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })
  },

  // optional actions
  actions: {
    setUser(user) {
      this.Id = user.Id
      this.FirstName = user.FirstName
      this.LastName = user.LastName
      this.Email = user.Email
      this.companyName = user.Account.Name
      //this.siteName = user.siteName
      this.title = user.Title
      this.depts = user.Department_Managers__r.records.map(dm => dm.Department__r) || []
      //this.logoPath = user.logoPath
    },
    setFirstName(firstName) {
      this.FirstName = firstName
    },
    setLastName(lastName) {
      this.LastName = lastName
    },
    setEmail(email) {
      this.Email = email
    },
    setAccessToken(authToken) {
      console.log('Setting access token:', authToken.substring(0, 10) + '...')
      this.authToken = authToken
    },
    reset() {
      // `this` is the store instance
      this.authToken = ''
      // this.FirstName = ''
      // this.LastName = ''
      // this.Email = ''
      // this.companyName = ''
      // this.siteName = ''
      // this.titleName = ''
      // this.departmentName = ''
      // this.logoPath = ''
    },
  },
})