import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { Asset, AssetDocument } from 'src/assets/entities/asset.entity';
import { Wallet, WalletDocument } from 'src/wallets/entities/wallet.entity';
import { Trade } from './trade.entity';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
}

// ? aplicamos o travamento otimista com o optimisticConcurrency
@Schema({ timestamps: true, optimisticConcurrency: true }) // com isso o mongoose interpreta a collection e define os campos de criacao e atualizacao
export class Order {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop()
  price: number;

  @Prop({ type: String, ref: Wallet.name }) // adicao do ref para que o mongoose saiba referenciar a relacao
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name }) // adicao do ref para que o mongoose saiba referenciar a relacao
  asset: AssetDocument | string;

  @Prop()
  type: OrderType;

  @Prop()
  status: OrderStatus;

  @Prop({ type: [mongoose.Schema.Types.String], ref: 'Trade' })
  trades: Trade[] | string[];

  // exclamacao indica apenas a modelagem dos dados, nao gerara em compilacao
  createdAt!: Date;
  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
