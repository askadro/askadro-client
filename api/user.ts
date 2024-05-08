import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CreateUserType} from "@/types/CreateUserType";
import {apiClient} from "@/api/index";
import {CREATE_USER, USERS} from "@/api/paths";

export const fetchUsers = async () => {
    const res = await apiClient.get(USERS);
    return await res.data;
}

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

export function SetUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({firstName, lastName, Identity, birthDate, gender}: CreateUserType) => {
            const res = await apiClient.post(CREATE_USER, {firstName, lastName, Identity, birthDate, gender});
            console.log("sss: ", res)
            return await res.data;
        },
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ["users"]})
        }
    });
}
