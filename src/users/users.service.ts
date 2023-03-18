import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';
import { Role } from '../auth/roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private stripUserPassword(user: User): User {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetails } = user;
    return userDetails;
  }

  private async saveToRepository(user: User) {
    const savedUser = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.stripUserPassword(savedUser);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return this.stripUserPassword(user);
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException("Can't find that user.");
    }
    return this.stripUserPassword(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Can't find that user.");
    }
    return this.stripUserPassword(user);
  }

  async addNewUser(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = { ...user, password: hashedPassword };
    newUser.roles = [Role.USER];
    const addedUser = await this.saveToRepository(newUser);
    return this.stripUserPassword(addedUser);
  }

  async updateUser(id: string, updateDetails: User): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Can't find user to update.");
    }
    if ('username' in updateDetails) user.username = updateDetails.username;
    if ('password' in updateDetails) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(updateDetails.password, salt);
    }
    const updatedUser = await this.saveToRepository(user);
    return this.stripUserPassword(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Can't find user to delete.");
    }
    await this.userRepository.delete(id);
  }
}
