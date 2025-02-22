import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { WalletDocument } from './wallet.entity';
import { Asset, AssetDocument } from 'src/assets/entities/asset.entity';

export type WalletAssetDocument = HydratedDocument<WalletAsset>;

@Schema({ timestamps: true }) // com isso o mongoose interpreta a collection e define os campos de criacao e atualizacao
export class WalletAsset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: String, ref: 'Wallet' }) // adicao do ref para que o mongoose saiba referenciar a relacao
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name }) // adicao do ref para que o mongoose saiba referenciar a relacao
  asset: AssetDocument | string;

  // exclamacao indica apenas a modelagem dos dados, nao gerara em compilacao
  createdAt!: Date;
  updatedAt!: Date;
}

export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset);

// criacao de um index para evitar duplicacoes
WalletAssetSchema.index({ wallet: 1, asset: 1 }, { unique: true });
