export const auth = (values: any) => {
    return values.username && values.password ? {
        username: values.username,
        password: values.password
    } : undefined;
}

export const address = (values: any) => {
    return values.city && values.district && values.address ? {
        city: values.city,
        district: values.district,
        address: values.address,
        addressStatus: "ACTIVE",
    } : undefined;
}

export const getInitialDate = (hour: number = 7) => {
    const now = new Date();
    now.setHours(hour, 0, 0, 0); // Saat 07:00:00.000 olarak ayarla
    return now;
};