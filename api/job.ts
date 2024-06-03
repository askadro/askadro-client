import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/api/index";
import {
    CREATE_JOB,
    CREATE_TICKET,
    DELETE_JOB, FILTER_JOB,
    GET_JOB,
    GET_JOBS,
    TICKET,
    TICKETS,
    UPDATE_JOB,
    UPDATE_TICKET
} from "@/api/paths";
import {Ticket} from "@/types/TicketType";
import {CACHE_TIME_1_HOUR, CACHE_TIME_4_HOUR} from "@/config/app";
import {Job} from "@/types/JobType";

export function GetJobs() {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const res = await apiClient.get(GET_JOBS);
            return await res.data;
        },
        staleTime:CACHE_TIME_4_HOUR
    });
}

export function GetJob(id:string) {
    return useQuery({
        queryKey: ['job',id],
        queryFn: async () => {
            const res = await apiClient.get(`${GET_JOB}/${id}`);
            return await res.data;
        },
        staleTime:CACHE_TIME_1_HOUR
    });
}



export function CreateJob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (job: Job) => {
            const res = await apiClient.post(CREATE_JOB, job);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["jobs"]})
        }
    });
}

export function UpdateJob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (job: Job) => {
            const res = await apiClient.patch(UPDATE_JOB, job);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["jobs"]})
        }
    });
}

export function DeleteJob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id:String) => {
            const res = await apiClient.delete(`${DELETE_JOB}/${id}`);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["jobs"]})
        }
    });
}

//tipler düzenlenecek
export function FilterJob() {
    return useMutation({
        mutationFn: async (job: Job) => {
            const res = await apiClient.patch(FILTER_JOB, job);
            return await res.data;
        }
    });
}
