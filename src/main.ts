import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // OBS: inicializamos servicos http e websockets aqui
  // Se inicializassemos aqui perdemos resiliencia da aplicacao e ao escalar a aplicacao, geraremos replicas desse consumidor
  // app.connectMicroservice();

  // const assetsService = app.get(AssetsService);
  // assetsService.subscribeEvents().subscribe((event) => {
  //   console.log(event);
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
