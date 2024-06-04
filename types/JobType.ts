export type Job = {
    id?:string
    userId?:string
    enterTime:Date
    exitTime: Date;
    extraTime?:string
    title?:string
    ticketId?:string
    extraPrice?:string
}