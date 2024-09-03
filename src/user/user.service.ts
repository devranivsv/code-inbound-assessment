import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(username: string, email: string, password: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      let errorName = "Registration Failed";
      if (error.code == 23505) {
        errorName = "Username already exists";
      }
      throw new HttpException(errorName, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException("Failed to fetch user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException("Failed to fetch users", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<void> {
    try {
      const updatedUser = await this.userRepository.update(id, userData);

      if (updatedUser.affected === 0) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException("Failed to update user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const deletedUser = await this.userRepository.delete(id);

      if (deletedUser.affected === 0) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException("Failed to delete user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
