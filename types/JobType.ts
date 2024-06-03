export type Job = {
    id?:string
    companyId?:string
    userId?:string
    enterTime:Date
    exitTime: Date;
    extraTime?:string
    title?:string
}