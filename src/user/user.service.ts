import { UserRepository } from './user.repository';
import { HttpException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getUserById(id: number) {
        try {
            const user = await this.userRepository.getUserById(id)
            return user
        } catch (error) {
            console.error('UserService -> getUserById: ', error);
            throw new HttpException(error, error.status);
        }
    }
}
