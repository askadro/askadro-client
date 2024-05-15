import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@/api/index";
import {DISTRICTS, PROVINCES} from "@/api/paths";
import {CACHE_TIMEOUT} from "@/config/app";

export function GetProvinces() {
    return useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            const res = await apiClient.get(PROVINCES);
            const response = await res.data;
            const data = response.map((province: any) => {
                return {label: province.name, value: province.id}
            })
            return data.sort((a: { label: string; }, b: { label: string; }) => a.label.localeCompare(b.label))
        },
        staleTime: CACHE_TIMEOUT
    });
}

export function GetDistricts(id:string) {
    return useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await apiClient.get(`${DISTRICTS}/${id}`);
            return await res.data;
        },
        staleTime: CACHE_TIMEOUT
    });
}