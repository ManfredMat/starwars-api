import { UUID } from "crypto"
import { Role } from "./role.dto";

export type UserDto = {
    id:UUID;
    username:string;
    password:string;
    role:Role[];
}