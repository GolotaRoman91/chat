import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
    providers: [UserService, UserRepository],
    imports: [SequelizeModule.forFeature([User])],
    exports: [UserService]
})
export class UserModule {}
