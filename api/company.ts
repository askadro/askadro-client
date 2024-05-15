import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/api/index";
import {COMPANIES, CREATE_COMPANY, CREATE_USER, DELETE_COMPANY, UPDATE_COMPANY, UPDATE_USER} from "@/api/paths";
import {CACHE_TIMEOUT} from "@/config/app";
import {AddressType, AuthorizedType, AuthType, CreateCompany, UpdateCompanyType} from "@/types";

export function GetCompanies() {
    return useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            const res = await apiClient.get(COMPANIES);
            return await res.data;
        },
        staleTime: CACHE_TIMEOUT, // 32 hour
    });
}

export function GetCompany(id: string | string[] | undefined) {
    return useQuery({
        queryKey: ['company',id],
        queryFn: async () => {
            const res = await apiClient.get(`${COMPANIES}/${id}`);
            return await res.data;
        },
        staleTime: CACHE_TIMEOUT, // 32 hour
    });
}

export function SetCompany() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({auth,company,authorized,address}: {auth:AuthType,company:CreateCompany,authorized:AuthorizedType[],address:AddressType}) => {
            const res = await apiClient.post(CREATE_COMPANY, {auth,company,authorized,address});
            return await res.data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ["companies"]})
        }
    });
}

export function UpdateCompany() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id,auth,company,authorized,address}: {id:string,auth:AuthType,company:CreateCompany,authorized:AuthorizedType[],address:AddressType}) => {
            const res = await apiClient.patch(`${UPDATE_COMPANY}/${id}`, {auth,company,authorized,address});
            return await res.data;
        },
        async onSuccess() {
            await  queryClient.invalidateQueries({queryKey: ["companies"]})
        }
    });
}

export function DeleteCompany() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id:string) => {
            const res = await apiClient.delete(`${DELETE_COMPANY}/${id}`);
            return await res.data;
        },
        async onSuccess() {
            await  queryClient.invalidateQueries({queryKey: ["companies"]})
        }
    });
}