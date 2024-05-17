import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/api/index";
import {CREATE_TICKET, TICKETS} from "@/api/paths";
import {Ticket} from "@/types/TicketType";
import {CACHE_TIME_4_HOUR} from "@/config/app";

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


export function SetTicket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({companyId,staffs,enterHour,exitHour,date,notes}: Ticket) => {
            const res = await apiClient.post(CREATE_TICKET, {companyId,staffs,enterHour,exitHour,date,notes});
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["tickets"]})
        }
    });
}
