import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { USER } from '../../consts/consts';

@Schema()
export class CommonModel {
  @Prop({
    type: Boolean,
    default: false,
  })
  isArchived: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  })
  createdBy: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  })
  updatedBy: string;
}
