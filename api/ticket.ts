import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/api/index";
import {CREATE_TICKET, TICKET, TICKETS, UPDATE_TICKET} from "@/api/paths";
import {Ticket} from "@/types/TicketType";
import {CACHE_TIME_1_HOUR, CACHE_TIME_4_HOUR} from "@/config/app";

export function GetTickets() {
    return useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const res = await apiClient.get(TICKETS);
            return await res.data;
        },
        staleTime:CACHE_TIME_4_HOUR
    });
}

export function GetTicket(id?:string) {
    return useQuery({
        queryKey: ['ticket',id],
        queryFn: async () => {
            const res = await apiClient.get(`${TICKET}/${id}`);
            return await res.data;
        },
        staleTime:CACHE_TIME_1_HOUR
    });
}



export function CreateTicket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ticket: Ticket) => {
            const res = await apiClient.post(CREATE_TICKET, ticket);
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
            const res = await apiClient.post(UPDATE_TICKET, ticket);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["tickets"]})
        }
    });
}
