import {Job} from "@/types/JobType";
import {JobStatusEnum} from "@/config/enums";

export type Ticket = {
    companyId?: string,
    userId:string,
    enterTime: Date,
    exitTime: Date,
    ticketDate: Date,
    ticketNotes: string,
    jobs: Job[],
    status?:JobStatusEnum
}