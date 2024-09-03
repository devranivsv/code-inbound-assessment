import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { User } from "src/user/user.entity";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
