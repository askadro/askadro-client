import {format} from "date-fns";

export type User = {
    identity?: string
    firstName: string
    lastName: string
    birthDate: string
    gender: string
    id?:  string | string[] | undefined;
    status?: string | undefined
    image?: string | undefined
    iban: string
    titles: string[]
    addressDetail?:string
    districtId?: string
    provinceId?: string
    password?:string
    username?: string
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
}