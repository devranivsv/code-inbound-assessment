"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(username, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = this.userRepository.create({
                username,
                email,
                password: hashedPassword,
            });
            return await this.userRepository.save(user);
        }
        catch (error) {
            let errorName = "Registration Failed";
            if (error.code == 23505) {
                errorName = "Username already exists";
            }
            throw new common_1.HttpException(errorName, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async findOneByEmail(email) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException("Failed to fetch user", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return this.userRepository.find();
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException("Failed to fetch users", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, userData) {
        try {
            const updatedUser = await this.userRepository.update(id, userData);
            if (updatedUser.affected === 0) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException("Failed to update user", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id) {
        try {
            const deletedUser = await this.userRepository.delete(id);
            if (deletedUser.affected === 0) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException("Failed to delete user", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map