import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CommonModel } from './common/common.model';
import { USER } from '../consts/consts';

export type UserDocument = Company & Document;

@Schema({ timestamps: true })
export class Company extends CommonModel {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
    required: true,
  })
  manager: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
