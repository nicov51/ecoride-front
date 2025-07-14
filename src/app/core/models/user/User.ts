import {Role} from "./role";

export interface User {
id : number
name : string
firstName : string
email : string
password : string
phone : string
address : string
birthDate : string | Date
picture : string | Blob | null
pseudo : string
isVerified : boolean;
roles: Role[];
}
