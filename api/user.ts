import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {apiClient} from "@/api/index";
import {CREATE_USER, DELETE_USER, PROFILE, SEARCH_USER, UPDATE_USER, USER, USERS} from "@/api/paths";
import {AddressType, AuthType, User} from "@/types";
import {CACHE_TIME_16_HOUR, CACHE_TIME_4_HOUR, CACHE_TIME_64_HOUR} from "@/config/app";

export const fetchUsers = async () => {
    const res = await apiClient.get(USERS);
    return await res.data;
}

export function GetProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await apiClient.get(PROFILE);
            return await res.data;
        },
        staleTime: CACHE_TIME_64_HOUR, // 64 hour
    });
}

export function GetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await apiClient.get(USERS);
            return await res.data;
        },
        staleTime: CACHE_TIME_16_HOUR, // 64 hour
    });
}

export function GetUser(id: string | string[] | undefined) {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            let users: any = await queryClient.getQueryData(["users"])
            if (!users) {
                const res = await apiClient.get(`${USER}/${id}`)
                return res.data;
            }
            return users?.find((u: User) => u.id === id)
            // const selectedUser = await users.find((user:User) => user.id === id);

        },
        staleTime: CACHE_TIME_16_HOUR, // 64 hour
    })
}

export function SearchUsers(query: string) {
    return useQuery({
        queryKey: ['user', query],
        queryFn: async () => {
            const res = await apiClient.get(`${SEARCH_USER}/${query}`);
            return res.data;
        },
        staleTime: CACHE_TIME_4_HOUR
    })
}

export function SetUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: User) => {
            const res = await apiClient.post(CREATE_USER, user);
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["users"]})
        }
    });
}

export function UpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: User) => {
            const res = await apiClient.patch(`${UPDATE_USER}/${user.id}`, user);
            return await res.data;
        },
        async onSuccess(data) {
            await queryClient.invalidateQueries({queryKey: ["users"]})
        }
    });
}

export function DeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id?: string) => {
            const res = await apiClient.delete(`${DELETE_USER}/${id}`);
            console.log("deleted user: ", res.data)
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["users"]})
        }
    });
}