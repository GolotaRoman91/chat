import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

console.log('+')
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(dto: SignUpDto) {
        try {
            const candidate = await this.userService.getUserByLogin(dto.login)

            if (candidate) {
                throw new HttpException('User with this login already exists', HttpStatus.CONFLICT);
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

    async signIn(dto: SignInDto) {
        const user = await this.userService.getUserByLogin(dto.login)

        if(!user) {
            throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password)

        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND)
        }

        const token = this.generateToken({ id: user.id }, process.env.JWT_SECRET, process.env.JWT_ACCESS_TIME);

        return { accessToken: token }
    }

    private generateToken(payload, key: string, time: string) {
        return this.jwtService.sign(payload, { secret: key, expiresIn: time });
    }

    async deleteUser(login: string) {
        const user = await this.userService.getUserByLogin(login)
        await this.userService.deleteUser(user.id)
    }
}


