import {getLocalStorage} from "@/utils/storage";

const mergePath = (main: string, side: string) => {
    return `/${main}/${side}`;
}
let lang: string = getLocalStorage("lang") || "tr"
const auth= `${lang}/auth`

export const AUTH_PATHS = {
    register: mergePath(auth,"register"),
    login: mergePath(auth,"login"),
    forget_password: mergePath(auth,"forget_password"),
}
export const AUTH_TOKEN_PATHS = {}
export const AUTH_TOKEN_SECRET = {}


// if (typeof window !== undefined) {
//     if (localStorage?.getItem("lang") !== null) {
//         lang = localStorage.getItem("lang") || "tr"
//     }
// }
const dashboard= `${lang}/dashboard`

export const APP_PATHS = {
    profile: mergePath(dashboard, "profile"),
    users: mergePath(dashboard, "users"),
    home: mergePath(dashboard, "home"),
    tickets: mergePath(dashboard, "tickets"),
    reports: mergePath(dashboard, "reports"),
    chat: mergePath(dashboard, "chat"),
    companies: mergePath(dashboard, "companies"),
    myservices:mergePath(dashboard, "myservices"),
    staffs: mergePath(dashboard, "staffs"),
    timesheet: mergePath(dashboard, "timesheet"),
}