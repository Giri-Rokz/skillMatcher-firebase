<template>
  <v-app class="custom-font">
  <v-app-bar app dense>
    <v-container id="appBar" fluid>
      <v-row class="pa-4">        
          <v-toolbar-title>SkillsRepo</v-toolbar-title>
          <v-spacer></v-spacer>
          <router-link to="viewprofile" tag="span" class="pr-5">Profile</router-link>
          <span class="pr-5" @click="signOut">Sign Out</span>
      </v-row>
    </v-container>  
  </v-app-bar>
  <v-main>
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import fb from 'firebase';
import {namespace} from "vuex-class";

const store = namespace('storeData');
@Component
export default class App extends Vue {
  @store.Action
  public signOut!:()=>{}
  @store.Getter
  public isLoggedIn!: boolean;
}
</script>

<style lang="scss">
  @import '@/styles/variables.scss';
  .custom-font {
    font-family: $body-font-family;
  }  
  #appBar {
    span {
      cursor: pointer;
    }
  }
</style>
