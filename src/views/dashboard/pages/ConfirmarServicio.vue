<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="">
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card color="#31467C" icon="mdi-ferry">
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
             Confirmar Servicio
              <span class="body-1">— Completa todos los campos</span>
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Arrow Marine Logistics Services"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                 <v-select
                :items="embarcaciones"

                label="Embarcaciones"
              />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                :items="agencias"

                label="Agencias"
              />
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                >
                      <v-menu
                    ref="menu2"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      min-width="290px"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date3"
                          color="secondary"
                           label="Fecha tentativa"
                          prepend-icon="mdi-calendar-outline"
                          readonly
                          v-on="on"
                        />
                      </template>

                      <v-date-picker
                        v-model="date3"
                        color="secondary"
                        landscape
                        scrollable
                        @input="menu3 = false"
                      >
                        <v-spacer />

                        <v-btn
                          color="secondary"
                          large
                          @click="menu3 = false"
                        >
                          Cancel
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="time"
                        label="Hora tentativa"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Programa a realizar"
                    value=""
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="#31467C"
                    class="mr-0"
                  >
                    Guardar Servicio Tentativo
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        embarcacion: '',
        embarcaciones: [],
        agencia: '',
        agencias: [],
       date: '',
      date2: '2019-09-26',
      date3: '',
        time: null,
        menu2: false,
      menu: false,

      menu3: false,
      }
    },
       created () {
          this.selectEmbarcaciones();
          this.selectAgencias()
        },

    methods: {
       selectEmbarcaciones() {
            const me = this;
            let embarcacionArray = [];
            const header = { "Token": this.$store.state.token };
            const configuracion = { headers: header }
            axios.get('embarcacion/listActivos', configuracion).then((response) => {
              embarcacionArray = response.data;
              embarcacionArray.map(function(x){
                me.embarcaciones.push({text:x.nombre, value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
          },

           selectAgencias() {
            const me = this;
            let agencaiArray = [];
            const header = {"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('agencia/list',configuracion).then((response)=>{
              agencaiArray=response.data;
              agencaiArray.map(function(x){
                me.agencias.push({text:x.nombre, value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
          },
    }
  }
</script>
