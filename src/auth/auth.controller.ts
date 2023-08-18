import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/rest/login-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto ) {
        return this.authService.login( loginUserDto );
    }
}