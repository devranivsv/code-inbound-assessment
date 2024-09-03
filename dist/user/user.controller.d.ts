import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./user.entity").User[]>;
    update(id: number, body: any): Promise<void>;
    delete(id: number): Promise<void>;
}
