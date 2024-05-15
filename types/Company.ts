
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
}


export type CreateCompany = {
    name: string
    phone: string
    registrationNumber: string
    timeOfPayment: string
    totalWorkingTime: string
    shortName?: string
    logoId?:string
}

export type UpdateCompanyType = {
    name: string
    phone: string
    city: string
    location: string
    registrationNumber: string
    timeOfPayment: string
    totalWorkingTime: string
    password?: string
    shortName?: string
    logoId?:string
    id: string
}
