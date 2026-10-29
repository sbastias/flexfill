<script setup>
const { FLEXFILL_API_URL } = useRuntimeConfig().public
const Router = useRouter()
const Toaster = useToaster()
const AuthStore = useAuthStore()

definePageMeta({
  layout: 'login'
})

// const showPassword = ref(false)
// const togglePasswordVisibility = () => {
//   showPassword.value = !showPassword.value
// }

const TESTEMAIL = 'rob.kokesch@equinoxgold.com'

const otpinput = ref(null)
const email = ref(TESTEMAIL)
const otp = ref('')
const otpSent = ref(false)
const verificationState = ref('idle')

const sendOTP = async () => {

  await fetch(`${FLEXFILL_API_URL}/auth/otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value }) // Replace with actual email value
  })
  .then(async response => {
    if (!response.ok) {
      let errorData = await response.json()
      throw errorData
    }

    otpSent.value = true
    verificationState.value = 'otpSent'


  })
  .catch(error => {
    Toaster.activate({message: error?.message || 'Failed to verify OTP', status: 'error'})
  })
  

  
}

const verifyOTP = async () => {
  // Implement OTP verification logic here
  verificationState.value = 'verifying'

  await fetch(`${FLEXFILL_API_URL}/auth/otp/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value, otp: otp.value }) // Replace with actual email and OTP values
  })
  .then(async response => {
    if (!response.ok) {
      let errorData = await response.json()
      throw errorData
    }

    let {message, payload} = await response.json()
    verificationState.value = 'verified'



    Toaster.activate({message, status: 'success'})

    AuthStore.setAccessToken(payload.token)
    AuthStore.setUser(payload.user)
    //console.log('Access token set in store:', AuthStore.accessToken)

    Router.push('/')

  })
  .catch(error => {
    verificationState.value = 'error'
    Toaster.activate({message: error?.message || 'Failed to verify OTP', status: 'error'})
  })
  .finally(() => {
    otp.value = ''
  })
}

const forceFocus = () => {
  if (verificationState.value === 'otpSent') {
    otpinput.value?.focus()
  }
}

const reset = () => {
  email.value = TESTEMAIL
  otp.value = ''
  otpSent.value = false
}


watch(otpinput, (newValue) => {
  console.log('OTP input changed:', newValue)
  if (newValue) {
    nextTick(() => {
      otpinput.value?.focus()
    })
    
  }
})

</script>
<template>
  <div class="login-container">


    <section class="login-card" aria-label="Login form">
      <div class="logo-placeholder" role="img" aria-label="Company logo placeholder">
        Flexfill
      </div>
      <div class="form-container">
        <transition name="fade" mode="out-in">
          <form class="login-form email-entry" @submit.prevent="sendOTP" novalidate v-if="!otpSent" key="enter-email">

            <div>
              <label for="email">Email</label>
              <input id="email" type="email" placeholder="name@example.com" autocomplete="email" required
                v-model="email">
            </div>

            

            <button class="submit-button" type="submit">Get One Time Passcode</button>

            <p class="signup-copy">
              New here?
              <a href="#" aria-label="Sign up placeholder">Create an account</a>
            </p>


          </form>

          <form v-else class="login-form otp-entry" @submit.prevent="verifyOTP" novalidate key="verify-otp">

            <div>
              <label for="otp">One Time Passcode</label>

              <div style="height: 0; overflow: hidden; opacity: 0;">
                <input @blur="forceFocus" ref="otpinput" id="otp" maxlength="6" type="text" placeholder="Enter the OTP" autocomplete="one-time-code" required v-model="otp">
              </div>
              <div class="otp-echo">
                <span>{{ otp[0] || '' }}</span>
                <span>{{ otp[1] || '' }}</span>
                <span>{{ otp[2] || '' }}</span>
                <span>{{ otp[3] || '' }}</span>
                <span>{{ otp[4] || '' }}</span>
                <span>{{ otp[5] || '' }}</span>
              </div>
            </div>

            <button class="submit-button" type="submit">Verify OTP</button>

            <p class="signup-copy">
              <a href="#" aria-label="Sign up placeholder" @click.prevent="reset">Re-enter Email</a>
            </p>
          </form>



        </transition>
      </div>

    </section>

  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  // background: linear-gradient(180deg, #f2f4f8 0%, #dde7f4 100%);
}

.login-card {
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 1.25rem 2.5rem rgba(15, 23, 42, 0.12);
  position: relative;
}

.logo-placeholder {

  margin: 0 auto 1.25rem;
  border: 2px solid #7c8aa0;
  border-radius: .4rem;
  display: grid;
  place-items: center;
  color: #475569;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0;
  font-family: 'Work Sans', sans-serif;
  padding: 1rem;
}

h1 {
  margin: 0;
  text-align: center;
  color: #0f172a;
}

.form-subtitle {
  margin: 0.5rem 0 1.5rem;
  text-align: center;
  color: #475569;
}

.form-container {
  position: relative;
  width: 100%;
  height: 12rem;
  padding: 1rem;


  .login-form {

    &.email-entry {
      gap: 1rem;
    }

    &.otp-entry {
      gap: 0.5rem;
    }
    display: grid;
    position: absolute;
    inset: 1rem 0;

    .otp-echo {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 0.5rem;
      margin-bottom: 0rem;

      span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.618rem;
        font-family: 'Work Sans', sans-serif;
        font-weight: 700;
        aspect-ratio: 1 / 1.1618;
        line-height: 2rem;
        text-align: center;
        border: 1px solid #cbd5e1;
        border-radius: 0.4rem;
        color: #858ef2;
      }
    }


  }
}

label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  font-family: 'Work Sans', sans-serif;
  text-transform: uppercase;
}

input {
  width: 100%;
  font-family: inherit;
  border: 1px solid #cbd5e1;
  border-radius: 0.4rem;
  padding: 0.7rem 0.85rem;
  font-size: 1rem;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.password-field {
  position: relative;
}

.password-field input {
  padding-right: 2.75rem;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 0;
  width: auto;
  display: inline-block;
}

.password-toggle svg {
  width: 1.1rem;
  height: 1.1rem;
}

.submit-button {
  margin-top: 0.75rem;
  border: 0;
  border-radius: 0.625rem;
  padding: 0.75rem;
  background: var(--primary-color);
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background: #1e40af;
}

.signup-copy {
  margin: 0.5rem auto;
  color: #334155;
  font-size: 0.95rem;
}

.signup-copy a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.signup-copy a:hover {
  text-decoration: underline;
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  transform: translateY(2rem);
}

.fade-leave-to {
  transform: translateY(-2rem);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>



<!--div>
          <label for="password">Password</label>
          <div class="password-field">
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            autocomplete="current-password"
            required
          >
          <button
            class="password-toggle"
            type="button"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="togglePasswordVisibility"
          >
            <svg
              v-if="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.89 1 12c.68-1.93 1.86-3.63 3.36-4.94" />
              <path d="M9.9 4.24A10.95 10.95 0 0 1 12 4c5 0 9.27 3.11 11 8a11.17 11.17 0 0 1-1.54 2.57" />
              <path d="m1 1 22 22" />
              <path d="M9.53 9.53a3 3 0 0 0 4.24 4.24" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          </div>
        </div-->