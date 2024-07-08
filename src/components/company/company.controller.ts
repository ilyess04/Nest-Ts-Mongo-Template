import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Response } from 'express';
import { CreateCompanyDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategy/jwt.srategy';
import { openApiResponse } from 'src/common/decorator/openApi.decorator';
import { IRequest } from 'src/common/interfaces';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Post('create')
  @openApiResponse(
    {
      status: HttpStatus.CREATED,
      description: 'Company created successfuly !',
    },
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'something went wrong!',
    },
  )
  async CreateCompany(
    @Res() res: Response,
    @Body() body: CreateCompanyDto,
    @Request() req: IRequest,
  ) {
    try {
      const company = await this.companyService.createCompany({
        name: body.name,
        manager: req.user['_id'],
      });
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        company,
        message: 'Company created successfuly !',
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }
}
