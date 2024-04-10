import { UserService } from './../user/user.service';
import { HttpException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { error } from 'console';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signUp(dto: SignUpDto) {
        try {
            const candidate = await this.userService.getUserByLogin(dto.login)

            if (candidate) {
                throw error('User with this login already exist')
            }

            const saltOrRounds = 10
            const password = dto.password
            const hash = await bcrypt.hash(password, saltOrRounds);
            dto.password = hash

            await this.userService.createUser(dto)
            const createdUser = await this.userService.getUserByLogin(dto.login)

            return {
                message: `User ${createdUser.login} created`
            }

        } catch (error) {
            console.error('AuthService -> signUp: ', error);
            throw new HttpException(error, error.status);
        }
    }
}


