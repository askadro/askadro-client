import {Job} from "@/types/JobType";
import {JobStatusEnum} from "@/config/enums";

export type Ticket = {
    companyId: string,
    userId:string,
    enterTime: string,
    exitTime: string,
    ticketDate: string,
    ticketNotes: string[],
    jobs: Job[],
    status:JobStatusEnum
}