import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

export class UserRepository {
    constructor(
        @InjectModel(User) private repository: typeof User
    ) { }

    async getUserById(id: number) {
        const user = await this.repository.findOne({ where: { id } })
        return user
    }
}