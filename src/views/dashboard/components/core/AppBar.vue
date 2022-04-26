<template>
  <v-app-bar
    absolute
    app
    color="transparent"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      class="mb-2"
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUP"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

       <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        flat
        nav
      >
        <template>
          <v-divider
            class="mb-2 mt-2"
          />

          <app-bar-item
          >
            <v-list-item-title @click="salir">Salir</v-list-item-title>
          </app-bar-item>
        </template>

      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render(h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                }, this.$slots.default)
            }
          })
        }
      }
    },

    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        `You're now friends with Andrew`,
        'Another Notification',
        'Another one'
      ],
      profile: [
        { title: 'Profile' },
        { title: 'Settings' },
        { divider: true },
        { title: 'Log out' }
      ]
    }),

    computed: {
      ...mapState(['drawer'])
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER'
      }),
      salir() {
        this.$store.dispatch('salir')
      }
    }
  }
</script>
