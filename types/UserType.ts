import {HumanType} from "@/types/HumanType";

export type UserType = {
    status?: string | undefined
    image?: string | undefined
    roles: string
    password?: string
    username?: string
    email: string
}

export type User = UserType & HumanType