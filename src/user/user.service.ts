import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UserRepository } from './user.repository';
import { HttpException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getUserByLogin(login: string) {
        try {
            const user = await this.userRepository.getUserByLogin(login)
            return user
        } catch (error) {
            console.error('UserService -> getUserById: ', error);
            throw new HttpException(error, error.status);
        }
    }

    async createUser(dto: SignUpDto): Promise<any> {
        try {
            const user = await this.userRepository.createUser(dto)
            return user
        } catch (error) {
            console.error('UserService -> createUser: ', error);
            throw new HttpException(error, error.status);
        }
    }
}
