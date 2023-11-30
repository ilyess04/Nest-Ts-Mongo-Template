import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyProvider } from './company.provider';
import { CompanyController } from './company.controller';
import { DatabaseModule } from 'src/common/mongoose/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../user/auth/auth.service';
import { UserProvider } from '../user/user.provider';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: ['jwt', 'refresh'] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  providers: [
    CompanyService,
    ...CompanyProvider,
    AuthService,
    UserService,
    ...UserProvider,
  ],
  controllers: [CompanyController],
  exports: [CompanyService, ...CompanyProvider],
})
export class CompanyModule {}
