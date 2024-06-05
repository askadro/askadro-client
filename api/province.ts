import {useQuery} from "@tanstack/react-query";
import {getApiClient} from "@/api/index";
import {DISTRICTS, PROVINCES} from "@/api/paths";
import {CACHE_TIMEOUT} from "@/config/app";
import {CACHE_ONE_YEAR} from "next/dist/lib/constants";

export function GetProvinces() {
    return useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            const res = await getApiClient().get(PROVINCES);
            const response = await res.data;
            const data = response.map((province: any) => {
                return {label: province.name, value: province.id}
            })
            return data.sort((a: { label: string; }, b: { label: string; }) => a.label.localeCompare(b.label))
        },
        staleTime: CACHE_ONE_YEAR
    });
}

export function GetDistricts(id?:string) {
    return useQuery({
        queryKey: ['districts',id],
        queryFn: async () => {
            if(!id) return []
            const res = await getApiClient().get(`${DISTRICTS}/${id}/district`);
            if(!res.data) return []
            const response = await res.data;
            const data = response.map((province: any) => {
                return {label: province.name, value: province.id}
            })
            return data.sort((a: { label: string; }, b: { label: string; }) => a.label.localeCompare(b.label))
        },
        staleTime: CACHE_ONE_YEAR
    });
}