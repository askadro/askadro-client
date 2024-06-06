
const commonMainPath = "common";
const authMainPath = "auth";
const userMainPath = "users"
const companyMainPath = "companies";
const provinceMainPath = "provinces";
const ticketMainPath = "tickets";
const jobMainPath = "jobs"

//COMMON | SUMMARY
export const SUMMARY = `${commonMainPath}/summary`

//AUTH
export const LOGIN = `${authMainPath}/login`;
export const VALIDATE_TOKEN = `${authMainPath}/validate-token`;
export const LOGOUT = `${authMainPath}/logout`;

//USER
export const USERS = userMainPath;
export const CREATE_USER = `${userMainPath}/create`;
export const USER = `${userMainPath}/user`;
export const UPDATE_USER = `${userMainPath}/update`;
export const DELETE_USER = `${userMainPath}/delete`;
export const PROFILE = `${userMainPath}/profile`;


//yapılacaklar
//adresler
export const CREATE_ADDRESS = `${userMainPath}/user-address-create`;  // :id
export const UPDATE_ADDRESS = `${userMainPath}/user-address-update`;  // :userAddressId

//jobs
export const CREATE_JOB = `${jobMainPath}/new`;
export const GET_JOB = `${jobMainPath}`; //:id
export const UPDATE_JOB = `${jobMainPath}/update`; //:id
export const GET_JOBS = `${jobMainPath}`;
export const DELETE_JOB = `${jobMainPath}/delete` //:id
export const FILTER_JOB = `${jobMainPath}/filter/job` //:id
export const NEW_JOB_WITH_TICKET = `${jobMainPath}/new/ticket`;


//search
export const SEARCH_USER = `${userMainPath}/user-search`; //query

//COMPANY
export const COMPANIES = `${companyMainPath}`;
export const CREATE_COMPANY = `${companyMainPath}/new`;
export const UPDATE_COMPANY = `${companyMainPath}/update`; //id
export const DELETE_COMPANY = `${companyMainPath}/delete`; //id
export const FILTER_COMPANY = `${companyMainPath}/filter`;
export const SEARCH_COMPANY = `${companyMainPath}/search`;
export const AUTHORIZED_COMPANY = `${companyMainPath}/new-authorized`;


//PROVINCES

export const PROVINCES = `${provinceMainPath}`;
export const DISTRICTS = `${provinceMainPath}`;

//TICKETS

export const TICKETS = `${ticketMainPath}/only-ticket`;
export const CREATE_TICKET = `${ticketMainPath}/new`
export const UPDATE_TICKET = `${ticketMainPath}/update`  //:id
export const TICKET = `${ticketMainPath}`; //:id
export const SEND_AS_MAIL = `${ticketMainPath}/send-email`; //:id

