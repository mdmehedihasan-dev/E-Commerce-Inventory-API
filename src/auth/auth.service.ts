import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import {v4 as uuidv4} from 'uuid'
import { LoginDto } from './dto/login.dto';
import { User } from 'src/entity/user.entity';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService) {}

 
    async register(registerDto: RegisterDto) {

        const { email,
              password,
              firstName,
              lastName,
              role,     
              username } = registerDto;
        
        const exitingUser = await this.usersRepository.findOne({ where: { email } });
        
        if (exitingUser) {
            throw new UnauthorizedException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = this.usersRepository.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            role: role,
            username: username,
            refreshToken: uuidv4()
        });
        await this.usersRepository.save(newUser);

        const payload = { 
             email: newUser.email, 
             sub: newUser.id,
             firstName: newUser.firstName,
             lastName: newUser.lastName,
             role: newUser.role,
             username: newUser.username,
            };

        return{
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
                username: newUser.username,
            }
        }

    }



    async login(loginDto: LoginDto) {
    
        const { email, password } = loginDto;
        
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const newRefreshToken = uuidv4();
        await this.usersRepository.update(user.id, { refreshToken: newRefreshToken });
       
        const payload = { 
            email: user.email, 
            sub: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            username: user.username,
        };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign({refreshToken: newRefreshToken}, { expiresIn: '7d' }),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                username: user.username,
            }
        }

    }

    

    async refresh(refreshToken: string): Promise<any>{

         const payload = this.jwtService.verify(refreshToken);
         const { refreshToken: tokenValue } = payload;

         const user = await this.usersRepository.findOne({ where: { refreshToken: tokenValue }},);

         if (!user) {
          throw new UnauthorizedException('Invalid refresh token');
         }
  
         const newRefreshToken = uuidv4();
         await this.usersRepository.update(user.id, { refreshToken: newRefreshToken });

            const newPayload = { 
                email: user.email, 
                sub: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                username: user.username,
            };

            return {
                access_token: this.jwtService.sign(newPayload),
                refresh_token: this.jwtService.sign({refreshToken: newRefreshToken}, { expiresIn: '7d' }),
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    username: user.username,
                }
            }

    }



}