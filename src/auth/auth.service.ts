import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    // ✅ Normalize userType to 'user' or 'provider' for JWT
    const role =
      newUser.userType === 'individual' || newUser.userType === 'company'
        ? 'user'
        : 'provider';

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token, userId: newUser.id, role };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ Normalize userType to 'user' or 'provider' for JWT
    const role =
      user.userType === 'individual' || user.userType === 'company'
        ? 'user'
        : 'provider';

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.userType, // 'individual' or 'company'
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token, userId: user.id, role };
  }
}
