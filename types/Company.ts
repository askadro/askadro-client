import {Address, AddressType} from "@/types/AddressType";
import {AuthorizedType} from "@/types/AuthorizedType";

export type Company = {
    name: string
    phone: string
    city: string
    location: string
    registrationNumber: string
    timeOfPayment: string
    totalWorkingTime: string
    password: string
    shortName: string
    logoId:string
    id: string
    updatedDate: string
    deletedDate: any
    createdDate: string
    address: Address
}


export type CreateCompany = {
    name: string
    phone: string
    registrationNumber: string
    timeOfPayment: string
    totalWorkingTime: string
    shortName?: string
    logoId?:string
    email:string
    password?:string,
    companyId?: string,
    provinceId?: string,
    districtId?: string,
    addressDetail?: string,
    addressStatus?: string,
    authorized?:AuthorizedType[]
}

export type UpdateCompanyType = {
    name: string
    phone: string
    registrationNumber: string
    timeOfPayment: string
    totalWorkingTime: string
    shortName?: string
    logoId?:string
    email:string
    password?:string,
    companyId?: string,
    provinceId?: string,
    districtId?: string,
    addressDetail?: string,
    addressStatus?: string,
    id: string
    authorized?:AuthorizedType[]
}
