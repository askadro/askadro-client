import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@/api/index";
import {DISTRICTS, PROVINCES} from "@/api/paths";
import {CACHE_TIMEOUT} from "@/config/app";

export function GetProvinces() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await apiClient.get(PROVINCES);
            const response = await res.data;
            return response.map((province: any) => {
                return {label: province.name, value: province.id}
            })
        },
        staleTime: CACHE_TIMEOUT
    });
}

export function GetDistricts() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await apiClient.get(DISTRICTS);
            return await res.data;
        },
        staleTime: CACHE_TIMEOUT
    });
}