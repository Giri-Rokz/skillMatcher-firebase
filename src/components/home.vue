<template>
  <v-container class="" fluid>
    <v-row>
      <v-col cols="12">
        <center><h1>Logitech Skill Repository</h1></center>
      </v-col>
    </v-row>
    <v-row justify="center" class="pa-5">
      <v-col cols="6" sm="6">
        <v-row justify="center">
          <v-card outlined tile width="250" height="250" class="ma-3 pa-3 grey lighten-4">
            <v-card-title>What is it?</v-card-title>
          </v-card>
          <v-card outlined tile width="250" height="250" class="ma-3 pa-3 grey lighten-4">
            <v-card-title>How does it work?</v-card-title>
          </v-card>  
        </v-row>
      </v-col> 
    </v-row>
    <v-row justify="center">  
      <center>
        <p>Just sign in with Google</p>
        <v-btn color="primary" dark id="signIn" @click="signIn"
          >Sign In</v-btn
        >
      </center>
    </v-row>    
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {namespace} from "vuex-class";

const store = namespace('storeData');

@Component
export default class Home extends Vue {  
  @store.Action  
  public signIn!:()=>void
}
</script>

<style scoped lang="scss">
</style>
