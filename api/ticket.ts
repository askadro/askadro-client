import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getApiClient} from "@/api/index";
import {
    CREATE_JOB,
    CREATE_TICKET,
    NEW_JOB_WITH_TICKET,
    SEND_AS_MAIL,
    TICKET,
    TICKETS,
    UPDATE_TICKET
} from "@/api/paths";
import {Ticket} from "@/types/TicketType";
import {CACHE_TIME_1_HOUR, CACHE_TIME_4_HOUR} from "@/config/app";
import {Job} from "@/types/JobType";
import {MailContentType} from "@/types/MailContentType";

export function GetTickets() {
    return useMutation({
        mutationFn: async (body?:{startDate: Date, endDate: Date}) => {
            const res = await getApiClient().post(TICKETS, body);
            return await res.data;
        }
    });
}

export function GetTicket(id?:string) {
    return useQuery({
        queryKey: ['ticket',id],
        queryFn: async () => {
            const res = await getApiClient().get(`${TICKET}/${id}`);
            return await res.data;
        },
        staleTime:CACHE_TIME_1_HOUR
    });
}



export function CreateTicket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ticket: Ticket) => {
            const res = await getApiClient().post(CREATE_TICKET, ticket);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["tickets"]})
        }
    });
}

export function UpdateTicket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ticket: Ticket) => {
            const res = await getApiClient().patch(`${UPDATE_TICKET}/${ticket.id}`, ticket);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["tickets"]})
        }
    });
}

export function SendMailTicket() {
    return useMutation({
        mutationFn: async (data:{id:string,mailContent:MailContentType}) => {
            const res = await getApiClient().post(`${SEND_AS_MAIL}/${data.id}`,data.mailContent);
            return await res.data;
        }
    });
}
