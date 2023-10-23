import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommonModel } from './common/common.model';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends CommonModel {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  fullName: string;
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    select: true,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
