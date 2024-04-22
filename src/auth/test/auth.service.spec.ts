import { UsersService } from "../../users/users.service";
import { AuthService } from "../auth.service"
import { Model } from "mongoose";
import { User } from "../../database/schemas/users.schema";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../../dtos/role.dto";
import * as brcypt from 'bcrypt';

describe('AuthService' , ()=>{
    let authService:AuthService;
    let userService:UsersService;
    let userModelMock: Model<User>;
    let jwtService:JwtService
    beforeEach(()=>{
        userModelMock = {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          } as unknown as Model<User>;
        jwtService = new JwtService()
        userService = new UsersService(userModelMock);
        authService = new AuthService(userService , jwtService);
    });
    
    describe('signIn',()=>{
        it('should let our user to login' , async ()=>{
            const mock = {username:'existinguser' , password:'1234'}

            jest.spyOn(userService , 'findOne').mockResolvedValue(
                {id:'e0a742fc-ed6d-44c7-9d6c-6103c6356a17' , username: 'existinguser' , password:'$2b$10$0sL9dG84qCh11yWm97T1B./Ko26Kyzl0L98vkBOFcvqgbx9W0Yofa' , role:[Role.ADMIN]}
            );
            jest.spyOn(jwtService , 'signAsync').mockResolvedValue('un base 64')
            const user = await userService.findOne(mock.username);
            const compare = await brcypt.compare(mock.password , user.password);
             
            expect(compare).toBe(true);
        });

        it('should reject the user to login' , async ()=>{
            const mock = {username:'existinguser' , password:'its not ok'}

            jest.spyOn(userService , 'findOne').mockResolvedValue(
                {id:'e0a742fc-ed6d-44c7-9d6c-6103c6356a17' , username: 'existinguser' , password:'$2b$10$0sL9dG84qCh11yWm97T1B./Ko26Kyzl0L98vkBOFcvqgbx9W0Yofa' , role:[Role.ADMIN]}
            );
            jest.spyOn(jwtService , 'signAsync').mockResolvedValue('un base 64')
            const user = await userService.findOne(mock.username);
            const compare = await brcypt.compare(mock.password , user.password);

             
            expect(compare).toBe(false);
        })
    })
})