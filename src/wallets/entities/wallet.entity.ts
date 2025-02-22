import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { WalletAsset, WalletAssetDocument } from './wallet-asset.entity';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true }) // com isso o mongoose interpreta a collection e define os campos de criacao e atualizacao
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({
    type: [mongoose.Schema.Types.String],
    set: (v) => [...new Set(v)], // protecao que evita a criacao de registros duplicados
    ref: WalletAsset.name,
  })
  assets: WalletAssetDocument[] | string[];

  // exclamacao indica apenas a modelagem dos dados, nao gerara em compilacao
  createdAt!: Date;
  updatedAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
