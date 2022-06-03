<template>

  <v-container
    id="login"
    fill-height
    tag="section"
  >

    <v-row justify="center">

      <v-slide-y-transition appear>

        <base-material-card
          color="#31467C"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >

          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">

            <v-text-field
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
              v-model="email"
            />

            <v-text-field
              class="mb-8"
              color="secondary"
              label="Password..."
              prepend-icon="mdi-lock-outline"
              v-model="password"
            />

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text "
              @click="ingresar"
            >
              Iniciar Sesión
            </pages-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('./components/Btn')
    },

    data: () => ({
      email: '',
      password: '',
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box'
        },
        {
          href: '#',
          icon: 'mdi-twitter'
        },
        {
          href: '#',
          icon: 'mdi-github-box'
        }
      ]
    }),
    methods: {
      ingresar() {
        axios.post("usuario/login", { email: this.email, password: this.password })
        .then(respuesta => respuesta.data)
        .then(data => {
          this.$store.dispatch("guardarToken", data.tokenReturn);
          this.$router.push({ name: 'Dashboard' })
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
