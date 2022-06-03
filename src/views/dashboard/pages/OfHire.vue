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
            <div v-if="estado=='En Transito'" class="font-weight-light card-title mt-2">
             Nuevo Off-Hire
            <span class="body-2">— Completa todos los campos</span>
            </div>
            <div v-if="estado=='Off Hire Realizado'" class="font-weight-light card-title mt-2">
             Editar Of-Hire
              <span class="body-2">— Completa todos los campos</span>
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>


                   <v-col
                  cols="12"
                  md="3"
                >
                  <v-select
                    :items="servicios"
                    label="Tipo de Servicios"
                    :change="servicioSeleccionado()"
                    v-model="tipoServicio"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                  v-if="this.mostrarEmbarcacion"
                >
                 <v-select
                :items="embarcaciones"
                 v-model="embarcacion"
                label="Embarcaciones"
                disabled
              />
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                >
                  <v-select
                    :items="agencias"
                    label="Agencias"
                    v-model="agencia"
                    disabled
                  />
                </v-col>

                  <v-col
                  cols="12"
                  md="3"
                >
                  <v-select
                    :items="puertos"
                    label="Puerto"
                    v-model="puerto"
                    disabled
                  />
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field  v-if="this.mostrarEmbarcacion" v-model="diesel" label="Diesel" type="number" suffix="ton" dense />
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field  v-if="this.mostrarEmbarcacion"  v-model="aceite1" label="Aceite 1" type="number" suffix="ton" dense />
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field  v-if="this.mostrarEmbarcacion" v-model="aceite2" label="Aceite 2" type="number" suffix="ton" dense />
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field  v-if="this.mostrarEmbarcacion" v-model="hidraulico" label="Hidraulico" type="number" suffix="ton" dense />
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field  v-if="this.mostrarEmbarcacion" v-model="engranes" label="Aceite de Engranes" type="number" suffix="ton" dense />
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field  v-if="this.mostrarEmbarcacion" v-model="aguaPotable" label="Agua Potable" type="number" suffix="ton" dense />
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field  v-if="this.mostrarEmbarcacion" v-model="motivos" label="Motivos"  dense />
                </v-col>
                 <v-col cols="12" md="3">
                  <v-text-field  v-if="this.mostrarEmbarcacion" v-model="muelle" label="Muelle"  dense />
                </v-col>
                <v-col cols="12" md="3">
                   <v-text-field v-if="this.mostrarEmbarcacion" label="On Hire" type="datetime-local" v-model="horaOnHire" dense></v-text-field>
                </v-col>
                 <v-col cols="3">
                  <v-textarea v-if="this.mostrarEmbarcacion" class="purple-input" label="Observaciones" v-model="observaciones" />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                   v-if="estado=='En Transito'"
                >
                  <v-btn
                    color="#31467C"
                    class="mr-0"
                    @click="guardar"

                  >
                    Guardar Of-Hire
                  </v-btn>

                </v-col>
                <v-col
                 v-if="estado=='Off Hire Realizado'"
                  cols="10"
                  class="text-right"
                >
                  <v-btn
                    color="#31467C"
                    class="mr-0"
                    @click="guardar"

                  >
                    Editar On-Hire
                  </v-btn>

                </v-col>
                 <v-col
                  cols="1"
                  class="text-right"
                    v-if="estado=='En Transito' || estado=='Off Hire Realizado'"
                >

                  <v-btn
                    color="#66B6BC"
                    class="mr-0"
                    @click="salirEdicion"

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
            Servicios Confirmados
            </div>
          </template>
      <v-data-table
        :headers="headers"
        :items="servicionTentativos "
        :search.sync="search"
        :sort-by="['tipoServicio', 'puerto']"
        multi-sort
        :loading="cargaTabla"
      >
        <template v-slot:item.estado="{ item }">
          <v-chip small class="ma-2" color="orange" text-color="white" v-if="item.estado=='En Proceso'">
            <v-avatar left>
              <v-icon small>mdi-restore</v-icon>
            </v-avatar>Pendiente
          </v-chip>

          <v-chip small class="ma-2" color="success" text-color="white" v-if="item.estado=='Confirmado'">
            <v-avatar left>
              <v-icon small>mdi-check</v-icon>
            </v-avatar>Servicio Confirmado
          </v-chip>
          <v-chip small class="ma-2" color="error" text-color="white" v-if="item.estado=='Cancelado'">
            <v-avatar left>
              <v-icon small>mdi-close</v-icon>
            </v-avatar>Cancelado
          </v-chip>
            <v-chip small class="ma-2" color="orange" text-color="white" v-if="item.estado=='Off Hire Realizado'">
            <v-avatar left>
              <v-icon small>mdi-toggle-switch</v-icon>
            </v-avatar>Of Hire Pendiente de Firma
          </v-chip>
          <v-chip small class="ma-2" color="blue" text-color="white" v-if="item.estado=='Off-Hire Firmado'">
            <v-avatar left>
              <v-icon small>mdi-toggle-switch</v-icon>
            </v-avatar>Off-Hire Firmado
          </v-chip>
           <v-chip small class="ma-2" color="purple" text-color="white" v-if="item.estado=='En Transito'">
            <v-avatar left>
              <v-icon small>mdi-chart-timeline-variant-shimmer</v-icon>
            </v-avatar>En ruta
          </v-chip>

        </template>

        <template  v-slot:item.action="{ item }">

            <v-btn v-if="item.estado=='En Transito' " class="px-2 ml-1" color="success" @click="editItemServicio(item)" min-width="0" small>
                <v-icon small>mdi-book-clock</v-icon>
           </v-btn>
            <v-btn v-if="item.estado=='Off Hire Realizado' " class="px-2 ml-1" color="orange" @click="editItem(item)" min-width="0" small>
                <v-icon small>mdi-pencil-outline</v-icon>
           </v-btn>
            <v-btn v-if="item.estado=='Off Hire Realizado'" class="px-2 ml-1" @click="mostrarModal(item)" color="orange" min-width="0" small>
                <v-icon small>mdi-printer-eye</v-icon>
           </v-btn>
           <v-btn v-if="item.estado=='Off-Hire Firmado'" class="px-2 ml-1" @click="guardarPdf(item)" color="blue" min-width="0" small>
                <v-icon small>mdi-monitor-arrow-down-variant</v-icon>
           </v-btn>

        </template>

      </v-data-table>
    <v-dialog
      v-model="visualizarPdf"
      width="1000"

      transition="dialog-bottom-transition"
    >
    <v-card>
        <v-toolbar
          dark

        >
          <v-btn
            icon
            dark
            @click="visualizarPdf = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="color:white">Vizualizar On Hire</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="visualizarPdf = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>


                 <v-card-text >
                <div  id="solicitudGuardia">
                    <br />
                    <br />
                    <header>

                    </header>
                    <div id="">
                      <div style="float: left; margin-left:2%;margin-right:2%">
                        <img
                          style="width:100px"
                          src="data:image/png;base64,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"
                          id="imagen"
                        />
                      </div>

                      <div >
                        <p
                          style="text-align:center;margin-right:60px;font-size:15px"
                        >
                        <br><br>
                          <strong id="texto" style="color:#000000">ENTRADA Y SALIDA DE CONTRATO </strong><BR></BR>
                          <strong id="texto" style="color:#000000">(ON y OFF-HIRE) </strong>
                        </p>
                      </div>





                    </div>
                    <br />
                    <div style="border:1px solid">
                      <div style=" background-color:#31467C; color:white; text-align:center">
                        <h3>Estando con las siguientes existencias a bordo</h3>

                      </div>
                      <v-row>
                        <v-col cols="1">
                        </v-col>
                        <v-col cols="10">

                     <table style="width: 100%; height: 30px; color:#000000">
                       <tr>
                         <td colspan="2">DIESEL MARTIMO ESPECIAL</td>
                         <td colspan="4" style="border:1px solid;text-align:center">{{mostrarDataModal.diesel}}</td>
                          <td colspan="2">ACEITE DE ENGRANES</td>
                         <td colspan="2" style="border:1px solid;text-align:center">{{mostrarDataModal.engranes}}</td>
                       </tr>
                       <tr>
                         <td colspan="2">ACEITE LUBRICANTE 1</td>
                         <td colspan="4" style="border:1px solid;text-align:center">{{mostrarDataModal.aceite1}}</td>
                          <td colspan="2">AGUA POTABLE</td>
                         <td colspan="2" style="border:1px solid;text-align:center">{{mostrarDataModal.agua}}</td>
                       </tr>
                        <tr>
                         <td colspan="2">ACEITE LUBRICANTE 2</td>
                         <td colspan="4" style="border:1px solid;text-align:center">{{mostrarDataModal.aceite2}}</td>
                         <td colspan="2">OTRO</td>
                         <td colspan="2" style="border:1px solid"></td>
                       </tr>
                         <tr>
                         <td colspan="2">ACEITE HIDRAULICO</td>
                         <td colspan="4" style="border:1px solid;text-align:center">{{mostrarDataModal.hidraulico}}</td>

                       </tr>



                       <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td style="color:white"> TEXTO EN BLANCO</td>
                         <td></td>
                         <td> </td>
                         <td style="color:white">TEXTO EN BLANCO</td>
                       </tr>
                      </table>

                        </v-col>

                        <v-col cols="1">

                        </v-col>

                      </v-row>
                       <br>
                      <p id="texto"  style="color:#000000; text-align: center;">
                        EL PRESENTE ES PARA CERTIFICAR QUE EL BUQUE <strong><u>{{mostrarDataEmbarcacion.tipo}}</u></strong> DE NOMBRE <strong><u>{{mostrarDataEmbarcacion.nombre}}</u></strong> DE BANDERA
                       <strong><u>{{mostrarDataEmbarcacion.bandera}}</u></strong> OPERADO POR <strong>{{mostrarDataEmbarcacion.armador}}</strong> SIENDO LAS <u><strong>{{moment(mostrarDataModal.fechaOnHire).format('H:mm')}} DEL {{moment(mostrarDataModal.fechaOnHire).format('L')}}</strong></u>
                     Y ESTANDO EL BUQUE EN EL MUELLE <strong><u>  {{mostrarDataModal.muelle}} </u></strong> CON LA COMPAÑIA {{mostrarServicio.cliente}} POR MOTIVOS DE {{mostrarDataModal.motivos}}
                      </p>

                      <v-row style="margin-top:-20px">
                          <v-col cols="5">

                          </v-col>
                          <v-col cols="2">
                              <strong id="texto" style="color:#000000;text-align: center;">SI </strong>
                          </v-col>
                            <v-col cols="2">
                            <strong id="texto" style="color:#000000">NO </strong>
                          </v-col>
                          <v-col cols="2">
                          </v-col>
                          <v-col cols="1">
                          </v-col>
                      </v-row>
                      <v-row style="margin-top:-20px">
                            <v-col cols="2">
                            </v-col>
                              <v-col cols="3">
                                <strong id="texto" style="color:#000000">CONSUMIBLES POR AMLS </strong>
                            </v-col>
                            <v-col cols="2">
                              <v-icon>
                                mdi-crop-square
                              </v-icon>
                            </v-col>
                              <v-col cols="1">
                            <v-icon>
                                mdi-crop-square
                              </v-icon>
                            </v-col>
                            <v-col cols="1">
                              <strong id="texto" style="color:#000000">Cantidad</strong>
                            </v-col>
                              <v-col cols="2">
                           _________________________
                            </v-col>
                        </v-row>
                        <v-row style="margin-top:-20px">
                            <v-col cols="2">
                            </v-col>
                              <v-col cols="3">
                                <strong id="texto" style="color:#000000">CONSUMIBLES POR AMLS </strong>
                            </v-col>
                            <v-col cols="2">
                              <v-icon>
                                mdi-crop-square
                              </v-icon>
                            </v-col>
                              <v-col cols="1">
                            <v-icon>
                                mdi-crop-square
                              </v-icon>
                            </v-col>

                            <v-col cols="1">
                              <strong id="texto" style="color:#000000">Cantidad</strong>
                            </v-col>
                              <v-col cols="2">
                           _________________________
                            </v-col>
                      </v-row>

                    </div>
                      <div style="border:1px solid">
                      <div style=" background-color:#31467C; color:white; text-align:center">
                        <h3>SONDEO DE TANQUES</h3>

                      </div><br>
                      <v-row>
                        <v-col cols="1">
                        </v-col>
                        <v-col cols="5">

                                <table style= " border-collapse: collapse; border:1px solid black;width:100%;">
                              <tr style="background-color:gray;color:white">
                                <th style="border:1px solid black; " >Tanques</th>
                                <th style="border:1px solid black">Pies</th>
                                <th style="border:1px solid black">Pulgadas</th>
                                <th style="border:1px solid black">Galones</th>
                              </tr>
                              <tr>
                                <td  style="border:1px solid black;text-align: center;color:black" >D.O 1 Br</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                              <tr >
                                <td  style="border:1px solid black;text-align: center;color:black"  >D.O 2 Br</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                              <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 3 Br</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                               <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 4 Br</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                               <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 5 Br</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                               <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 6 Br</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                            </table>

                        </v-col>
                         <v-col cols="5">

                                <table style= " border-collapse: collapse; border:1px solid black;width:100%;">
                              <tr style="background-color:gray;color:white">
                                <th style="border:1px solid black; " >Tanques</th>
                                <th style="border:1px solid black">Pies</th>
                                <th style="border:1px solid black">Pulgadas</th>
                                <th style="border:1px solid black">Galones</th>
                              </tr>
                              <tr>
                                <td  style="border:1px solid black;text-align: center;color:black" >D.O 1 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                              <tr >
                                <td  style="border:1px solid black;text-align: center;color:black"  >D.O 2 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                              <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 3 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                               <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 4 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                               <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 5 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                               <tr  >
                                <td style="border:1px solid black;text-align: center;color:black" >D.O 6 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                            </table>

                        </v-col>

                        <v-col cols="1">

                        </v-col>

                        <v-col cols="1">

                        </v-col>

                           <v-col cols="5">

                                <table style= " border-collapse: collapse; border:1px solid black;width:100%;">
                              <tr style="background-color:gray;color:white">
                                <th style="border:1px solid black; " >Tanques</th>
                                <th style="border:1px solid black">Pies</th>
                                <th style="border:1px solid black">Pulgadas</th>
                                <th style="border:1px solid black">Galones</th>
                              </tr>
                              <tr>
                                <td  style="border:1px solid black;text-align: center;color:black" >D.O 1 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>
                              <tr >
                                <td  style="border:1px solid black;text-align: center;color:black"  >D.O 2 Er</td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                                <td style="border:1px solid black"></td>
                              </tr>

                            </table>

                        </v-col>

                         <v-col cols="5">

                           <table style= " ;width:70%;">

                              <tr>
                                <td style="color:#000000" >TK. DIARIO. BR:</td>
                                <td>________________________________</td>

                              </tr>
                              <tr >
                                <td  style="color:#000000">TK. DIARIO ER</td>
                                <td>________________________________</td>

                              </tr>
                              <tr >
                                <td  style="color:#000000">TK. DIARIO CT</td>
                                <td>________________________________</td>
                              </tr>
                               <tr >
                                <td  style="color:#000000">DIESEL TOTAL</td>
                                <td>________________________________</td>
                              </tr>

                            </table>

                        </v-col>


                      </v-row>
                       <v-row>
                         <v-col cols="2">

                         </v-col>
                         <v-col cols="5">
                           Calador BR:
                         </v-col>
                           <v-col cols="5">
                           Calador ER:
                         </v-col>
                           <v-col cols="2">

                         </v-col>
                       </v-row>
                       <v-row>
                         <v-col cols="1">

                         </v-col>
                         <v-col cols="10">
                             <table style= " border-collapse: collapse; border:1px solid black;width:100%;">
                              <tr style="background-color:gray;color:white">
                                <th style="border:1px solid black; " >Tanques</th>
                              </tr>
                              <tr>
                                <td  style="border:1px solid black;text-align: center;color:black" >Observaciones</td>

                              </tr>


                            </table>
                         </v-col>
                          <v-col cols="1">

                         </v-col>
                       </v-row>
                      <br> <br><br>
                      <div>
                          <v-row>
                            <v-col cols="1">

                            </v-col>
                            <v-col cols="6">
                              <vueSignature ref="signatureCapitan" :sigOption="option" :w="'300px'" :h="'100px'" :disabled="disabled" ></vueSignature>
                               <v-btn small @click="clear">Limpiar</v-btn>
                              </v-col>
                              <v-col cols="4">
                                <vueSignature ref="signatureCompania" :sigOption="option" :w="'300px'" :h="'100px'" :disabled="disabled" ></vueSignature>

                            </v-col>
                            <v-col cols="1">
                            </v-col>
                          </v-row>
                      </div>
                        <br> <br><br>
                      <div>
                          <v-row style="margin-top:-70px">
                            <v-col cols="2">

                            </v-col>
                            <v-col cols="5" >
                              Nombre y Firma del Capitan
                            </v-col>
                              <v-col cols="4"  >
                                Nombre y Firma del representante de la compañia
                            </v-col>
                            <v-col cols="1"  >
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="1" >

                            </v-col>
                            <v-col cols="6">
                              <vueSignature ref="signatureJefe" :sigOption="option" :w="'300px'" :h="'100px'" :disabled="disabled" ></vueSignature>
                               <v-btn small @click="clear">Limpiar</v-btn>
                              </v-col>
                              <v-col cols="4" >
                                <vueSignature ref="signatureAmls" :sigOption="option" :w="'300px'" :h="'100px'" :disabled="disabled" ></vueSignature>

                            </v-col>
                            <v-col cols="1">
                            </v-col>
                          </v-row>
                      </div>
                        <br> <br><br>
                      <div>
                          <v-row style="margin-top:-70px">
                            <v-col cols="2"  >

                            </v-col>
                            <v-col cols="5"  >
                              Nombre y Firma del Capitan
                            </v-col>
                              <v-col cols="4"  >
                                Nombre y Firma del representante de la compañia
                            </v-col>
                            <v-col cols="1">
                            </v-col>
                          </v-row>

                      </div>
                    </div>

                    <v-btn color="primary" @click="updateSignature(mostrarDataModal,mostrarServicio)">Guardar</v-btn>

                    </div>
                    <div id="agencia">










                    </div>

                  <br />






              </v-card-text>


      </v-card>
    </v-dialog>
    </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vueSignature from "vue-signature"

import axios from 'axios'
import emailjs from "emailjs-com";
import moment from 'moment'
import jsPDF from 'jspdf'
  export default {
    name: "app",
	components:{
		vueSignature
	},
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
            text: 'Off Hire',
            value: 'ofhire.fechaOnHire'
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
        mostrarDataModal:[],
        mostrarDataEmbarcacion:[],
        cargaTabla:false,
        embarcacionNombre:'',
        estado:'',
        search:'',
        horaOnHire:'',
        muelle:'',
        observaciones:'',
        motivos:'',
        visualizarPdf:false,
        embarcaciones: [],
        mostrarServicio:[],
        agencia: '',
        mostrarEmbarcacion: false,
        tipoServicio:'',
        agencias: [],
        puertos:['Ciudad del Carmen','Dos Bocas','Chiltepec','Frontera','Seybaplaya'],
        puerto:'',
        editedIndex:false,
        programa:'',
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
      servicionTentativos:[],
      option:{
				backgroundColor:"rgb(255, 255, 255)",
				penColor:"rgb(0,0,0)"
			},
			disabled:false,
      }
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
              this.diesel='',
              this.aceite1='',
              this.aceite2='',
              this.hidraulico='',
              this.engranes='',
              this.aguaPotable='',
              this.motivos='',
              this.fechaOnHire='',
              this.observaciones='',
              this.programa='',
              this.muelle='',
              this.editedIndex = false
              this._id=''
            },

             guardar() {
              let me = this;
              let header = { Token: this.$store.state.token };
              let configuracion = { headers: header };

              if(this.estado=='Of Hire Realizado')
              {
                console.log(this._id)
                axios
                  .put(
                    "ofHire/edit",
                    {
                      _id : this._id,
                      diesel: this.diesel,
                      usuario: this.$store.state.usuario._id,
                      aceite1: this.aceite1,
                      aceite2: this.aceite2,
                      hidraulico: this.hidraulico,
                      engranes: this.engranes,
                      agua: this.aguaPotable,
                      motivos: this.motivos,
                      fechaOnHire : new Date(this.horaOnHire),
                      observaciones: this.observaciones,
                      muelle:this.muelle
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
                    "ofHire/add",
                    {
                      diesel: this.diesel,
                      usuario: this.$store.state.usuario._id,
                      aceite1: this.aceite1,
                      aceite2: this.aceite2,
                      hidraulico: this.hidraulico,
                      engranes: this.engranes,
                      agua: this.aguaPotable,
                      motivos: this.motivos,
                      fechaOnHire: this.horaOnHire,
                      observaciones: this.observaciones,
                      muelle:this.muelle
                    },
                    configuracion
                  )
                  .then(function(response) {
                    console.log(me._id)
                    axios.put('confirmarServicio/updateOfHire',
                    {
                      _id:me._id,
                      ofhire:response.data._id
                    },
                    configuracion)
                      .then(function(response){
                          me.addSuccessNotification('Registro agregado exitosamente')
                          me.limpiar()
                          me.listar()
                      })
                  })
                  .catch(function(error) {

                    me.addErrorNotification('Error, verifica la informacion agregada')
                  });
              }

              },
            listar(){
              this.cargaTabla=true
              let header={"Token":this.$store.state.token};
              let configuracion= {headers: header}
              let me=this;
              axios.get('confirmarServicio/listServiciosConMovimientos',configuracion).then(function (response){
              me.servicionTentativos=response.data;
              console.log(me.servicionTentativos)
              }).catch(function(error){
                console.log(error)
              }).finally(()=>{
                this.cargaTabla=false
              })
            },
            salirEdicion(){
              this.editedIndex = false
              this.estado= ''
              this.limpiar()
            },

          editItem(item){
            console.log(item)
            this._id = item.ofhire._id

            this.tipoServicio = item.tipoServicio,
            this.embarcacion = item.embarcacion._id,
            this.embarcacionNombre = item.embarcacion.nombre
            this.agencia = item.agencia._id,
            this.puerto = item.puerto,
            this.estado = item.estado
            this.fechaTentativa = item.fechaTentativa
            this.programa = item.programa,
            this.editedIndex = true
            this.horaOnHire = item.ofhire.fechaOnHire

            this.diesel = item.ofhire.diesel,
            this.aceite1 = item.ofhire.aceite1,
            this.aceite2 = item.ofhire.aceite2,
            this.hidraulico = item.ofhire.hidraulico,
            this.engranes = item.ofhire.engranes,
            this.aguaPotable = item.ofhire.agua,
            this.muelle = item.ofhire.muelle
            this.observaciones = item.ofhire.observaciones,
            this.motivos = item.ofhire.motivos
          },

           editItemServicio(item){
            this._id = item._id

            this.tipoServicio = item.tipoServicio,
            this.embarcacion = item.embarcacion._id,
            this.embarcacionNombre = item.embarcacion.nombre
            this.agencia = item.agencia._id,
            this.puerto = item.puerto,
            this.estado = item.estado
            this.fechaTentativa = item.fechaTentativa
            this.programa = item.programa,
            this.editedIndex = true
            this.horaOnHire = item.ofhire.fechaOnHire
            this.muelle = item.ofhire.muelle
            this.diesel = item.ofhire.diesel,
            this.aceite1 = item.ofhire.aceite1,
            this.aceite2 = item.ofhire.aceite2,
            this.hidraulico = item.ofhire.hidraulico,
            this.engranes = item.ofhire.engranes,
            this.aguaPotable = item.ofhire.agua,
            this.observaciones = item.ofhire.observaciones,
            this.motivos = item.ofhire.motivos
          },
          confirmarServicio(item){
          let me=this;
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('confirmarServicio/confirmar',{'_id':item._id},configuracion)
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
               }).catch(function(error){
                 console.log(error)
               });
        },
           clear(){
        var _this = this;
        _this.$refs.signature.clear();
      },
        cancelarServicio(item){
          let me=this;
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('confirmarServicio/cancelar',{'_id':item._id},configuracion)
               .then(function(response){
                me.addSuccessNotification('Servicio cancelado exitosamente')
                me.limpiar()
                me.listar();
               }).catch(function(error){
                 console.log(error)
               });
        },

        updateSignature(item,servicio){
          let me=this;
          var signatureCapitan = this.$refs.signatureCapitan.save()
			    var signatureCompania = this.$refs.signatureCompania.save()
          var signatureJefe = this.$refs.signatureJefe.save()
			    var signatureAmls = this.$refs.signatureAmls.save()

           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('ofhire/updateSignature',{
             '_id':item._id,
             'signatureCapitan':signatureCapitan,
             'signatureCompania':signatureCompania,
             'signatureJefe':signatureJefe,
             'signatureAmls':signatureAmls
             },configuracion)
               .then(function(response){
                me.addSuccessNotification('Servicio firmado')
                  axios.put('confirmarServicio/signatureOffHire',
                    {
                      _id:servicio._id,

                    },
                    configuracion)
                      .then(function(response){
                          me.limpiar()
                          me.listar()
                      })
                me.visualizarPdf = false
                me.limpiar()
                me.listar();
               }).catch(function(error){
                 console.log(error)
               });
        },
        guardarPdf(item){
            var doc = new jsPDF("p", "pt","a4");
            var startX=40;
            var startY=40;
            doc.addImage('https://i.ibb.co/bL1zXh1/amls-fr.png','PNG',70,40,90,50)
            doc.setFontSize(10)
            doc.setFont(undefined, 'bold')
            doc.text('ENTRADA Y SALIDA DE CONTRATO',290,70,{align:'center'});
            doc.text('ON Y OFF HIRE',290,80,{align:'center'});
            doc.rect(140, 110, 15, 15)
            doc.text('ON-HIRE',160,122);
            doc.rect(380, 110, 15, 15,'F')
            doc.text('OFF-HIRE',400,122);
            doc.rect(70, 140, 450, 230)
            doc.setFillColor(49,70,124);
            doc.rect(70, 140, 450, 15,'F')
            doc.setFontSize(8)
            doc.setFont(undefined, 'normal')
            doc.setTextColor(255,255,255);
            doc.text('ESTANDO CON LAS SIGUIENTES EXISTENCIAS A BORDO',290,150,{align:'center'});
            doc.setTextColor(0,0,0);
            doc.text('DIESEL MARITIMO ESPECIAL',90,170,{align:'left'});

            doc.text('ACEITE LUBRICANTE 1',90,185,{align:'left'});
            doc.text('ACEITE LUBRICANTE 2 (Si aplica)',90,200,{align:'left'});
            doc.text('ACEITE HIDRAULICO',90,215,{align:'left'});

            doc.rect(240, 160, 60, 12)
            doc.text(item.ofhire.diesel.toString(),245,170,{align:'left'});
            doc.rect(240, 175, 60, 12)
            doc.text(item.ofhire.aceite1.toString(),245,185,{align:'left'});
            doc.rect(240, 190, 60, 12)
            doc.text(item.ofhire.aceite2.toString(),245,200,{align:'left'});
            doc.rect(240, 205, 60, 12)
            doc.text(item.ofhire.hidraulico.toString(),245,215,{align:'left'});

            doc.text('ACEITE DE ENGRANES',310,170,{align:'left'});
            doc.text('AGUA POTABLE',310,185,{align:'left'});
            doc.text('OTRO:_____________',310,200,{align:'left'});

            doc.rect(443, 160, 60, 12)
            doc.text('23',448,200,{align:'left'});
            doc.rect(443, 175, 60, 12)
            doc.text('23',448,185,{align:'left'});
            doc.rect(443, 190, 60, 12)
            doc.text('23',448,170,{align:'left'});

            doc.text('EL PRESENTE ES PARA CERTIFICAR QUE EL BUQUE',90,250,{align:'left'});
            doc.line(300,250,350,250)
            doc.text('L/P',305,248)
            doc.text('DE NOMBRE',355,250,{align:'left'});
            doc.text(item.embarcacion.nombre,410,248)
            doc.line(410,250,500,250)

            doc.text('DE BANDERA',90,265,{align:'left'});
            doc.text(item.embarcacion.bandera,155,263)
            doc.line(150,265,230,265)
            doc.text('OPERADO POR: AMLS AGENCY & VESSELS, SIENDO LAS',235,265,{align:'left'});
            let horaOnHire = moment(item.ofhire.horaOnHire).format('H:mm')
            doc.text(horaOnHire,465,263)
            doc.line(460,265,500,265)
            doc.text('TIEMPO LOCAL DEL DIA',90,280,{align:'left'});
            let diaOnHire = moment(item.ofhire.horaOnHire).format('Do MMMM YYYY')
            doc.text(diaOnHire,190,278)
            doc.line(185,280,260,280)
            doc.text('ESTANDO EL BUQUE EN EL MUELLE',265,280,{align:'left'});
            doc.text(item.ofhire.muelle,415,278)
            doc.line(410,280,500,280)

            doc.text('QUEDAMOS',90,295,{align:'left'});
            doc.text('OFF-HIRE',145,293)
            doc.line(140,295,260,295)
            doc.text('CON LA COMPAÑIA',265,295,{align:'left'});
            doc.text(item.cliente,350,293);
            doc.line(345,295,500,295)

            doc.text('POR MOTIVOS',90,310,{align:'left'});
            doc.text(item.ofhire.motivos,155,307);
            doc.line(150,310,310,310)

            doc.setFont(undefined,'bold')
            doc.text('CONSUMIBLES POR AMLS',140,340,);
            doc.setFont(undefined,'bold')
            doc.text('CONSUMIBLES POR EL CLIENTE',140,360,);
            doc.text('SI',326,325,);
            doc.text('NO',380,325,);
            doc.rect(325, 330, 15, 10)
            doc.rect(379, 330, 15, 10)
            doc.rect(325, 350, 15, 10)
            doc.rect(379, 350, 15, 10)


            doc.rect(70,370,450,400)
            doc.setFillColor(49,70,124);
            doc.rect(70, 370, 450, 15,'F')
            doc.setTextColor(255,255,255);
            doc.text('SONDEO DE TANQUES',290,380,{align:'center'});


            doc.setFillColor(128,130,133);
            doc.rect(90, 390, 50, 15,'DF'),
            doc.text('TANQUES',95,400);
            doc.setFillColor(128,130,133);
            doc.rect(140, 390, 30, 15,'DF')
            doc.text('PIES',145,400,);
            doc.setFillColor(128,130,133);
            doc.rect(170, 390, 60, 15,'DF')
            doc.text('PULGADAS',175,400,);
            doc.setFillColor(128,130,133);
            doc.rect(230, 390, 60, 15,'DF')
            doc.text('GALONES',237,400,);

            doc.setFillColor(128,130,133);
            doc.rect(305, 390, 50, 15,'DF'),
            doc.text('TANQUES',310,400);
            doc.setFillColor(128,130,133);
            doc.rect(355, 390, 30, 15,'DF')
            doc.text('PIES',360,400,);
            doc.setFillColor(128,130,133);
            doc.rect(385, 390, 60, 15,'DF')
            doc.text('PULGADAS',390,400,);
            doc.setFillColor(128,130,133);
            doc.rect(445, 390, 60, 15,'DF')
            doc.text('GALONES',452,400,);


            doc.rect(90, 405, 50, 10,'DF'),
            doc.rect(140, 405, 30, 10,'DF')
            doc.rect(170, 405, 60, 10,'DF')
            doc.rect(230, 405, 60, 10,'DF')


             doc.rect(90, 415, 50, 10,'DF'),
            doc.rect(140, 415, 30, 10,'DF')
            doc.rect(170, 415, 60, 10,'DF')
            doc.rect(230, 415, 60, 10,'DF')

             doc.rect(90, 425, 50, 10,'DF'),
            doc.rect(140, 425, 30, 10,'DF')
            doc.rect(170, 425, 60, 10,'DF')
            doc.rect(230, 425, 60, 10,'DF')

             doc.rect(90, 435, 50, 10,'DF'),
            doc.rect(140, 435, 30, 10,'DF')
            doc.rect(170, 435, 60, 10,'DF')
            doc.rect(230, 435, 60, 10,'DF')

             doc.rect(90, 445, 50, 10,'DF'),
            doc.rect(140, 445, 30, 10,'DF')
            doc.rect(170, 445, 60, 10,'DF')
            doc.rect(230, 445, 60, 10,'DF')

             doc.rect(90, 455, 50, 10,'DF'),
            doc.rect(140, 455, 30, 10,'DF')
            doc.rect(170, 455, 60, 10,'DF')
            doc.rect(230, 455, 60, 10,'DF')



            doc.rect(305, 405, 50, 10,'DF'),
            doc.rect(355, 405, 30, 10,'DF')
            doc.rect(385, 405, 60, 10,'DF')
            doc.rect(445, 405, 60, 10,'DF')

            doc.rect(305, 415, 50, 10,'DF'),
            doc.rect(355, 415, 30, 10,'DF')
            doc.rect(385, 415, 60, 10,'DF')
            doc.rect(445, 415, 60, 10,'DF')

            doc.rect(305, 425, 50, 10,'DF'),
            doc.rect(355, 425, 30, 10,'DF')
            doc.rect(385, 425, 60, 10,'DF')
            doc.rect(445, 425, 60, 10,'DF')

            doc.rect(305, 435, 50, 10,'DF'),
            doc.rect(355, 435, 30, 10,'DF')
            doc.rect(385, 435, 60, 10,'DF')
            doc.rect(445, 435, 60, 10,'DF')

            doc.rect(305, 445, 50, 10,'DF'),
            doc.rect(355, 445, 30, 10,'DF')
            doc.rect(385, 445, 60, 10,'DF')
            doc.rect(445, 445, 60, 10,'DF')

            doc.rect(305, 455, 50, 10,'DF'),
            doc.rect(355, 455, 30, 10,'DF')
            doc.rect(385, 455, 60, 10,'DF')
            doc.rect(445, 455, 60, 10,'DF')

            doc.setFillColor(128,130,133);
            doc.rect(90, 475, 50, 15,'DF'),
            doc.text('TANQUES',95,485);
            doc.setFillColor(128,130,133);
            doc.rect(140, 475, 30, 15,'DF')
            doc.text('PIES',145,485,);
            doc.setFillColor(128,130,133);
            doc.rect(170, 475, 60, 15,'DF')
            doc.text('PULGADAS',175,485,);
            doc.setFillColor(128,130,133);
            doc.rect(230, 475, 60, 15,'DF')
            doc.text('GALONES',237,485,);

            doc.rect(90, 490, 50, 10,'DF'),
            doc.rect(140, 490, 30, 10,'DF')
            doc.rect(170, 490, 60, 10,'DF')
            doc.rect(230, 490, 60, 10,'DF')

            doc.rect(90, 500, 50, 10,'DF'),
            doc.rect(140, 500, 30, 10,'DF')
            doc.rect(170, 500, 60, 10,'DF')
            doc.rect(230, 500, 60, 10,'DF')

            doc.setFont(undefined, 'normal')
            doc.setTextColor(0,0,0);
            doc.text('D.O. 1 Br',95,413)
            doc.text('D.O. 2 Br',95,423)
            doc.text('D.O. 3 Br',95,433)
            doc.text('D.O. 4 Br',95,444)
            doc.text('D.O. 5 Br',95,454)
            doc.text('D.O. 6 Br',95,464)
            doc.text('D.O. 1 Er',310,413)
            doc.text('D.O. 2 Er',310,423)
            doc.text('D.O. 3 Er',310,433)
            doc.text('D.O. 4 Er',310,444)
            doc.text('D.O. 5 Er',310,454)
            doc.text('D.O. 6 Er',310,464)

            doc.text('D.O. 1 Br',95,498)
            doc.text('D.O. 2 Br',95,508)

            doc.text('CALADO BR:________',150,535)
            doc.text('CALADO BR:________',350,535)

            doc.text('TK. DIARIO BR:  ________________',305,485)
            doc.text('TK. DIARIO ER:  ________________',305,495)
            doc.text('TK. DIARIO CT:  ________________',305,505)
            doc.text('DIESEL TOTAL : ________________',305,515)

            //doc.rect(70,370,450,00)
            doc.setFillColor(49,70,124);

            doc.setFillColor(128,130,133);
            doc.rect(90, 550, 415, 15,'DF'),
            doc.setTextColor(255,255,255);
            doc.text('Observaciones',95,560)


            doc.setTextColor(0,0,0);
            doc.text(item.ofhire.observaciones,95,575)
            doc.addImage(Buffer.from(item.ofhire.signatureCapitan.data, 'base64').toString('ascii'),130,610,110,70)
            doc.addImage(Buffer.from(item.ofhire.signatureJefe.data, 'base64').toString('ascii'),130,680,110,70)
            doc.addImage(Buffer.from(item.ofhire.signatureCompania.data, 'base64').toString('ascii'),360,600,110,70)
            doc.addImage(Buffer.from(item.ofhire.signatureAmls.data, 'base64').toString('ascii'),360,670,110,70)

            doc.rect(90, 565, 415, 55),
            doc.line(70,660,260,660)
            doc.line(330,660,520,660)

            doc.line(70,710,260,710)
            doc.line(330,710,520,710)
            doc.text('Nombre y Firma del Capitan',120,670)
            doc.text('Nombre y Firma del Representante de la Compañia',335,670)
            doc.text('Nombre y Firma del Jefe de Maquinas',100,720)
            doc.text('Nombre y Firma AMLS',385,720)




            doc.save("ofhire.pdf")
        },


        mostrarModal(item){
          this.visualizarPdf=true
          this.mostrarDataModal = item.ofhire
          this.mostrarDataEmbarcacion = item.embarcacion
          this.mostrarServicio = item

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
<style scoped>

</style>
