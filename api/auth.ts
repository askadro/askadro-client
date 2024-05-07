import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {apiClient} from "@/api/index";
import {LOGIN} from "@/api/paths";


export function Login(debounceTime: number = 0) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }: any) => {
            const res = await apiClient.post(LOGIN, { email, password });
           return res.data
        },
        onError(error, variables, context) {
            return { error, variables, context };
        },
        // onSuccess(data, variables, context) {
        //     queryClient.invalidateQueries({ queryKey: ['profile'] });
        //     // MMKV.setString('token', res.data.token);
        // },
    });
}