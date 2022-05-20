<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title  class="font-weight-regular display-2">
          <span class="logo-mini">Seguimiento de Servicios</span>

        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

        <v-list dense nav>
           <v-list-item  :to="'/'">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>

          <v-list dense nav>
           <v-list-item  :to="'/confirmarServicio'">
          <v-list-item-icon>
            <v-icon>mdi-calendar-range</v-icon>
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title>Confirmar Servicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
          <v-list dense nav>
           <v-list-item  :to="'/onhire'">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title>On-Hire</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>



      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/'
        },
        {
          icon: 'mdi-calendar-range',
          title: 'Confirmar Servicio',
          to: '/confirmarServicio'
        },
        {
          icon: 'mdi-clipboard-clock-outline',
          title: 'On Hire',
          to: '/onhire'
        },


      ]
    }),

    computed: {
      logueado() {
        return this.$store.state.usuario;
      },
      esRoot() {
        return this.$store.state.usuario && this.store.state.usuario.rol === 'root';
      },
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        }
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {

          group: '',
          title: 'Jordy Can',
          children: [
            {
              href: '',
              title: this.$t('my-profile')
            },
            {
              to: '',
              title: this.$t('edit-profile')
            },
            {
              to: '',
              title: this.$t('settings')
            }
          ]
        }
      }
    },

    watch: {
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val)
      }
    },
    created() {
      this.$store.dispatch("autoLogin")
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title)
        }
      },
    }
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
