export type AddTimesheetType = {
    staffId: string | string[] | undefined,
    companyId: string,
    date: string,
    hoursWorked: number
}