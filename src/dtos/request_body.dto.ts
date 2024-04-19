export type SignInDto = { 
    username:string;
    password:string;
}

export type RegisterUserDto = {
    username:string;
    password:string;
    isAdmin?:boolean;
}