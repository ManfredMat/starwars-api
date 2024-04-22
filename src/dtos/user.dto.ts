import { UUID } from "crypto"
import { Role } from "./role.dto";

export type UserDto = {
    id:string;
    username:string;
    password:string;
    role:Role[];
}