const mergePath = (main: string, side: string) => {
    return `/${main}/${side}`;
}

export const AUTH_PATHS = {
    auth: "auth",
    signin: "signin",
    login: "login",
    logout: "logout",
}
export const AUTH_TOKEN_PATHS = {}
export const AUTH_TOKEN_SECRET = {}

let lang: string = "tr"
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
}