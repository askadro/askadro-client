import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getApiClient} from "@/api/index";
import {Staff} from "@/types";
import {CACHE_TIME_16_HOUR, CACHE_TIME_4_HOUR, CACHE_TIME_64_HOUR} from "@/config/app";
import {CREATE_STAFF, DELETE_STAFF, SEARCH_STAFF, STAFF, STAFFS, UPDATE_STAFF} from "@/api/paths";

export function GetStaffs() {
    return useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await getApiClient().get(STAFFS);
            return await res.data;
        },
        staleTime: CACHE_TIME_16_HOUR, // 64 hour
    });
}

export function GetStaff(id: string | string[] | undefined) {
    return useQuery({
        queryKey: ['staff', id],
        queryFn: async () => {
            const res = await getApiClient().get(`${STAFF}/${id}`)
            return res.data;
        },
        staleTime: CACHE_TIME_16_HOUR, // 64 hour
    })
}

export function SearchStaffs() {
    return useMutation({
        mutationFn: async (query:string) => {
            const res = await getApiClient().post(SEARCH_STAFF, {query});
            return await res.data;
        }
    });
}

export function SetStaff() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (staff: Staff) => {
            const res = await getApiClient().post(CREATE_STAFF, staff);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["staffs"]})
        }
    });
}

export function UpdateStaff() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (staff: Staff) => {
            const res = await getApiClient().patch(`${UPDATE_STAFF}/${staff.id}`, staff);
            return await res.data;
        },
        async onSuccess(data) {
            await queryClient.invalidateQueries({queryKey: ["staffs"]})
        }
    });
}

export function DeleteStaff() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id?: string) => {
            const res = await getApiClient().delete(`${DELETE_STAFF}/${id}`);
            console.log("deleted staff: ", res.data)
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["staffs"]})
        }
    });
}