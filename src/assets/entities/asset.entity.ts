import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import { HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({ timestamps: true }) // com isso o mongoose interpreta a collection e define os campos de criacao e atualizacao
export class Asset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  symbol: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  // exclamacao indica apenas a modelagem dos dados, nao gerara em compilacao
  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
