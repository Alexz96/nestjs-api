import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderStatus, OrderType } from './entities/order.entity';
import { OrdersService } from './orders.service';

export type TradeKafkaMessage = {
  order_id: string;
  investor_id: string;
  asset_id: string;
  order_type: OrderType;
  status: OrderStatus.OPEN | OrderStatus.CLOSED;
  partial: number;
  shares: number;
  transactions: {
    transaction_id: string;
    buyer_id: string;
    seller_id: string;
    asset_id: string;
    shares: number;
    price: number;
  }[];
}

@Controller()
export class OrderConsumer {

  constructor(private ordersService: OrdersService) {}

  // ? Recebemos a notificacao das duas ordens aqui (SELL E BUY)
  // * so atualizamos o preco do ativo quando a ordem e de compra
  @EventPattern('output')
  async handleTrade(@Payload() message: TradeKafkaMessage) {
    // console.log("Message: ", message);
    const transaction = message.transactions[message.transactions.length - 1];
    await this.ordersService.createTrade({
      orderId: message.order_id,
      status: message.status,
      relatedInvestorId:
        message.order_type === OrderType.BUY
          ? transaction.seller_id
          : transaction.buyer_id,
      brokerTradeId: transaction.transaction_id,
      shares: transaction.shares,
      price: transaction.price,
      date: new Date(),
    });
  }
}
