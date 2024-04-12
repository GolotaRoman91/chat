import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { where } from 'sequelize';

export class UserRepository {
    constructor(
        @InjectModel(User) private repository: typeof User
    ) { }

    async getUserByLogin(login: string) {
        const user = await this.repository.findOne({ where: { login } })
        return user
    }

    async createUser(dto: SignUpDto) {
        await this.repository.create(dto)
    }

    async delete(id: number) {
        await this.repository.destroy({ where: {id} })
    }
}