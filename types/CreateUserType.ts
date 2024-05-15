export type CreateUserType = {
    firstName: string,
    lastName: string,
    birthDate: Date,
    id?: any,
    status?: boolean,
    roles: string[],
    iban: string,
    Identity: string,
    gender: string,
    userAddress: string,
}

export type UserAuthType = {
    username?: string,
    password?: string
}

export type UpdateUserType = {
    firstName: string,
    lastName: string,
    birthDate: Date,
    id?: any,
    roles: string[],
    iban: string,
    userAddress: string,
}

export type UserAddressType = {
    city: string,
    district: string,
    address: string,
    addressStatus?: string
}