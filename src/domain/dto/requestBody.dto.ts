import { Role } from "../enum/role.enum";

export type SignInDto = { 
    username:string;
    password:string;
}

export type RegisterUserDto = {
    username:string;
    password:string;
    role?:Role[];
}