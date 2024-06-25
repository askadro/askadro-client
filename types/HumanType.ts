export type HumanType = {
    id?: string | string[] | undefined;
    identity?: string
    firstName: string
    lastName: string
    birthDate: string
    phone: string
    gender: string
    iban: string
    addressDetail?: string
    districtId?: string
    provinceId?: string
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
}