import { Role } from "../enum/role.enum";

export type UserDto = {
    id:string;
    username:string;
    password:string;
    role:Role[];
}