<template>
    <v-container class="lighten-5" fluid>
        <v-row justify="center">
            <v-col cols="12" md="8">   
                <center><h2>Welcome {{userName}}</h2></center>
                <v-row justify="center">
                    <v-col cols="12" md="3" sm="6">
                        <center><v-img class="rounded" :src="userData.dp" height="16vh" width="8vw"></v-img></center>
                    </v-col>
                </v-row>
                <center><h3>Create your profile</h3></center>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="8"> 
                <div id="wantToLearn">
                    What skills do you want to learn?
                    <Chip :desiredSkills="userData.desiredSkills" @change="desiredSkills"/>
                </div>
                <div id="knownSkills">
                    What skills do you want to share?
                    <Chip :knownSkills="userData.knownSkills" @change="knownSkills"/>
                </div>            
                <div id="shareSkills">
                    How do you want to share your skills?
                        <v-checkbox v-model="mentorship" label="Full Mentorship"></v-checkbox>
                        <v-checkbox v-model="qna" label="Q&A"></v-checkbox>
                        <v-checkbox v-model="sessions" label="Training sessions on request"></v-checkbox>
                </div>
                <center><v-btn color="primary" @click="getMatches">SHOW MATCHES</v-btn></center>
            </v-col>
        </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Chip from "@/components/chip.vue";
import Skills from "../interfaces/skills";
import {namespace} from "vuex-class";

const store = namespace('storeData');

@Component({
    components: {Chip}
})
export default class CreateProfile extends Vue {    
    @store.Getter
    public isLoggedIn!: boolean;
    @store.Getter
    public userData!: Skills;
    @store.Getter
    public userName!: string;
    
    @store.Action
    public showMatches!:(payload:Record<string,string|boolean|Array<string>>)=>{};
    @store.Action
    public getAllData!:()=>{};
    @store.Action
    public desiredSkills!:(model:any)=>{};
    @store.Action
    public knownSkills!:(model:any)=>{};

    public mentorship = false;
    public qna = false;
    public sessions = false;

    public getMatches() {
        this.showMatches({"desiredSkills":this.userData.desiredSkills, "knownSkills":this.userData.knownSkills})
    }
    created() {
        this.getAllData();        
    }    
}
</script>

<style lang="scss" scoped>    
    @import '@/styles/variables.scss';
    .theme--light.v-label {
        color: $text-color;
    }
    .rounded {
        border-radius: 10vw !important;
    }
    @media screen and (max-width:970px) {
        .rounded {
            width: 10vw !important;
        } 
    }
</style>