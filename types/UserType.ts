export type User = {
    Identity: string
    firstName: string
    lastName: string
    birthDate: Date
    gender: string
    id?: string
    status?: string
    deletedAt?: any
    createdAt?: string
    updatedAt?: string
    image?:string
    roles:string[]
    iban:string
}