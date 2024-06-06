import {useQuery} from "@tanstack/react-query";
import {getApiClient} from "@/api/index";
import {SUMMARY} from "@/api/paths";
import {CACHE_TIME_64_HOUR} from "@/config/app";

export function GetSummary() {
    return useQuery({
        queryKey: ['summary'],
        queryFn: async () => {
            const res = await getApiClient().get(`${SUMMARY}`)
            return res.data;
        },
        staleTime: CACHE_TIME_64_HOUR, // 64 hour
    })
}