import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {apiClient} from "@/api/index";
import {LOGIN, USERS} from "@/api/paths";


export function GetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await apiClient.get(USERS);
            return await res.data;
        },

        staleTime: 960 * (60 * 4000), // 64 hour
    });
}
