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
             Nuevo Servicio
              <span class="body-2">— Completa todos los campos</span>
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
                    :items="servicios"
                    label="Tipo de Servicios"
                    :change="servicioSeleccionado()"
                    v-model="tipoServicio"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                  v-if="this.mostrarEmbarcacion"
                >
                 <v-select
                :items="embarcaciones"
                 v-model="embarcacion"
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
                    v-model="agencia"
                  />
                </v-col>

                  <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    :items="puertos"
                    label="Puerto"
                    v-model="puerto"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                   <v-text-field
                      label="Fecha tentativa"
                      type="datetime-local"
                      v-model="fechaTentativa"
                   ></v-text-field>
                </v-col>
                  <v-col
                  cols="12"
                  md="4"
                >
                   <v-text-field
                      label="Cliente"
                      v-model="cliente"
                   ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-textarea
                    class="purple-input"
                    label="Programa a realizar"
                    value=""
                    v-model="programa"
                  />

                </v-col>

                <v-col cols="10" class="text-right">
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn    v-if="!editedIndex" color="primary" dark v-bind="attrs" v-on="on">
                     Nuevo Servicio Tentativo
                    </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="text-h5">
                          ¿Registrar nuevo servicio tentativo?
                        </v-card-title>
                        <v-card-text>Se realizará el registro del servicio y quedara en estatus de "Servicio Tentativo" en espera de su confirmación</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                          >
                            Salir
                          </v-btn>
                          <v-btn
                            color="#31467C"
                            class="mr-0"

                            text
                            @click="guardar"

                          >
                            Guardar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                  <v-btn
                    color="#31467C"
                    class="mr-0"
                    @click="guardar"
                    v-if="editedIndex"
                  >
                    Editar Servicio Tentativo
                  </v-btn>


                </v-col>
                 <v-col
                  cols="1"
                  class="text-right"
                >

                  <v-btn
                    color="#66B6BC"
                    class="mr-0"
                    @click="salirEdicion"
                    v-if="editedIndex"
                  >
                    Salir de edicion
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
             Mis servicios
            </div>
          </template>
      <v-data-table
        :headers="headers"
        :items="servicionTentativos "
        :search.sync="search"
        :sort-by="['tipoServicio', 'puerto']"
        multi-sort
      >
        <template v-slot:item.estado="{ item }">
          <v-chip small class="ma-2" color="orange" text-color="white" v-if="item.estado=='En Proceso'">
            <v-avatar left>
              <v-icon small>mdi-restore</v-icon>
            </v-avatar>Tentativo
          </v-chip>

          <v-chip small class="ma-2" color="success" text-color="white" v-if="item.estado=='Confirmado'">
            <v-avatar left>
              <v-icon small>mdi-check</v-icon>
            </v-avatar>Confirmado
          </v-chip>
           <v-chip small class="ma-2" color="orange" text-color="white" v-if="item.estado=='On Hire Realizado'">
            <v-avatar left>
              <v-icon small>mdi-toggle-switch</v-icon>
            </v-avatar>On Hire Pendiente de Firma
          </v-chip>
          <v-chip small class="ma-2" color="error" text-color="white" v-if="item.estado=='Cancelado'">
            <v-avatar left>
              <v-icon small>mdi-close</v-icon>
            </v-avatar>Cancelado
          </v-chip>
           <v-chip small class="ma-2" color="blue" text-color="white" v-if="item.estado=='On-Hire Firmado'">
            <v-avatar left>
              <v-icon small>mdi-toggle-switch</v-icon>
            </v-avatar>On-Hire Firmado
          </v-chip>
           <v-chip small class="ma-2" color="purple" text-color="white" v-if="item.estado=='En Transito'">
            <v-avatar left>
              <v-icon small>mdi-chart-timeline-variant-shimmer</v-icon>
            </v-avatar>En ruta
          </v-chip>


        </template>
        <template  v-slot:item.action="{ item }">


             <v-btn v-if="item.estado=='En Proceso' || item.estado=='Confirmado'" class="px-2 ml-1" color="red"  @click="dialogCancelarEjecutar(item)" dark v-bind="attrs" v-on="on" min-width="0" small>
                     <v-icon small>mdi-close</v-icon>
               </v-btn>
            <v-btn v-if="item.estado=='En Proceso' " class="px-2 ml-1" color="orange" @click="editItem(item)" min-width="0" small>
                <v-icon small>mdi-pencil</v-icon>
           </v-btn>
            <v-btn v-if="item.estado=='En Proceso'" class="px-2 ml-1" @click="dialogConfirmarEjecutar(item,1)" color="success" min-width="0" small>
                <v-icon small>mdi-check</v-icon>
           </v-btn>
           <v-btn v-if="item.estado=='On Hire Realizado'" class="px-2 ml-1" @click="confirmarServicio(item)" color="orange" min-width="0" small>
                <v-icon small>mdi-toggle-switch</v-icon>
           </v-btn>
            <v-btn v-if="item.estado=='On Hire Realizado'" class="px-2 ml-1" @click="confirmarServicio(item)" color="orange" min-width="0" small>
                <v-icon small>mdi-toggle-switch</v-icon>
           </v-btn>
            <v-btn v-if="item.estado=='On-Hire Firmado'" class="px-2 ml-1" @click="confirmarServicio(item)" color="blue" min-width="0" small>
                <v-icon small>mdi-monitor-arrow-down-variant</v-icon>
           </v-btn>
        </template>
         <template  v-slot:item.fechaTentativa="{ item }">
          {{moment(item.fechaTentativa).format('MMMM Do YYYY, h:mm a')}}
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
     <v-dialog v-model="dialogConfirmar" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          ¿Seguro que decea confirmar el servicio?
        </v-card-title>
        <v-card-text>El registro quedará con estatus Confirmado, el departamento de Log y Ag le dara seguimiento</v-card-text>
          <v-card-text>
            <v-file-input
              v-model="cotizacion"
              label="Cotizacion"
            ></v-file-input>
              <v-file-input
              v-model="pedido"
              label="Pedido"
            ></v-file-input>
          </v-card-text>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import emailjs from "emailjs-com";
import moment from 'moment'
import S3 from "aws-s3";
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
            text: 'Tipo de servicio',
            value: 'tipoServicio'
          },
          {
            text: 'Folio',
            value:'folio_ss'
          },
          {
            text: 'Agencia',
            value: 'agencia.nombre'
          },
          {
            text: 'Embarcacion',
            value: 'embarcacion.nombre'
          },
          {
            text: 'Puerto',
            value: 'puerto'
          },
          {
            text: 'Tentativo',
            value: 'fechaTentativa'
          },
          {
            sortable: false,
            text: 'Guia de Seguimiento',
            value: '_id'
          },
          {
            sortable: false,
            text: 'Estatus',
            value: 'estado'
          }
      ],
        embarcacion: '',
        dialogConfirmar:false,
        _idConfirmar : '',
        embarcaciones: [],
        agencia: '',
        _idCancelarv:'',
        dialog:false,
        mostrarEmbarcacion: false,
        tipoServicio:'',
        cliente:'',
        dialogCancelar:false,
        agencias: [],
        puertos:['Ciudad del Carmen','Dos Bocas','Chiltepec','Frontera','Seybaplaya'],
        puerto:'',
        editedIndex:false,
        programa:'',
        cotizacion:'',
        pedido:'',
        direction:'',
        colors:'',
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

    computed:{
      config() {
        return {
          bucketName: "sam-amls",
          dirName: "cot" /* optional */,
          region: "us-west-1",
          accessKeyId: "AKIAVFDVDRT4BXZ5HKXK",
          secretAccessKey: "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",
          s3Url: this.baseUrl
        };
      },
       baseUrl() {
        return "https://sam-amls.s3.us-west-1.amazonaws.com";
      },
      S3Client() {
      return new S3(this.config);
    },
     newFileName() {
      return Math.random()
        .toString()
        .slice(2);
    },
      url() {
      return `${this.baseUrl}/${"cot"}/`;
    },

    },


       created () {
          this.selectEmbarcaciones();
          this.selectAgencias();
          this.listar()
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
          servicioSeleccionado(){
            if(this.tipoServicio==='Fletamento'){
              this.mostrarEmbarcacion = true
            }else{
              this.mostrarEmbarcacion = false
            }
          },



          limpiar(){
              this.embarcacion='',
              this.agencia='',
              this.tipoServicio='',
              this.puerto='',
              this.fechaTentativa='',
              this.programa='',
              this.editedIndex = false
              this._id=''
            },

             guardar() {
              let me = this;
              let header = { Token: this.$store.state.token };
              let configuracion = { headers: header };
              this.dialog=false
              if(this.editedIndex){
                axios
                  .put(
                    "confirmarServicio/edit",
                    {
                      _id : this._id,
                      embarcacion: this.embarcacion,
                      usuario: this.$store.state.usuario._id,
                      agencia: this.agencia,
                      tipoServicio: this.tipoServicio,
                      puerto: this.puerto,
                      fechaTentativa: this.fechaTentativa,
                      programa: this.programa,
                      cliente:this.cliente
                    },
                    configuracion
                  )
                  .then(function(response) {
                    me.addSuccessNotification('Registro editado exitosamente')
                    me.limpiar()
                    me.listar()

                  })
                  .catch(function(error) {

                    me.addErrorNotification('Error, verifica la informacion agregada')
                  });
              }else{
                axios
                  .post(
                    "confirmarServicio/add",
                    {
                      embarcacion: this.embarcacion,
                      usuario: this.$store.state.usuario._id,
                      agencia: this.agencia,
                      tipoServicio: this.tipoServicio,
                      puerto: this.puerto,
                      fechaTentativa: this.fechaTentativa,
                      programa: this.programa,
                      cliente:this.cliente
                    },
                    configuracion
                  )
                  .then(function(response) {
                    me.addSuccessNotification('Registro agregado exitosamente')
                    me.limpiar()
                    me.listar()

                  })
                  .catch(function(error) {

                    me.addErrorNotification('Error, verifica la informacion agregada')
                  });
              }

              },
            listar(){
              let header={"Token":this.$store.state.token};
              let configuracion= {headers: header}
              let me=this;
              axios.get('confirmarServicio/list',configuracion).then(function (response){
              me.servicionTentativos=response.data;
              }).catch(function(error){
                console.log(error)
              })
            },
            salirEdicion(){
              this.editedIndex = false
              this.limpiar()
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
          confirmarServicio(_id){
          let me=this;

           let file = me.pedido;
           let coti = me.cotizacion;
            let pedido=''
           let cotizacion=''
           let numberRando =  Math.random().toString().slice(2);
            let fileExtension = file.type.split("/")[1];
            pedido = `${me.url}${numberRando}.${fileExtension}`;

             let numberRando2 =  Math.random().toString().slice(2);
            let fileExtension2 = coti.type.split("/")[1];
            cotizacion = `${me.url}${numberRando2}.${fileExtension2}`;

          this.dialogConfirmar = false
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('confirmarServicio/confirmar',{'_id':_id,pedido:pedido,cotizacion:cotizacion},configuracion)
               .then(function(response){
                me.addSuccessNotification('Servicio confirmado exitosamente')
                me.limpiar()
                me.listar();
                 me.listarEmbarcacion(
                      response.data._id,
                      response.data.folio_ss,
                      response.data.embarcacion,
                      response.data.puerto,
                      response.data.estado,
                      response.data.usuario[0].nombre,
                      response.data.correo,
                    );
                me.S3Client.uploadFile(file, numberRando).finally((e) => {console.log(e)});
                me.S3Client.uploadFile(coti, numberRando2).finally((e) => {console.log(e)});
               }).catch(function(error){
                 console.log(error)
               });
        },
        dialogCancelarEjecutar(item){
          this.dialogCancelar =  true
          this._idCancelarv = item._id
        },
        dialogConfirmarEjecutar(item){
          this.dialogConfirmar =  true
          console.log(this.cotizacion)
          this._idConfirmar = item._id
        },
         cancelarServicio(_id){
          let me=this;
          this.dialogCancelar = false
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('confirmarServicio/cancelar',{'_id':_id},configuracion)
               .then(function(response){
                me.addSuccessNotification('Servicio cancelado exitosamente')
                me.limpiar()
                me.listar();
               }).catch(function(error){
                 console.log(error)
               });
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
