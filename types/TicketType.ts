export type Ticket = {
    companyId: string,
    staffs: [{ title: string, staffId: string }],
    enterHour: string,
    exitHour: string,
    date: Date,
    notes: string[]
}