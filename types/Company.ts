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
    authorized?:Authorized[]
    logo:string
    id?: string
    updatedDate: string
    deletedDate: any
    createdDate: string
}

export type Authorized  = {
    authorizedEmail: string
    authorizedPassword: string
    authorizedPerson: string
    authorizedPhone: string
    authorizedTitle: string
    company: string
}

export type CreateCompany = {
    name: string
    phone: string
    city: string
    location: string
    registrationNumber: string
    timeOfPayment: string
    totalWorkingTime: string
    password: string
    shortName: string
    logo:string
    authorized?:Authorized[]
}

export type UpdateCompanyType = {
    name: string
    phone: string
    city: string
    location: string
    registrationNumber: string
    timeOfPayment: string
    totalWorkingTime: string
    password: string
    shortName: string
    logo:string
    authorized?:Authorized[]
    id: string
}
