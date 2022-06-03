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
            <div v-if="editedIndex" class="font-weight-light card-title mt-2">
             Editar Servicio
              <span class="body-2">— Completa todos los campos</span>
            </div>
            <div v-if="editedIndex==false" class="font-weight-light card-title mt-2">
            Movimientos
              <span class="body-2">— Completa todos los campos</span>
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>


                <v-col
                  cols="12"
                  md="12"
                >
                <v-select
                    :items="serviciosFirmados"
                    label="Servicios"
                    @input="mostrarMovimientosRegistrados"
                    v-model="tipoServicio"
                  />
                </v-col>
                 <v-col
                  cols="12"
                  md="4"
                >
                <v-select
                    :items="tipMovimientos"
                    label="Tipo de Movimientos"

                    v-model="tipoMovimiento"
                  />
                </v-col>
                 <v-col
                  cols="12"
                  md="3"
                >
                   <v-text-field
                      label="Horario"
                      type="datetime-local"
                      v-model="horario"
                   ></v-text-field>
                </v-col>
                 <v-col
                  cols="12"
                  md="4"
                >
                   <v-text-field
                      label="Movimiento"

                      v-model="movimiento"
                   ></v-text-field>
                </v-col>


                <v-col cols="12" md="1" class="text-right">

                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        @click="agregarMovimiento"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                </v-col>

              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
         <base-material-card
            color="#31467C"
            icon="mdi-clipboard-text"
          > <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
             Movimientos Registrados
            </div>
          </template>
      <v-data-table
        :headers="headers"
        :items="movimientosRegistrados "


      >

        <template   v-slot:[`item.action`]="{ item }">


             <v-btn  @click="eliminarRegistro(item)" class="px-2 ml-1" color="red"  dark v-bind="attrs" v-on="on" min-width="0" small>
                     <v-icon small>mdi-delete</v-icon>
               </v-btn>

        </template>
         <template  v-slot:[`item.horario`]="{ item }">
          {{moment(item.horario).format('MMMM Do YYYY, h:mm a')}}
        </template>
         <template  v-slot:[`item.tipoMovimiento`]="{ item }">
           <v-chip small class="ma-2" color="#a84cbd" text-color="white" v-if="item.tipoMovimiento=='Arribo'">
            <v-avatar left>
              <v-icon small>mdi-ferry</v-icon>
            </v-avatar>Arribo
          </v-chip>
          <v-chip small class="ma-2" color="#008d9a" text-color="white" v-if="item.tipoMovimiento=='Zarpe'">
            <v-avatar left>
              <v-icon small>mdi-anchor</v-icon>
            </v-avatar>Zarpe
          </v-chip>
          <v-chip small class="ma-2" color="#0085c1" text-color="white" v-if="item.tipoMovimiento=='Movimiento Interno'">
            <v-avatar left>
              <v-icon small>mdi-waves</v-icon>
            </v-avatar>Movimiento Interno
          </v-chip>
           <v-chip small class="ma-2" color="#605bde" text-color="white" v-if="item.tipoMovimiento=='Enmienda'">
            <v-avatar left>
              <v-icon small>mdi-waves</v-icon>
            </v-avatar>Enmienda
          </v-chip>
        </template>

      </v-data-table>

      <v-dialog v-model="dialogCancelar" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">
          ¿Seguro que decea cancelar el servicio?
        </v-card-title>
        <v-card-text>Al cancelar este registro, ya no podra modificarlo</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogCancelar = false"
          >
            Salir
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click=" cancelarServicio(_idCancelarv)"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="dialogConfirmar" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">
          ¿Seguro que decea confirmar el servicio?
        </v-card-title>
        <v-card-text>El registro quedará con estatus Confirmado, el departamento de Log y Ag le dara seguimiento</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogConfirmar = false"
          >
            Salir
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click=" confirmarServicio(_idConfirmar)"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </base-material-card>
     <v-btn
        color="primary"
        @click="servicioSeleccionadoSave()"
      >Guardar

                      </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import emailjs from "emailjs-com";
import moment from 'moment'
  export default {
    data() {
      return {
        moment:moment,
         headers: [
          {
            text: 'Actions',
            value: 'action'
          },
          {
            text: 'Tipo de Movimiento',
            value: 'tipoMovimiento'
          },
          {
            text: 'Horario',
            value:'horario'
          },
          {
            text: 'Movimiento',
            value: 'movimiento'
          },

      ],
        embarcacion: '',
        dialogConfirmar:false,
        _idConfirmar : '',
        embarcaciones: [],
        agencia: '',
        horario:'',
        movimiento:'',
        _idCancelarv:'',
        dialog:false,
        serviciosFirmados:[],
        tipMovimientos:['Arribo','Movimiento Interno','Zarpe','Enmienda'],
        tipoMovimiento:'',
        mostrarEmbarcacion: false,
        tipoServicio:'',
        cliente:'',
        esNuevo:'',
        _idMov:'',
        dialogCancelar:false,
        agencias: [],
        puertos:['Ciudad del Carmen','Dos Bocas','Chiltepec','Frontera','Seybaplaya'],
        puerto:'',
        editedIndex:false,
        programa:'',
        direction:'',
        movimientosPorServicio:[],
        colors:'',
        movimientosRegistrados:[],
        snackbar: false,
        servicios:['Fletamento','Cambio de Guardia','Tramite de Despacho'],
       date: '',
      date2: '2019-09-26',
      date3: '',
        time: null,
        menu2: false,
      menu: false,
fechaTentativa:'',
      menu3: false,
      servicionTentativos:[]
      }
    },
       created () {

          this.listarServicios()
          this.emailIn();
        },

    methods: {

      emailIn() {
        emailjs.init("user_QA8qMBuyHCQIHTgR0AsPx");
      },

      enviar(_id,folio_ss,embarcacion,puerto,estado,ejecutiva,correo)
      {
        var template_params = {
          _id: _id,
          folio_ss:folio_ss,
          embarcacion: embarcacion,
          puerto: puerto,
          estado: estado,
          ejecutiva:ejecutiva,
          correo:correo
        };

        emailjs.send("service_wfxf2xx", "servicioConfirmado", template_params).then(
          function(response) {
            if (response.text === "OK") {
            }
            console.log(
              "SUCCESS. status=%d, text=%s",
              response.status,
              response.text
            );
          },
          function(err) {
            alert("Ocurrió un problema al enviar el correo");
            console.log("FAILED. error=", err);
          }
        );
    },

    listarEmbarcacion(_id,folio_ss,embarcacion,puerto,estatus,ejecutiva,correo) {
      let header = { Token: this.$store.state.token };
      let me = this;
      let embarcacion2;

      let configuracion = { headers: header };
      axios
        .get("embarcacion/query?_id=" + embarcacion, configuracion)
        .then(function(response) {
          embarcacion2 = response.data;
          me.enviar(_id,folio_ss,embarcacion2,puerto,estatus,ejecutiva,correo);
        })
        .catch(function(error) {
          console.log(error);
        });
    },






           listarServicios() {
            const me = this;
            let agencaiArray = [];
            const header = {"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('confirmarServicio/onHireFirmado',configuracion).then((response)=>{
              agencaiArray=response.data;
              agencaiArray.map(function(x){
                me.serviciosFirmados.push({text:'Servicio de '+x.tipoServicio+' con la embarcacion '+x.embarcacion.nombre+' con el cliente '+x.cliente+' para '+x.programa, value:x._id})
              });

            }).catch(function(error){
              console.log(error);
            })
          },

          servicioSeleccionado(){
            if(this.tipoServicio==='Fletamento'){
              this.mostrarEmbarcacion = true
            }else{
              this.mostrarEmbarcacion = false
            }
          },



          limpiar(){
             this._idMov='';
             this.movimiento='';
             this.horario='';
             this.tipoMovimiento=''
            },

            servicioSeleccionadoSave(){
              let me = this;
              let header = { Token: this.$store.state.token };
              let configuracion = { headers: header };

              if(this.esNuevo){
                axios.post("movimientos/add",
                    {
                      movimientos:this.movimientosRegistrados
                    },
                    configuracion
                  )
                  .then(function(response) {
                    me.addSuccessNotification('Registro editado exitosamente')
                    axios.put("confirmarServicio/addMovimiento",{_id:me.tipoServicio,movimientos:response.data._id},configuracion)
                    me.limpiar()
                    me.listar()
                  })
                  .catch(function(error) {
                  });
              }else{
                 axios.put("movimientos/update",
                    {
                      _id:me._idMov,
                      movimientos:me.movimientosRegistrados
                    },
                    configuracion
                  )
                  .then(function(response) {
                    me.addSuccessNotification('Registro editado exitosamente')
                    me.limpiar()
                    me.listar()
                  })
                  .catch(function(error) {
                  });
              }

            },

              eliminarRegistro(item){
           let i = this.movimientosRegistrados.indexOf(item)
           if (i != -1) {
                this.movimientosRegistrados.splice(i, 1);
            }
        },

            mostrarMovimientosRegistrados(){
              let header={"Token":this.$store.state.token};
              let configuracion= {headers: header}
              let me=this;
              axios.get('confirmarServicio/listMovimientos?_id='+this.tipoServicio,configuracion).then(function (response){
             // me.movimientosPorServicio=response.data.movimientos.movimientos;
            //  me.movimientosRegistrados = me.movimientosPorServicio
            if(response.data == false){
              me.esNuevo = true
              me.movimientosRegistrados = []
            }else{
              me.movimientosRegistrados = response.data.movimientos
              me.esNuevo = false
              me._idMov = response.data._id
              console.log(me._idMov)
            }

              }).catch(function(error){
                console.log(error)
              })
            },



          editItem(item){
            this.tipoServicio = item.tipoServicio,
            this.embarcacion = item.embarcacion._id,
            this.agencia = item.agencia._id,
            this.puerto = item.puerto,
            this.fechaTentativa = item.fechaTentativa
            this.cliente = item.cliente
            this.programa = item.programa,
            this._id = item._id
            this.editedIndex = true
          },

          agregarMovimiento(){
            this.movimientosRegistrados.push({
              tipoMovimiento:this.tipoMovimiento,
              horario:this.horario,
              movimiento:this.movimiento
            })
          },




            addErrorNotification() {
                this.$toast.error("Error, verifique los campos ingresados", {
                position: 'bottom-right',
                timeout: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true
            });
        },
         addSuccessNotification(mensaje) {
                this.$toast.success(mensaje, {
                position: 'top-right',
                timeout: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true
            });
        },
    },
    }
</script>
