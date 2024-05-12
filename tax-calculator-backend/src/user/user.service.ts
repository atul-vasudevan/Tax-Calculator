import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>,)
  {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.username = createUserDto.username;
    user.user_uuid = uuidv4();
    user.created = new Date();
    return this.user.save(user);
  }

  async findById(id: number): Promise<User> {
    return await this.user.findOne({where: {id}});
  }

  async find(name: string): Promise<User> {
    return await this.user.findOneBy({username: name})
  }
}
