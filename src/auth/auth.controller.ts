import { AuthService } from './auth.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign-up')
    @ApiOperation({ summary: 'User sign up' })
    @ApiBody({ type: SignUpDto, description: 'User sign up data' })
    async signUp(@Body() dto: SignUpDto) {
        return await this.authService.signUp(dto)
    }


    @Post('/sign-in')
    @ApiOperation({ summary: 'User sign in' })
    @ApiBody({ type: SignInDto, description: 'User sign in data' })
    async signIn(@Body() dto: SignInDto) {
        return await this.authService.signIn(dto)
    }
}
