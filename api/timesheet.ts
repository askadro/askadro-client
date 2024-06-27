import {useMutation} from "@tanstack/react-query";
import {getApiClient} from "@/api/index";
import { TIMESHEET_WITH_MONTH} from "@/api/paths";
import {TimesheetRequestType} from "@/types";

export function GetTimesheetWithMonth() {
    return useMutation({
        mutationFn: async (body:TimesheetRequestType) => {
            const res = await getApiClient().post(TIMESHEET_WITH_MONTH, body);
            return await res.data;
        }
    });
}
