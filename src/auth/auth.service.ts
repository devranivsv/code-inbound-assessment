import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { secretKey } from "./constant";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Failed to validate user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(user: any) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: secretKey,
        }),
      };
    }

  async register(username: string, email: string, password: string) {
    return this.userService.createUser(username, email, password);
  }
}
