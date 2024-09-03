import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(username: string, email: string, password: string): Promise<import("../user/user.entity").User>;
}
