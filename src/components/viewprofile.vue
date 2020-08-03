<template>
    <v-container fluid>
        <v-row justify="center" class="pa-4">
            {{profile.name}}
        </v-row>    
        <v-row justify="center" v-if="currentUser">
            <v-col cols="12" md="6" sm="6" class="pa-3">
                <v-btn color="primary">EDIT PROFILE</v-btn>    
                <v-btn color="primary">GET MATCHES</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center" v-else class="pa-5">
            <v-btn color="primary">SCHEDULE MEETING</v-btn>
        </v-row>            
        <v-divider></v-divider>
        <v-row justify="center" class="pa-4">
            <h3>SKILLS WILLING TO SHARE</h3>
        </v-row>
        <v-row justify="center" class="pa-4">
            <v-chip class="pa-5 skillChip" v-for="skill in profile.knownSkills" :key="skill">
                {{skill}}
            </v-chip>
        </v-row>
        <v-divider></v-divider>        
        <v-row justify="center" class="pa-4">
            <h3>SKILLS WILLING TO LEARN</h3>
        </v-row>
        <v-row justify="center" class="pa-2">
            <v-chip class="pa-5 skillChip" v-for="skill in profile.desiredSkills" :key="skill">
                {{skill}}
            </v-chip>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import {namespace} from 'vuex-class';
import Skills from "../interfaces/skills";

const store = namespace('storeData');

@Component
export default class ViewProfile extends Vue {
    @Prop() searchedUser!: Skills;
    @store.Getter
    public userData!: Skills;

    public profile: Skills;
    public currentUser = true;
    created() {
        this.profile = this.searchedUser ? this.searchedUser : this.userData;
        this.currentUser = this.searchedUser ? false : true;
    }
}
</script>


<style lang="scss" scoped>
    @import '@/styles/variables.scss';
    .skillChip {
        @include skillChip;
    }
</style>