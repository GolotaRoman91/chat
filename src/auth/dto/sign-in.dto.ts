import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @ApiProperty({required: true, example: 'firstUser'})
    @IsString()
    @IsNotEmpty()
    login: string

    @ApiProperty({required: true, example: '1234'})
    @IsString()
    @IsNotEmpty()
    password:string
}