import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Response } from 'express';
import { CreateCompanyDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategy/jwt.srategy';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Post('create')
  async CreateCompany(@Res() res: Response, @Body() body: CreateCompanyDto) {
    try {
      const company = await this.companyService.CreateCompany(body);
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        company,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }
}
