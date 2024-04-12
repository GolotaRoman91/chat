import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsEmail, MaxLength, IsIn, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({ example: 'User', required: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    first_name: string

    @ApiProperty({ example: 'Userov', required: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    last_name: string

    @ApiProperty({ example: 'Userovich', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    patronymic: string

    @ApiProperty({ example: '2005-12-08 00:00:00+00', required: false })
    @IsOptional()
    birth_date: Date

    @ApiProperty({ example: true, required: true })
    @IsBoolean()
    is_active: boolean

    @ApiProperty({ example: 'https://photolink_s3.com', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    photo: string

    @ApiProperty({ example: 'male', required: true })
    @IsString()
    @IsIn(['male', 'female'], { message: 'Invalid gender, must be "male" or "female"' })
    gender: 'male' | 'female';

    @ApiProperty({ example: 'firstUser', required: true })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    login: string

    @ApiProperty({ example: '1234', required: true })
    @IsString()
    @MinLength(4)
    password: string

    @ApiProperty({ example: 'testEmail@mail.com', required: true })
    @IsOptional()
    @IsEmail()
    email: string
}