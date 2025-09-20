import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ecommerce')
@Controller('api/auth')
export class AuthController { 
  constructor(private authService: AuthService) {}
 
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'Conflict. User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async register(@Body() registerDto: RegisterDto ) {
        return this.authService.register(registerDto);
  }
  
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 409, description: 'Conflict. User already exists.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

   @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Access token refreshed successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
   async refresh(@Body() refreshTokenDto: RefreshTokenDto ){
    return this.authService.refresh(refreshTokenDto.refreshToken)
   }

   @UseGuards(JwtAuthGuard)
   @Get('profile')
   @ApiOperation({ summary: 'Get user profile' })
   @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
   @ApiResponse({ status: 401, description: 'Unauthorized.' })
   async getProfile(){
    console.log('abc')
   } 

}