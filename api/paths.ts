export const LOGIN = "users/login";

const userMainPath = "users"
const companyMainPath = "companies";
const provinceMainPath = "provinces";
const ticketMainPath = "tickets";
export const USERS = userMainPath;
export const CREATE_USER = `${userMainPath}/create`;
export const USER = `${userMainPath}/user`;
export const UPDATE_USER = `${userMainPath}/update`;
export const DELETE_USER = `${userMainPath}/delete`;


//yapılacaklar
//adresler
export const CREATE_ADDRESS = `${userMainPath}/user-address-create`;  // :id
export const UPDATE_ADDRESS = `${userMainPath}/user-address-update`;  // :userAddressId

//işler
export const USER_JOB = `${userMainPath}/job`; //id

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
export const DISTRICTS = `${provinceMainPath}/districts`;

//TICKETS

export const CREATE_TICKET = `${ticketMainPath}/create`