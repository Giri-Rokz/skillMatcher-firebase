<template>
    <v-container fluid>
        <center><h2>Find Skill Matches</h2></center>
        <v-row justify="center">
            <v-col cols="12" md="8" sm="10">
                <v-combobox
                    v-model="select"
                    :items="items"
                    label="Search for skills"
                    hide-no-data
                    append-icon="fa-search"
                    outlined multiple
                    @click:append="addSkills(select)">
                    <template v-slot:selection="data">
                        <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                        >
                        {{data.item}}
                        </v-chip>
                    </template>
                </v-combobox>
            </v-col>
        </v-row>
        <div id="skillTab">
            <v-row justify="space-around">
                <v-col cols="10" sm="4" md="8">
                    <v-chip class="active skillChip" v-for="tag in userData.desiredSkills" :key="tag" @click="toggleActive($event)">
                        {{tag}}
                    </v-chip>
                </v-col>
            </v-row>
        </div>    
        <v-row justify="center" class="pa-5">
            <center><h3>YOUR MATCHES</h3></center>
        </v-row>
        <v-row v-if="toggledUsers.length" class="pa-5">
            <v-col v-for="profile in toggledUsers" :key="profile.name" cols="12" md="3" sm="5">
                <v-row justify="center">
                        <v-card class="mx-auto userCard" max-width="200" max-height="180" tile>
                            <router-link :to="{name:'ViewProfile',params:{searchedUser:profile} }" tag="v-img">
                                <v-img class="profileDp" height="20vh" position="top" src="../assets/grey.png"></v-img>
                            </router-link>    
                            <v-card-text class="text--primary"><center>
                                <router-link :to="{name:'ViewProfile',params:{searchedUser:profile} }" tag="span">{{profile.name}}</router-link>
                            </center></v-card-text>
                        </v-card>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" v-else>
            <v-col cols="12 pt-15">
                <center><div>No matches found</div></center>
            </v-col>
        </v-row>
    </v-container>    
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Chip from "@/components/chip.vue";
import {namespace} from 'vuex-class';
import Skills from "../interfaces/skills";

const store = namespace('storeData');

@Component
export default class Matches extends Vue {
    @store.Getter
    public toggledUsers!: Skills;
    @store.Getter
    public userData!: Skills;

    @store.Action
    public editMatches!:(activeState:string[])=>{};
    @store.Action
    public addSkills!:(model:string[])=>{};
    
    public activeState:string[];
    public select:string[] = [];
    //gotta feed a lot of skills to items
    public items:string[] = ["Java","Salesforce","AWS","SQL"];
    
    public toggleActive(e:any) {
        e.currentTarget.classList.toggle('active');
        this.activeState = Array.from(document.querySelectorAll('.active')).map((x:any)=>x.innerText);
        this.editMatches(this.activeState);
    }
}

</script>

<style lang="scss" scoped>
    @import '@/styles/variables.scss';
    h4 {
        padding: 3vh 0 3vh 0;
    }
    .active {
        background-color: lightskyblue !important;
    }
    .skillChip {
        @include skillChip;
    }
    .profileDp {
        background-position: top;
    }
    .userCard {
        cursor: pointer;
    }
</style>