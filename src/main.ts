import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const microserviceGrpc = app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.NOTIFICATION_GRPC_URL,
        package: process.env.NOTIFICATION_PACKAGE,
        protoPath: process.env.NOTIFICATION_PROTO_PATH
      },
    },
    );
    
    const kafkaMicroservice = app.connectMicroservice<MicroserviceOptions>( {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_URL],
      }
    }
  });
  
  
  const mqttMicroservice = app.connectMicroservice<MicroserviceOptions>( {
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL,
    },
  });
  
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);

}
bootstrap();
