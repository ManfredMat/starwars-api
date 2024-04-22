import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../database/schemas/users.schema';
import { RegisterUserDto } from '../dtos/request_body.dto';
import { UserDto } from '../dtos/user.dto';
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcrypt'
import { Role } from '../dtos/role.dto';


@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User.name) private userModel : Model<User>){}

    async createUser(userdata:RegisterUserDto) : Promise<object> {
        const checkUsers = await this.findOne(userdata.username);

        if(!!checkUsers){
            throw new ConflictException({status:'ERROR' , message:'User already exists'});
        }

        try{
            const hashPass = await bcrypt.hash(userdata.password, 10);
            const protectedData = {
                id:uuidv4(), 
                password: hashPass , 
                username:userdata.username , 
                role: userdata.role ? userdata.role : [Role.REGULAR]}
            await this.userModel.create(protectedData);
            return {status:'OK' , message : 'User created succesfully'}
        }catch(e){
            return {status:'ERROR' , message : e }
        }
    }

    async findOne(username:string):Promise<UserDto>{
        const data = await this.userModel.find({username:username})
        return data[0]
    }


}
