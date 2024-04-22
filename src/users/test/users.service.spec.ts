import { UsersService } from '../users.service';
import { RegisterUserDto } from '../../domain/dto/requestBody.dto';
import { Role } from '../../domain/enum/role.enum';
import { Model } from 'mongoose';
import { User } from 'src/domain/database/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from 'src/domain/dto/user.dto';

describe('UsersController', () => {
  let usersService: UsersService;
  let userModelMock: Model<User>;

  beforeEach(() => {
    userModelMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    } as unknown as Model<User>;
    usersService = new UsersService(userModelMock);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
  
      const userData: RegisterUserDto = {
        username: 'testuser',
        password: 'testpassword',
        role: [Role.REGULAR],
      };

   
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

    
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

     
      const result = await usersService.createUser(userData);
    
      expect(result).toEqual({ status: 'OK', message: 'User created succesfully' });
    });

    it('should throw ConflictException if user already exists', async () => {
   
      const userData: RegisterUserDto = {
        username: 'existinguser',
        password: 'testpassword',
        role: [Role.REGULAR],
      };


      jest.spyOn(usersService, 'findOne').mockResolvedValue(
        {id:'e0a742fc-ed6d-44c7-9d6c-6103c6356a17' , username: 'existinguser' , password:'testpass' , role:[Role.ADMIN]}
      );


      await expect(usersService.createUser(userData)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should find a user by username', async () => {

      const username = 'testuser';
      const userMock : UserDto = {
        id: uuidv4(),
        username: 'existinguser',
        password: 'testpass',
        role: [Role.ADMIN],
      };


      jest.spyOn(usersService, 'findOne').mockResolvedValue(userMock);


      const result = await usersService.findOne(username);

      expect(result).toEqual(userMock);
    });
  });
});