export default interface Skills {
    name:string,
    email?:string
    knownSkills:Array<string>,
    desiredSkills:Array<string>,
    methods?:Array<boolean>,
    dp:string,
    filter?:(params:any)=>any
}