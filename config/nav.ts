import { v4 } from "uuid";
import HomeSvg from "../assets/svgs/home.svg"
import ReportSvg from "../assets/svgs/report.svg"
import TicketSvg from "../assets/svgs/ticket.svg"
import UserSvg from "../assets/svgs/user.svg"
import Home2Svg from "../assets/svgs/home2.svg"
import {Home, LineChart, Package, Users2} from "lucide-react";

const mergePath =(main:string,side:string)=>{
    return `${main}/${side}`;
}

export const dashboard_navs = [
    {
        id:v4(),
        title:"Anasayfa",
        path: "homepage",
        icon:Home,
    },
    {
        id:v4(),
        title:"Talepler",
        path: "tickets",
        icon:Package,
    },
    {
        id:v4(),
        title:"Raporlar",
        path: "reports",
        icon:LineChart,
    },
    {
        id:v4(),
        title:"Profil",
        path: "profile",
        icon:Users2,
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