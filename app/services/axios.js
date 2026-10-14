const axios = require('axios')

const URLS = (env => {
  switch (env) {
    case 'development': return {
      baseURL: 'http://localhost:3332',
      trackerSocketURL: 'ws://localhost:8013',
      payrollSocketURL: 'ws://localhost:8111'
    }
    case 'localtest': return {
      baseURL: 'http://localhost:3332',
      trackerSocketURL: 'ws://localhost:8013',
      payrollSocketURL: 'ws://localhost:8111'
    }
    case 'remotetest': return {
      baseURL: 'https://payroll.starla.bullittstaffing.com/test',
      trackerSocketURL: 'https://sockets.starla.bullittstaffing.com',
      payrollSocketURL: 'https://sockets.starla.bullittstaffing.com'
    }
    case 'production': return {
      baseURL: 'https://payroll.starla.bullittstaffing.com',
      trackerSocketURL: 'https://sockets.starla.bullittstaffing.com',
      payrollSocketURL: 'https://sockets.starla.bullittstaffing.com'
    }
  }
})(process.env.SETTINGS || 'production') 

const axiosPayroll = axios.create({
  baseURL: URLS.baseURL
})

const axiosTracker = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://tracker.starla.bullittstaffing.com' : 'http://localhost:8011'
})

module.exports = {
  axiosPayroll,
  axiosTracker
}