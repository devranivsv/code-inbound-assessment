import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
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
      throw new HttpException(
        "Failed to retrieve users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("update/:id")
  async update(@Param("id") id: number, @Body() body: any) {
    try {
      await this.userService.updateUser(id, body);
      return {
        message: `User ${id} updated successfully`,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to update user with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: number) {
    try {
      await this.userService.deleteUser(id);
      return {
        message: `User ${id} removed successfully`,
      };
    } catch (error) {
      throw new HttpException(error.message, +error.status);
    }
  }
}
