<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'login'
})

const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const goHome = (event) => {
  event.preventDefault()
  window.location = '/'
}
</script>
<template>
  <div class="login-container">
    <section class="login-card" aria-label="Login form">
      <div class="logo-placeholder" role="img" aria-label="Company logo placeholder">
        LOGO
      </div>

      <form class="login-form" @submit.prevent="goHome" novalidate>

        <div>
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="name@example.com" autocomplete="email" required>
        </div>

        <div>
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
        </div>

        <button class="submit-button" type="submit">Sign in</button>

        <p class="signup-copy">
          New here?
          <a href="#" aria-label="Sign up placeholder">Create an account</a>
        </p>
      </form>
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
  }

  .logo-placeholder {
    width: 5rem;
    height: 5rem;
    margin: 0 auto 1.25rem;
    border: 2px dashed #7c8aa0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #475569;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
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

  .login-form {
    display: grid;
    gap: 1rem;
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
    margin: 0.75rem 0 0;
    text-align: center;
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
</style>