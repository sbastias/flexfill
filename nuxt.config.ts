const trackerURL = (env => {
  switch (env) {
    case 'development':
    default:
      return process.env.TRACKER_URL || 'http://localhost:8011'
    
  }
})(process.env.NODE_ENV)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      trackerURL,
      FLEXFILL_API_URL: process.env.FLEXFILL_API_URL || 'http://localhost:8011/flexfill'
    },
    private: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || ''
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/scripts'],
  scripts: {
    registry: {
      // Register infrastructure without loading Maps on every page.
      // <ScriptGoogleMaps> will load it after its element trigger fires.
      googleMaps: {
        trigger: 'onNuxtReady'
      },
    },
  },
})