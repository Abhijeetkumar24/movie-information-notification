import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path';


async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(process.env.PORT);

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50052',
      package: 'notification',
      protoPath: join(__dirname, '../../proto/notification.proto')
    },
  },
  );
  await grpcApp.listen();

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['192.168.2.151:9092'],
      }
    }
  });
  await kafkaApp.listen();

  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://broker.hivemq.com',
    },
  });
  await mqttApp.listen();


  // const rabbitMqApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'test_broadcast',
  //     queueOptions: {
  //       durable: false
  //     },
  //   },
  // });

  // await rabbitMqApp.listen();

}
bootstrap();
