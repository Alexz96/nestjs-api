import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true }) // com isso o mongoose interpreta a collection e define os campos de criacao e atualizacao
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  // exclamacao indica apenas a modelagem dos dados, nao gerara em compilacao
  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
