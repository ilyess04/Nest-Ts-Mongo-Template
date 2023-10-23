import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_TIMEOUT,
  REFRESH_TOKEN_TIMEOUT,
  USER_PROVIDER,
} from 'src/config';
import { User } from 'src/common/mongoose/models/user.model';
import { IJwtPayloadUser } from 'src/common/interfaces';
import { Model } from 'mongoose';
import { ICreateUser, IEditUser } from 'src/common/interfaces/user';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_PROVIDER) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
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
        const user = this.getUserByMail(payload.mail);
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
  async ResetPasswordToken(token: string, password: string): Promise<User> {
    const payload = await this.decodeResetToken(token);
    const user = await this.getUserById(payload.userId);
    if (!user) {
      throw new NotFoundException('User not found !');
    }
    const hashPassword = await this.hashPassword(password);
    const updateUser = { ...user['_doc'], password: hashPassword };
    return await this.updateUser(updateUser);
  }
  async getUserByMail(email: string): Promise<User> {
    return await this.userModel.findOne({
      email,
      isArchived: false,
      isDeleted: false,
    });
  }
  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id, { isDeleted: false, isArchived: false });
  }
  async updateUser(user: IEditUser): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(
        user._id,
        {
          $set: { ...user },
        },
        { new: true },
      )
      .exec();
  }
  async createUser(payload: ICreateUser): Promise<User> {
    return await new this.userModel(payload).save();
  }
}
