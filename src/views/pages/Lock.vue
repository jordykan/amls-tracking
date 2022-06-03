<template>

 <v-container
    id="user-profile"
    fluid
    tag="section"
  >

    <v-row justify="">
       <v-col cols="2" md="2"></v-col>
      <v-col
        cols="8"
        md="8"
      >
           <base-material-card color="#31467C" icon="mdi-ferry">
           <template v-slot:after-heading>

            <div class="font-weight-light card-title mt-2">
            Guia de Seguimiento
              <span class="body-2">— Ingresa la guia de seguimineto que recibiste por correo electronico</span>
            </div>

          </template>

          <v-form>
            <v-container class="py-5">
              <v-row>


                <v-col
                  cols="12"
                  md="11"
                >
                  <v-text-field label="Guia de Seguimiento" dense />
                </v-col>



                <v-col cols="1" md="1">

                      <v-btn
                        small
                        color="primary"
                      >
                      Buscar
                      </v-btn>
                </v-col>

               <v-col cols="2" md="2">

               </v-col>

              </v-row>
            </v-container>

          </v-form>

        </base-material-card>
      </v-col>
    </v-row>

     <v-row justify="">
       <v-col cols="2" md="2"></v-col>
      <v-col
        cols="8"
        md="8"
      >
        <v-stepper
      value="3"
      class="mt-12"
    >
      <v-stepper-header>
        <v-stepper-step
          step="1"

        >
         Servicio Confirmado
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="2"
          complete
        >
          On-Hire Realizado
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
         Servicio en Transito
        </v-stepper-step>
          <v-divider></v-divider>

        <v-stepper-step step="4">
         On-Hire Realizado
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PagesLock',

    components: {
      PagesBtn: () => import('./components/Btn')
    }
  }
</script>

<style>
    .top{
        padding-top:40px;
        padding-left:13%!important;
        padding-right: 13%!important;
    }
    .card{
        z-index:0;
        background-color: #e8e7e7;
        padding-bottom:20px;
        margin-top:-20px;
        border-radius: 10px;
    }
    #progressbar{
        margin-bottom: 0px;
        overflow: hidden;
        padding-left: 0px;
        margin-top: 30px
    }
    #progressbar li{
       list-style: none;
       font-size: 13px;
       width: 20%;
       float: left;
       position: relative;
       font-weight:400;
    }
    #progressbar .step0:before{
        font-family: FontAwesome;
        content: "\f10c";
        color:white
    }
    #progressbar li:before{
        width:40px;
        height: 40px;
        line-height:45px;
        display: block;
        font-size: 20px;
        background: #C5CAE9;
        border-radius: 50%;
        margin:auto;
        padding: 0px;
    }
    #progressbar li:after{
        content: '';
        width:150%;
        height:12px;
        background: #C5CAE9;
        position: absolute;
        left:0;
        top:16px;
        z-index: -1;
    }
    #progressbar li:last-child:after{
        border-top-right-radius: 10px;
        border-bottom-right-radius:10px;
        position: absolute;
        left:-50%;
    }
    #progressbar li:nth-child(2):after,
    #progressbar li:nth-child(3):after{
        left: -50%;

    }
     #progressbar li:first-child:after{
        border-top-left-radius: 10px;
        border-bottom-left-radius:10px;
        position: absolute;
        left:-50%;
    }
    #progressbar li.active:before,
    #progressbar li.active:after{
        background: #651fff;
    }
    #progressbar li.active:before{
        font-family: FontAwesome;
        content: "\f00c";
    }
    .icon-track{
        width:35px;
        height:35px;
        border-right: 20px;
        margin-right:20px;
    }
    .icon-content{
        padding-bottom:10px
    }

</style>
