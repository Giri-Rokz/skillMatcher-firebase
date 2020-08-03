import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import fb from '@/firebase';
import User from "@/interfaces/user";
import Skills from "@/interfaces/skills";
import router from '@/router';

const users = fb.db.collection("users");

@Module({namespaced:true})
class StoreData extends VuexModule {
    //state - class variables
    public loggedIn = false;
    public showPopup = false;
    public popupmsg = "";    
    public isNewUser = true;
    public userInfo:Skills = {
        "name": "",
        "email": "",
        "dp": "",
        "knownSkills": [],
        "desiredSkills": []
    }
    public matches:Array<any> = [];
    public tempMatches:Skills[] = [];
    public searchedSkills:string[] = [];
    public docRecord:Record<string,string[]|string|boolean> = {};
    
    //Getters
    get isLoggedIn():boolean {
        return this.loggedIn;
    }
    get userData():Skills {
        return this.userInfo;
    }
    get userName():string {
        return this.userInfo.name;
    }
    get matchedUsers():Skills[] {
        return this.matches;
    }
    get toggledUsers():Skills[] {
        return this.tempMatches;
    }

    //Actions
    @Action
    public async signIn(): Promise<any> {
        try {
            debugger;
            const result = await fb.auth.signInWithPopup(fb.provider);
            if(result) {
                this.context.commit('setLogin',true);
                this.context.commit('setUserInfo',result);
                router.push('createProfile');
            }
        } catch(err) {
            console.log(err);
        }
    }
    @Action
    public async showMatches(payload:Skills):Promise<any> {
        try {
            this.context.commit('emptyMatches');
            payload.name = this.userInfo.name;
            payload.email = this.userInfo.email;
            users.doc(payload.name).set(payload).then((res:any)=>users.get().then((snap:any)=>console.log(snap)));
            this.context.dispatch('searchSkills',payload.desiredSkills);
            router.push('matches');      
        }catch(err) {
            console.log(err);
        }
    }
    @Action
    public searchSkills(desiredSkills:string[]):void {
        try{
            users.where('knownSkills','array-contains-any',desiredSkills).get().then((snapshot:any)=>{
                this.context.commit('setMatches',snapshot);
                this.context.commit('addSearchedSkills',desiredSkills);
            });
        }catch(err) {
            console.log(err);
        }
    }
    @Action
    public async getAllData():Promise<any> {
        try {
            users.doc(this.userInfo.name).get().then((resp:any) => {
                this.context.commit('setUserSkills',resp.data());
            });
        }catch(err) {
            console.log(err);
        }
        
    }
    @Action
    public desiredSkills(skills:Array<string>):void {
        this.context.commit('setDesiredSkills',skills);
    }
    @Action
    public knownSkills(skills:Array<string>):void {
        this.context.commit('setKnownSkills',skills);
    }
    @Action
    public editMatches(activeState:string[]):void {
        this.context.commit('setNewMatches',activeState);
    }
    @Action
    public addSkills(model:string[]):void {
        this.context.dispatch('searchSkills',model);
    }
    @Action
    public async signOut():Promise<any> {
        try{
            const result = await fb.auth.signOut();
            this.context.commit('setLogin',false);
        }catch(err) {
            console.log(err);
        }
    }    
    
    //Mutations
    @Mutation
    public setLogin(loginStatus:boolean):void {
        this.loggedIn = loginStatus;
        if(!this.loggedIn) {
            router.push("home");
        }
    }
    @Mutation
    public emptyMatches():void {        
        this.matches = [];
        this.docRecord = {};
    }
    @Mutation
    public setDesiredSkills(skills:Array<string>):void {        
        this.userInfo.desiredSkills = skills;
    } 
    @Mutation
    public addSearchedSkills(skills:Array<string>):void {  
        skills.forEach((skill:any)=>this.userInfo.desiredSkills.push(skill));
        this.userInfo.desiredSkills = Array.from(new Set(this.userInfo.desiredSkills));
    }
    @Mutation
    public setKnownSkills(skills:Array<string>):void {
        this.userInfo.knownSkills = skills;
    }
    @Mutation
    public setUserInfo(user:User):void {
        this.userInfo.name = user.additionalUserInfo.profile.name;
        this.userInfo.email = user.additionalUserInfo.profile.email;
        this.userInfo.dp = user.user.photoURL;
        this.isNewUser = user.additionalUserInfo.isNewUser;
    }
    @Mutation
    public setUserSkills(data:Skills):void {
        if(data&&(data.knownSkills||data.desiredSkills)) {
            this.userInfo.knownSkills = data.knownSkills;
            this.userInfo.desiredSkills = data.desiredSkills;
        }
    }
    @Mutation
    public setMatches(snapshot:any):void { 
        snapshot.forEach((doc:any)=> {
            this.docRecord[doc.data().name] = doc.data();
        })
        this.matches = [];
        this.tempMatches = [];
        Object.keys(this.docRecord).forEach((record:any)=>{
            this.matches.push(this.docRecord[record]);
        })        
        this.tempMatches = this.matches;        
    }
    @Mutation
    public setNewMatches(activeState:string[]):void {
        this.tempMatches = this.matches.filter((match:any)=> {
            return match.knownSkills.some((skill:string)=>activeState.includes(skill));
        });
    }
}

export default StoreData;