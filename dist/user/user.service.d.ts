import { Repository } from "typeorm";
import { User } from "./user.entity";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, email: string, password: string): Promise<User>;
    findOneByEmail(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    updateUser(id: number, userData: Partial<User>): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
