export type AddressType = {
    companyId?: string,
    provinceId?: string,
    districtId?: string,
    addressDetail?: string,
    addressStatus?: string,
}

export type Address = {
    province: Location,
    district: Location,
    addressDetail?: string,
    addressStatus?: string,
}

export type Location = {
    id: string,
    name: string
}