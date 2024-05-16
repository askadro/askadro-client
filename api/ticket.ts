import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/api/index";
import { CREATE_TICKET} from "@/api/paths";
import {Ticket} from "@/types/TicketType";

export function SetTicket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({companyId,staffs,enterHour,exitHour,date,notes}: Ticket) => {
            const res = await apiClient.post(CREATE_TICKET, {companyId,staffs,enterHour,exitHour,date,notes});
            return await res.data;
        },
        // async onSuccess() {
        //     await queryClient.invalidateQueries({queryKey: ["companies"]})
        // }
    });
}
