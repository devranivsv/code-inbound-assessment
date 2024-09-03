import { Controller, Get, Body, Param, Delete, Put, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("findAll")
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.log(error.message);
      throw new HttpException("Failed to retrieve users", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("update:id")
  async update(@Param("id") id: number, @Body() body: any) {
    try {
      return await this.userService.updateUser(id, body);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(`Failed to update user with ID ${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("delete:id")
  async delete(@Param("id") id: number) {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      console.log(error.message);
      throw new HttpException(`Failed to delete user with ID ${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
