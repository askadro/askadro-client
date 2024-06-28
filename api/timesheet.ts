import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getApiClient} from "@/api/index";
import {CREATE_TIMESHEET, TIMESHEET_WITH_MONTH, UPDATE_TIMESHEET} from "@/api/paths";
import {AddTimesheetType, TimesheetRequestType, UpdateTimesheet} from "@/types";

export function GetTimesheetWithMonth() {
    return useMutation({
        mutationFn: async (body:TimesheetRequestType) => {
            const res = await getApiClient().post(TIMESHEET_WITH_MONTH, body);
            return await res.data;
        }
    });
}

export function UpdateTimesheetWithId() {
    return useMutation({
        mutationFn: async (body:UpdateTimesheet) => {
            const res = await getApiClient().put(`${UPDATE_TIMESHEET}/${body.id}`, body);
            return await res.data;
        }
    });
}

export function AddTimesheet() {
    return useMutation({
        mutationFn: async (body:AddTimesheetType) => {
            const res = await getApiClient().post(`${CREATE_TIMESHEET}`, body);
            return await res.data;
        }
    });
}
