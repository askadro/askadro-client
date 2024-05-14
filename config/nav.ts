import { v4 } from "uuid";
import HomeSvg from "../assets/svgs/home.svg"
import ReportSvg from "../assets/svgs/report.svg"
import TicketSvg from "../assets/svgs/ticket.svg"
import UserSvg from "../assets/svgs/user.svg"
import Home2Svg from "../assets/svgs/home2.svg"
import {Home, LineChart, Package, Users2,MessageCircleX,Building2} from "lucide-react";
import {APP_PATHS} from "@/config/paths";

const mergePath =(main:string,side:string)=>{
    return `${main}/${side}`;
}

export const dashboard_navs = [
    {
        id:v4(),
        title:"homepage",
        path: APP_PATHS.home,
        icon:Home,
    },
    {
        id:v4(),
        title:"users",
        path: APP_PATHS.users,
        icon:Home,
    },
    {
        id:v4(),
        title:"companies",
        path: APP_PATHS.companies,
        icon:Building2,
    },
    {
        id:v4(),
        title:"tickets",
        path: APP_PATHS.tickets,
        icon:Package,
    },
    {
        id:v4(),
        title:"reports",
        path: APP_PATHS.reports,
        icon:LineChart,
    },
    {
        id:v4(),
        title:"profile",
        path: APP_PATHS.profile,
        icon:Users2,
    },
    {
        id:v4(),
        title:"chat",
        path: APP_PATHS.chat,
        icon:MessageCircleX,
    },

]

export const auth_navs = [
    {
        id:v4(),
        title:"About Us",
        path: "about-us",
        icon:Home2Svg,
    },

    {
        id:v4(),
        title:"Contact",
        path: "contact",
        icon:UserSvg,
    },

]