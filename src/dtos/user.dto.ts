import { UUID } from "crypto"

export type UserDto = {
    id:UUID;
    username:string;
    password:string;
    isAdmin:boolean;
}