import { AuthService } from './auth.service';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    @ApiOperation({ summary: 'User sign up' })
    @ApiBody({ type: SignUpDto, description: 'User sign up data' })
    async signUp(@Body() dto: SignUpDto) {
        return await this.authService.signUp(dto)
    }
}
