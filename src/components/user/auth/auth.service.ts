import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_TIMEOUT, REFRESH_TOKEN_TIMEOUT } from 'src/config';
import { User } from 'src/common/mongoose/models/user.model';
import { IJwtPayloadUser } from 'src/common/interfaces';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async decodePassword(user: User, password: string): Promise<boolean> {
    let match = false;
    match = user && (await bcrypt.compare(password, user.password));
    return match;
  }
  async generateToken(user: User): Promise<any> {
    const payload: IJwtPayloadUser = {
      userId: user['_id'],
    };
    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: ACCESS_TOKEN_TIMEOUT,
    });
    const refreshToken: string = this.jwtService.sign(
      { ...payload, refresh: true },
      { expiresIn: REFRESH_TOKEN_TIMEOUT },
    );
    return { accessToken, refreshToken };
  }
  async generateResetPasswordToken(user: User): Promise<string> {
    const payload: IJwtPayloadUser = {
      userId: user['_id'],
    };
    const resetPasswordToken = this.jwtService.sign(payload, {
      expiresIn: process.env.RESSET_PASSWORD_TOKEN,
      secret: process.env.RESET_PASSWORD_SECRET_KEY,
    });
    return resetPasswordToken;
  }
  public async decodeResetToken(token: string): Promise<IJwtPayloadUser> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.RESET_PASSWORD_SECRET_KEY,
      });
      if (typeof payload === 'object' && 'userId' in payload) {
        const user = this.userService.getUserByMail(payload.mail);
        if (user) {
          return payload;
        }
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
  async resetPasswordToken(token: string, password: string): Promise<User> {
    const payload = await this.decodeResetToken(token);
    const user = await this.userService.getUserById(payload.userId);
    if (!user) {
      throw new NotFoundException('User not found !');
    }
    const hashPassword = await this.hashPassword(password);
    const updateUser = { ...user['_doc'], password: hashPassword };
    return await this.userService.updateUser(updateUser);
  }
}
