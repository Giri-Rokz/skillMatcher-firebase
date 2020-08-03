<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      :search-input.sync="search"
      multiple
      small-chips
      placeholder="Press Enter after adding a skill"
      @keyup.enter="emitToParent"
    >      
    <template v-slot:selection="{attrs,item}">
        <v-chip v-bind="attrs" class="tinychip"
         small>
            <span class="pr-2">
                {{item}}
            </span>
            <v-icon                                 
                small
                @click="removItem(item)"
            >close</v-icon>
        </v-chip>
    </template>
    </v-combobox>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";

@Component
export default class Chip extends Vue {
    @Prop() knownSkills!:Array<string>
    @Prop() desiredSkills!:Array<string>
    
    public model:any = [];
    @Watch('knownSkills')
    knownSkillChanged(newData:any) {
      this.model = newData;
    }
    @Watch('desiredSkills')
    desiredSkillChanged(newData:any) {
      this.model = newData;
    } 
    public search = null;

    public removItem(item:any) {
        const index = this.model.indexOf(item);
        if(index>-1) {
            this.model.splice(index,1);
            this.emitToParent();
        }
    }
    @Emit('change')
    emitToParent() {
      return this.model
    }
  }
</script>

<style lang="scss" scoped>
  .tinychip {
    background-color: lightskyblue !important;
  }
</style>